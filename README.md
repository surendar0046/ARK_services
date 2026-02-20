# ARK TRUE COOL TECH - All-in-One Service Booking

A professionalReact/Express/MongoDB web application for service booking and product sales.

## Features
- **Landing Page**: Modern, responsive UI with service overviews.
- **Booking Flow**: Integrated form to collect customer details and sales items.
- **Admin Dashboard**: Hidden portal to manage bookings, assign technicians, and export data.
- **Product Sales**: Integrated metadata for service-related product sales.
- **Backend**: SECURE Node.js + Express API with JWT authentication.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion, Lucide React
- **Backend**: Node.js, Express, MongoDB, JWT, XLSX
- **Database**: MongoDB Atlas

## Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account

### Installation
1. Clone the repository.
2. Install frontend dependencies: `npm install`
3. Install backend dependencies: `cd server && npm install`

### Environment Variables
Create a `server/.env` file:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### Running Locally
- **Frontend**: `npm run dev` (Runs on http://localhost:5173)
- **Backend**: `cd server && npm run dev` (Runs on http://localhost:5000)

## Deployment (Vercel)

1. **Frontend**:
   - Push to GitHub.
   - Connect GitHub repo to Vercel.
   - Set Build Command: `npm run build`
   - Set Output Directory: `dist`

2. **Backend**:
   - Vercel supports Node.js functions.
   - Deploy the `server/` directory as a standalone Vercel project or using `vercel.json` for monorepo setup.
   - Add `MONGODB_URI` and `JWT_SECRET` in Vercel Environment Variables.

3. **MongoDB**:
   - Whitelist Vercel IP or allow access from anywhere (0.0.0.0/0).

## Admin Access
- **Default Mobile**: 6369914273
- **Default Password**: admin123
- **Login URL**: `/admin/login`
