import { NextRequest, NextResponse } from 'next/server';
import { 
  createOrganization, 
  getOrganization, 
  getOrganizationMembers,
  getOrganizationAnalytics,
  addOrganizationMember 
} from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'create_organization': {
        const { orgData, createdByUserId } = data;
        
        if (!orgData || !createdByUserId) {
          return NextResponse.json(
            { error: 'Organization data and creator ID required' },
            { status: 400 }
          );
        }

        const orgId = await createOrganization(orgData, createdByUserId);
        return NextResponse.json({ organizationId: orgId });
      }

      case 'add_member': {
        const { organizationId, userId, role, invitedBy, department, grade } = data;
        
        if (!organizationId || !userId || !role || !invitedBy) {
          return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
          );
        }

        await addOrganizationMember(organizationId, userId, role, invitedBy, department, grade);
        return NextResponse.json({ success: true });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Organization API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orgId = searchParams.get('id');
    const action = searchParams.get('action');
    
    if (!orgId) {
      return NextResponse.json(
        { error: 'Organization ID required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'members': {
        const members = await getOrganizationMembers(orgId);
        return NextResponse.json(members);
      }

      case 'analytics': {
        const period = searchParams.get('period');
        const analytics = await getOrganizationAnalytics(orgId, period || undefined);
        return NextResponse.json(analytics);
      }

      default: {
        const organization = await getOrganization(orgId);
        if (!organization) {
          return NextResponse.json(
            { error: 'Organization not found' },
            { status: 404 }
          );
        }
        return NextResponse.json(organization);
      }
    }
  } catch (error) {
    console.error('Get organization error:', error);
    return NextResponse.json(
      { error: 'Failed to get organization data' },
      { status: 500 }
    );
  }
}