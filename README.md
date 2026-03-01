# Save Your Tabs

Full-stack browser extension architecture that connects a public web app with a Chrome Extension using a secure backend API.

Live demo: https://syt.denil.com  
Author: Denil

---

## 🚀 Overview

Save Your Tabs is a production-ready architecture composed of:

- 🌐 Web application (frontend)
- 🧩 Chrome Extension (Manifest V3)
- 🔌 Backend API (Node.js + Express)

The project demonstrates real-world communication between:

Web → Content Script → Background Service Worker → API → Browser Tabs

This is not just a browser extension — it’s a full system deployed in production.

---

## 🧠 Architecture

### High-Level Flow

1. User clicks **"Open with Extension"** on the website.
2. The website sends a `window.postMessage`.
3. The extension's content script intercepts the message.
4. The background service worker sends a secure request to the API.
5. The API returns validated URLs.
6. The extension opens the tabs using `chrome.tabs.create()`.

---

### System Diagram
