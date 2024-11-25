# ReviewFlow API Documentation

## Authentication

All API requests require authentication using your API key. Include it in the request headers:

```bash
Authorization: Bearer your_api_key_here
Content-Type: application/json
```

Example request:

```bash
curl -H "Authorization: Bearer your_api_key_here" \
     -H "Content-Type: application/json" \
     https://api.reviewflow.com/reviews
```

## Rate Limits

| Tier  | Daily Limit          |
| ----- | -------------------- |
| Free  | 1,000 requests/day   |
| Pro   | 10,000 requests/day  |
| Scale | 150,000 requests/day |

Rate limit headers are included in all API responses:

- `X-RateLimit-Limit`: Total requests allowed per day
- `X-RateLimit-Remaining`: Remaining requests for the day
- `X-RateLimit-Reset`: Time when the rate limit resets (Unix timestamp)

## API Endpoints

### Review Management

```bash
# Create a new review
POST /api/reviews
Content-Type: application/json

{
  "widgetId": "widget_uuid",
  "rating": 5,
  "title": "Amazing Service",
  "content": "Great product and excellent support!",
  "authorName": "John Doe",
  "authorEmail": "john@example.com",
  "authorConsent": true,
  "source": "api",
  "metadata": {
    "productId": "123",
    "orderNumber": "ORD-456"
  }
}

# Get all reviews
GET /api/reviews

# Update a review
PUT /api/reviews/:id
Content-Type: application/json

{
  "status": "approved",
  "metadata": {
    "moderatorNote": "Verified purchase"
  }
}
```

### Widget Management

```bash
# Get widget details
GET /api/widgets/:id

# Create a new widget
POST /api/widgets/create
Content-Type: application/json

{
  "name": "Product Reviews Widget",
  "type": "review-form",
  "config": {
    "displayRating": true,
    "requireEmail": false,
    "autoApprove": false
  },
  "styles": {
    "theme": "light",
    "position": "bottom-right",
    "primaryColor": "#2563eb"
  },
  "domains": ["example.com", "store.example.com"]
}
```

### Analytics

```bash
# Get overview statistics
GET /api/analytics/overview
Response:
{
  "totalReviews": 1250,
  "averageRating": 4.5,
  "reviewsBySource": {
    "api": 450,
    "widget": 650,
    "direct": 150
  },
  "apiUsage": {
    "current": 8500,
    "limit": 10000
  }
}

# Get trend data
GET /api/analytics/trends
Response:
{
  "daily": [
    {
      "date": "2024-03-15",
      "reviews": 45,
      "apiCalls": 1200
    }
  ]
}
```

### Webhook Events

```bash
# Configure webhook
POST /api/webhooks/configure
Content-Type: application/json

{
  "url": "https://your-domain.com/webhook",
  "events": [
    "review.created",
    "review.updated",
    "review.deleted"
  ]
}

# Get webhook delivery logs
GET /api/webhooks/logs
```

## Response Formats

All successful responses follow this format:

```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "createdAt": "2024-03-15T10:30:00Z",
    "updatedAt": "2024-03-15T10:30:00Z"
  }
}
```

Error responses:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message"
  }
}
```

## Security Best Practices

1. Never expose your API key in client-side code
2. Rotate API keys periodically
3. Use webhook signatures to verify webhook authenticity
4. Implement retry logic with exponential backoff
5. Store API keys in secure environment variables
6. Set appropriate allowed domains for widgets
7. Enable review moderation when needed

## Webhook Events

Available webhook events:

- `review.created`: Triggered when a new review is created
- `review.updated`: Triggered when a review status changes
- `review.deleted`: Triggered when a review is deleted
- `widget.created`: Triggered when a new widget is created
- `widget.updated`: Triggered when widget settings are updated

## Error Codes

Common error codes:

- `AUTH_ERROR`: Invalid or missing API key
- `RATE_LIMIT_EXCEEDED`: Rate limit reached
- `INVALID_REQUEST`: Malformed request data
- `RESOURCE_NOT_FOUND`: Requested resource doesn't exist
- `INTERNAL_ERROR`: Server-side error
- `INVALID_WIDGET_CONFIG`: Widget configuration is invalid
- `DOMAIN_NOT_ALLOWED`: Request from unauthorized domain

## Testing

Use test API keys (prefixed with `test_`) for development and testing. These keys:

- Don't affect production data
- Have higher rate limits
- Reset test data every 24 hours

## Support

For API support:

- Email: api-support@reviewflow.com
- Documentation: docs.reviewflow.com
- Status page: status.reviewflow.com
