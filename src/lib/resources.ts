/**
 * Resource Management Service for Zaza Community Hub
 * Handles downloads, payment processing, and resource metadata
 */

export interface ResourceMetadata {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'template' | 'guide';
  category: 'communication' | 'assessment' | 'behavior' | 'academic' | 'social-emotional';
  price: number | null; // null for free resources
  isPremium: boolean;
  fileSize: string;
  pageCount: number;
  previewImage: string;
  downloadUrl: string;
  previewUrl?: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
    rating: number;
  };
  stats: {
    downloads: number;
    rating: number;
    reviews: number;
  };
  features: string[];
  samplePages?: string[];
  createdAt: string;
  updatedAt: string;
}

export const ZAZA_RESOURCES: ResourceMetadata[] = [
  {
    id: 'parent-teacher-scripts',
    title: 'Parent-Teacher Conference Scripts',
    description: 'Professional scripts for various conference scenarios including academic concerns, behavioral issues, and positive feedback sessions.',
    type: 'guide',
    category: 'communication',
    price: null,
    isPremium: false,
    fileSize: '2.3 MB',
    pageCount: 24,
    previewImage: '/resources/previews/placeholder.svg',
    downloadUrl: '/resources/pdfs/demo-resource.pdf',
    previewUrl: '/resources/previews/parent-teacher-scripts-sample.pdf',
    tags: ['parent-teacher', 'conferences', 'professional', 'communication'],
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2088&q=80',
      rating: 4.9
    },
    stats: {
      downloads: 1247,
      rating: 4.9,
      reviews: 89
    },
    features: [
      'Ready-to-use conversation scripts',
      'Scenarios for every situation',
      'Personalization tips included',
      'Professional tone guidelines'
    ],
    samplePages: [
      '/resources/previews/parent-teacher-scripts-page1.jpg',
      '/resources/previews/parent-teacher-scripts-page2.jpg'
    ],
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 'ai-progress-reports',
    title: 'AI-Powered Progress Report Generator',
    description: 'Advanced template that uses AI to generate personalized progress reports based on student data with customizable sections.',
    type: 'template',
    category: 'assessment',
    price: 9.99,
    isPremium: true,
    fileSize: '4.1 MB',
    pageCount: 36,
    previewImage: '/resources/previews/placeholder.svg',
    downloadUrl: '/resources/pdfs/demo-resource.pdf',
    previewUrl: '/resources/previews/ai-progress-reports-sample.pdf',
    tags: ['progress-reports', 'ai', 'personalized', 'assessment'],
    author: {
      name: 'Dr. Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80',
      rating: 4.8
    },
    stats: {
      downloads: 892,
      rating: 4.7,
      reviews: 64
    },
    features: [
      'AI-powered text generation',
      'Fillable template sections',
      'Sample completed reports',
      'Customizable categories',
      'Professional formatting'
    ],
    samplePages: [
      '/resources/previews/ai-progress-reports-page1.jpg',
      '/resources/previews/ai-progress-reports-page2.jpg',
      '/resources/previews/ai-progress-reports-page3.jpg'
    ],
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: 'behavioral-interventions',
    title: 'Behavioral Intervention Strategies',
    description: 'Comprehensive collection of evidence-based strategies for addressing challenging behaviors in the classroom environment.',
    type: 'guide',
    category: 'behavior',
    price: null,
    isPremium: false,
    fileSize: '3.7 MB',
    pageCount: 28,
    previewImage: '/resources/previews/placeholder.svg',
    downloadUrl: '/resources/pdfs/demo-resource.pdf',
    previewUrl: '/resources/previews/behavioral-interventions-sample.pdf',
    tags: ['behavior', 'intervention', 'strategies', 'classroom-management'],
    author: {
      name: 'Emma Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      rating: 4.6
    },
    stats: {
      downloads: 567,
      rating: 4.8,
      reviews: 43
    },
    features: [
      'Evidence-based strategies',
      'Quick-reference guides',
      'Visual intervention cards',
      'Implementation checklists'
    ],
    samplePages: [
      '/resources/previews/behavioral-interventions-page1.jpg',
      '/resources/previews/behavioral-interventions-page2.jpg'
    ],
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  }
];

/**
 * Download tracking service
 */
export class ResourceService {
  private static instance: ResourceService;
  
  static getInstance(): ResourceService {
    if (!ResourceService.instance) {
      ResourceService.instance = new ResourceService();
    }
    return ResourceService.instance;
  }

  async downloadResource(resourceId: string, userEmail?: string): Promise<void> {
    const resource = ZAZA_RESOURCES.find(r => r.id === resourceId);
    if (!resource) {
      throw new Error('Resource not found');
    }

    // Track download
    await this.trackDownload(resourceId, userEmail);

    // Trigger download
    const link = document.createElement('a');
    link.href = resource.downloadUrl;
    link.download = `${resource.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  async previewResource(resourceId: string): Promise<string | null> {
    const resource = ZAZA_RESOURCES.find(r => r.id === resourceId);
    return resource?.previewUrl || null;
  }

  async purchaseResource(resourceId: string, userEmail: string): Promise<{ success: boolean; downloadUrl?: string; error?: string }> {
    const resource = ZAZA_RESOURCES.find(r => r.id === resourceId);
    if (!resource) {
      return { success: false, error: 'Resource not found' };
    }

    if (!resource.isPremium || resource.price === null) {
      return { success: false, error: 'Resource is not premium' };
    }

    try {
      // In a real implementation, this would integrate with Stripe
      // For now, we'll simulate a successful purchase
      console.log(`Processing payment for ${resource.title} - €${resource.price}`);
      
      // Track purchase
      await this.trackPurchase(resourceId, userEmail, resource.price);
      
      return { 
        success: true, 
        downloadUrl: resource.downloadUrl 
      };
    } catch (error) {
      console.error('Purchase failed:', error);
      return { 
        success: false, 
        error: 'Payment processing failed' 
      };
    }
  }

  private async trackDownload(resourceId: string, userEmail?: string): Promise<void> {
    // In a real implementation, this would send data to your analytics service
    const trackingData = {
      resourceId,
      userEmail: userEmail || 'anonymous',
      timestamp: new Date().toISOString(),
      action: 'download'
    };
    
    console.log('Download tracked:', trackingData);
    
    // You could send to your backend:
    // await fetch('/api/analytics/track', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(trackingData)
    // });
  }

  private async trackPurchase(resourceId: string, userEmail: string, amount: number): Promise<void> {
    // In a real implementation, this would send purchase data to your backend
    const purchaseData = {
      resourceId,
      userEmail,
      amount,
      timestamp: new Date().toISOString(),
      action: 'purchase'
    };
    
    console.log('Purchase tracked:', purchaseData);
    
    // You could send to your backend:
    // await fetch('/api/analytics/purchase', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(purchaseData)
    // });
  }

  getResourceById(id: string): ResourceMetadata | undefined {
    return ZAZA_RESOURCES.find(resource => resource.id === id);
  }

  getAllResources(): ResourceMetadata[] {
    return ZAZA_RESOURCES;
  }

  getResourcesByCategory(category: string): ResourceMetadata[] {
    return ZAZA_RESOURCES.filter(resource => 
      category === 'all' || resource.category === category
    );
  }

  getFreeResources(): ResourceMetadata[] {
    return ZAZA_RESOURCES.filter(resource => !resource.isPremium);
  }

  getPremiumResources(): ResourceMetadata[] {
    return ZAZA_RESOURCES.filter(resource => resource.isPremium);
  }
}

export const resourceService = ResourceService.getInstance();