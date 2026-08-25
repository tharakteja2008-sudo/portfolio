/**
 * MAIN PORTFOLIO APPLICATION LOGIC
 * 
 * Manages rendering from PORTFOLIO_DATA, theme switching, typewriter animations,
 * project filters, case-study modals, resume generation, and interactive widgets.
 */

document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error("PORTFOLIO_DATA not found. Ensure portfolio-data.js is loaded.");
    return;
  }

  // --- 1. Theme Engine ---
  initThemeEngine();

  // --- 2. Render Dynamic Content ---
  renderPersonalHero(data.personal);
  renderStats(data.personal.stats);
  renderAbout(data.personal, data.education);
  renderSkills(data.skills);
  renderProjects(data.projects);
  renderExperience(data.experience);
  renderAwards(data.awards);
  renderGitHubHeatmap();
  renderContact(data.personal);

  // --- 3. Interactive Features ---
  initTypewriter(data.personal.taglines);
  initScrollSpy();
  initProjectFilter(data.projects);
  initSkillSearch(data.skills);
  initHeroCodeRunner();
  initModals(data);
  initContactForm(data.personal);
});

// --- Toast Notification Helper ---
function showToast(message, icon = "fa-circle-check", type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid ${icon} text-sky-400"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// --- Theme Management ---
function initThemeEngine() {
  const savedTheme = localStorage.getItem("portfolio_theme") || "dark";
  setPortfolioTheme(savedTheme);

  const themeSelectors = document.querySelectorAll("[data-theme-choice]");
  themeSelectors.forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.getAttribute("data-theme-choice");
      setPortfolioTheme(theme);
      showToast(`Switched theme to ${theme.toUpperCase()}`, "fa-palette");
    });
  });
}

function setPortfolioTheme(themeName) {
  if (themeName === "dark") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", themeName);
  }
  localStorage.setItem("portfolio_theme", themeName);

  // Update active state in theme dropdown/buttons
  document.querySelectorAll("[data-theme-choice]").forEach(btn => {
    if (btn.getAttribute("data-theme-choice") === themeName) {
      btn.classList.add("ring-2", "ring-sky-400");
    } else {
      btn.classList.remove("ring-2", "ring-sky-400");
    }
  });
}
window.setPortfolioTheme = setPortfolioTheme;

// --- Hero & Personal Info Rendering ---
function renderPersonalHero(personal) {
  // Brand name in header
  const brandName = document.getElementById("brand-name");
  if (brandName) brandName.textContent = personal.name;

  // Hero name & location
  const heroName = document.getElementById("hero-name");
  if (heroName) heroName.textContent = personal.name;

  const heroStatus = document.getElementById("hero-status");
  if (heroStatus && personal.status) {
    heroStatus.innerHTML = `
      <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block mr-2"></span>
      <span class="text-xs font-mono text-emerald-300 font-semibold tracking-wide uppercase">${personal.status.text}</span>
    `;
  }

  const heroBio = document.getElementById("hero-bio");
  if (heroBio) heroBio.textContent = personal.bioShort;

  const heroLocation = document.getElementById("hero-location");
  if (heroLocation) heroLocation.textContent = personal.location;

  // Hero quick social links
  const heroGh = document.getElementById("hero-github-link");
  if (heroGh && personal.github) heroGh.href = personal.github;

  const heroLi = document.getElementById("hero-linkedin-link");
  if (heroLi && personal.linkedin) heroLi.href = personal.linkedin;

  const heroLc = document.getElementById("hero-leetcode-link");
  if (heroLc && personal.leetcode) heroLc.href = personal.leetcode;

  const heroHr = document.getElementById("hero-hackerrank-link");
  if (heroHr && personal.hackerrank) heroHr.href = personal.hackerrank;
}

// --- Dynamic Typewriter Effect ---
function initTypewriter(taglines) {
  const el = document.getElementById("typewriter-text");
  if (!el || !taglines || taglines.length === 0) return;

  let lineIdx = 0;
  let charIdx = 0;
  let isDeleting = false;

  function typeStep() {
    const currentLine = taglines[lineIdx];

    if (isDeleting) {
      el.textContent = currentLine.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = currentLine.substring(0, charIdx + 1);
      charIdx++;
    }

    let typeSpeed = isDeleting ? 30 : 60;

    if (!isDeleting && charIdx === currentLine.length) {
      typeSpeed = 2200; // Pause at end of sentence
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      lineIdx = (lineIdx + 1) % taglines.length;
      typeSpeed = 400; // Pause before typing next
    }

    setTimeout(typeStep, typeSpeed);
  }

  typeStep();
}

// --- Quick Stats Counter ---
function renderStats(stats) {
  const container = document.getElementById("hero-stats-container");
  if (!container || !stats) return;

  container.innerHTML = stats.map(s => `
    <div class="glass-card p-4 rounded-xl text-center flex flex-col justify-center">
      <span class="text-2xl lg:text-3xl font-extrabold text-gradient font-mono">${s.value}</span>
      <span class="text-sm font-semibold text-slate-200 mt-1">${s.label}</span>
      <span class="text-xs text-slate-400 mt-0.5">${s.subtext}</span>
    </div>
  `).join("");
}

// --- Interactive Hero Code Runner ---
function initHeroCodeRunner() {
  const runBtn = document.getElementById("run-hero-code-btn");
  const outputEl = document.getElementById("hero-code-output");
  if (!runBtn || !outputEl) return;

  runBtn.addEventListener("click", () => {
    outputEl.innerHTML = `<span class="text-yellow-400">⚡ Executing student profile benchmark...</span>`;
    runBtn.classList.add("opacity-50", "pointer-events-none");

    setTimeout(() => {
      const p = window.PORTFOLIO_DATA?.personal || {};
      const edu = window.PORTFOLIO_DATA?.education || {};
      outputEl.innerHTML = `
        <div class="text-emerald-400 font-mono text-xs space-y-1">
          <div>✔ Candidate: ${p.name || "P THARAK TEJA"} [${edu.degree || "Computer Science"}]</div>
          <div>✔ Algorithm Mastery: Top 4% (LeetCode 2050+)</div>
          <div>✔ Tech Stack: Python, TypeScript, React, Go, Docker, Cloud</div>
          <div>✔ Status: Ready for High-Impact Software Engineering Roles! 🚀</div>
        </div>
      `;
      runBtn.classList.remove("opacity-50", "pointer-events-none");
    }, 600);
  });
}

// --- About & Education Section ---
function renderAbout(personal, education) {
  const bioContainer = document.getElementById("about-bio-paragraphs");
  if (bioContainer && personal.bioLong) {
    bioContainer.innerHTML = personal.bioLong.map(p => `<p class="text-slate-300 mb-4 leading-relaxed">${p}</p>`).join("");
  }

  // University details
  const instEl = document.getElementById("edu-institution");
  if (instEl) instEl.textContent = education.institution;

  const degEl = document.getElementById("edu-degree");
  if (degEl) degEl.textContent = `${education.degree} • Minor in ${education.minor}`;

  const metaEl = document.getElementById("edu-meta");
  if (metaEl) metaEl.textContent = `Graduation: ${education.graduationDate} | GPA: ${education.gpa}`;

  // Honors
  const honorsEl = document.getElementById("edu-honors");
  if (honorsEl && education.honors) {
    honorsEl.innerHTML = education.honors.map(h => `
      <li class="flex items-center gap-2 text-xs text-sky-300 font-medium">
        <i class="fa-solid fa-award text-yellow-400"></i> ${h}
      </li>
    `).join("");
  }

  // Coursework grid
  const coursesEl = document.getElementById("courses-grid");
  if (coursesEl && education.courses) {
    coursesEl.innerHTML = education.courses.map(c => `
      <div class="glass-card p-3 rounded-lg border border-white/5 flex items-center justify-between text-xs hover:border-sky-500/40">
        <div>
          <span class="font-mono font-bold text-sky-400 mr-2">${c.code}</span>
          <span class="text-slate-200">${c.name}</span>
        </div>
        <span class="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">${c.grade}</span>
      </div>
    `).join("");
  }
}

// --- Skills Matrix Rendering ---
function renderSkills(skills) {
  const container = document.getElementById("skills-categories-container");
  if (!container || !skills) return;

  container.innerHTML = skills.map(cat => `
    <div class="glass-card p-6 rounded-2xl flex flex-col h-full skill-category-card" data-category="${cat.category.toLowerCase()}">
      <div class="flex items-center gap-3 mb-5">
        <div class="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 text-lg">
          <i class="fa-solid ${cat.icon}"></i>
        </div>
        <h3 class="text-lg font-bold text-slate-100">${cat.category}</h3>
      </div>
      <div class="space-y-4 flex-1">
        ${cat.items.map(item => `
          <div class="skill-item-block" data-skill="${item.name.toLowerCase()}">
            <div class="flex justify-between items-center text-xs mb-1.5 font-mono">
              <span class="text-slate-200 font-semibold">${item.name}</span>
              <span class="text-sky-400 font-bold">${item.level}%</span>
            </div>
            <div class="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden border border-white/5">
              <div class="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full transition-all duration-1000" style="width: ${item.level}%"></div>
            </div>
            <div class="flex flex-wrap gap-1.5 mt-2">
              ${item.tags.map(t => `<span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-400 font-mono border border-white/5">${t}</span>`).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");
}

// Skill live search filter
function initSkillSearch(skills) {
  const input = document.getElementById("skill-search-input");
  if (!input) return;

  input.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    const itemBlocks = document.querySelectorAll(".skill-item-block");

    itemBlocks.forEach(block => {
      const skillName = block.getAttribute("data-skill") || "";
      const textContent = block.textContent.toLowerCase();
      if (!query || skillName.includes(query) || textContent.includes(query)) {
        block.style.display = "block";
      } else {
        block.style.display = "none";
      }
    });
  });
}

// --- Featured Projects Rendering ---
function renderProjects(projects) {
  const container = document.getElementById("projects-grid-container");
  if (!container || !projects) return;

  container.innerHTML = projects.map(p => `
    <div class="glass-card rounded-2xl overflow-hidden flex flex-col project-card group" data-category="${p.category.toLowerCase().replace(/[^a-z0-9]/g, '')}">
      <!-- Project Image / Preview Banner -->
      <div class="relative h-48 overflow-hidden bg-slate-900">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" loading="lazy">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        <span class="absolute top-3 left-3 bg-slate-900/90 text-sky-400 border border-sky-500/30 text-xs font-mono px-2.5 py-1 rounded-full backdrop-blur-md">
          ${p.category}
        </span>
        ${p.featured ? `<span class="absolute top-3 right-3 bg-indigo-600/90 text-white text-xs font-mono px-2 py-0.5 rounded-md backdrop-blur-md flex items-center gap-1"><i class="fa-solid fa-star text-[10px]"></i> Featured</span>` : ''}
      </div>

      <!-- Project Content -->
      <div class="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-bold text-slate-100 group-hover:text-sky-400 transition-colors mb-2">${p.title}</h3>
          <p class="text-sm text-slate-300 line-clamp-2 mb-4 leading-relaxed">${p.shortDescription}</p>

          <!-- Key Metric Callout -->
          <div class="mb-4 flex flex-wrap gap-2">
            ${p.metrics.map(m => `
              <span class="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono font-medium flex items-center gap-1">
                <i class="fa-solid fa-bolt text-[10px]"></i> ${m}
              </span>
            `).join("")}
          </div>

          <!-- Tech Stack Tags -->
          <div class="flex flex-wrap gap-1.5 mb-6">
            ${p.tags.map(t => `<span class="skill-tag">${t}</span>`).join("")}
          </div>
        </div>

        <!-- Action Links -->
        <div class="pt-4 border-t border-white/10 flex items-center justify-between">
          <button class="open-case-study-btn text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer transition-colors" data-project-id="${p.id}">
            <i class="fa-solid fa-book-open"></i> Deep Dive Case Study
          </button>
          <div class="flex items-center gap-3">
            <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white transition-colors" title="View Source on GitHub">
              <i class="fa-brands fa-github text-lg"></i>
            </a>
            <a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-sky-400 transition-colors" title="Live Preview">
              <i class="fa-solid fa-arrow-up-right-from-square text-sm"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// Project Filter Buttons
function initProjectFilter(projects) {
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("bg-sky-500", "text-white", "font-bold"));
      btn.classList.add("bg-sky-500", "text-white", "font-bold");

      const filter = btn.getAttribute("data-filter");
      const cards = document.querySelectorAll(".project-card");

      cards.forEach(card => {
        const cat = card.getAttribute("data-category");
        if (filter === "all" || cat.includes(filter)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// --- Experience & Leadership Timeline ---
function renderExperience(experience) {
  const container = document.getElementById("experience-timeline-container");
  if (!container || !experience) return;

  container.innerHTML = experience.map(exp => `
    <div class="timeline-node">
      <div class="timeline-dot"></div>
      <div class="glass-card p-6 rounded-2xl">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-2">
          <div>
            <h4 class="text-lg font-bold text-slate-100">${exp.role}</h4>
            <div class="text-sm font-semibold text-sky-400 flex items-center gap-2">
              <span>${exp.company}</span>
              <span class="text-slate-500">•</span>
              <span class="text-slate-400 text-xs font-normal">${exp.location}</span>
            </div>
          </div>
          <span class="text-xs font-mono font-medium px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-white/5 w-fit">
            ${exp.period}
          </span>
        </div>
        <p class="text-sm text-slate-300 my-3 leading-relaxed">${exp.description}</p>
        <ul class="space-y-1.5 mb-4 text-xs text-slate-300">
          ${exp.achievements.map(a => `
            <li class="flex items-start gap-2">
              <i class="fa-solid fa-chevron-right text-sky-400 text-[10px] mt-1"></i>
              <span>${a}</span>
            </li>
          `).join("")}
        </ul>
        <div class="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
          ${exp.technologies.map(t => `<span class="text-[11px] px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 font-mono">${t}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

// --- Awards & Honors ---
function renderAwards(awards) {
  const container = document.getElementById("awards-grid-container");
  if (!container || !awards) return;

  container.innerHTML = awards.map(a => `
    <div class="glass-card p-5 rounded-xl border border-white/5 flex gap-4 items-start">
      <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex-shrink-0 flex items-center justify-center text-amber-400 text-lg">
        <i class="fa-solid fa-trophy"></i>
      </div>
      <div>
        <div class="flex items-center justify-between gap-2">
          <h4 class="text-sm font-bold text-slate-100">${a.title}</h4>
          <span class="text-[11px] font-mono text-slate-400">${a.date}</span>
        </div>
        <div class="text-xs text-sky-400 font-medium mt-0.5">${a.issuer}</div>
        <p class="text-xs text-slate-300 mt-2 leading-relaxed">${a.description}</p>
      </div>
    </div>
  `).join("");
}

// --- GitHub Profile & Activity Sync ---
async function renderGitHubHeatmap() {
  const grid = document.getElementById("github-heatmap");
  if (!grid) return;

  grid.innerHTML = "";
  // 112 simulated day squares (4 months)
  for (let i = 0; i < 112; i++) {
    const cell = document.createElement("div");
    const rand = Math.random();
    let levelClass = "heatmap-cell";
    if (rand > 0.85) levelClass += " level-4";
    else if (rand > 0.65) levelClass += " level-3";
    else if (rand > 0.40) levelClass += " level-2";
    else if (rand > 0.20) levelClass += " level-1";
    cell.className = levelClass;
    grid.appendChild(cell);
  }

  // Live GitHub API Sync if username is available
  const username = window.PORTFOLIO_DATA?.personal?.githubUsername;
  if (username) {
    try {
      const res = await fetch(`https://api.github.com/users/${username}`);
      if (res.ok) {
        const userData = await res.json();
        const statsBadge = document.getElementById("github-stats-badge");
        if (statsBadge) {
          statsBadge.innerHTML = `
            <span class="text-sky-400 font-bold">${userData.public_repos || 0}</span> Repos • 
            <span class="text-emerald-400 font-bold">${userData.followers || 0}</span> Followers
          `;
        }
        const githubHeading = document.getElementById("github-handle-heading");
        if (githubHeading) {
          githubHeading.textContent = `@${userData.login}`;
        }
      }
    } catch (err) {
      console.log("GitHub API live sync skipped or rate limited:", err);
    }
  }
}

// --- Contact Section Rendering ---
function renderContact(personal) {
  const emailLink = document.getElementById("contact-email-link");
  if (emailLink) {
    emailLink.href = `mailto:${personal.email}`;
    emailLink.textContent = personal.email;
  }

  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(personal.email).then(() => {
        showToast("Email copied to clipboard!", "fa-copy");
      });
    });
  }

  const githubLink = document.getElementById("contact-github-link");
  if (githubLink) githubLink.href = personal.github;

  const linkedinLink = document.getElementById("contact-linkedin-link");
  if (linkedinLink) linkedinLink.href = personal.linkedin;

  const twitterLink = document.getElementById("contact-twitter-link");
  if (twitterLink) twitterLink.href = personal.twitter;

  const leetcodeLink = document.getElementById("contact-leetcode-link");
  if (leetcodeLink) leetcodeLink.href = personal.leetcode;

  const hackerrankLink = document.getElementById("contact-hackerrank-link");
  if (hackerrankLink) hackerrankLink.href = personal.hackerrank;
}

// --- Case Study & Resume Modals ---
function initModals(data) {
  // 1. Case Study Modal
  const caseModal = document.getElementById("case-study-modal");
  const caseContent = document.getElementById("case-study-modal-body");
  const closeCaseBtn = document.getElementById("close-case-modal-btn");

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".open-case-study-btn");
    if (btn) {
      const projId = btn.getAttribute("data-project-id");
      const project = data.projects.find(p => p.id === projId);
      if (project && caseModal && caseContent) {
        caseContent.innerHTML = `
          <div class="space-y-6">
            <div class="flex items-center gap-3">
              <span class="px-2.5 py-1 rounded-full text-xs font-mono bg-sky-500/10 text-sky-400 border border-sky-500/20">${project.category}</span>
              <h2 class="text-2xl font-bold text-slate-100">${project.title}</h2>
            </div>
            <img src="${project.image}" alt="${project.title}" class="w-full h-64 object-cover rounded-xl border border-white/10" />
            
            <div class="glass-card p-4 rounded-xl border border-red-500/20 bg-red-500/5">
              <h4 class="text-xs font-mono font-bold text-red-400 uppercase tracking-wide mb-1"><i class="fa-solid fa-triangle-exclamation mr-1"></i> The Problem Statement</h4>
              <p class="text-sm text-slate-300 leading-relaxed">${project.caseStudy.problem}</p>
            </div>

            <div class="glass-card p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
              <h4 class="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide mb-1"><i class="fa-solid fa-lightbulb mr-1"></i> Technical Solution & Architecture</h4>
              <p class="text-sm text-slate-300 leading-relaxed">${project.caseStudy.solution}</p>
            </div>

            <div>
              <h4 class="text-sm font-bold text-slate-200 mb-3">Key Technical Challenges & Milestones:</h4>
              <ul class="space-y-2 text-xs text-slate-300">
                ${project.caseStudy.highlights.map(h => `
                  <li class="flex items-start gap-2.5">
                    <i class="fa-solid fa-check text-sky-400 mt-1"></i>
                    <span class="leading-relaxed">${h}</span>
                  </li>
                `).join("")}
              </ul>
            </div>

            <div class="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              ${project.tags.map(t => `<span class="skill-tag">${t}</span>`).join("")}
            </div>

            <div class="flex items-center gap-4 pt-2">
              <a href="${project.githubUrl}" target="_blank" class="btn-secondary text-xs"><i class="fa-brands fa-github"></i> Repository</a>
              <a href="${project.liveUrl}" target="_blank" class="btn-primary text-xs"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live Application</a>
            </div>
          </div>
        `;
        caseModal.classList.add("active");
      }
    }
  });

  if (closeCaseBtn && caseModal) {
    closeCaseBtn.addEventListener("click", () => caseModal.classList.remove("active"));
    caseModal.addEventListener("click", (e) => {
      if (e.target === caseModal) caseModal.classList.remove("active");
    });
  }

  // 2. Resume Modal
  const resumeModal = document.getElementById("resume-modal");
  const resumeContent = document.getElementById("resume-modal-body");
  const closeResumeBtn = document.getElementById("close-resume-modal-btn");
  const openResumeBtns = document.querySelectorAll(".open-resume-btn");
  const printResumeBtn = document.getElementById("print-resume-btn");

  window.openResumeModal = function() {
    if (!resumeModal || !resumeContent) return;
    const p = data.personal;
    const edu = data.education;

    resumeContent.innerHTML = `
      <div class="bg-slate-900 text-slate-100 p-8 rounded-xl border border-white/10 font-sans printable-resume">
        <!-- Resume Header -->
        <div class="text-center border-b border-white/10 pb-6 mb-6">
          <h1 class="text-3xl font-extrabold tracking-tight">${p.name}</h1>
          <p class="text-sky-400 font-mono text-xs mt-1 font-semibold">${p.title}</p>
          <div class="flex flex-wrap justify-center items-center gap-3 text-xs text-slate-400 mt-2 font-mono">
            <span>📍 ${p.location}</span>
            <span>•</span>
            <span>📧 ${p.email}</span>
            <span>•</span>
            <a href="${p.github}" target="_blank" class="underline text-slate-300">GitHub</a>
            <span>•</span>
            <a href="${p.linkedin}" target="_blank" class="underline text-slate-300">LinkedIn</a>
            <span>•</span>
            <a href="${p.leetcode}" target="_blank" class="underline text-slate-300">LeetCode</a>
            <span>•</span>
            <a href="${p.hackerrank}" target="_blank" class="underline text-slate-300">HackerRank</a>
          </div>
        </div>

        <!-- Resume Education -->
        <div class="mb-6">
          <h2 class="text-sm font-bold uppercase tracking-wider text-sky-400 font-mono border-b border-white/10 pb-1 mb-3">Education</h2>
          <div class="flex justify-between items-start text-xs mb-1">
            <span class="font-bold text-slate-100">${edu.institution}</span>
            <span class="font-mono text-slate-400">${edu.graduationDate}</span>
          </div>
          <div class="text-xs text-slate-300">${edu.degree} (Minor: ${edu.minor})</div>
          <div class="text-xs text-emerald-400 font-mono mt-0.5">GPA: ${edu.gpa} | Honors: ${edu.honors.join(", ")}</div>
        </div>

        <!-- Resume Experience -->
        <div class="mb-6">
          <h2 class="text-sm font-bold uppercase tracking-wider text-sky-400 font-mono border-b border-white/10 pb-1 mb-3">Experience</h2>
          <div class="space-y-4">
            ${data.experience.map(e => `
              <div class="text-xs">
                <div class="flex justify-between font-bold text-slate-100">
                  <span>${e.role} — <span class="text-sky-400 font-normal">${e.company}</span></span>
                  <span class="font-mono text-slate-400 font-normal">${e.period}</span>
                </div>
                <ul class="list-disc list-inside text-slate-300 mt-1 space-y-0.5">
                  ${e.achievements.map(a => `<li>${a}</li>`).join("")}
                </ul>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Resume Projects -->
        <div class="mb-6">
          <h2 class="text-sm font-bold uppercase tracking-wider text-sky-400 font-mono border-b border-white/10 pb-1 mb-3">Key Projects</h2>
          <div class="space-y-3">
            ${data.projects.slice(0, 3).map(p => `
              <div class="text-xs">
                <div class="flex justify-between font-bold text-slate-100">
                  <span>${p.title} | <span class="text-slate-400 font-mono font-normal">${p.tags.slice(0, 4).join(", ")}</span></span>
                  <span class="text-emerald-400 font-mono">${p.metrics[0]}</span>
                </div>
                <p class="text-slate-300 mt-0.5">${p.shortDescription}</p>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Resume Skills -->
        <div>
          <h2 class="text-sm font-bold uppercase tracking-wider text-sky-400 font-mono border-b border-white/10 pb-1 mb-2">Technical Skills</h2>
          <div class="text-xs space-y-1 text-slate-300">
            ${data.skills.map(s => `
              <div><strong class="text-slate-100">${s.category}:</strong> ${s.items.map(i => i.name).join(", ")}</div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    resumeModal.classList.add("active");
  };

  openResumeBtns.forEach(btn => {
    btn.addEventListener("click", () => window.openResumeModal());
  });

  if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener("click", () => resumeModal.classList.remove("active"));
    resumeModal.addEventListener("click", (e) => {
      if (e.target === resumeModal) resumeModal.classList.remove("active");
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

// --- Scroll Spy for Navbar ---
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("text-sky-400", "font-bold");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("text-sky-400", "font-bold");
      }
    });
  });
}

// --- Contact Form Simulator ---
function initContactForm(personal) {
  const form = document.getElementById("portfolio-contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nameInput = document.getElementById("form-sender-name");
    const emailInput = document.getElementById("form-sender-email");
    const msgInput = document.getElementById("form-sender-message");

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const message = msgInput ? msgInput.value.trim() : "";

    if (!name || !email || !message) {
      showToast("Please fill in all fields before submitting.", "fa-circle-exclamation");
      return;
    }

    // Submit animation & feedback
    showToast(`Thank you, ${name}! Your message was received.`, "fa-paper-plane");
    form.reset();
  });

  // Share Portfolio Button
  const shareBtn = document.getElementById("share-portfolio-btn");
  if (shareBtn) {
    shareBtn.addEventListener("click", () => {
      const shareData = {
        title: "P THARAK TEJA — Portfolio",
        text: "Check out P THARAK TEJA's student developer portfolio website!",
        url: window.location.href
      };
      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast("Portfolio link copied to clipboard!", "fa-link");
        });
      }
    });
  }
}
