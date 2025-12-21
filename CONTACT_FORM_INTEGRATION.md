# Contact Form Integration - Complete Setup Guide

## Overview
The Contact Us form is now fully integrated across the website frontend, Laravel backend, and admin dashboard.

## Architecture

### 1. Frontend Website (Next.js)
**Location:** `app/[locale]/contact/contact-page-content.tsx`

**Features:**
- Bilingual form (English/Arabic)
- Real-time validation
- Success/error feedback
- Fields: name, email, phone, subject, message
- Uses custom `useContact` hook for API integration

**API Integration:**
- Endpoint: `POST /api/v1/contact`
- API Base URL: Configured in `lib/api.ts` (defaults to `http://localhost:8000/api`)
- Environment variable: `NEXT_PUBLIC_API_URL`

### 2. Backend API (Laravel)
**Location:** `backend-zynk/app/Http/Controllers/Api/V1/ContactController.php`

**Endpoints:**
- `POST /api/v1/contact` - Submit contact form (public)
- `GET /api/v1/admin/contact-messages` - List all messages (admin, paginated)
- `GET /api/v1/admin/contact-messages/{id}` - Get single message (admin)
- `PUT /api/v1/admin/contact-messages/{id}` - Update message status (admin)
- `DELETE /api/v1/admin/contact-messages/{id}` - Delete message (admin)

**Database:**
- Table: `contact_messages`
- Migration: `database/migrations/2024_01_01_000007_create_contact_messages_table.php`
- Model: `app/Models/ContactMessage.php`

**Fields:**
- id, name, email, phone (nullable), subject (nullable), message
- status (enum: new, read, replied, archived)
- admin_notes (nullable), read_at (nullable)
- timestamps, soft deletes

### 3. Admin Dashboard (React/Vite)
**Location:** `zynk-admin/src/pages/dashboard/contact-messages/ContactMessagesPage.tsx`

**Features:**
- Tabbed interface (All, New, Read, Replied, Archived)
- Message count badges per tab
- View message details in modal
- Update message status
- Delete messages with confirmation
- Auto-mark as "read" when viewing
- Search and filter functionality
- Responsive data table

**API Module:**
- Location: `zynk-admin/src/lib/api/contact-messages.ts`
- Functions: `getContactMessages`, `getContactMessage`, `updateContactMessageStatus`, `deleteContactMessage`

**Navigation:**
- Route: `/dashboard/contact-messages`
- Sidebar: "Contact Messages" with MailOpen icon
- Added to `App.tsx` routing

## Configuration

### Website Frontend
**File:** `lib/api.ts`
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
```

**Environment Variable (optional):**
Create `.env.local` in root:
```
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### Admin Dashboard
**File:** `zynk-admin/src/lib/api/config.ts`
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
export const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api'
```

**Environment Variable (optional):**
Create `.env` in `zynk-admin/`:
```
VITE_API_BASE_URL=http://127.0.0.1:8000
VITE_API_URL=http://127.0.0.1:8000/api
```

### Backend
**CORS Configuration:**
Ensure `backend-zynk/config/cors.php` allows requests from frontend domains.

**Database:**
Run migration:
```bash
cd backend-zynk
php artisan migrate
```

## Testing the Integration

### 1. Start Backend Server
```bash
cd backend-zynk
php artisan serve
# Server runs on http://127.0.0.1:8000
```

### 2. Start Website Frontend
```bash
cd zynk-website-dashbboard-backend/all of zynk
npm run dev
# Server runs on http://localhost:5070
```

### 3. Start Admin Dashboard
```bash
cd zynk-admin
npm run dev
# Server runs on http://localhost:5173 (or similar)
```

### 4. Test Flow
1. **Submit Form:**
   - Navigate to website contact page
   - Fill out form and submit
   - Verify success message appears

2. **View in Dashboard:**
   - Login to admin dashboard
   - Navigate to "Contact Messages"
   - Verify new message appears with "New" status
   - Click to view message details
   - Status should auto-update to "Read"

3. **Manage Messages:**
   - Change status (New → Read → Replied → Archived)
   - Delete messages
   - Use search/filter functionality

## API Request/Response Examples

### Submit Contact Form
**Request:**
```bash
POST http://localhost:8000/api/v1/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Project Inquiry",
  "message": "I would like to discuss a new project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a new project...",
    "status": "new",
    "created_at": "2024-01-01T12:00:00.000000Z"
  }
}
```

### Get Contact Messages (Admin)
**Request:**
```bash
GET http://localhost:8000/api/v1/admin/contact-messages?status=new&per_page=15
Authorization: Bearer {token}
```

**Response:**
```json
{
  "data": [...],
  "current_page": 1,
  "last_page": 5,
  "per_page": 15,
  "total": 73
}
```

## Security Features

### Frontend Validation
- Input length limits
- Email format validation
- Required field validation
- XSS prevention via React

### Backend Validation
- Laravel validation rules
- SQL injection prevention (Eloquent ORM)
- Rate limiting (can be added)
- CSRF protection
- Sanctum authentication for admin routes

### Admin Dashboard
- JWT/Sanctum token authentication
- Protected routes
- Role-based access control ready

## Troubleshooting

### Issue: Form submission fails
**Check:**
1. Backend server is running
2. CORS is configured correctly
3. API URL is correct in frontend config
4. Network tab shows the request

### Issue: Messages not appearing in dashboard
**Check:**
1. Admin is authenticated
2. API token is valid
3. Database migration ran successfully
4. Backend route exists and is accessible

### Issue: CORS errors
**Solution:**
Update `backend-zynk/config/cors.php`:
```php
'allowed_origins' => ['http://localhost:5070', 'http://localhost:5173'],
```

## File Structure Summary

```
all of zynk/
├── app/[locale]/contact/
│   └── contact-page-content.tsx          # Contact form UI
├── lib/
│   ├── api.ts                            # API client & types
│   └── hooks/
│       └── use-api.ts                    # useContact hook
├── backend-zynk/
│   ├── app/
│   │   ├── Http/Controllers/Api/V1/
│   │   │   └── ContactController.php    # API endpoints
│   │   └── Models/
│   │       └── ContactMessage.php       # Eloquent model
│   ├── database/migrations/
│   │   └── 2024_01_01_000007_create_contact_messages_table.php
│   └── routes/
│       └── api.php                       # API routes
└── zynk-admin/
    ├── src/
    │   ├── lib/api/
    │   │   ├── config.ts                 # API config
    │   │   └── contact-messages.ts       # API functions
    │   ├── pages/dashboard/
    │   │   └── contact-messages/
    │   │       └── ContactMessagesPage.tsx  # Dashboard UI
    │   ├── components/dashboard/
    │   │   └── sidebar.tsx               # Navigation
    │   └── App.tsx                        # Routes
```

## Status Workflow

```
New → Read → Replied → Archived
 ↓      ↓       ↓         ↓
(Can transition to any status at any time)
```

## Next Steps (Optional Enhancements)

1. **Email Notifications:**
   - Send email to admin when new message arrives
   - Send confirmation email to user

2. **Admin Notes:**
   - Add UI for admin_notes field
   - Track conversation history

3. **Export Functionality:**
   - Export messages to CSV/Excel
   - Generate reports

4. **Analytics:**
   - Track response times
   - Message volume statistics
   - Popular inquiry topics

5. **Spam Protection:**
   - Add reCAPTCHA
   - Rate limiting per IP
   - Honeypot fields

## Conclusion

The Contact Us form is now fully integrated and operational across all three components:
- ✅ Website frontend with bilingual support
- ✅ Laravel backend with RESTful API
- ✅ Admin dashboard with full CRUD operations

All components are connected and ready for production use.
