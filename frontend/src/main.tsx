// frontend/src/main.tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import posthog from "posthog-js";

// ——— Initialize PostHog ———
//  • Replace with your actual Project API Key
//  • If self‑hosting, change api_host accordingly
posthog.init("phc_G5HTBd1pbv5InGevna1aY8KSj1hsXdwUkoBrRWp0k4B", {
  api_host: "https://app.posthog.com",
  autocapture: true,
  capture_pageview: false, // manual tracking in App.tsx
  persistence: "localStorage",
});

createRoot(document.getElementById("root")!).render(
  <App />
);
