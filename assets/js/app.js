// ============================================================================
// AZURE CLOUD ADMINISTRATOR PORTFOLIO & TECHNICAL PLATFORM
// Core Application Controller, Router, Search Engine & State Management
// ============================================================================

(function () {
  'use strict';

  // State Management
  const state = {
    currentTab: 'home',
    theme: localStorage.getItem('azure_portfolio_theme') || 'dark',
    completedTopics: JSON.parse(localStorage.getItem('azure_completed_topics') || '[]'),
    bookmarks: JSON.parse(localStorage.getItem('azure_bookmarks') || '[]'),
    quizAnswers: {},
    activeCommandCategory: 'All',
    commandSearchQuery: '',
    activeTroubleshootingCategory: 'All',
    activeLabCategory: 'All',
    activeSkillCategory: 'azure-infra'
  };

  // DOM Elements cache
  let dom = {};

  // Initialize Application
  function init() {
    cacheDom();
    applyTheme(state.theme);
    setupEventListeners();
    handleInitialRouting();
    renderAllViews();
    updateDashboardStats();
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function cacheDom() {
    dom = {
      app: document.getElementById('app'),
      themeToggle: document.getElementById('themeToggle'),
      mobileMenuBtn: document.getElementById('mobileMenuBtn'),
      mobileMenu: document.getElementById('mobileMenu'),
      globalSearchBtn: document.getElementById('globalSearchBtn'),
      searchModal: document.getElementById('searchModal'),
      closeSearchBtn: document.getElementById('closeSearchBtn'),
      searchInput: document.getElementById('searchInput'),
      searchResults: document.getElementById('searchResults'),
      detailModal: document.getElementById('detailModal'),
      closeDetailBtn: document.getElementById('closeDetailBtn'),
      detailModalTitle: document.getElementById('detailModalTitle'),
      detailModalBody: document.getElementById('detailModalBody'),
      detailModalActions: document.getElementById('detailModalActions'),
      navTabs: document.querySelectorAll('.nav-tab'),
      pages: document.querySelectorAll('.page-view'),
      dashboardTotal: document.getElementById('dashboardTotal'),
      dashboardCompleted: document.getElementById('dashboardCompleted'),
      dashboardPending: document.getElementById('dashboardPending'),
      dashboardPercent: document.getElementById('dashboardPercent'),
      dashboardProgressBar: document.getElementById('dashboardProgressBar'),
      dashboardRecentList: document.getElementById('dashboardRecentList'),
      dashboardBookmarksList: document.getElementById('dashboardBookmarksList')
    };
  }

  // Routing & Tab Navigation
  function navigateTo(tabId, scroll = true) {
    if (!tabId) tabId = 'home';
    state.currentTab = tabId;

    // Update Nav Tab UI
    document.querySelectorAll('.nav-tab').forEach(tab => {
      if (tab.dataset.tab === tabId) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update Page Views
    document.querySelectorAll('.page-view').forEach(page => {
      if (page.id === `page-${tabId}`) {
        page.classList.remove('hidden');
      } else {
        page.classList.add('hidden');
      }
    });

    // Close Mobile Menu if open
    if (dom.mobileMenu && !dom.mobileMenu.classList.contains('hidden')) {
      dom.mobileMenu.classList.add('hidden');
    }

    // Update URL hash
    window.location.hash = tabId;

    if (scroll) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Refresh lucide icons
    setTimeout(() => {
      if (window.lucide) window.lucide.createIcons();
    }, 50);
  }

  function handleInitialRouting() {
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById(`page-${hash}`)) {
      navigateTo(hash, false);
    } else {
      navigateTo('home', false);
    }
  }

  // Theme Management
  function applyTheme(theme) {
    state.theme = theme;
    localStorage.setItem('azure_portfolio_theme', theme);
    document.documentElement.setAttribute('data-theme', theme);

    const icon = document.getElementById('themeToggleIcon');
    if (icon) {
      if (theme === 'light') {
        icon.setAttribute('data-lucide', 'moon');
      } else {
        icon.setAttribute('data-lucide', 'sun');
      }
      if (window.lucide) window.lucide.createIcons();
    }
  }

  function toggleTheme() {
    applyTheme(state.theme === 'dark' ? 'light' : 'dark');
  }

  // Event Listeners
  function setupEventListeners() {
    // Nav tabs click
    document.querySelectorAll('[data-tab]').forEach(el => {
      el.addEventListener('click', e => {
        e.preventDefault();
        const tab = el.dataset.tab;
        navigateTo(tab);
      });
    });

    // Hash change
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== state.currentTab) {
        navigateTo(hash, false);
      }
    });

    // Theme toggle
    if (dom.themeToggle) {
      dom.themeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile menu toggle
    if (dom.mobileMenuBtn && dom.mobileMenu) {
      dom.mobileMenuBtn.addEventListener('click', () => {
        dom.mobileMenu.classList.toggle('hidden');
      });
    }

    // Global Search open
    if (dom.globalSearchBtn) {
      dom.globalSearchBtn.addEventListener('click', openSearchModal);
    }
    // Keyboard shortcut Ctrl+K
    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearchModal();
      }
      if (e.key === 'Escape') {
        closeSearchModal();
        closeDetailModal();
      }
    });

    // Global Search close
    if (dom.closeSearchBtn) {
      dom.closeSearchBtn.addEventListener('click', closeSearchModal);
    }
    if (dom.searchModal) {
      dom.searchModal.addEventListener('click', e => {
        if (e.target === dom.searchModal) closeSearchModal();
      });
    }
    if (dom.searchInput) {
      dom.searchInput.addEventListener('input', e => {
        executeGlobalSearch(e.target.value.trim());
      });
    }

    // Detail Modal close
    if (dom.closeDetailBtn) {
      dom.closeDetailBtn.addEventListener('click', closeDetailModal);
    }
    if (dom.detailModal) {
      dom.detailModal.addEventListener('click', e => {
        if (e.target === dom.detailModal) closeDetailModal();
      });
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Resume Print button
    const printBtn = document.getElementById('printResumeBtn');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }
  }

  // Render All Dynamic Views
  function renderAllViews() {
    renderSkillsGrid();
    renderLearningHub();
    renderTroubleshooting();
    renderCommands();
    renderInterviewQuestions();
    renderQuiz();
    renderLabs();
  }

  // --------------------------------------------------------------------------
  // SKILLS & LEARNING HUB RENDERING
  // --------------------------------------------------------------------------
  function renderSkillsGrid() {
    const container = document.getElementById('skillsCategoriesContainer');
    if (!container || !window.SKILLS_DATA) return;

    let html = '';
    window.SKILLS_DATA.categories.forEach(cat => {
      html += `
        <div class="azure-glass rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
              <i data-lucide="${cat.icon || 'layers'}" class="w-5 h-5"></i>
            </div>
            <div>
              <span class="text-xs uppercase tracking-wider font-semibold text-blue-400">Category ${cat.code}</span>
              <h3 class="text-lg font-bold text-white">${cat.name}</h3>
            </div>
          </div>
          <p class="text-sm text-slate-400 mb-4">${cat.description}</p>
          <div class="flex flex-wrap gap-2">
            ${cat.skills.map(skill => `
              <button onclick="window.App.openSkillDetail('${skill.id}')"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 text-slate-300 hover:bg-blue-600/20 hover:text-blue-300 border border-slate-700/60 hover:border-blue-500/40 transition">
                <i data-lucide="${skill.icon || 'check'}" class="w-3.5 h-3.5 text-blue-400"></i>
                <span>${skill.name}</span>
                <span class="text-[10px] opacity-60">(${skill.level[0]})</span>
              </button>
            `).join('')}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function renderLearningHub() {
    const listContainer = document.getElementById('learningModulesList');
    if (!listContainer || !window.SKILLS_DATA) return;

    const modules = window.SKILLS_DATA.modules;
    let html = '';

    Object.keys(modules).forEach(key => {
      const mod = modules[key];
      const isCompleted = state.completedTopics.includes(mod.id);
      const isBookmarked = state.bookmarks.includes(mod.id);

      html += `
        <div class="azure-glass rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition interactive-card">
          <div class="flex items-start justify-between gap-4 mb-3">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">${mod.category}</span>
                <span class="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">${mod.level}</span>
                <span class="text-xs text-slate-500 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${mod.readTime}</span>
              </div>
              <h3 class="text-xl font-bold text-white hover:text-blue-400 cursor-pointer" onclick="window.App.openSkillDetail('${mod.id}')">${mod.title}</h3>
            </div>
            <div class="flex items-center gap-1">
              <button onclick="window.App.toggleBookmark('${mod.id}')" title="Bookmark" class="p-2 rounded-lg text-slate-400 hover:text-yellow-400 hover:bg-slate-800 transition">
                <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isBookmarked ? 'text-yellow-400' : ''}"></i>
              </button>
              <button onclick="window.App.toggleComplete('${mod.id}')" title="Mark Complete" class="p-2 rounded-lg text-slate-400 hover:text-green-400 hover:bg-slate-800 transition">
                <i data-lucide="${isCompleted ? 'check-circle-2' : 'circle'}" class="w-4 h-4 ${isCompleted ? 'text-green-400' : ''}"></i>
              </button>
            </div>
          </div>
          <p class="text-sm text-slate-300 mb-4 line-clamp-2">${mod.summary}</p>
          <div class="bg-slate-900/60 rounded-lg p-3 border border-slate-800 text-xs text-slate-400 mb-4">
            <strong class="text-slate-300">Enterprise Scenario:</strong> ${mod.intro.realWorld}
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span class="text-xs text-slate-400">${isCompleted ? '<span class="text-green-400 font-medium">Completed</span>' : 'Not started'}</span>
            <button onclick="window.App.openSkillDetail('${mod.id}')" class="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 hover:text-blue-300">
              <span>Explore Module</span> <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      `;
    });

    listContainer.innerHTML = html;
  }

  // --------------------------------------------------------------------------
  // TROUBLESHOOTING KNOWLEDGE BASE
  // --------------------------------------------------------------------------
  function renderTroubleshooting() {
    const container = document.getElementById('troubleshootingContainer');
    if (!container || !window.TROUBLESHOOTING_DATA) return;

    const data = window.TROUBLESHOOTING_DATA.filter(item => {
      if (state.activeTroubleshootingCategory === 'All') return true;
      return item.category === state.activeTroubleshootingCategory;
    });

    let html = '';
    data.forEach(item => {
      const isCompleted = state.completedTopics.includes(item.id);
      const isBookmarked = state.bookmarks.includes(item.id);

      html += `
        <div class="azure-glass rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/50 transition">
          <div class="flex items-start justify-between gap-4 mb-3">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">${item.category}</span>
              <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}">Sev: ${item.severity}</span>
            </div>
            <div class="flex items-center gap-1">
              <button onclick="window.App.toggleBookmark('${item.id}')" title="Bookmark" class="p-1.5 rounded-lg text-slate-400 hover:text-yellow-400 hover:bg-slate-800 transition">
                <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isBookmarked ? 'text-yellow-400' : ''}"></i>
              </button>
              <button onclick="window.App.toggleComplete('${item.id}')" title="Mark Complete" class="p-1.5 rounded-lg text-slate-400 hover:text-green-400 hover:bg-slate-800 transition">
                <i data-lucide="${isCompleted ? 'check-circle-2' : 'circle'}" class="w-4 h-4 ${isCompleted ? 'text-green-400' : ''}"></i>
              </button>
            </div>
          </div>
          <h3 class="text-lg font-bold text-white mb-2">${item.title}</h3>
          <p class="text-sm text-slate-300 mb-4">${item.problem}</p>

          <div class="space-y-3 mb-4">
            <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
              <span class="text-xs font-semibold text-slate-400 block mb-1">Symptoms & Errors:</span>
              <ul class="text-xs text-slate-300 list-disc list-inside space-y-0.5">
                ${item.symptoms.map(s => `<li>${s}</li>`).join('')}
              </ul>
            </div>

            <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-blue-300 overflow-x-auto">
              <span class="text-[10px] text-slate-500 block mb-1 font-sans font-semibold">Triage Command:</span>
              <code>${item.cliCommands[0] || ''}</code>
            </div>
          </div>

          <button onclick="window.App.openTroubleshootingDetail('${item.id}')" class="w-full py-2 px-4 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/30 text-xs font-semibold transition flex items-center justify-center gap-1.5">
            <i data-lucide="book-open" class="w-4 h-4"></i>
            <span>View Full Step-by-Step Runbook</span>
          </button>
        </div>
      `;
    });

    container.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // COMMAND REFERENCE LIBRARY
  // --------------------------------------------------------------------------
  function renderCommands() {
    const container = document.getElementById('commandsContainer');
    if (!container || !window.COMMANDS_DATA) return;

    const data = window.COMMANDS_DATA.filter(cmd => {
      const matchCat = state.activeCommandCategory === 'All' || cmd.category.toLowerCase().includes(state.activeCommandCategory.toLowerCase());
      const query = state.commandSearchQuery.toLowerCase();
      const matchQuery = !query || cmd.command.toLowerCase().includes(query) || cmd.purpose.toLowerCase().includes(query) || cmd.syntax.toLowerCase().includes(query);
      return matchCat && matchQuery;
    });

    let html = '';
    data.forEach(cmd => {
      html += `
        <div class="azure-glass rounded-xl p-5 border border-slate-700/50 hover:border-blue-500/40 transition">
          <div class="flex items-center justify-between gap-4 mb-2">
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">${cmd.category}</span>
            <span class="text-xs font-medium px-2 py-0.5 rounded ${cmd.safetyColor === 'green' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : (cmd.safetyColor === 'red' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20')}">${cmd.safety}</span>
          </div>
          <h4 class="text-sm font-bold text-white mb-1 font-mono">${cmd.command}</h4>
          <p class="text-xs text-slate-300 mb-3">${cmd.purpose}</p>

          <div class="relative bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300 mb-3 overflow-x-auto group">
            <code>${cmd.example}</code>
            <button onclick="window.App.copyToClipboard('${cmd.example.replace(/'/g, "\\'")}', this)" class="absolute top-2 right-2 p-1.5 rounded bg-slate-800 text-slate-400 hover:text-white opacity-80 group-hover:opacity-100 transition copy-tooltip" title="Copy Command">
              <i data-lucide="copy" class="w-3.5 h-3.5"></i>
            </button>
          </div>

          <div class="text-[11px] text-slate-400 space-y-1">
            <div><strong class="text-slate-300">Troubleshooting use case:</strong> ${cmd.troubleshooting}</div>
            <div><strong class="text-slate-300">Precautions:</strong> ${cmd.precautions}</div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html || '<div class="col-span-2 text-center py-8 text-slate-400">No matching commands found.</div>';
    if (window.lucide) window.lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // INTERVIEW QUESTIONS & TECHNICAL QUIZ
  // --------------------------------------------------------------------------
  function renderInterviewQuestions() {
    const container = document.getElementById('interviewQuestionsList');
    if (!container || !window.INTERVIEW_DATA) return;

    let html = '';
    window.INTERVIEW_DATA.questions.forEach((q, idx) => {
      html += `
        <div class="azure-glass rounded-xl p-6 border border-slate-700/50 mb-4 transition">
          <div class="flex items-center gap-2 mb-2">
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">${q.category}</span>
            <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">${q.level}</span>
          </div>
          <h3 class="text-lg font-bold text-white mb-4">Q${idx + 1}: ${q.question}</h3>

          <div class="space-y-4">
            <div class="bg-blue-950/20 p-4 rounded-lg border border-blue-800/40">
              <span class="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">Simple Interview Summary (1-2 sentences):</span>
              <p class="text-sm text-slate-200">${q.simpleAnswer}</p>
            </div>

            <div class="bg-slate-900/60 p-4 rounded-lg border border-slate-800">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Senior Cloud Operations Depth (Technical Rationale):</span>
              <p class="text-sm text-slate-300 leading-relaxed mb-3">${q.seniorAnswer}</p>
              <div class="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
                <strong class="text-slate-300">Enterprise Scenario:</strong> ${q.scenario}
              </div>
            </div>

            <div class="pt-2">
              <span class="text-xs font-semibold text-slate-400 block mb-1">Interviewer Follow-Up Questions:</span>
              <ul class="text-xs text-slate-400 list-disc list-inside space-y-0.5">
                ${q.followUps.map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  function renderQuiz() {
    const container = document.getElementById('quizContainer');
    if (!container || !window.INTERVIEW_DATA || !window.INTERVIEW_DATA.quiz) return;

    let html = '';
    window.INTERVIEW_DATA.quiz.forEach((qz, idx) => {
      const selected = state.quizAnswers[qz.id];
      const isAnswered = selected !== undefined;
      const isCorrect = isAnswered && selected === qz.correctIndex;

      html += `
        <div class="azure-glass rounded-xl p-5 border border-slate-700/50 mb-4" id="quiz-card-${qz.id}">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold text-blue-400">Question ${idx + 1} of ${window.INTERVIEW_DATA.quiz.length}</span>
            ${isAnswered ? (isCorrect ? '<span class="text-xs font-bold text-emerald-400">✓ Correct</span>' : '<span class="text-xs font-bold text-rose-400">✕ Incorrect</span>') : ''}
          </div>
          <h4 class="text-sm font-bold text-white mb-3">${qz.question}</h4>

          <div class="space-y-2 mb-3">
            ${qz.options.map((opt, optIdx) => {
              let optClass = 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border-slate-700/60';
              if (isAnswered) {
                if (optIdx === qz.correctIndex) {
                  optClass = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-semibold';
                } else if (optIdx === selected) {
                  optClass = 'bg-rose-500/20 text-rose-300 border-rose-500/40';
                } else {
                  optClass = 'bg-slate-900/40 text-slate-500 border-slate-800';
                }
              }
              return `
                <button onclick="window.App.answerQuiz('${qz.id}', ${optIdx})"
                  ${isAnswered ? 'disabled' : ''}
                  class="w-full text-left p-3 rounded-lg text-xs border transition flex items-center gap-2.5 ${optClass}">
                  <span class="w-5 h-5 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-slate-400 shrink-0">${String.fromCharCode(65 + optIdx)}</span>
                  <span>${opt}</span>
                </button>
              `;
            }).join('')}
          </div>

          ${isAnswered ? `
            <div class="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-xs text-slate-300">
              <strong class="text-blue-400">Explanation:</strong> ${qz.explanation}
            </div>
          ` : ''}
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // --------------------------------------------------------------------------
  // PRACTICAL LABS RENDERING
  // --------------------------------------------------------------------------
  function renderLabs() {
    const container = document.getElementById('labsContainer');
    if (!container || !window.LABS_DATA) return;

    let html = '';
    window.LABS_DATA.forEach(lab => {
      const isCompleted = state.completedTopics.includes(lab.id);
      const isBookmarked = state.bookmarks.includes(lab.id);

      html += `
        <div class="azure-glass rounded-xl p-6 border border-slate-700/50 hover:border-blue-500/40 transition">
          <div class="flex items-start justify-between gap-4 mb-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">${lab.category}</span>
              <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> ${lab.duration}</span>
            </div>
            <div class="flex items-center gap-1">
              <button onclick="window.App.toggleBookmark('${lab.id}')" title="Bookmark" class="p-1.5 rounded-lg text-slate-400 hover:text-yellow-400 hover:bg-slate-800 transition">
                <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isBookmarked ? 'text-yellow-400' : ''}"></i>
              </button>
              <button onclick="window.App.toggleComplete('${lab.id}')" title="Mark Complete" class="p-1.5 rounded-lg text-slate-400 hover:text-green-400 hover:bg-slate-800 transition">
                <i data-lucide="${isCompleted ? 'check-circle-2' : 'circle'}" class="w-4 h-4 ${isCompleted ? 'text-green-400' : ''}"></i>
              </button>
            </div>
          </div>
          <h3 class="text-lg font-bold text-white mb-2">${lab.title}</h3>
          <p class="text-xs text-slate-300 mb-3">${lab.objective}</p>

          <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs text-slate-400 mb-3 font-mono">
            <span class="text-[10px] text-slate-500 block mb-0.5 font-sans font-semibold">Architecture:</span>
            ${lab.architecture}
          </div>

          <button onclick="window.App.openLabDetail('${lab.id}')" class="w-full py-2 px-4 rounded-lg bg-blue-600/20 text-blue-300 hover:bg-blue-600 hover:text-white border border-blue-500/30 text-xs font-semibold transition flex items-center justify-center gap-1.5">
            <i data-lucide="terminal" class="w-4 h-4"></i>
            <span>View Full Lab Implementation</span>
          </button>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // --------------------------------------------------------------------------
  // MODALS & DETAIL VIEWS
  // --------------------------------------------------------------------------
  function openSkillDetail(skillId) {
    if (!window.SKILLS_DATA || !dom.detailModal) return;
    const mod = window.SKILLS_DATA.modules[skillId];

    if (!mod) {
      // Find skill in categories
      let foundSkill = null;
      window.SKILLS_DATA.categories.forEach(cat => {
        cat.skills.forEach(s => {
          if (s.id === skillId) foundSkill = s;
        });
      });
      if (foundSkill) {
        showGenericDetail(foundSkill.name, `
          <div class="space-y-4">
            <p class="text-sm text-slate-300">Technical Skill: <strong class="text-white">${foundSkill.name}</strong></p>
            <p class="text-sm text-slate-400">Level: <span class="text-blue-400 font-semibold">${foundSkill.level}</span></p>
            <div class="bg-slate-900 p-4 rounded-lg border border-slate-800 text-xs text-slate-300">
              <p>This technical competency is part of Issac Sodari's verified enterprise cloud skillset supporting Microsoft at Tata Consultancy Services (TCS).</p>
            </div>
          </div>
        `, skillId);
      }
      return;
    }

    const isCompleted = state.completedTopics.includes(mod.id);
    const isBookmarked = state.bookmarks.includes(mod.id);

    dom.detailModalTitle.textContent = mod.title;
    dom.detailModalBody.innerHTML = `
      <div class="space-y-6 text-slate-300 text-sm">
        <div class="flex items-center gap-2 pb-3 border-b border-slate-800">
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">${mod.category}</span>
          <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">${mod.level}</span>
          <span class="text-xs text-slate-500">${mod.readTime}</span>
        </div>

        <div>
          <h4 class="text-base font-bold text-white mb-2 text-blue-400">A. Skill Introduction</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-800"><strong class="text-slate-200 block mb-1">What is it?</strong> ${mod.intro.what}</div>
            <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-800"><strong class="text-slate-200 block mb-1">Why is it used?</strong> ${mod.intro.why}</div>
            <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-800"><strong class="text-slate-200 block mb-1">Where is it deployed?</strong> ${mod.intro.where}</div>
            <div class="bg-slate-900/60 p-3 rounded-lg border border-slate-800"><strong class="text-slate-200 block mb-1">Problem it solves:</strong> ${mod.intro.problemSolved}</div>
          </div>
        </div>

        <div>
          <h4 class="text-base font-bold text-white mb-2 text-blue-400">B. Architecture & Core Concepts</h4>
          <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 mb-3">${mod.basics.architecture}</div>
          <ul class="list-disc list-inside space-y-1 text-xs text-slate-300">
            ${mod.basics.concepts.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 class="text-base font-bold text-white mb-2 text-blue-400">C. Enterprise Configurations & Security</h4>
          <ul class="list-disc list-inside space-y-1 text-xs text-slate-300">
            ${mod.importantConcepts.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <div>
          <h4 class="text-base font-bold text-white mb-2 text-blue-400">D. Practical Implementation Procedures</h4>
          <div class="space-y-2 text-xs">
            ${mod.practicalImplementation.steps.map(s => `<div class="bg-slate-900 p-2.5 rounded border border-slate-800/80 font-mono text-slate-300">${s}</div>`).join('')}
          </div>
          <div class="mt-2 text-xs text-emerald-400 bg-emerald-500/10 p-2.5 rounded border border-emerald-500/20">
            <strong>Verification:</strong> ${mod.practicalImplementation.verification}
          </div>
        </div>

        <div>
          <h4 class="text-base font-bold text-white mb-2 text-blue-400">E. Real-World Production Scenarios</h4>
          ${mod.productionScenarios.map(sc => `
            <div class="bg-slate-900/70 p-3 rounded-lg border border-slate-800 mb-2 text-xs">
              <strong class="text-white block mb-1">${sc.scenario}</strong>
              <p class="text-slate-400 mb-1"><strong>Investigation:</strong> ${sc.investigation}</p>
              <p class="text-emerald-400"><strong>Resolution:</strong> ${sc.resolution}</p>
            </div>
          `).join('')}
        </div>

        <div>
          <h4 class="text-base font-bold text-white mb-2 text-blue-400">F. Interview Questions & Key Answers</h4>
          ${mod.interviewPrep.map(ip => `
            <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 mb-2 text-xs">
              <strong class="text-blue-300 block mb-1">Q: ${ip.q}</strong>
              <p class="text-slate-300">${ip.a}</p>
            </div>
          `).join('')}
        </div>

        <div>
          <h4 class="text-base font-bold text-white mb-2 text-blue-400">G. Quick Revision Summary</h4>
          <div class="flex flex-wrap gap-2 text-xs">
            ${mod.quickRevision.map(qr => `<span class="bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">${qr}</span>`).join('')}
          </div>
        </div>
      </div>
    `;

    dom.detailModalActions.innerHTML = `
      <button onclick="window.App.toggleBookmark('${mod.id}')" class="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition">
        <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isBookmarked ? 'text-yellow-400' : ''}"></i>
        <span>${isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
      </button>
      <button onclick="window.App.toggleComplete('${mod.id}')" class="px-4 py-2 rounded-lg ${isCompleted ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'} hover:opacity-90 text-xs font-semibold flex items-center gap-1.5 transition">
        <i data-lucide="${isCompleted ? 'check-circle-2' : 'check'}" class="w-4 h-4"></i>
        <span>${isCompleted ? 'Completed' : 'Mark as Complete'}</span>
      </button>
    `;

    dom.detailModal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function openTroubleshootingDetail(itemId) {
    if (!window.TROUBLESHOOTING_DATA || !dom.detailModal) return;
    const item = window.TROUBLESHOOTING_DATA.find(i => i.id === itemId);
    if (!item) return;

    const isCompleted = state.completedTopics.includes(item.id);
    const isBookmarked = state.bookmarks.includes(item.id);

    dom.detailModalTitle.textContent = item.title;
    dom.detailModalBody.innerHTML = `
      <div class="space-y-5 text-slate-300 text-sm">
        <div class="flex items-center gap-2 pb-3 border-b border-slate-800">
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">${item.category}</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full ${item.severity === 'Critical' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}">Severity: ${item.severity}</span>
        </div>

        <div class="bg-slate-900/60 p-4 rounded-lg border border-slate-800">
          <strong class="text-white block mb-1">Problem Description:</strong>
          <p class="text-xs text-slate-300">${item.problem}</p>
        </div>

        <div>
          <strong class="text-white block mb-2 text-xs uppercase tracking-wider text-blue-400">Possible Causes:</strong>
          <ul class="list-disc list-inside space-y-1 text-xs text-slate-300">
            ${item.possibleCauses.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <div>
          <strong class="text-white block mb-2 text-xs uppercase tracking-wider text-blue-400">Step-by-Step Resolution Runbook:</strong>
          <div class="space-y-2 text-xs">
            ${item.resolutionSteps.map(s => `<div class="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-slate-300">${s}</div>`).join('')}
          </div>
        </div>

        <div>
          <strong class="text-white block mb-2 text-xs uppercase tracking-wider text-blue-400">CLI & PowerShell Commands:</strong>
          <div class="bg-slate-950 p-4 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300 space-y-2 overflow-x-auto">
            ${item.cliCommands.map(cmd => `<div>${cmd.replace(/\n/g, '<br/>')}</div>`).join('')}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <strong class="text-white block mb-1">Logs & Telemetry:</strong>
            <ul class="list-disc list-inside text-slate-400 space-y-0.5">
              ${item.logsToCheck.map(l => `<li>${l}</li>`).join('')}
            </ul>
          </div>
          <div class="bg-slate-900 p-3 rounded-lg border border-slate-800">
            <strong class="text-white block mb-1">Prevention & Best Practices:</strong>
            <ul class="list-disc list-inside text-slate-400 space-y-0.5">
              ${item.prevention.map(p => `<li>${p}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div class="bg-blue-950/20 p-3 rounded-lg border border-blue-800/40 text-xs">
          <strong class="text-blue-300 block mb-1">Interview Scenario & Model Answer:</strong>
          <p class="text-slate-300">${item.interviewScenario}</p>
        </div>
      </div>
    `;

    dom.detailModalActions.innerHTML = `
      <button onclick="window.App.toggleBookmark('${item.id}')" class="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition">
        <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isBookmarked ? 'text-yellow-400' : ''}"></i>
        <span>${isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
      </button>
      <button onclick="window.App.toggleComplete('${item.id}')" class="px-4 py-2 rounded-lg ${isCompleted ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'} hover:opacity-90 text-xs font-semibold flex items-center gap-1.5 transition">
        <i data-lucide="${isCompleted ? 'check-circle-2' : 'check'}" class="w-4 h-4"></i>
        <span>${isCompleted ? 'Completed' : 'Mark as Complete'}</span>
      </button>
    `;

    dom.detailModal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function openLabDetail(labId) {
    if (!window.LABS_DATA || !dom.detailModal) return;
    const lab = window.LABS_DATA.find(l => l.id === labId);
    if (!lab) return;

    const isCompleted = state.completedTopics.includes(lab.id);
    const isBookmarked = state.bookmarks.includes(lab.id);

    dom.detailModalTitle.textContent = lab.title;
    dom.detailModalBody.innerHTML = `
      <div class="space-y-5 text-slate-300 text-sm">
        <div class="flex items-center gap-2 pb-3 border-b border-slate-800">
          <span class="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">${lab.category}</span>
          <span class="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400">${lab.level}</span>
          <span class="text-xs text-slate-500">${lab.duration}</span>
        </div>

        <div class="bg-slate-900/60 p-4 rounded-lg border border-slate-800 text-xs">
          <strong class="text-white block mb-1">Objective:</strong>
          <p class="text-slate-300 mb-2">${lab.objective}</p>
          <strong class="text-white block mb-1">Prerequisites:</strong>
          <p class="text-slate-400">${lab.prerequisites}</p>
        </div>

        <div>
          <strong class="text-white block mb-2 text-xs uppercase tracking-wider text-blue-400">Target Architecture:</strong>
          <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs text-cyan-300">${lab.architecture}</div>
        </div>

        <div>
          <strong class="text-white block mb-2 text-xs uppercase tracking-wider text-blue-400">Implementation Steps:</strong>
          <div class="space-y-2 text-xs">
            ${lab.steps.map(s => `<div class="bg-slate-900 p-2.5 rounded border border-slate-800 font-mono text-slate-300">${s}</div>`).join('')}
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="bg-emerald-500/10 p-3 rounded-lg border border-emerald-500/20">
            <strong class="text-emerald-400 block mb-1">Verification:</strong>
            <p class="text-slate-300">${lab.verification}</p>
          </div>
          <div class="bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
            <strong class="text-amber-400 block mb-1">Troubleshooting Tips:</strong>
            <p class="text-slate-300">${lab.troubleshooting}</p>
          </div>
        </div>

        <div class="bg-slate-900 p-3 rounded-lg border border-slate-800 text-xs">
          <strong class="text-white block mb-1">Learning Outcomes:</strong>
          <p class="text-slate-300">${lab.learningOutcomes}</p>
        </div>
      </div>
    `;

    dom.detailModalActions.innerHTML = `
      <button onclick="window.App.toggleBookmark('${lab.id}')" class="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition">
        <i data-lucide="${isBookmarked ? 'bookmark-check' : 'bookmark'}" class="w-4 h-4 ${isBookmarked ? 'text-yellow-400' : ''}"></i>
        <span>${isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
      </button>
      <button onclick="window.App.toggleComplete('${lab.id}')" class="px-4 py-2 rounded-lg ${isCompleted ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'} hover:opacity-90 text-xs font-semibold flex items-center gap-1.5 transition">
        <i data-lucide="${isCompleted ? 'check-circle-2' : 'check'}" class="w-4 h-4"></i>
        <span>${isCompleted ? 'Completed' : 'Mark as Complete'}</span>
      </button>
    `;

    dom.detailModal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function showGenericDetail(title, contentHtml, id) {
    dom.detailModalTitle.textContent = title;
    dom.detailModalBody.innerHTML = contentHtml;
    dom.detailModalActions.innerHTML = '';
    dom.detailModal.classList.remove('hidden');
    if (window.lucide) window.lucide.createIcons();
  }

  function closeDetailModal() {
    if (dom.detailModal) dom.detailModal.classList.add('hidden');
  }

  // --------------------------------------------------------------------------
  // GLOBAL SEARCH ENGINE
  // --------------------------------------------------------------------------
  function openSearchModal() {
    if (!dom.searchModal) return;
    dom.searchModal.classList.remove('hidden');
    if (dom.searchInput) {
      dom.searchInput.value = '';
      dom.searchInput.focus();
    }
    executeGlobalSearch('');
  }

  function closeSearchModal() {
    if (dom.searchModal) dom.searchModal.classList.add('hidden');
  }

  function executeGlobalSearch(query) {
    if (!dom.searchResults) return;
    const q = (query || '').toLowerCase();

    const results = [];

    // Search Learning Modules
    if (window.SKILLS_DATA && window.SKILLS_DATA.modules) {
      Object.keys(window.SKILLS_DATA.modules).forEach(key => {
        const mod = window.SKILLS_DATA.modules[key];
        if (!q || mod.title.toLowerCase().includes(q) || mod.summary.toLowerCase().includes(q) || mod.category.toLowerCase().includes(q)) {
          results.push({ type: 'Learning Module', title: mod.title, desc: mod.summary, id: mod.id, action: `window.App.openSkillDetail('${mod.id}'); window.App.closeSearchModal();` });
        }
      });
    }

    // Search Troubleshooting
    if (window.TROUBLESHOOTING_DATA) {
      window.TROUBLESHOOTING_DATA.forEach(item => {
        if (!q || item.title.toLowerCase().includes(q) || item.problem.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)) {
          results.push({ type: 'Troubleshooting Runbook', title: item.title, desc: item.problem, id: item.id, action: `window.App.openTroubleshootingDetail('${item.id}'); window.App.closeSearchModal();` });
        }
      });
    }

    // Search Commands
    if (window.COMMANDS_DATA) {
      window.COMMANDS_DATA.forEach(cmd => {
        if (!q || cmd.command.toLowerCase().includes(q) || cmd.purpose.toLowerCase().includes(q) || cmd.category.toLowerCase().includes(q)) {
          results.push({ type: 'Command Reference', title: cmd.command, desc: cmd.purpose, id: cmd.id, action: `window.App.navigateTo('commands'); window.App.closeSearchModal();` });
        }
      });
    }

    // Search Labs
    if (window.LABS_DATA) {
      window.LABS_DATA.forEach(lab => {
        if (!q || lab.title.toLowerCase().includes(q) || lab.objective.toLowerCase().includes(q) || lab.category.toLowerCase().includes(q)) {
          results.push({ type: 'Practical Lab', title: lab.title, desc: lab.objective, id: lab.id, action: `window.App.openLabDetail('${lab.id}'); window.App.closeSearchModal();` });
        }
      });
    }

    if (results.length === 0) {
      dom.searchResults.innerHTML = '<div class="p-8 text-center text-slate-400 text-sm">No matching topics or commands found.</div>';
      return;
    }

    dom.searchResults.innerHTML = results.slice(0, 15).map(res => `
      <div onclick="${res.action}" class="p-3.5 rounded-lg bg-slate-900/60 hover:bg-blue-600/20 border border-slate-800 hover:border-blue-500/40 cursor-pointer transition">
        <div class="flex items-center justify-between mb-1">
          <span class="text-[10px] font-bold uppercase tracking-wider text-blue-400 px-2 py-0.5 rounded bg-blue-500/10">${res.type}</span>
          <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-slate-500"></i>
        </div>
        <h4 class="text-sm font-bold text-white mb-0.5">${res.title}</h4>
        <p class="text-xs text-slate-400 line-clamp-1">${res.desc}</p>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // LEARNING DASHBOARD & PROGRESS
  // --------------------------------------------------------------------------
  function toggleComplete(id) {
    const idx = state.completedTopics.indexOf(id);
    if (idx > -1) {
      state.completedTopics.splice(idx, 1);
    } else {
      state.completedTopics.push(id);
    }
    localStorage.setItem('azure_completed_topics', JSON.stringify(state.completedTopics));
    updateDashboardStats();
    renderLearningHub();
    renderTroubleshooting();
    renderLabs();
    closeDetailModal();
  }

  function toggleBookmark(id) {
    const idx = state.bookmarks.indexOf(id);
    if (idx > -1) {
      state.bookmarks.splice(idx, 1);
    } else {
      state.bookmarks.push(id);
    }
    localStorage.setItem('azure_bookmarks', JSON.stringify(state.bookmarks));
    updateDashboardStats();
    renderLearningHub();
    renderTroubleshooting();
    renderLabs();
    closeDetailModal();
  }

  function updateDashboardStats() {
    const totalSkills = 85; // Categories A-G comprehensive
    const completedCount = state.completedTopics.length;
    const pendingCount = Math.max(0, totalSkills - completedCount);
    const percent = Math.min(100, Math.round((completedCount / totalSkills) * 100));

    if (dom.dashboardTotal) dom.dashboardTotal.textContent = totalSkills;
    if (dom.dashboardCompleted) dom.dashboardCompleted.textContent = completedCount;
    if (dom.dashboardPending) dom.dashboardPending.textContent = pendingCount;
    if (dom.dashboardPercent) dom.dashboardPercent.textContent = `${percent}%`;
    if (dom.dashboardProgressBar) dom.dashboardProgressBar.style.width = `${percent}%`;

    // Render Bookmarks
    if (dom.dashboardBookmarksList) {
      if (state.bookmarks.length === 0) {
        dom.dashboardBookmarksList.innerHTML = '<li class="text-xs text-slate-500">No bookmarked topics yet. Bookmark topics from the Learning Hub.</li>';
      } else {
        dom.dashboardBookmarksList.innerHTML = state.bookmarks.map(id => `
          <li class="flex items-center justify-between text-xs py-1.5 border-b border-slate-800">
            <span class="text-slate-300 font-medium">${id}</span>
            <button onclick="window.App.toggleBookmark('${id}')" class="text-slate-500 hover:text-red-400"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
          </li>
        `).join('');
      }
    }

    // Render Recent Completed
    if (dom.dashboardRecentList) {
      if (state.completedTopics.length === 0) {
        dom.dashboardRecentList.innerHTML = '<li class="text-xs text-slate-500">No completed topics yet. Mark topics as complete as you study!</li>';
      } else {
        dom.dashboardRecentList.innerHTML = state.completedTopics.slice(-5).reverse().map(id => `
          <li class="flex items-center gap-2 text-xs py-1 text-emerald-400">
            <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
            <span class="text-slate-300">${id}</span>
          </li>
        `).join('');
      }
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // INTERACTIVE QUIZ CONTROLLER
  // --------------------------------------------------------------------------
  function answerQuiz(quizId, optionIndex) {
    state.quizAnswers[quizId] = optionIndex;
    renderQuiz();
    if (window.lucide) window.lucide.createIcons();
  }

  function resetQuiz() {
    state.quizAnswers = {};
    renderQuiz();
    if (window.lucide) window.lucide.createIcons();
  }

  // --------------------------------------------------------------------------
  // UTILITIES & CONTACT
  // --------------------------------------------------------------------------
  function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text).then(() => {
      btnElement.classList.add('copied');
      setTimeout(() => btnElement.classList.remove('copied'), 2000);
    }).catch(err => {
      console.error('Copy failed:', err);
    });
  }

  function handleContactSubmit(e) {
    e.preventDefault();
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const subject = document.getElementById('contactSubject').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill out all required contact fields.');
      return;
    }

    const mailtoUrl = `mailto:issacsodari8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\\n\\n" + message)}`;
    window.location.href = mailtoUrl;

    const feedback = document.getElementById('contactFeedback');
    if (feedback) {
      feedback.classList.remove('hidden');
      setTimeout(() => feedback.classList.add('hidden'), 5000);
    }
  }

  function filterCommandsByCategory(cat) {
    state.activeCommandCategory = cat;
    document.querySelectorAll('.cmd-filter-btn').forEach(btn => {
      if (btn.dataset.category === cat) {
        btn.classList.add('bg-blue-600', 'text-white');
        btn.classList.remove('bg-slate-800', 'text-slate-400');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-slate-800', 'text-slate-400');
      }
    });
    renderCommands();
  }

  function filterTroubleshootingByCategory(cat) {
    state.activeTroubleshootingCategory = cat;
    document.querySelectorAll('.tb-filter-btn').forEach(btn => {
      if (btn.dataset.category === cat) {
        btn.classList.add('bg-blue-600', 'text-white');
        btn.classList.remove('bg-slate-800', 'text-slate-400');
      } else {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-slate-800', 'text-slate-400');
      }
    });
    renderTroubleshooting();
  }

  // Public API exposed to window
  window.App = {
    navigateTo,
    openSkillDetail,
    openTroubleshootingDetail,
    openLabDetail,
    closeDetailModal,
    openSearchModal,
    closeSearchModal,
    toggleComplete,
    toggleBookmark,
    answerQuiz,
    resetQuiz,
    copyToClipboard,
    filterCommandsByCategory,
    filterTroubleshootingByCategory,
    setCommandSearchQuery: function(q) {
      state.commandSearchQuery = q;
      renderCommands();
    }
  };

  // Start when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
