import { AdminDashboard } from '@/components/admin/admin-dashboard';

export default function AdminPage() {
  // In a real implementation, this would:
  // 1. Check user authentication and admin role
  // 2. Get organization data from database
  // 3. Redirect non-admin users
  
  // Mock data for demonstration
  const organizationId = "mock-org-123";
  const organizationName = "Springfield Elementary School";
  const userRole = "admin" as const;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AdminDashboard 
          organizationId={organizationId}
          organizationName={organizationName}
          userRole={userRole}
        />
      </div>
    </div>
  );
}