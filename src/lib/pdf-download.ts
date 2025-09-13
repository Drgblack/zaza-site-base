// PDF download utility
export const downloadPDF = async (resourceType: string) => {
  try {
    // Call the download API
    const response = await fetch(`/api/download?type=${resourceType}`);
    
    if (!response.ok) {
      throw new Error('Download failed');
    }
    
    // Get the blob and create download
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    
    // Set appropriate filename based on resource type
    const filenames = {
      'self-care': 'teacher-self-care-guide.pdf',
      'templates': 'ai-teaching-templates.pdf', 
      'communication': 'parent-communication-kit.pdf'
    };
    
    a.download = filenames[resourceType as keyof typeof filenames] || `${resourceType}.pdf`;
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    console.log(`Successfully downloaded: ${resourceType}`);
  } catch (error) {
    console.error('Download failed:', error);
    
    // Fallback messages for now
    const messages = {
      'self-care': 'Teacher Self-Care Guide download temporarily unavailable. Please try again later.',
      'templates': 'AI Teaching Templates download temporarily unavailable. Please try again later.',
      'communication': 'Parent Communication Kit download temporarily unavailable. Please try again later!'
    };
    
    const message = messages[resourceType as keyof typeof messages] || 'Download temporarily unavailable!';
    alert(message);
  }
};

// Generate sample PDF content (placeholder for future implementation)
export const generateSamplePDF = async (resourceType: string) => {
  // This would integrate with a PDF generation library like jsPDF or Puppeteer
  // For now, just return a promise that resolves
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${resourceType}.pdf`);
    }, 1000);
  });
};