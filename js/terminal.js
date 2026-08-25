/**
 * INTERACTIVE DEVELOPER TERMINAL CLI
 * 
 * Provides an interactive terminal drawer with simulated shell commands,
 * history traversal, tab auto-completion, and live theme controls.
 */

class InteractiveTerminal {
  constructor() {
    this.overlay = document.getElementById("terminal-overlay");
    this.outputBody = document.getElementById("terminal-body");
    this.input = document.getElementById("terminal-input");
    this.closeBtn = document.getElementById("terminal-close-btn");
    this.openBtns = document.querySelectorAll(".open-terminal-btn");

    this.history = [];
    this.historyIndex = -1;
    this.commandsList = [
      "help", "about", "skills", "projects", "education", "experience",
      "awards", "contact", "resume", "cat resume.txt", "theme", "clear",
      "sudo hire", "matrix", "date", "exit"
    ];

    this.init();
  }

  init() {
    if (!this.overlay || !this.input || !this.outputBody) return;

    // Welcome banner
    this.printWelcome();

    // Event listeners
    this.openBtns.forEach(btn => {
      btn.addEventListener("click", () => this.open());
    });

    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    // Close on overlay background click
    this.overlay.addEventListener("click", (e) => {
      if (e.target === this.overlay) this.close();
    });

    // Keyboard Shortcuts (Ctrl + ` or Ctrl + ~ or Esc)
    window.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "`" || e.key === "~")) {
        e.preventDefault();
        this.toggle();
      } else if (e.key === "Escape" && this.isOpen()) {
        this.close();
      }
    });

    // Input handlers (Enter, Up, Down, Tab)
    this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));
  }

  isOpen() {
    return this.overlay.classList.contains("active");
  }

  open() {
    this.overlay.classList.add("active");
    setTimeout(() => this.input.focus(), 100);
  }

  close() {
    this.overlay.classList.remove("active");
  }

  toggle() {
    if (this.isOpen()) this.close();
    else this.open();
  }

  printWelcome() {
    const data = window.PORTFOLIO_DATA || {};
    const welcome = (data.terminal && data.terminal.welcomeMessage) || [
      "Welcome to Developer CLI. Type 'help' for commands."
    ];
    welcome.forEach(line => this.appendOutput(line, "text-sky-400 font-mono"));
    this.appendOutput(" ", "my-1");
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      const rawCmd = this.input.value.trim();
      this.input.value = "";
      if (rawCmd) {
        this.history.push(rawCmd);
        this.historyIndex = this.history.length;
        this.executeCommand(rawCmd);
      } else {
        this.appendOutput(`${window.PORTFOLIO_DATA?.terminal?.promptPrefix || "alex@portfolio:~$ "}`, "text-emerald-400 font-bold");
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (this.history.length > 0 && this.historyIndex > 0) {
        this.historyIndex--;
        this.input.value = this.history[this.historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++;
        this.input.value = this.history[this.historyIndex];
      } else {
        this.historyIndex = this.history.length;
        this.input.value = "";
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = this.input.value.trim().toLowerCase();
      if (!current) return;
      const match = this.commandsList.find(c => c.startsWith(current));
      if (match) {
        this.input.value = match;
      }
    }
  }

  appendOutput(htmlOrText, className = "text-slate-300") {
    const div = document.createElement("div");
    div.className = `leading-relaxed text-sm ${className}`;
    div.innerHTML = htmlOrText;
    this.outputBody.appendChild(div);
    this.outputBody.scrollTop = this.outputBody.scrollHeight;
  }

  executeCommand(rawCmd) {
    const prefix = window.PORTFOLIO_DATA?.terminal?.promptPrefix || "alex@portfolio:~$ ";
    this.appendOutput(`<span class="text-emerald-400 font-bold">${prefix}</span><span class="text-slate-100">${rawCmd}</span>`);

    const parts = rawCmd.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts.slice(1).join(" ").toLowerCase();
    const data = window.PORTFOLIO_DATA || {};

    switch (cmd) {
      case "help":
        this.appendOutput(`
<div class="text-sky-300 font-bold mb-1">Available Terminal Commands:</div>
<div class="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
  <div><span class="text-yellow-400 font-bold">about</span> - Brief biography & background</div>
  <div><span class="text-yellow-400 font-bold">skills</span> - Technical skills & proficiencies</div>
  <div><span class="text-yellow-400 font-bold">projects</span> - List of featured projects</div>
  <div><span class="text-yellow-400 font-bold">education</span> - University & coursework</div>
  <div><span class="text-yellow-400 font-bold">experience</span> - Work & leadership history</div>
  <div><span class="text-yellow-400 font-bold">awards</span> - Hackathons & honors</div>
  <div><span class="text-yellow-400 font-bold">resume</span> - View resume summary or open modal</div>
  <div><span class="text-yellow-400 font-bold">theme [name]</span> - Set theme: dark | slate | matrix | light</div>
  <div><span class="text-yellow-400 font-bold">contact</span> - Email & social connections</div>
  <div><span class="text-yellow-400 font-bold">sudo hire</span> - Direct recruiter fast-track</div>
  <div><span class="text-yellow-400 font-bold">matrix</span> - Digital rain matrix mode</div>
  <div><span class="text-yellow-400 font-bold">date</span> - Display current timestamp</div>
  <div><span class="text-yellow-400 font-bold">clear</span> - Clear terminal screen</div>
  <div><span class="text-yellow-400 font-bold">exit</span> - Close terminal drawer</div>
</div>
        `);
        break;

      case "about":
      case "bio":
        this.appendOutput(`<span class="text-sky-400 font-bold">${data.personal.name}</span> — ${data.personal.title}`);
        this.appendOutput(`<span class="text-slate-400">📍 ${data.personal.location}</span>`);
        this.appendOutput(`<p class="mt-1">${data.personal.bioShort}</p>`);
        break;

      case "skills":
      case "tech":
        let skillsHtml = `<div class="text-sky-300 font-bold mb-1">Technical Skills Matrix:</div>`;
        data.skills.forEach(cat => {
          const names = cat.items.map(i => `<span class="text-emerald-400">${i.name}</span> (${i.level}%)`).join(", ");
          skillsHtml += `<div class="mb-1"><span class="text-yellow-400 font-semibold">${cat.category}:</span> ${names}</div>`;
        });
        this.appendOutput(skillsHtml);
        break;

      case "projects":
      case "ls":
        let projHtml = `<div class="text-sky-300 font-bold mb-1">Featured Projects:</div>`;
        data.projects.forEach(p => {
          projHtml += `
            <div class="mb-2 pl-2 border-l-2 border-sky-500">
              <div class="font-bold text-slate-100">${p.title} <span class="text-xs text-sky-400">(${p.category})</span></div>
              <div class="text-xs text-slate-400">${p.shortDescription}</div>
              <div class="text-xs text-slate-500 mt-0.5">Tags: ${p.tags.slice(0, 4).join(", ")} | Metrics: ${p.metrics[0]}</div>
            </div>`;
        });
        this.appendOutput(projHtml);
        break;

      case "education":
        const edu = data.education;
        let eduHtml = `
          <div class="text-sky-300 font-bold">${edu.institution}</div>
          <div class="text-slate-200">${edu.degree} (${edu.graduationDate})</div>
          <div class="text-emerald-400 text-xs">GPA: ${edu.gpa} | Honors: ${edu.honors.join(", ")}</div>
          <div class="mt-1 text-xs text-slate-400 font-bold">Key Coursework:</div>
          <div class="text-xs text-slate-300">${edu.courses.map(c => `${c.code}: ${c.name} [${c.grade}]`).join(" • ")}</div>
        `;
        this.appendOutput(eduHtml);
        break;

      case "experience":
        let expHtml = `<div class="text-sky-300 font-bold mb-1">Experience & Leadership:</div>`;
        data.experience.forEach(e => {
          expHtml += `
            <div class="mb-1.5">
              <span class="text-yellow-400 font-semibold">${e.role}</span> @ <span class="text-slate-200">${e.company}</span> <span class="text-slate-500 text-xs">(${e.period})</span>
              <div class="text-xs text-slate-400">${e.description}</div>
            </div>`;
        });
        this.appendOutput(expHtml);
        break;

      case "awards":
      case "achievements":
        let awHtml = `<div class="text-sky-300 font-bold mb-1">Honors & Awards:</div>`;
        data.awards.forEach(a => {
          awHtml += `
            <div class="mb-1">
              🏆 <span class="text-yellow-300 font-semibold">${a.title}</span> <span class="text-slate-500 text-xs">(${a.issuer}, ${a.date})</span>
              <div class="text-xs text-slate-400 pl-4">${a.description}</div>
            </div>`;
        });
        this.appendOutput(awHtml);
        break;

      case "contact":
        this.appendOutput(`
          <div class="text-sky-300 font-bold mb-1">Get In Touch:</div>
          <div class="text-xs space-y-0.5">
            <div>📧 Email: <a href="mailto:${data.personal.email}" class="text-sky-400 underline">${data.personal.email}</a></div>
            <div>🐙 GitHub: <a href="${data.personal.github}" target="_blank" class="text-sky-400 underline">${data.personal.github}</a></div>
            <div>💼 LinkedIn: <a href="${data.personal.linkedin}" target="_blank" class="text-sky-400 underline">${data.personal.linkedin}</a></div>
            <div>💻 LeetCode: <a href="${data.personal.leetcode}" target="_blank" class="text-sky-400 underline">${data.personal.leetcode}</a></div>
            <div>🏆 HackerRank: <a href="${data.personal.hackerrank || '#'}" target="_blank" class="text-emerald-400 underline">${data.personal.hackerrank || 'https://hackerrank.com'}</a></div>
          </div>
        `);
        break;

      case "resume":
      case "cat":
        if (cmd === "cat" && arg !== "resume.txt" && arg !== "resume") {
          this.appendOutput(`cat: ${arg}: No such file or directory. Try 'cat resume.txt'`, "text-red-400");
          break;
        }
        this.appendOutput(`Opening interactive resume preview modal...`, "text-emerald-400");
        if (window.openResumeModal) {
          window.openResumeModal();
        }
        break;

      case "theme":
        const validThemes = ["dark", "slate", "matrix", "light"];
        if (validThemes.includes(arg)) {
          if (window.setPortfolioTheme) {
            window.setPortfolioTheme(arg);
            this.appendOutput(`Theme updated to '${arg}' mode successfully.`, "text-emerald-400");
          }
        } else {
          this.appendOutput(`Usage: theme [dark | slate | matrix | light] (current: ${document.documentElement.getAttribute("data-theme") || "dark"})`, "text-yellow-400");
        }
        break;

      case "sudo":
        if (arg === "hire" || arg === "hire-me") {
          this.appendOutput(`[ACCESS GRANTED] Initiating recruiter priority handshake protocol...`, "text-emerald-400 font-bold");
          this.appendOutput(`${data.personal.preferredName || data.personal.name} is open for Summer 2025/2026 SWE internships. Emailing <a href="mailto:${data.personal.email}?subject=Exciting%20SWE%20Opportunity" class="text-yellow-300 underline font-bold">${data.personal.email}</a>`, "text-sky-300");
        } else {
          this.appendOutput(`sudo: permission denied for command: ${arg}`, "text-red-400");
        }
        break;

      case "matrix":
        if (window.setPortfolioTheme) {
          window.setPortfolioTheme("matrix");
        }
        this.appendOutput(`Wake up, Neo... The Matrix has you. Matrix theme activated.`, "text-emerald-400 font-mono");
        break;

      case "date":
        this.appendOutput(new Date().toString(), "text-slate-300");
        break;

      case "clear":
        this.outputBody.innerHTML = "";
        break;

      case "exit":
      case "quit":
        this.close();
        break;

      default:
        this.appendOutput(`command not found: ${cmd}. Type <span class="text-yellow-400 font-bold">help</span> to view available commands.`, "text-red-400");
        break;
    }
  }
}

// Initialize Terminal on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  window.interactiveTerminal = new InteractiveTerminal();
});
