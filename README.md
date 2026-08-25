# 🚀 Modern Student Developer Portfolio

An ultra-modern, highly responsive, interactive portfolio website engineered specifically for computer science and software engineering students to showcase their programming skills, projects, coursework, and achievements.

![Portfolio Preview Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Standout Features

- **⚡ Zero Build Step / Pure Performance**: Built with modern semantic HTML5, CSS3 with glassmorphism, Tailwind CSS CDN, and vanilla ES6+ JavaScript. No node modules, no complex build pipelines—just open and run!
- **💻 Interactive Developer CLI / Terminal**:
  - Accessible via the header or shortcut (`Ctrl + ~` / `Ctrl + \``).
  - Supports commands: `help`, `about`, `skills`, `projects`, `education`, `experience`, `awards`, `contact`, `cat resume.txt`, `theme <name>`, `sudo hire`, `matrix`, `clear`.
  - Full history navigation (`Up`/`Down` arrows) and Tab auto-completion.
- **🎨 4-Way Theme Engine**:
  - **Cyber Dark** (Default neon/slate)
  - **Midnight Slate** (Clean deep navy)
  - **Matrix Terminal** (Hacker emerald)
  - **Clean Light** (Modern crisp light mode)
- **🧩 Live Algorithm Visualizer Playground**:
  - Embedded interactive sorting visualizer demonstrating Bubble Sort, Quick Sort, Selection Sort, and Insertion Sort with real-time comparisons/swaps counters, speed controls, step-by-step playback, and Python code explanations.
- **📁 Rich Project Showcase & Case Studies**:
  - Category filters (*Full-Stack*, *AI/ML*, *Systems/CLI*, *Web Apps*).
  - Deep-dive interactive modal breaking down the Problem Statement, Technical Architecture, and Key Milestones for each project.
- **📄 Interactive Resume Modal & 1-Click Print / PDF**:
  - Formatted printable resume with a direct "Print / Save as PDF" button.
- **🎯 100% Config-Driven (`js/portfolio-data.js`)**:
  - All profile information, courses, skills, projects, and work experience live in a single clean configuration file for instant personalization.

---

## 🚀 Quick Start (Local Preview)

### Option 1: Python Built-in Server (Recommended)
Run the following command in your terminal from the project folder:

```bash
python -m http.server 8000
```
Then open your browser and navigate to:
```
http://localhost:8000
```

### Option 2: Direct Browser
Simply double-click `index.html` to open it in Chrome, Edge, Safari, or Firefox!

---

## 🛠️ How to Customize Your Portfolio

You only need to edit **one single file**: `js/portfolio-data.js`.

1. Open [`js/portfolio-data.js`](js/portfolio-data.js).
2. Update the `personal` section with your name, university, email, GitHub, and LinkedIn links:
   ```javascript
   personal: {
     name: "Your Name",
     title: "Computer Science Student & Full-Stack Developer",
     location: "City, State",
     email: "your.email@university.edu",
     github: "https://github.com/your-username",
     linkedin: "https://linkedin.com/in/your-profile",
     // ...
   }
   ```
3. Update `education` with your university name, GPA, graduation date, and completed coursework.
4. Add your own `projects`, `skills`, `experience`, and `awards`.
5. Save the file and refresh your browser!

---

## 🌐 Free 1-Click Deployment

### 1. GitHub Pages (Free)
1. Push this repository to GitHub.
2. Go to **Repository Settings** > **Pages**.
3. Under **Branch**, select `main` (or `master`) and `/root`, then click **Save**.
4. Your website is live at `https://<username>.github.io/<repo-name>/`!

### 2. Vercel / Netlify
- Drag and drop this folder directly onto [Netlify Drop](https://app.netlify.com/drop) or import from GitHub on [Vercel](https://vercel.com).
- No build command or output directory needed.

---

## 📂 Project Structure

```
├── index.html              # Main webpage structure & semantic layout
├── css/
│   └── styles.css          # Custom styling, animations, glassmorphism & themes
├── js/
│   ├── portfolio-data.js   # ⚙️ CENTRAL DATA CONFIG (Edit this to customize!)
│   ├── app.js              # Core UI logic, rendering, theme engine & modals
│   ├── terminal.js         # Interactive developer terminal emulator
│   └── visualizer.js       # Live algorithm sorting playground mini-app
└── README.md               # Documentation & setup guide
```

---

## 📜 License
MIT License — feel free to use and customize this template for your own developer portfolio!
