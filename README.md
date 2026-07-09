<div align="center">

# 🧠 AuraGen
### Self-Healing Generative UI via Cognitive Load Detection

<p align="center">
An AI-powered platform that dynamically redesigns web interfaces in real-time by detecting user frustration and cognitive load.
</p>

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![WebSocket](https://img.shields.io/badge/WebSocket-RealTime-orange?style=for-the-badge)
![LangChain](https://img.shields.io/badge/LangChain-AI-green?style=for-the-badge)
![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-black?style=for-the-badge)

</div>

---

# 🚀 Overview

Traditional user interfaces remain static regardless of how confused or frustrated users become.

**AuraGen** introduces the concept of **Self-Healing User Interfaces**, where Artificial Intelligence continuously observes user interactions and automatically transforms complex interfaces into simpler, adaptive experiences.

Instead of forcing users to adapt to the interface, **AuraGen allows the interface to adapt to the user.**

---

# 🎯 Problem Statement

Modern dashboards and enterprise applications often overwhelm users with:

- Complex forms
- Information overload
- Poor navigation
- Cognitive fatigue
- High abandonment rates

Current AI assistants are disconnected from the interface and require users to stop working before receiving help.

AuraGen solves this problem by embedding AI directly into the UI itself.

---

# 💡 Solution

AuraGen detects user frustration through behavioral analysis including:

- Cursor movement
- Hesitation time
- Rage clicks
- Navigation errors
- Idle duration

When cognitive load becomes high, the platform automatically:

✅ Analyzes user behavior

✅ Generates a simplified React interface

✅ Validates generated code securely

✅ Injects the new interface without refreshing the page

The UI literally redesigns itself in real-time.

---

# ✨ Features

## 🧠 Cognitive Load Detection

Tracks:

- Mouse velocity
- Cursor hesitation
- Click errors
- Rage clicks
- Idle time

Generates a real-time **Friction Score**.

---

## 🤖 AI UI Generation

Uses LangChain + GPT-4o to generate:

- React Components
- Responsive Layouts
- Better UX
- Step-by-step Wizards
- Adaptive Forms

---

## ⚡ Dynamic Rendering

Generated components are injected instantly using:

- React Suspense
- Dynamic Imports
- WebSockets

No page refresh required.

---

## 🔒 Secure AST Validation

Before rendering:

- Parse generated code
- Validate syntax
- Block unsafe JavaScript
- Prevent malicious code execution

---

## 📊 Analytics Dashboard

Monitor:

- User Sessions
- Friction Heatmaps
- Rage Clicks
- Success Rate
- Interface Transformations

---

# 🏗 System Architecture

```
                 User
                   │
                   ▼
        React Frontend (UI)
                   │
             Mouse Tracker
                   │
        Cognitive Load Engine
                   │
            WebSocket Server
                   │
         Node.js + Express API
                   │
            LangChain Agent
                   │
                GPT-4o
                   │
      React Component Generator
                   │
            AST Validation
                   │
      Dynamic Component Renderer
                   │
          Updated User Interface
```

---

# ⚙ Tech Stack

## Frontend

- React.js
- CSS3
- JavaScript
- React Router
- WebSocket API

---

## Backend

- Node.js
- Express.js

---

## AI

- OpenAI GPT-4o
- LangChain

---

## Database

- MongoDB

---

## Build Tools

- Babel
- Webpack / Vite

---

# 📁 Project Structure

```
AuraGen/

│
├── frontend/
│   ├── public/
│   ├── src/
│   │
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── layouts/
│   ├── services/
│   ├── hooks/
│   ├── styles/
│   └── App.jsx
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── websocket/
│   ├── services/
│   │     ├── LangChain/
│   │     ├── AI/
│   │     └── AST/
│   ├── models/
│   └── server.js
│
└── README.md
```

---

# 🔄 Workflow

```
User Opens Website
        │
        ▼
Tracks User Behaviour
        │
        ▼
Calculate Friction Score
        │
        ▼
High Cognitive Load?
        │
   ┌────┴─────┐
   │          │
  No         Yes
   │          │
 Continue     ▼
         Send to AI
              │
              ▼
 Generate React UI
              │
              ▼
 Validate AST
              │
              ▼
 Inject Component
              │
              ▼
 Updated Interface
```

---

# 📊 Example Use Case

A user is filling out a complicated financial application.

The system detects:

- Multiple wrong clicks
- Long hesitation
- Frequent cursor movement

AuraGen automatically converts the traditional form into a conversational wizard:

```
Old UI

Name
Email
Income
Tax
PAN
Address

↓

New UI

👋 Hi!

Let's complete your application.

Question 1

What is your Full Name?

Next →
```

---

# 🌟 Future Enhancements

- Voice-guided adaptive interfaces
- Personalized UI themes
- Emotion-aware interfaces
- Multi-language support
- AI Accessibility Assistant
- Predictive UX Optimization

---

# 📸 Screenshots

### Home

(Add Screenshot)

---

### Dashboard

(Add Screenshot)

---



### Architecture

(Add Screenshot)

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/AuraGen.git
```

## Install Frontend

```bash
cd frontend
npm install
npm run dev
```

## Install Backend

```bash
cd backend
npm install
npm start
```

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository

2. Create a new feature branch

3. Commit your changes

4. Push to GitHub

5. Open a Pull Request

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

## Aurosmita Sahoo

Full Stack Developer | AI Enthusiast | Open Source Contributor

GitHub: https://github.com/Auro993

LinkedIn: https://linkedin.com/

Email: your-email@example.com

---

<div align="center">

⭐ If you found this project useful, please give it a star!

Made with ❤️ using React, Node.js, LangChain and OpenAI

</div>
