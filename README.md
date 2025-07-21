# 🌌 Siaga Capsule — Digital Reflections for HBK20

**Siaga Capsule** is a digital time capsule initiative created for *Hari Belia Kebangsaan 2025 (HBK20)* to collect and preserve the hopes, values, and dreams of Bruneian youths — to be delivered back to them in the year 2035.

Built as a proof-of-concept (PoC), this web platform allows users to submit personal reflections that are stored securely in Firebase and showcased during the HBK20 event.

---

## 🚀 Features

- 🎯 Multi-step form for personal reflections
- 📆 Submissions saved to **Firebase Firestore**
- 🔐 Optional privacy toggle
- 📩 Email capture for future delivery (by Jan 1, 2035)
- 🗒️ Auto-generated digital certificate
- 🌐 Deployed to [Netlify](https://siaga-capsule.netlify.app)

---

## 🖼 Live Demo

👉 [https://siaga-capsule.netlify.app](https://siaga-capsule.netlify.app)

---

## 🧱 Tech Stack

| Layer        | Technology                  |
|--------------|------------------------------|
| Frontend     | Vite + React + TypeScript    |
| UI Framework | TailwindCSS + shadcn/ui      |
| Icons        | Lucide                       |
| Backend      | Firebase Firestore (NoSQL)   |
| Hosting      | Netlify                      |

---

## 📁 Project Structure

```
siaga-capsule/
├── frontend/               # Main Vite + React codebase
│   ├── src/components/     # FormFlow and UI components
│   └── index.tsx
├── README.md               # This file
```

---

## ⚙️ Local Development

> Prerequisite: Node.js v18+ and Firebase CLI installed

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/siaga-capsule
cd siaga-capsule/frontend

# Install dependencies
npm install

# Run locally
npm run dev
```

---

## 🔐 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a Web App and copy your Firebase config
3. Replace the values in `firebase.ts` with your project’s config

> Data is saved to the `submissions` collection in Firestore.

---

## 📄 Deployment (Netlify)

1. Push your code to GitHub
2. Go to [Netlify](https://netlify.app)
3. Connect your GitHub repo
4. Set build command: `npm run build`
5. Set publish directory: `frontend/dist`
6. Deploy!

---

## 📊 Submission Data Schema

Each document includes:

| Field             | Description                                       |
|------------------|---------------------------------------------------|
| `question1`       | User’s dream or reflection                        |
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
| `timestamp`       | Auto-generated via Firestore                     |

---

## 🧑‍💻 For Developers

- Code is cleanly modularized and fully typed in TypeScript.
- Component-driven structure using shadcn/ui and TailwindCSS.
- Ready to extend into a full-stack application (e.g., add login, admin panel, analytics dashboard).
- A `FormFlow` component handles multi-step input logic and submission.

---

## 📬 Contact

📬 Project inquiries: siagacapsule@gmail.com  
🌐 Website: [https://siaga-capsule.netlify.app](https://siaga-capsule.netlify.app)
