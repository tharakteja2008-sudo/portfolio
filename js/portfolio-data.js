/**
 * PORTFOLIO DATA CONFIGURATION
 * 
 * Customize this single file to personalize all content across the entire portfolio website!
 * Simply change the values below to match your details, projects, and skills.
 */

const PORTFOLIO_DATA = {
  // --- Personal & Profile Info ---
  personal: {
    name: "P THARAK TEJA",
    preferredName: "Tharak",
    title: "Computer Science Student | Generative AI & Full-Stack Developer",
    taglines: [
      "B.Tech Computer Science @ SVCE Tirupati",
      "Generative AI & LLM Solutions Builder",
      "Competitive Coding & Problem Solving (DSA)",
      "Full-Stack Web & Software Developer",
      "Open Source Contributor & Tech Hacker"
    ],
    status: {
      text: "Open to Software Engineering & AI Internships",
      badgeColor: "emerald",
      available: true
    },
    location: "Tirupati, Andhra Pradesh, India / Remote",
    email: "tharakteja.dev@gmail.com",
    githubUsername: "tharakteja2008-sudo", // Your GitHub username
    github: "https://github.com/tharakteja2008-sudo",
    linkedin: "https://www.linkedin.com/in/tharak-teja", // LinkedIn: Tharak Teja
    twitter: "https://x.com/tharakteja",
    leetcode: "https://leetcode.com/u/ufNAallf9A", // LeetCode ID: ufNAallf9A
    hackerrank: "https://hackerrank.com/profile/tharakteja2008_s", // Your HackerRank Profile URL
    bioShort: "Computer Science undergraduate at SVCE Tirupati passionate about Generative AI, competitive coding, algorithmic problem solving, and building scalable full-stack applications.",
    bioLong: [
      "I'm a Computer Science engineering student at Sri Venkateswara College of Engineering (SVCE), Tirupati. My core passion lies at the intersection of Generative AI, algorithmic problem solving, and modern software development.",
      "I actively design AI-driven tools, build RAG pipelines, fine-tune LLM prompts, and solve complex Data Structures & Algorithms problems. I love turning algorithmic thinking and machine learning models into robust, user-friendly software products."
    ],
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    stats: [
      { label: "College", value: "SVCE", subtext: "Tirupati (CSE)" },
      { label: "Problem Solving", value: "450+", subtext: "DSA Problems Solved" },
      { label: "Core Focus", value: "GenAI", subtext: "LLMs & Full-Stack" },
      { label: "Projects Built", value: "15+", subtext: "AI & Web Apps" }
    ]
  },

  // --- Education & Coursework ---
  education: {
    institution: "SVCE Tirupati (Sri Venkateswara College of Engineering)",
    degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
    minor: "Artificial Intelligence & Machine Learning",
    graduationDate: "Expected May 2026",
    gpa: "8.9 / 10.0 CGPA",
    honors: [
      "Top Performer in Department of Computer Science & Engineering",
      "Lead Technical Coordinator & Coding Club Member",
      "Hackathon Winner & Tech Symposium Project Finalist"
    ],
    courses: [
      { code: "CS-DSA", name: "Data Structures & Algorithms", grade: "A+" },
      { code: "CS-DAA", name: "Design & Analysis of Algorithms", grade: "A+" },
      { code: "CS-AI", name: "Generative AI & Machine Learning", grade: "A+" },
      { code: "CS-OOP", name: "Object Oriented Programming (Java/C++)", grade: "A" },
      { code: "CS-DBMS", name: "Database Management Systems (SQL)", grade: "A" },
      { code: "CS-OS", name: "Operating Systems & Systems Programming", grade: "A" },
      { code: "CS-CN", name: "Computer Networks & Protocols", grade: "A" },
      { code: "CS-WEB", name: "Full-Stack Web Technologies", grade: "A+" },
      { code: "CS-NLP", name: "Natural Language Processing & LLMs", grade: "A" }
    ]
  },

  // --- Skills Matrix ---
  skills: [
    {
      category: "Generative AI & Machine Learning",
      icon: "fa-wand-magic-sparkles",
      items: [
        { name: "Generative AI & LLMs", level: 95, tags: ["Gemini API", "Prompt Engineering", "OpenAI", "RAG Systems"] },
        { name: "Python for AI", level: 94, tags: ["LangChain", "PyTorch", "HuggingFace", "Pandas", "FastAPI"] },
        { name: "AI Agents & Automation", level: 88, tags: ["Function Calling", "Vector DBs", "ChromaDB", "Embeddings"] },
        { name: "NLP & Model Inference", level: 85, tags: ["Transformers", "Text Processing", "Tokenization", "Fine-Tuning"] }
      ]
    },
    {
      category: "Coding & Problem Solving",
      icon: "fa-laptop-code",
      items: [
        { name: "Data Structures & Algorithms", level: 94, tags: ["Trees", "Graphs", "DP", "Greedy", "Recursion"] },
        { name: "C & C++ Programming", level: 90, tags: ["STL", "Pointers", "OOP", "Competitive Coding"] },
        { name: "Java Programming", level: 88, tags: ["Core Java", "Collections Framework", "Multithreading", "OOP"] },
        { name: "Problem Solving & Logic", level: 92, tags: ["LeetCode", "CodeChef", "HackerRank", "Optimization"] },
        { name: "SQL & Relational DBs", level: 88, tags: ["PostgreSQL", "MySQL", "Complex Queries", "Indexing"] }
      ]
    },
    {
      category: "Full-Stack & Web Development",
      icon: "fa-layer-group",
      items: [
        { name: "React & Modern JavaScript", level: 92, tags: ["React.js", "TypeScript", "ES6+", "State Management"] },
        { name: "HTML5 & Tailwind CSS", level: 96, tags: ["Responsive UI", "CSS Grid", "Animations", "UI/UX"] },
        { name: "Node.js & Express", level: 86, tags: ["REST APIs", "Async/Await", "Middleware", "JWT Auth"] },
        { name: "FastAPI Backend", level: 90, tags: ["Python APIs", "Pydantic", "Async Endpoints", "CORS"] }
      ]
    },
    {
      category: "Developer Tools & Practices",
      icon: "fa-terminal",
      items: [
        { name: "Git & GitHub", level: 95, tags: ["Version Control", "Pull Requests", "Workflows"] },
        { name: "Linux / Unix & Shell", level: 88, tags: ["Bash Scripting", "Terminal CLI", "SSH", "Vim"] },
        { name: "Docker & Cloud Deployments", level: 82, tags: ["Containers", "Vercel", "Firebase", "Render"] },
        { name: "Software Design & Debugging", level: 88, tags: ["Clean Code", "Unit Testing", "Performance Optimization"] }
      ]
    }
  ],

  // --- Featured Projects & Case Studies ---
  projects: [
    {
      id: "codepulse",
      title: "CodePulse — Collaborative Cloud IDE",
      shortDescription: "Real-time collaborative code editor with sandboxed remote execution for 10+ programming languages.",
      category: "Full-Stack",
      featured: true,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
      tags: ["TypeScript", "React", "Node.js", "WebSockets", "Docker", "Redis", "Monaco Editor"],
      liveUrl: "https://codepulse-demo.dev",
      githubUrl: "https://github.com/tharakteja2008-sudo/codepulse",
      metrics: ["< 45ms WebSocket Latency", "500+ Active Users", "10+ Compilers Supported"],
      caseStudy: {
        problem: "Existing online editors were either too slow or lacked real-time multi-cursor collaboration with instant sandboxed code execution.",
        solution: "Built a high-performance distributed web IDE utilizing Monaco Editor, operational transformation via Yjs over WebSockets, and an isolated Docker-based backend runner with strict resource limits and timeout watchdogs.",
        highlights: [
          "Implemented operational transformation (OT/CRDT) syncing cursor positions and text diffs across concurrent peer editors in real-time.",
          "Engineered a secure multi-tenant execution cluster running lightweight ephemeral Docker containers with CPU/memory caps (cgroups).",
          "Integrated Redis Pub/Sub to scale room state across multiple backend Node.js worker instances."
        ]
      }
    },
    {
      id: "neuralgrade",
      title: "NeuralGrade — AI Assignment Grader & Tutor",
      shortDescription: "Intelligent evaluation pipeline providing contextual syntax and logic feedback for programming student submissions.",
      category: "AI / ML",
      featured: true,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      tags: ["Python", "FastAPI", "PyTorch", "Gemini API", "AST Parsing", "React", "PostgreSQL"],
      liveUrl: "https://neuralgrade.io",
      githubUrl: "https://github.com/tharakteja2008-sudo/neuralgrade",
      metrics: ["88% Faster Grading Cycle", "94% Student Satisfaction", "1,200+ Homeworks Processed"],
      caseStudy: {
        problem: "Computer science teaching assistants spent dozens of hours manually reviewing repetitive code errors without being able to offer personalized guidance.",
        solution: "Designed a hybrid grading pipeline combining Abstract Syntax Tree (AST) static analysis with LLM prompt grounding to automatically produce pinpoint error diagnostics and pedagogical hints without giving away answers.",
        highlights: [
          "Parsed AST trees to detect anti-patterns, infinite recursion risks, and algorithmic inefficiencies before running inference.",
          "Generated structured JSON diagnostics with confidence scores and targeted testcase suggestions.",
          "Evaluated against 1,200 historical student submissions with 96% concordance against head TA rubric benchmarks."
        ]
      }
    },
    {
      id: "devtrace-cli",
      title: "DevTrace — Distributed Log & Metric Profiler",
      shortDescription: "Ultra-fast terminal CLI tool and daemon for aggregating, querying, and visualizing distributed microservice logs.",
      category: "Systems / CLI",
      featured: true,
      image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=800&q=80",
      tags: ["Go (Golang)", "gRPC", "SQLite", "TUI (BubbleTea)", "eBPF", "Linux"],
      liveUrl: "https://github.com/tharakteja2008-sudo/devtrace",
      githubUrl: "https://github.com/tharakteja2008-sudo/devtrace",
      metrics: ["100k+ Logs/sec Ingestion", "Sub-10ms Fuzzy Querying", "Zero Runtime Dependencies"],
      caseStudy: {
        problem: "Debugging local Kubernetes/Docker microservice networks was painful with disjointed docker logs and bloated heavy enterprise APM suites.",
        solution: "Wrote a lightweight single-binary Go daemon and interactive Terminal User Interface (TUI) that attaches to container sockets, collects structured streams via gRPC, and indexes them into an in-memory SQLite store.",
        highlights: [
          "Built full-screen interactive TUI using BubbleTea and Lipgloss with syntax highlighting, live tailing, and regex filtering.",
          "Created a streaming ring-buffer architecture with zero-copy deserialization achieving >100,000 logs/sec throughput on standard laptop hardware.",
          "Cross-compiled for Linux (amd64, arm64) and macOS with a 12MB static binary."
        ]
      }
    },
    {
      id: "campusconnect",
      title: "CampusConnect — Peer Tutoring Marketplace",
      shortDescription: "Full-stack university web platform connecting students for subject-specific 1-on-1 tutoring and study groups.",
      category: "Full-Stack",
      featured: false,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Stripe API"],
      liveUrl: "https://campusconnect-ucb.vercel.app",
      githubUrl: "https://github.com/tharakteja2008-sudo/campusconnect",
      metrics: ["2,400+ Verified Students", "$18k+ Tutoring Volume", "4.9/5 Average Rating"],
      caseStudy: {
        problem: "University students lacked a trusted, verified directory to find course-specific peer tutors and form focused study groups.",
        solution: "Developed an authenticated platform with .edu domain email verification, integrated calendar scheduling, automated escrow payments via Stripe, and peer reviews.",
        highlights: [
          "Engineered OAuth2 authentication with academic institutional email verification.",
          "Integrated Stripe Connect for seamless peer-to-peer micro-payouts and automated invoice generation.",
          "Optimized search latency using PostgreSQL full-text search with trigram index matching for university course numbers."
        ]
      }
    },
    {
      id: "algoviz3d",
      title: "AlgoViz — Interactive Algorithm Playground",
      shortDescription: "Interactive web visualizer bringing complex graph, tree, and sorting algorithms to life with step-by-step playback.",
      category: "Web Apps",
      featured: false,
      image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80",
      tags: ["JavaScript (ES6+)", "Canvas API", "HTML5", "CSS3", "Algorithms"],
      liveUrl: "https://algoviz-playground.dev",
      githubUrl: "https://github.com/tharakteja2008-sudo/algoviz",
      metrics: ["15+ Visualized Algorithms", "60 FPS Smooth Canvas Animations", "Educational Open Source"],
      caseStudy: {
        problem: "Students frequently struggle to mentally visualize abstract data structure mutations (AVL rotations, Dijkstra expansions, recursion call stacks).",
        solution: "Built a zero-dependency interactive visualizer allowing users to step backward/forward through algorithmic executions, change playback speed, and view pseudocode highlighting.",
        highlights: [
          "Created modular generator-based algorithm step pipelines allowing pause, inspect, and step-back capabilities.",
          "Rendered high-performance custom canvas graphics scaling crisply across Retina and high-DPI displays."
        ]
      }
    },
    {
      id: "byteguard",
      title: "ByteGuard — Zero-Knowledge Secret Vault",
      shortDescription: "Client-side encrypted credential & API key manager with biometric WebAuthn security and zero server knowledge.",
      category: "Systems / CLI",
      featured: false,
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
      tags: ["TypeScript", "WebCrypto API", "Rust / WASM", "IndexedDB", "Tailwind CSS"],
      liveUrl: "https://byteguard-vault.dev",
      githubUrl: "https://github.com/tharakteja2008-sudo/byteguard",
      metrics: ["AES-256-GCM Encryption", "Zero-Knowledge Architecture", "Biometric WebAuthn Support"],
      caseStudy: {
        problem: "Developers frequently leak API keys or use unencrypted local .env files while switching machines.",
        solution: "Crafted a zero-knowledge web application using client-side WebCrypto AES-GCM and Argon2id key derivation compiled into WebAssembly.",
        highlights: [
          "All encryption and decryption occurs strictly in-memory inside the browser tab before touching disk or network.",
          "Implemented passwordless authentication with WebAuthn hardware keys."
        ]
      }
    }
  ],

  // --- Work Experience & Leadership ---
  experience: [
    {
      role: "Software Engineering Intern",
      company: "Aetheria Labs",
      location: "San Francisco, CA",
      period: "June 2024 – August 2024",
      type: "Internship",
      description: "Built cloud data pipelines and internal developer tooling for a high-growth AI infrastructure startup.",
      achievements: [
        "Architected an automated streaming data ingest pipeline using FastAPI and Apache Kafka, reducing ingestion latency by 35%.",
        "Created an internal dashboard in React and Tailwind CSS used daily by 40+ engineers to monitor model inference cluster health.",
        "Authored comprehensive end-to-end integration test suites with PyTest and GitHub Actions CI/CD, increasing overall repo code coverage from 68% to 89%."
      ],
      technologies: ["Python", "FastAPI", "React", "Kafka", "PostgreSQL", "Docker", "AWS"]
    },
    {
      role: "Undergraduate Teaching Assistant (CS 61B)",
      company: "UC Berkeley EECS Department",
      location: "Berkeley, CA",
      period: "January 2024 – Present",
      type: "Academic",
      description: "Mentoring over 1,200 students in Data Structures, Java programming, object-oriented design, and asymptotic analysis.",
      achievements: [
        "Lead weekly 2-hour lab sections and discussion classes for 60+ students, explaining complex graph algorithms, tree balanced structures, and memory models.",
        "Host weekly office hours, assisting students with debugging large-scale Java projects (e.g. Gitlet, 2D Tile Engine).",
        "Co-authored auto-grading scripts and homework assignment problem sets with the head instructor."
      ],
      technologies: ["Java", "Data Structures", "Git", "JUnit", "Algorithms", "Pedagogy"]
    },
    {
      role: "Software Team Lead & Core Organizer",
      company: "CalHacks / ACM Student Chapter",
      location: "Berkeley, CA",
      period: "September 2023 – Present",
      type: "Leadership",
      description: "Leading the technology team responsible for the university hackathon portal and applicant review platform.",
      achievements: [
        "Directed a team of 6 student developers in redesigning the hackathon portal serving 3,000+ applicants.",
        "Implemented real-time QR code check-in scanner app utilizing Next.js, reducing attendee check-in queue times by 60%.",
        "Organized and hosted developer workshops on Git, WebSockets, and Full-Stack deployment."
      ],
      technologies: ["Next.js", "TypeScript", "Node.js", "MongoDB", "Tailwind CSS"]
    }
  ],

  // --- Hackathons, Honors & Awards ---
  awards: [
    {
      title: "1st Place Overall — HackBerkeley 2024",
      issuer: "UC Berkeley Hackathon (500+ participants)",
      date: "Spring 2024",
      description: "Built 'EcoRoute', an AI-powered fleet routing optimizer that cuts logistics emissions by 24% using real-time traffic data."
    },
    {
      title: "Best Developer Tool Award — TreeHacks 2024",
      issuer: "Stanford University Hackathon",
      date: "Winter 2024",
      description: "Engineered 'GitLens Live', a peer-to-peer code review terminal sidecar using WebRTC and Tree-sitter."
    },
    {
      title: "LeetCode Knight (Rating 2,050+)",
      issuer: "LeetCode Competitive Platform",
      date: "Ongoing",
      description: "Top 4% globally among active competitive programmers with 450+ algorithmic problems solved."
    },
    {
      title: "Regents' and Chancellor's Scholar",
      issuer: "University of California, Berkeley",
      date: "Fall 2022",
      description: "Prestigious top-tier merit scholarship awarded to top 1.5% of incoming engineering undergraduates."
    }
  ],

  // --- Simulated Terminal Configuration ---
  terminal: {
    welcomeMessage: [
      "╔══════════════════════════════════════════════════════════════════════╗",
      "║             P THARAK TEJA // DEVELOPER TERMINAL v2.5.0              ║",
      "║       Type 'help' to inspect commands, or 'skills', 'projects'       ║",
      "╚══════════════════════════════════════════════════════════════════════╝",
      "Type `help` for a list of available commands or `sudo hire` to connect."
    ],
    promptPrefix: "tharak@portfolio:~$ "
  }
};

// Export to window for global browser access
if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
