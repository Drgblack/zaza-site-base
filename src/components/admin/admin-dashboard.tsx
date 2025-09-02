'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, 
  Settings, 
  BarChart3,
  UserPlus,
  Shield,
  Clock,
  TrendingUp,
  BookOpen,
  Mail,
  Search,
  Building,
  Crown,
  Activity
} from 'lucide-react';

interface OrganizationMember {
  userId: string;
  role: string;
  department?: string;
  grade?: string;
  joinedAt: any;
  status: string;
  userProfile?: {
    displayName: string;
    email: string;
    photoURL?: string;
    totalTimeSaved: number;
    snippetsGenerated: number;
    lastSeenAt?: any;
  };
}

interface OrganizationAnalytics {
  activeUsers: number;
  totalSnippets: number;
  totalTimeSaved: number;
  topUsers: {
    userId: string;
    displayName: string;
    snippetsGenerated: number;
    timeSaved: number;
  }[];
}

interface AdminDashboardProps {
  organizationId: string;
  organizationName: string;
  userRole: 'super_admin' | 'admin';
}

export function AdminDashboard({ organizationId, organizationName, userRole }: AdminDashboardProps) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [analytics, setAnalytics] = useState<OrganizationAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Invite form states
  const [inviteEmails, setInviteEmails] = useState('');
  const [inviteRole, setInviteRole] = useState('teacher');
  const [inviteDepartment, setInviteDepartment] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, [organizationId]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      const [membersResponse, analyticsResponse] = await Promise.all([
        fetch(`/api/organizations?id=${organizationId}&action=members`),
        fetch(`/api/organizations?id=${organizationId}&action=analytics`)
      ]);

      if (membersResponse.ok) {
        const membersData = await membersResponse.json();
        setMembers(membersData);
      }

      if (analyticsResponse.ok) {
        const analyticsData = await analyticsResponse.json();
        setAnalytics(analyticsData);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBulkInvite = async () => {
    if (!inviteEmails.trim()) return;

    setIsInviting(true);
    try {
      const emails = inviteEmails
        .split('\n')
        .map(email => email.trim())
        .filter(email => email.length > 0);

      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'bulk_invite_users',
          organizationId,
          emails,
          role: inviteRole,
          department: inviteDepartment,
          invitedBy: user?.uid
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Bulk invite result:', result);
        setInviteEmails('');
        loadDashboardData(); // Refresh data
      }
    } catch (error) {
      console.error('Error sending invites:', error);
    } finally {
      setIsInviting(false);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'admin': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'teacher': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'viewer': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'invited': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredMembers = members.filter(member =>
    member.userProfile?.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.userProfile?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto mb-2 text-purple-600" />
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Building className="h-8 w-8 text-purple-600" />
            {organizationName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Administrative Dashboard
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Crown className="h-3 w-3" />
            {userRole.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Members</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{members.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analytics?.activeUsers || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Snippets</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{analytics?.totalSnippets || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Time Saved</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {Math.floor((analytics?.totalTimeSaved || 0) / 60)}h
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest member activity and usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analytics?.topUsers.slice(0, 5).map((user, index) => (
                    <div key={user.userId} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-purple-600">
                          {user.displayName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{user.displayName}</p>
                        <p className="text-xs text-gray-500">
                          {user.snippetsGenerated} snippets • {Math.floor(user.timeSaved / 60)}h saved
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => setActiveTab('members')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Invite New Members
                </Button>
                <Button 
                  onClick={() => setActiveTab('analytics')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
                <Button 
                  onClick={() => setActiveTab('settings')} 
                  className="w-full justify-start"
                  variant="outline"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          {/* Member Management */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Invite Members */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Invite Members
                </CardTitle>
                <CardDescription>
                  Add new teachers to your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Addresses</label>
                  <textarea
                    value={inviteEmails}
                    onChange={(e) => setInviteEmails(e.target.value)}
                    placeholder="Enter email addresses, one per line&#10;teacher1@school.edu&#10;teacher2@school.edu"
                    className="w-full min-h-[100px] p-3 border rounded-md resize-none"
                  />
                </div>
                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Role</label>
                    <Select value={inviteRole} onValueChange={setInviteRole}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher">Teacher</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Department</label>
                    <Input
                      value={inviteDepartment}
                      onChange={(e) => setInviteDepartment(e.target.value)}
                      placeholder="e.g., Math, English, Science"
                    />
                  </div>
                </div>
                <Button 
                  onClick={handleBulkInvite} 
                  disabled={!inviteEmails.trim() || isInviting}
                  className="w-full"
                >
                  {isInviting ? 'Sending...' : 'Send Invitations'}
                </Button>
              </CardContent>
            </Card>

            {/* Members List */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Organization Members
                    </CardTitle>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search members..."
                        className="pl-10 w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredMembers.map((member) => (
                      <div key={member.userId} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-shrink-0">
                          {member.userProfile?.photoURL ? (
                            <img
                              src={member.userProfile.photoURL}
                              alt={member.userProfile.displayName}
                              className="w-10 h-10 rounded-full"
                            />
                          ) : (
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <span className="text-purple-600 font-semibold">
                                {member.userProfile?.displayName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                              {member.userProfile?.displayName || 'Unknown User'}
                            </h3>
                            <Badge className={getRoleColor(member.role)}>
                              {member.role.replace('_', ' ')}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(member.status)}>
                              {member.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {member.userProfile?.email}
                          </p>
                          {member.department && (
                            <p className="text-xs text-gray-500 mt-1">
                              {member.department} • Joined {new Date(member.joinedAt?.seconds * 1000).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <p>{member.userProfile?.snippetsGenerated || 0} snippets</p>
                          <p>{Math.floor((member.userProfile?.totalTimeSaved || 0) / 60)}h saved</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Usage Analytics
              </CardTitle>
              <CardDescription>
                Detailed insights into your organization's usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                <p>Detailed charts, usage trends, and performance metrics will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Organization Settings
              </CardTitle>
              <CardDescription>
                Configure your organization's preferences and policies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <Shield className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-semibold mb-2">Settings Panel Coming Soon</h3>
                <p>Organization preferences, security settings, and integrations will be available here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}