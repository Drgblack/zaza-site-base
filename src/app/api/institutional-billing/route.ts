import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    switch (action) {
      case 'quote_request': {
        const { 
          organizationName, 
          contactName, 
          contactEmail, 
          contactPhone, 
          estimatedSeats, 
          organizationType,
          planName,
          billingCycle 
        } = data;
        
        if (!organizationName || !contactName || !contactEmail) {
          return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
          );
        }

        // In a real implementation, this would:
        // 1. Save the quote request to the database
        // 2. Send notification emails to sales team
        // 3. Create a lead in CRM system
        // 4. Generate quote ID for tracking
        
        const quoteId = `QUO-${Date.now().toString(36).toUpperCase()}`;
        
        // Mock email sending
        console.log('Quote request received:', {
          quoteId,
          organizationName,
          contactName,
          contactEmail,
          contactPhone,
          estimatedSeats: parseInt(estimatedSeats) || 0,
          organizationType,
          planName,
          billingCycle,
          requestedAt: new Date().toISOString()
        });

        // TODO: Send notification email to sales team
        // TODO: Send confirmation email to requester
        
        return NextResponse.json({ 
          success: true, 
          quoteId,
          message: 'Quote request submitted successfully' 
        });
      }

      case 'create_subscription': {
        const { 
          organizationId, 
          planId, 
          seats, 
          billingCycle, 
          paymentMethodId 
        } = data;
        
        if (!organizationId || !planId || !seats) {
          return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
          );
        }

        // In a real implementation, this would:
        // 1. Calculate pricing based on plan and seats
        // 2. Create Stripe subscription with proper pricing
        // 3. Update organization subscription status
        // 4. Send confirmation emails
        // 5. Enable features for the organization
        
        const subscriptionId = `sub_${Date.now().toString(36)}`;
        
        return NextResponse.json({ 
          success: true, 
          subscriptionId,
          message: 'Subscription created successfully' 
        });
      }

      case 'update_seats': {
        const { organizationId, newSeatCount, effectiveDate } = data;
        
        if (!organizationId || !newSeatCount) {
          return NextResponse.json(
            { error: 'Missing required fields' },
            { status: 400 }
          );
        }

        // In a real implementation, this would:
        // 1. Validate seat count against organization limits
        // 2. Calculate prorated billing adjustments
        // 3. Update Stripe subscription quantity
        // 4. Update organization seat allocation
        // 5. Send billing notification
        
        return NextResponse.json({ 
          success: true,
          message: `Seat count updated to ${newSeatCount}`,
          effectiveDate: effectiveDate || new Date().toISOString()
        });
      }

      case 'generate_invoice': {
        const { organizationId, period, includeUsageDetails } = data;
        
        if (!organizationId) {
          return NextResponse.json(
            { error: 'Organization ID required' },
            { status: 400 }
          );
        }

        // In a real implementation, this would:
        // 1. Fetch organization billing data
        // 2. Calculate usage and costs for the period
        // 3. Generate PDF invoice
        // 4. Store invoice in database
        // 5. Return invoice URL or data
        
        const invoiceData = {
          invoiceId: `INV-${Date.now().toString(36).toUpperCase()}`,
          organizationId,
          period: period || new Date().toISOString().slice(0, 7),
          totalAmount: Math.floor(Math.random() * 10000) + 1000, // Mock amount
          status: 'generated',
          generatedAt: new Date().toISOString()
        };
        
        return NextResponse.json(invoiceData);
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Institutional billing error:', error);
    return NextResponse.json(
      { error: 'Failed to process billing request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const orgId = searchParams.get('orgId');
    
    switch (action) {
      case 'subscription_status': {
        if (!orgId) {
          return NextResponse.json(
            { error: 'Organization ID required' },
            { status: 400 }
          );
        }

        // Mock subscription data
        const subscriptionData = {
          organizationId: orgId,
          planName: 'School Professional',
          seats: 50,
          usedSeats: 45,
          billingCycle: 'annual',
          status: 'active',
          currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
          monthlyAmount: 499.50,
          annualAmount: 3996.00
        };
        
        return NextResponse.json(subscriptionData);
      }

      case 'usage_summary': {
        if (!orgId) {
          return NextResponse.json(
            { error: 'Organization ID required' },
            { status: 400 }
          );
        }

        const period = searchParams.get('period') || new Date().toISOString().slice(0, 7);
        
        // Mock usage data
        const usageData = {
          organizationId: orgId,
          period,
          activeUsers: 42,
          totalSeats: 50,
          snippetsGenerated: 1247,
          totalTimeSaved: 624, // hours
          topUsers: [
            { name: 'Sarah Johnson', department: 'Mathematics', snippets: 89, timeSaved: 45 },
            { name: 'Mike Rodriguez', department: 'English', snippets: 76, timeSaved: 38 },
            { name: 'Emily Chen', department: 'Science', snippets: 68, timeSaved: 34 }
          ],
          departmentBreakdown: [
            { department: 'Mathematics', users: 12, snippets: 345, timeSaved: 172 },
            { department: 'English', users: 15, snippets: 423, timeSaved: 211 },
            { department: 'Science', users: 10, snippets: 298, timeSaved: 149 },
            { department: 'Social Studies', users: 8, snippets: 181, timeSaved: 92 }
          ]
        };
        
        return NextResponse.json(usageData);
      }

      case 'invoices': {
        if (!orgId) {
          return NextResponse.json(
            { error: 'Organization ID required' },
            { status: 400 }
          );
        }

        // Mock invoice history
        const invoices = [
          {
            invoiceId: 'INV-2024-001',
            date: '2024-01-01',
            amount: 3996.00,
            status: 'paid',
            period: '2024-01 to 2024-12',
            downloadUrl: '/api/invoices/download/INV-2024-001'
          },
          {
            invoiceId: 'INV-2023-012',
            date: '2023-12-01',
            amount: 499.50,
            status: 'paid',
            period: '2023-12',
            downloadUrl: '/api/invoices/download/INV-2023-012'
          }
        ];
        
        return NextResponse.json(invoices);
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Get institutional billing data error:', error);
    return NextResponse.json(
      { error: 'Failed to get billing data' },
      { status: 500 }
    );
  }
}
