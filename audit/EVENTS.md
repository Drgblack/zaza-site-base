# Analytics Events Specification

## Event Tracking Strategy

All user interactions should be tracked for conversion optimization and user experience analysis.

## Event Categories

### Email Capture Events
```javascript
// Main email form submission
gtag('event', 'email_capture', {
  event_category: 'engagement',
  event_label: 'homepage_signup',  // Source identifier
  value: 1
});

// Exit intent modal
gtag('event', 'email_capture', {
  event_category: 'engagement', 
  event_label: 'exit_intent_modal',
  value: 1
});
```

### CTA Interactions
```javascript
// Primary CTA clicks
gtag('event', 'cta_click', {
  event_category: 'engagement',
  event_label: 'try_promptly_free',  // CTA identifier
  value: 1
});

// Pricing page CTAs
gtag('event', 'pricing_click', {
  event_category: 'conversion',
  event_label: 'pro_teacher_plan',
  value: 99  // Price value
});
```

### Tool Usage
```javascript
// Snippet tool usage
gtag('event', 'tool_use', {
  event_category: 'engagement',
  event_label: 'snippet_generator',
  value: 1
});

// ROI calculator usage  
gtag('event', 'tool_use', {
  event_category: 'engagement',
  event_label: 'roi_calculator',
  value: 1
});
```

### Content Engagement
```javascript
// Blog post reads
gtag('event', 'content_engagement', {
  event_category: 'content',
  event_label: 'blog_post_read',
  custom_parameters: {
    post_title: 'Post Title',
    read_duration: 120  // seconds
  }
});

// Resource downloads
gtag('event', 'content_download', {
  event_category: 'content',
  event_label: 'free_resource_download',
  value: 1
});
```

### Navigation Events
```javascript
// External link clicks
gtag('event', 'external_click', {
  event_category: 'engagement',
  event_label: 'stripe_checkout',
  value: 1
});

// Page scroll depth
gtag('event', 'scroll_depth', {
  event_category: 'engagement',
  event_label: '75_percent',
  value: 75
});
```

## Implementation

### Data Attributes
Add data attributes to track elements:
```html
<!-- Primary CTAs -->
<button data-analytics="cta-primary" data-label="try_promptly_free">
  Try Promptly Free
</button>

<!-- Email forms -->
<form data-analytics="email-capture" data-source="homepage_hero">
  <!-- form content -->
</form>

<!-- Tool interactions -->
<div data-analytics="tool-usage" data-tool="snippet_generator">
  <!-- tool content -->
</div>
```

### Event Handler Template
```javascript
// Generic click handler
function handleAnalyticsClick(element) {
  const eventType = element.dataset.analytics;
  const label = element.dataset.label;
  const value = element.dataset.value || 1;
  
  if (window.gtag) {
    window.gtag('event', eventType, {
      event_category: 'engagement',
      event_label: label,
      value: parseInt(value)
    });
  }
}

// Attach to all tracked elements
document.querySelectorAll('[data-analytics]').forEach(element => {
  element.addEventListener('click', () => handleAnalyticsClick(element));
});
```

## Key Performance Indicators (KPIs)

### Conversion Funnel
1. **Visitor → Email Subscriber**: Track email capture rate
2. **Subscriber → Tool User**: Track tool engagement 
3. **Tool User → Paid User**: Track conversion to paid plans

### Engagement Metrics
- **Time on Page**: Measure content engagement
- **Scroll Depth**: Understand content consumption
- **Tool Usage**: Track feature adoption
- **Return Visits**: Measure user retention

### Teacher-Specific Metrics
- **Subject Area Interest**: Track which subjects generate most engagement
- **Grade Level Segments**: Track primary/secondary teacher preferences  
- **Resource Downloads**: Track most popular resources
- **Communication Type Usage**: Track parent emails vs report cards vs feedback

## Event Priority Levels

### Critical Events (Must Track)
- Email captures (all forms)
- Pricing plan selections
- Checkout initiations
- Account registrations

### Important Events (Should Track)  
- Tool usage (snippet, calculator)
- Content downloads
- External link clicks
- Video plays (if any)

### Nice-to-Have Events (Could Track)
- Hover states on CTAs
- Form field focus/blur
- Search queries
- Error occurrences

## Privacy Considerations

- No PII in event parameters
- Respect DNT headers
- GDPR-compliant data collection
- Clear opt-out mechanisms

## Implementation Checklist

- [ ] Add Google Analytics 4 tracking code
- [ ] Implement data attributes on key elements
- [ ] Set up conversion goals in GA4
- [ ] Create custom events dashboard
- [ ] Test event firing in GA4 debug mode
- [ ] Document event naming conventions
- [ ] Set up automated event monitoring
- [ ] Create monthly analytics review process