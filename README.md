# 🌌 Siaga Capsule — Digital Reflections for HBK20

**Siaga Capsule** is a digital time capsule initiative created for *Hari Belia Kebangsaan 2025 (HBK20)* to collect and preserve the hopes, values, and dreams of Bruneian youths — to be delivered back to them in the year 2035.

This platform consists of two main applications: a public-facing submission portal and an administrative dashboard for managing and analyzing submissions.

---

## 🚀 Features

### Public Frontend
- 🎯 Multi-step form for personal reflections
- 📆 Submissions saved to **Firebase Firestore**
- 🔐 Optional privacy toggle
- 📩 Email capture for future delivery (by Jan 1, 2035)
- 🗒️ Auto-generated digital certificate
- 📧 Automated confirmation emails via Firebase Functions
- 🌐 Deployed to [Netlify](https://siaga-capsule.netlify.app)

### Admin Dashboard
- 📊 Real-time analytics and submission insights
- 👥 User management with submission overview
- ⭐ Featured submissions management (administrators can flag submissions as featured)
- 📈 Interactive charts for demographics and responses
- 🎨 Modern dashboard interface with dark/light mode
- 🚀 Deployed on Vercel

---

## 🖼 Live Applications

👉 **Public Site**: [https://siaga-capsule.netlify.app](https://siaga-capsule.netlify.app)  
👉 **Admin Dashboard**: Deployed on Vercel (admin access required)

---

## 🧱 Tech Stack

| Component           | Technology                           |
|---------------------|-------------------------------------|
| Public Frontend     | Vite + React + TypeScript            |
| Admin Dashboard     | Next.js 15 + React + TypeScript     |
| UI Framework        | TailwindCSS + shadcn/ui              |
| Icons               | Lucide React + Tabler Icons         |
| Backend             | Firebase Firestore (NoSQL)          |
| Cloud Functions     | Firebase Functions (Node.js 18)     |
| Email Service       | Nodemailer + Gmail SMTP              |
| Public Hosting      | Netlify                              |
| Dashboard Hosting   | Vercel                               |

---

## 📁 Project Structure

```
siaga-capsule/
├── frontend/                    # Public-facing Vite + React application
│   ├── src/components/          # FormFlow and UI components
│   ├── src/lib/firebase.ts      # Firebase client configuration
│   └── package.json
├── dashboard-frontend/          # Admin dashboard (Next.js)
│   ├── app/(secure)/           # Protected dashboard pages
│   │   ├── dashboard/          # Analytics and insights
│   │   └── users/              # User submissions management
│   ├── lib/firebase-admin.ts   # Firebase Admin SDK
│   ├── components/ui/          # Dashboard UI components
│   └── package.json
├── functions/                   # Firebase Cloud Functions
│   ├── index.js                # Email notification triggers
│   └── package.json
├── firebase.json               # Firebase project configuration
├── firestore.rules            # Database security rules
└── README.md                   # This file
```

---

## ⚙️ Local Development

> Prerequisites: Node.js v18+, Firebase CLI installed

### Public Frontend
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/siaga-capsule
cd siaga-capsule/frontend

# Install dependencies
npm install

# Run locally
npm run dev
```

### Admin Dashboard
```bash
# Navigate to dashboard
cd siaga-capsule/dashboard-frontend

# Install dependencies
npm install

# Run locally (requires Google Cloud Service Account credentials)
npm run dev
```

### Firebase Functions
```bash
# Navigate to functions
cd siaga-capsule/functions

# Install dependencies
npm install

# Run locally with emulator
firebase emulators:start --only functions
```

---

## 🔐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a Web App and copy your Firebase config
3. Set up environment variables for the public frontend (refer to `.env` files for required variables)
4. For the admin dashboard, configure a Google Cloud Service Account:
   - Generate a service account key from Google Cloud Console
   - Add the credentials to your deployment environment (required for Firebase Admin SDK)
5. Configure Firebase Functions email secrets:
   ```bash
   firebase functions:secrets:set EMAIL_EMAIL=your-email@gmail.com
   firebase functions:secrets:set EMAIL_PASSWORD=your-app-password
   ```

### Firebase Functions Purpose
The Firebase Functions automatically send confirmation emails to users when they submit their reflections. The function:
- Triggers on new document creation in the `submissions` collection
- Sends a personalized email confirmation using Nodemailer and Gmail SMTP
- Includes submission details and next steps for the user
- Handles error logging and email delivery validation

> Data is saved to the `submissions` collection in Firestore with real-time updates to the admin dashboard.

---

## 📄 Deployment

### Public Frontend (Netlify)
1. Push your code to GitHub
2. Go to [Netlify](https://netlify.app)
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set publish directory: `frontend/dist`
6. Deploy!

### Admin Dashboard (Vercel)
1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Connect your GitHub repo and select `dashboard-frontend` folder
4. Add Google Cloud Service Account credentials as [environment variables](/dashboard-frontend/.env.example)
5. Add Firebase Config as [environment variables](/dashboard-frontend/.env.example)
6. Deploy automatically with every push to main branch

### Firebase Functions
```bash
# Deploy functions to Firebase
firebase deploy --only functions
```

---

## 📊 Submission Data Schema

Each document includes:

| Field             | Description                                       |
|------------------|---------------------------------------------------|
| `question1`       | User's dream or reflection                        |
| `obstacles`       | Selected barriers                                 |
| `otherObstacle`   | Optional custom obstacle                          |
| `values`          | Selected personal values                          |
| `otherValue`      | Optional custom value                             |
| `email`           | Email to receive the time capsule in 2035        |
| `age`             | Age of user                                       |
| `district`        | One of Brunei's four districts                    |
| `occupationStatus` | Status (Student, Working, etc)                  |
| `sectorInterest`  | Interest area (STEM, Creative Arts, etc)         |
| `isPrivate`       | Whether the message should remain confidential   |
| `isFeatured`      | **NEW**: Administrator flag for featured submissions |
| `featuredUpdatedAt` | **NEW**: Timestamp when featured status was last updated |
| `timestamp`       | Auto-generated via Firestore                     |

---

## 🧑‍💻 For Developers

### Architecture
- **Dual-frontend architecture**: Separate public and admin applications for better security and scalability
- **Fully typed TypeScript**: Both frontends use comprehensive TypeScript interfaces
- **Component-driven**: Modular UI using shadcn/ui and TailwindCSS across both applications
- **Real-time updates**: Admin dashboard receives live updates from Firestore
- **Serverless backend**: Firebase Functions handle email automation and business logic

### Key Components
- **Public**: `FormFlow` component handles multi-step submission logic
- **Admin**: `SubmissionsDataTable` with featured submissions management
- **Shared**: Firebase configuration and TypeScript interfaces
- **Functions**: Automated email triggers with error handling and logging

### Development Notes
- Admin dashboard includes authentication and role-based access
- Featured submissions system allows content curation for events
- Real-time analytics with interactive charts and demographic insights
- Responsive design optimized for both desktop and mobile

---

## 📬 Contact

📬 Project inquiries: siagacapsule@gmail.com  
🌐 Website: [https://siaga-capsule.netlify.app](https://siaga-capsule.netlify.app)
