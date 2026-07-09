# ✨ AuraGen

### **Self-Healing Generative UI Powered by AI**

> **AuraGen** is an AI-powered web application that detects user frustration through behavioral analysis and automatically transforms complex interfaces into simpler, more intuitive experiences in real time.

<p align="center">

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge\&logo=nextdotjs)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge\&logo=express)](https://expressjs.com/)
[![LangChain](https://img.shields.io/badge/LangChain-AI-green?style=for-the-badge)](https://www.langchain.com/)
[![Ollama](https://img.shields.io/badge/Ollama-Local_LLM-black?style=for-the-badge)](https://ollama.com/)
[![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)](LICENSE)

</p>

---

# 📖 Overview

Traditional user interfaces are static. When users become confused or frustrated, they often abandon tasks or rely on external help such as documentation or chatbots.

**AuraGen** introduces the concept of a **Self-Healing User Interface**.

Instead of expecting users to adapt to the application, AuraGen adapts the application to the user.

By monitoring behavioral signals such as mouse hesitation, rapid cursor movement, and rage clicks, AuraGen estimates cognitive load in real time. When frustration crosses a configurable threshold, an AI agent generates a simplified interface and seamlessly replaces the existing UI—without requiring a page refresh.

---

# 🎯 Problem Statement

Most applications assume that every user can understand the interface equally well.

When users struggle, they typically:

* Read lengthy documentation
* Watch tutorials
* Ask AI chatbots for help
* Abandon the task altogether

These interruptions increase cognitive load and reduce productivity.

AuraGen solves this challenge by bringing Generative AI directly into the interface itself, enabling the UI to evolve dynamically based on user behavior.

---

# 🚀 Key Features

## 🖱️ Real-Time Friction Tracking

* Mouse velocity monitoring
* Cursor hesitation detection
* Rage click detection
* Idle time analysis
* User interaction heatmaps

---

## 🧠 Cognitive Load Analysis

* Calculates frustration score
* Detects interaction patterns
* Determines when users need assistance
* Real-time behavioral analysis

---

## 🤖 AI-Powered UI Generation

* Generates simplified React components
* Uses LangChain orchestration
* Local LLM support through Ollama
* Context-aware component generation

---

## ⚡ Dynamic UI Morphing

* No page reload required
* Instant component replacement
* Smooth transition animations
* Preserves user workflow

---

## 🔒 Secure Code Injection

* AST validation
* Safe JSX parsing
* Component sandboxing
* Malicious code prevention

---

# 🏗️ System Architecture

```text
                    User Interaction
                           │
                           ▼
               Mouse & Click Tracking Hook
                           │
                           ▼
             Cognitive Load / Friction Analyzer
                           │
                           ▼
            Threshold Reached? (Frustration > 70%)
                           │
                   Yes ───────────────► No
                           │
                           ▼
               LangChain Code Generation Agent
                           │
                           ▼
                 Ollama Local Language Model
                           │
                           ▼
               AST Validation & Sanitization
                           │
                           ▼
               Dynamic React Component Renderer
                           │
                           ▼
               Smooth UI Morphing (Framer Motion)
```

---

# ⚙️ Tech Stack

## Frontend

* Next.js 14
* React
* TypeScript
* Tailwind CSS
* Framer Motion

---

## Backend

* Node.js
* Express.js
* TypeScript
* WebSockets
* LangChain

---

## AI & Code Generation

* Ollama
* Llama 3.2
* LangChain Agents
* Prompt Engineering

---

## Security

* Babel AST
* Static Code Validation
* Safe JSX Injection

---

## Development Tools

* Git
* GitHub
* VS Code
* npm

---

# 📂 Project Structure

```text
AuraGen/
│
├── backend/
│   ├── src/
│   │   ├── agents/
│   │   ├── websocket/
│   │   ├── compiler/
│   │   ├── services/
│   │   └── index.ts
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── styles/
│   │   └── types/
│   │
│   ├── package.json
│   └── tailwind.config.js
│
├── README.md
├── LICENSE
└── .gitignore
```

---

# 🚀 Getting Started

## Prerequisites

Before running the project, ensure you have installed:

* Node.js 18+
* npm
* Git
* Ollama

---

# ⚙️ Backend Setup

Clone the repository

```bash
git clone https://github.com/Auro993/AuraGen.git

cd AuraGen/backend
```

Install dependencies

```bash
npm install
```

Run the backend server

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:3001
```

---

# 💻 Frontend Setup

Navigate to the frontend

```bash
cd ../frontend
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:3000
```

---

# 🤖 Install Ollama

Download Ollama

https://ollama.com

Pull the required model

```bash
ollama pull llama3.2
```

Start Ollama

```bash
ollama serve
```

---

# 🌐 Application Services

| Service     | URL                   |
| ----------- | --------------------- |
| Frontend    | http://localhost:3000 |
| Backend API | http://localhost:3001 |
| WebSocket   | ws://localhost:3002   |

---

# 🎮 How It Works

1. Launch the application.
2. Interact with the complex dashboard.
3. Move the mouse rapidly or perform repeated clicks.
4. AuraGen continuously computes a Cognitive Load Score.
5. Once the frustration threshold is exceeded:

   * Behavioral data is sent to the AI engine.
   * LangChain generates a simplified React component.
   * The component is validated through AST parsing.
   * The interface seamlessly morphs into a more user-friendly version.

---

# 📅 Development Roadmap

| Week   | Backend                       | Frontend                          |
| ------ | ----------------------------- | --------------------------------- |
| Week 1 | Friction Analyzer & WebSocket | Tracking Hooks & Dynamic Renderer |
| Week 2 | AI Code Generation            | UI Injection & Animations         |
| Week 3 | Context Awareness             | State Preservation                |
| Week 4 | Performance Optimization      | Graceful Fallback & Polish        |

---

# 🧪 Testing

## Backend Health Check

```bash
curl http://localhost:3001/health
```

---

## WebSocket Test

```javascript
const ws = new WebSocket("ws://localhost:3002");

ws.onopen = () => {
  console.log("Connected!");
};
```

---

## Frustration Detection Test

* Move the mouse rapidly
* Click repeatedly
* Hover over elements
* Watch the Cognitive Load Score increase
* Observe automatic UI transformation

---

# 🔮 Future Enhancements

* Multi-agent orchestration
* Personalized UI adaptation
* Voice interaction analysis
* Eye-tracking support
* Emotion detection
* Accessibility optimization
* User preference learning
* Cloud LLM integration
* Performance caching
* End-to-end automated testing

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository.

2. Create a new feature branch.

```bash
git checkout -b feature/AmazingFeature
```

3. Commit your changes.

```bash
git commit -m "Add AmazingFeature"
```

4. Push your branch.

```bash
git push origin feature/AmazingFeature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

See the **LICENSE** file for complete details.

---

# 🙏 Acknowledgments

Special thanks to the open-source community and the amazing technologies that power AuraGen:

* Next.js
* React
* TypeScript
* LangChain
* Ollama
* Framer Motion
* Tailwind CSS
* Babel

---

# 👩‍💻 Author

**Aurosmita Sahoo**

📧 Email: **[aurosmitasahoo4@gmail.com](mailto:aurosmitasahoo4@gmail.com)**

🐙 GitHub: **https://github.com/Auro993**

💼 LinkedIn: **https://linkedin.com/in/aurosmita-sahoo**

---

<div align="center">

## ⭐ Show Your Support

If you found this project useful or interesting, consider giving it a **Star** on GitHub.

It motivates future improvements and supports open-source development.

### Built with ❤️ using Next.js, TypeScript, LangChain & AI

</div>
