(function () {
  "use strict";
  let io; // reveal observer
  const S = window.SITE || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  // ================= i18n =================
  const DICT = {
    az: {
      "nav.home": "Ana səhifə", "nav.cases": "Dosyelər", "nav.skills": "Arsenal", "nav.exp": "Təcrübə",
      "nav.articles": "Məqalələr", "nav.game": "Oyna", "nav.hack": "Hakatonlar", "nav.contact": "Əlaqə",
      "hero.cases": "Dosyelərə bax", "hero.play": "Oyna ☠",
      "stat.bugs": "bildirilmiş zəiflik", "stat.companies": "təşəkkür edən şirkət", "stat.ctfs": "CTF yarışı", "stat.hack": "hakaton",
      "w.hof": "HALL OF FAME", "w.ctf": "CTF VƏ CVE", "w.skills": "ARSENAL", "w.exp": "TƏCRÜBƏ",
      "w.articles": "MƏQALƏLƏR", "w.game": "OYNA", "w.hack": "HAKATONLAR", "sub.hack": "Komanda ilə qurduğum layihələr və qazandığım mükafatlar", "h.project": "Layihə", "w.404": "TAPILMADI",
      "sub.hof": "Məsuliyyətlə bildirilmiş və təsdiqlənmiş zəifliklər",
      "sub.game": "Kibertəhlükəsizlik terminini tap — 6 səhv haqqın var",
      "h.ctf": "CTF nəticələri", "h.certs": "Sertifikatlar", "w.ctfOnly": "CTF", "cve.pending": "Təsdiq gözləyir", "cve.req": "CVE sorğusu göndərilib", "rail.top": "Başlanğıc", "rail.solved": "TAPILDI!",
      "a.all": "Hamısı →", "a.min": "dəq oxu", "a.soon": "Tezliklə...",
      "f.all": "Hamısı", "case": "DOSYE", "empty": "Bu kateqoriyada qeyd yoxdur.", "none": "Hələ qeyd yoxdur.",
      "g.hint": "İpucu", "g.lives": "Səhv haqqı", "g.win": "Sağ qaldın! Flag:", "g.lose": "Asıldın ☠ Söz:", "g.new": "Yeni söz ↻",
      "c.title": "Zəiflik tapdınız?<br>Mənə yazın.", "c.text": "Pentest, təhlükəsizlik auditi, əməkdaşlıq və ya sual üçün.",
      "f.top": "Yuxarı ↑",
      "b.search": "Məqalə axtar...", "b.none": "Nəticə tapılmadı.",
      "p.back": "← Bütün məqalələr", "p.loading": "Yüklənir...", "p.nf": "Bu məqalə mövcud deyil.",
      "p.err": "Məqalə faylı yüklənmədi. Saytı lokal açırsınızsa, server vasitəsilə açın.",
      "sev.critical": "Kritik", "sev.high": "Yüksək", "sev.medium": "Orta", "sev.low": "Aşağı", "sev.info": "Məlumat", "sev.none": "Bildirildi",
      "theme.noir": "Noir", "theme.paper": "Kağız", "theme.midnight": "Gecə",
      months: ["Yan", "Fev", "Mar", "Apr", "May", "İyn", "İyl", "Avq", "Sen", "Okt", "Noy", "Dek"]
    },
    en: {
      "nav.home": "Home", "nav.cases": "Case files", "nav.skills": "Arsenal", "nav.exp": "Experience",
      "nav.articles": "Articles", "nav.game": "Play", "nav.hack": "Hackathons", "nav.contact": "Contact",
      "hero.cases": "View case files", "hero.play": "Play ☠",
      "stat.bugs": "vulnerabilities reported", "stat.companies": "companies acknowledged", "stat.ctfs": "CTF competitions", "stat.hack": "hackathons",
      "w.hof": "HALL OF FAME", "w.ctf": "CTF & CVE", "w.skills": "ARSENAL", "w.exp": "EXPERIENCE",
      "w.articles": "ARTICLES", "w.game": "PLAY", "w.hack": "HACKATHONS", "sub.hack": "Projects I built with my teams and the awards we won", "h.project": "Project", "w.404": "NOT FOUND",
      "sub.hof": "Responsibly disclosed, confirmed vulnerabilities",
      "sub.game": "Guess the security term — you have 6 lives",
      "h.ctf": "CTF results", "h.certs": "Certifications", "w.ctfOnly": "CTF", "cve.pending": "Pending", "cve.req": "CVE requested", "rail.top": "Top", "rail.solved": "SOLVED!",
      "a.all": "All →", "a.min": "min read", "a.soon": "Coming soon...",
      "f.all": "All", "case": "CASE", "empty": "Nothing in this category.", "none": "Nothing yet.",
      "g.hint": "Hint", "g.lives": "Lives", "g.win": "You survived! Flag:", "g.lose": "Hanged ☠ The word was:", "g.new": "New word ↻",
      "c.title": "Found a bug?<br>Get in touch.", "c.text": "Pentesting, security audits, collaboration or just a question.",
      "f.top": "Back to top ↑",
      "b.search": "Search articles...", "b.none": "No results.",
      "p.back": "← All articles", "p.loading": "Loading...", "p.nf": "This article doesn't exist.",
      "p.err": "Couldn't load the article file. If you're opening the site locally, use a local server.",
      "sev.critical": "Critical", "sev.high": "High", "sev.medium": "Medium", "sev.low": "Low", "sev.info": "Info", "sev.none": "Disclosed",
      "theme.noir": "Noir", "theme.paper": "Paper", "theme.midnight": "Midnight",
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  };
  const QS = new URLSearchParams(location.search);
  let lang = (QS.get("lang") || store.get("lang")) === "en" ? "en" : "az";
  const t = (k) => DICT[lang][k] ?? DICT.az[k] ?? k;
  // Məzmun sahəsi: sadə mətn və ya { az, en }
  const tr = (v) => (v && typeof v === "object" && !Array.isArray(v) ? (v[lang] ?? v.az ?? v.en) : v);

  // ================= helpers =================
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const safeUrl = (u) => (/^(https?:|mailto:|assets\/|\.\/|#)/i.test(String(u || "")) ? esc(u) : "");
  const upper = (s) => String(s || "").toLocaleUpperCase(lang === "az" ? "az" : "en");
  const fmtDate = (d) => {
    if (!d) return "";
    const [y, m, day] = String(d).split("-");
    if (!m) return y;
    return (day ? Number(day) + " " : "") + t("months")[Number(m) - 1] + " " + y;
  };
  const byDateDesc = (a, b) => String(b.date || "").localeCompare(String(a.date || ""));
  const SEVS = ["critical", "high", "medium", "low", "info"];
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  const chips = (arr) => (arr || []).map((x) => `<span class="chip">${esc(x)}</span>`).join("");
  const linkAttrs = (u) => (u ? ` href="${safeUrl(u)}" target="_blank" rel="noopener"` : "");
  const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const readMeta = (a) => esc(fmtDate(a.date)) + (a.readTime ? " · " + esc(a.readTime) + " " + t("a.min") : "");

  // ================= hangman letters =================
  function buildWord(el, text) {
    const w = upper(text).trim();
    el.setAttribute("aria-label", w);
    el.innerHTML = w.split(/\s+/).map((part) =>
      `<span class="hw-word" aria-hidden="true">${[...part].map((c) => `<span class="hl">${esc(c)}</span>`).join("")}</span>`
    ).join("");
  }
  function revealWord(el, { speed = 70, redLast = true } = {}) {
    const letters = $$(".hl", el);
    if (reduced) { letters.forEach((l) => l.classList.add("on")); return; }
    shuffle(letters.slice()).forEach((l, i, arr) => setTimeout(() => {
      l.classList.add("on");
      if (redLast && i === arr.length - 1) l.classList.add("red");
    }, i * speed));
  }

  // ================= theme =================
  const THEMES = ["noir", "paper", "midnight"];
  let theme = [QS.get("theme"), store.get("theme")].find((x) => THEMES.includes(x)) || "noir";
  function applyTheme() {
    if (theme === "noir") delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
    $$(".theme-toggle").forEach((b) => {
      b.innerHTML = `<span class="theme-swatch"></span><span class="theme-name">${esc(t("theme." + theme))}</span>`;
      b.title = (lang === "az" ? "Tema: " : "Theme: ") + t("theme." + theme);
      b.setAttribute("aria-label", b.title);
    });
  }
  $$(".theme-toggle").forEach((b) => b.addEventListener("click", () => {
    theme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
    store.set("theme", theme);
    applyTheme();
  }));

  // ================= language =================
  $$(".lang-toggle").forEach((b) => b.addEventListener("click", () => {
    lang = lang === "az" ? "en" : "az";
    store.set("lang", lang);
    renderAll(true);
  }));

  // ================= nav =================
  const nav = $(".nav"), toggle = $(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => toggle.setAttribute("aria-expanded", nav.classList.toggle("open")));
    $$(".nav-links a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("open")));
  }

  const articles = (S.articles || []).slice().sort(byDateDesc);
  const articleCard = (a) => `
    <a class="card article-card reveal" href="post.html?slug=${encodeURIComponent(a.slug)}">
      <span class="meta">${readMeta(a)}</span>
      <h3>${esc(tr(a.title))}</h3>
      <p class="muted">${esc(tr(a.summary))}</p>
      <div class="chips">${chips(a.tags)}</div>
    </a>`;

  // ================= static texts =================
  function renderStatic(isSwitch) {
    document.documentElement.lang = lang;
    $$("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-html]").forEach((el) => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$("[data-i18n-ph]").forEach((el) => { el.placeholder = t(el.dataset.i18nPh); el.setAttribute("aria-label", t(el.dataset.i18nPh)); });
    $$("[data-bind]").forEach((el) => { el.textContent = tr(S[el.dataset.bind]) ?? ""; });
    $$(".lang-toggle").forEach((b) => { b.innerHTML = lang === "az" ? "<b>AZ</b> / EN" : "AZ / <b>EN</b>"; });
    const y = $("#year"); if (y) y.textContent = new Date().getFullYear();
    applyTheme();
    $$(".hang-word").forEach((el) => {
      buildWord(el, t(el.dataset.word));
      if (isSwitch && el.classList.contains("done")) revealWord(el);
    });
  }

  // ================= HOME =================
  let sevFilter = "all", rolesTimer = null;
  function renderHome(isSwitch) {
    if (!$("#home")) return;
    const ach = (S.achievements || []).slice().sort(byDateDesc);

    const cv = $("#cv-btn");
    if (cv && S.cv) { cv.href = S.cv; cv.hidden = false; }

    const nameEl = $("#hang-name");
    // Ad üçün adi böyük hərflər (DAVID, DAVİD yox)
    buildWord(nameEl, String(S.name || S.handle || "hangman").toUpperCase());
    nameEl.style.setProperty("--n", Math.max(4, ...String(S.name || "hangman").trim().split(/\s+/).map((w) => [...w].length)));
    setTimeout(() => revealWord(nameEl, { speed: isSwitch ? 40 : 110 }), isSwitch ? 0 : 500);

    // typed roles
    clearTimeout(rolesTimer);
    const typed = $("#typed"), roles = tr(S.roles) || [];
    if (typed && roles.length) {
      let r = 0, i = 0, del = false;
      const tick = () => {
        const w = roles[r];
        typed.textContent = w.slice(0, i);
        let wait = del ? 35 : 75;
        if (!del && i < w.length) i++;
        else if (!del) { del = true; wait = 1700; }
        else if (i > 0) i--;
        else { del = false; r = (r + 1) % roles.length; }
        rolesTimer = setTimeout(tick, wait);
      };
      rolesTimer = setTimeout(tick, isSwitch ? 0 : 1200);
    }

    // stats + tally
    if (!isSwitch) {
      const st = S.stats || {};
      const auto = {
        bugs: ach.reduce((n, a) => n + (Number(a.count) || 1), 0),
        companies: new Set(ach.map((a) => a.company)).size,
        cves: (S.cves || []).filter((c) => !c.pending).length,
        ctfs: (S.ctfs || []).length,
        hackathons: (S.hackathons || []).length
      };
      const val = (k) => Number(st[k] ?? auto[k] ?? 0);
      $$("[data-stat]").forEach((el) => {
        const target = val(el.dataset.stat);
        if (reduced) { el.textContent = target; return; }
        const t0 = performance.now(), dur = 1400;
        const step = (now) => {
          const p = Math.min(1, (now - t0) / dur);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
      $$("[data-tally]").forEach((el) => {
        let n = Math.min(val(el.dataset.tally), 30), html = "";
        while (n > 0) {
          const g = Math.min(5, n);
          html += `<span class="tally-g${g === 5 ? " five" : ""}">${"<i></i>".repeat(Math.min(g, 4))}</span>`;
          n -= g;
        }
        el.innerHTML = html;
      });
    }

    // achievements
    const total = ach.length;
    const renderAch = () => {
      const list = ach.map((a, i) => ({ ...a, no: total - i })).filter((a) => sevFilter === "all" || a.severity === sevFilter);
      set("achievements-list", list.map((a) => {
        const tag = a.link ? "a" : "div";
        const logo = a.logo ? `<img src="${safeUrl(a.logo)}" alt="${esc(a.company)}" loading="lazy">` : esc(upper((a.company || "?").charAt(0)));
        const note = tr(a.note);
        return `<${tag} class="dossier reveal"${linkAttrs(a.link)}>
          <span class="case-no">${t("case")} #${String(a.no).padStart(3, "0")}</span>
          <div class="dossier-top">
            <span class="logo">${logo}</span>
            <div><h3>${esc(a.company)}</h3><span class="type">${esc(tr(a.type))}</span></div>
            ${Number(a.count) > 1 ? `<span class="count">×${Number(a.count)}</span>` : ""}
          </div>
          ${note ? `<p class="note">${esc(note)}</p>` : ""}
          <div class="dossier-foot"><span class="date">${esc(fmtDate(a.date))}</span>
          <span class="stamp sev-${esc(a.severity || "none")}">${esc(upper(t("sev." + (a.severity || "none"))))}</span></div>
        </${tag}>`;
      }).join("") || `<p class="empty">${t("empty")}</p>`);
      observe();
    };
    const sevs = ["all", ...SEVS.filter((k) => ach.some((a) => a.severity === k))];
    set("sev-filters", sevs.map((k) =>
      `<button class="filter${k === sevFilter ? " active" : ""}" data-sev="${k}">${k === "all" ? t("f.all") : t("sev." + k)} · ${(k === "all" ? ach : ach.filter((a) => a.severity === k)).length}</button>`).join(""));
    $("#sev-filters").hidden = sevs.length < 2 || ach.length < 5; // az kart varsa filtrə ehtiyac yoxdur
    $("#sev-filters").onclick = (e) => {
      const b = e.target.closest(".filter"); if (!b) return;
      sevFilter = b.dataset.sev;
      $$("#sev-filters .filter").forEach((x) => x.classList.toggle("active", x === b));
      renderAch();
    };
    renderAch();

    // CTF
    set("ctf-list", (S.ctfs || []).slice().sort(byDateDesc).map((c) => {
      const tag = c.link ? "a" : "div";
      return `<${tag} class="ctf-row reveal"${linkAttrs(c.link)}>
        <span class="ctf-place">${esc(tr(c.place))}</span>
        <h4>${esc(tr(c.name))}<br><span class="meta">${esc(tr(c.team))}</span></h4>
        <span class="meta">${esc(fmtDate(c.date))}</span>
      </${tag}>`;
    }).join("") || `<p class="muted">${t("none")}</p>`);

    // hackathons
    set("hack-list", (S.hackathons || []).slice().sort(byDateDesc).map((h) => {
      const tag = h.link ? "a" : "div";
      return `<${tag} class="hack reveal"${linkAttrs(h.link)}>
        <div class="hack-award"><span class="medal" aria-hidden="true">✦</span>${esc(tr(h.award))}</div>
        <h3>${esc(tr(h.name))}</h3>
        <span class="meta">${[fmtDate(h.date), tr(h.team)].filter(Boolean).map(esc).join(" · ")}</span>
        ${h.project ? `<p class="hack-project"><span class="muted">${t("h.project")}:</span> <b>${esc(tr(h.project))}</b></p>` : ""}
        ${tr(h.desc) ? `<p class="muted hack-desc">${esc(tr(h.desc))}</p>` : ""}
        <div class="chips">${chips(h.tech)}</div>
        ${h.link ? `<span class="hack-link">↗</span>` : ""}
      </${tag}>`;
    }).join("") || `<p class="muted">${t("none")}</p>`);

    // CVE (boşdursa gizlət)
    const hasCve = (S.cves || []).length > 0;
    const cveBox = $("#cves"); if (cveBox) cveBox.hidden = !hasCve;
    const ctfSec = $("#ctf"); if (ctfSec) ctfSec.classList.toggle("no-cve", !hasCve);
    const ctfWord = $("#ctf .hang-word");
    if (ctfWord && !hasCve && ctfWord.dataset.word !== "w.ctfOnly") { ctfWord.dataset.word = "w.ctfOnly"; buildWord(ctfWord, t("w.ctfOnly")); }
    const cveStat = $('[data-stat="cves"]'); if (cveStat) cveStat.closest(".stat").hidden = !(S.cves || []).some((c) => !c.pending) && (S.stats || {}).cves == null;
    set("cve-list", (S.cves || []).slice().sort(byDateDesc).map((c) => {
      const tag = c.link ? "a" : "div";
      return `<${tag} class="card reveal"${linkAttrs(c.link)}>
        <span class="cve-id">${esc(c.id || t("cve.req"))}</span>${c.pending ? ` <span class="pending">${t("cve.pending")}</span>` : ""}
        <h4>${esc(tr(c.title))}</h4>
        <span class="meta">${esc(c.product)} · ${esc(fmtDate(c.date))}</span>
      </${tag}>`;
    }).join("") || `<p class="muted">${t("none")}</p>`);

    // skills
    set("skills-list", (S.skills || []).map((g, i) =>
      `<div class="card skill-card reveal"><h3><span>${String(i + 1).padStart(2, "0")}/</span>${esc(tr(g.group))}</h3><div class="chips">${chips(tr(g.items))}</div></div>`).join(""));

    // experience
    set("exp-list", (S.experience || []).map((x) => `
      <div class="tl-item reveal">
        <span class="meta">${esc(tr(x.period))}</span>
        <h4>${esc(tr(x.role))}</h4>
        <span class="muted">${esc(tr(x.company))}</span>
        <ul>${(tr(x.points) || []).map((p) => `<li>${esc(p)}</li>`).join("")}</ul>
      </div>`).join(""));

    // certs
    set("cert-list", (S.certs || []).map((c) => {
      const tag = c.link ? "a" : "div";
      return `<${tag} class="card cert reveal"${linkAttrs(c.link)}>
        <span class="cert-seal" aria-hidden="true">✓</span>
        <div><h4>${esc(tr(c.name))}</h4>${c.full ? `<span class="cert-full">${esc(tr(c.full))}</span>` : ""}
        <span class="meta">${[tr(c.issuer), c.date].filter(Boolean).map(esc).join(" · ")}</span></div>
      </${tag}>`;
    }).join(""));

    set("latest-articles", articles.slice(0, 4).map(articleCard).join("") || `<p class="muted">${t("a.soon")}</p>`);

    // socials
    const LABELS = { email: "E-mail", github: "GitHub", linkedin: "LinkedIn", twitter: "X / Twitter", hackerone: "HackerOne", bugcrowd: "Bugcrowd", telegram: "Telegram", medium: "Medium" };
    set("socials", Object.entries(S.contact || {}).filter(([, v]) => v).map(([k, v]) =>
      `<a class="social" href="${safeUrl(k === "email" ? "mailto:" + v : v)}" target="_blank" rel="noopener">${LABELS[k] || esc(k)} ↗</a>`).join(""));

    if (game) game.relabel(); else game = initGame();
    initScope();
  }

  // ================= HERO SCOPE: crosshair hunts a bug =================
  // Böcək dairə içində gəzir, nişangah onu izləyir, kilidləyir və "əzir".
  // Siçan dairənin üstündədirsə nişangah siçanı izləyir, böcəyə klik = əzmək.
  let scopeReady = false;
  function initScope() {
    const box = $("#scope");
    if (!box || scopeReady) return;
    scopeReady = true;
    const svg = $("svg", box);
    const bug = $("#sc-bug"), ret = $("#sc-reticle"), splat = $("#sc-splat");
    const elStatus = $("#hud-status"), elCoords = $("#hud-coords"), elCount = $("#hud-count");
    const C = 160, R = 122;

    // radar ticks
    $(".sc-ticks", box).innerHTML = Array.from({ length: 36 }, (_, i) => {
      const a = (i * 10 * Math.PI) / 180, r1 = i % 9 === 0 ? 138 : 144;
      return `<line x1="${C + Math.cos(a) * r1}" y1="${C + Math.sin(a) * r1}" x2="${C + Math.cos(a) * 150}" y2="${C + Math.sin(a) * 150}"/>`;
    }).join("");

    const L = {
      az: { scan: "HƏDƏF AXTARILIR", track: "İZLƏNİR", lock: "HƏDƏF KİLİDLƏNDİ", kill: "BUG ƏZİLDİ", manual: "ƏL İLƏ NİŞAN", miss: "QAÇIRDIN", count: "əzilən" },
      en: { scan: "SCANNING", track: "TRACKING", lock: "TARGET LOCKED", kill: "BUG SQUASHED", manual: "MANUAL AIM", miss: "MISSED", count: "squashed" }
    };
    const lbl = (k) => (L[lang] || L.az)[k];

    const rnd = (a, b) => a + Math.random() * (b - a);
    const inCircle = () => { const a = rnd(0, Math.PI * 2), r = Math.sqrt(Math.random()) * R; return { x: C + Math.cos(a) * r, y: C + Math.sin(a) * r }; };
    const onEdge = () => { const a = rnd(0, Math.PI * 2); return { x: C + Math.cos(a) * (R + 10), y: C + Math.sin(a) * (R + 10) }; };

    let b = onEdge(), heading = Math.atan2(C - b.y, C - b.x), wp = inCircle();
    let r = { x: C, y: C }, state = "scan", lockT = 0, stateUntil = 0, kills = 0, flash = "";
    let mouse = null, visible = true, raf = 0, last = performance.now();

    function setState(s, ms) { state = s; stateUntil = ms ? performance.now() + ms : 0; box.dataset.state = s; }
    function squash() {
      kills++;
      splat.setAttribute("transform", `translate(${b.x.toFixed(1)} ${b.y.toFixed(1)})`);
      splat.setAttribute("opacity", "1");
      bug.style.opacity = "0";
      setState("kill", 1300);
    }
    function respawn() {
      b = onEdge(); wp = inCircle(); heading = Math.atan2(wp.y - b.y, wp.x - b.x);
      splat.setAttribute("opacity", "0");
      bug.style.opacity = "1";
      lockT = 0;
      setState("scan");
    }

    function step() {
      const now = performance.now(); // tək saat mənbəyi
      const dt = Math.max(0, Math.min(48, now - last)) / 16.7; last = now;
      if (state === "kill" && now > stateUntil) respawn();
      if (state === "lock" && now > stateUntil) squash();

      // bug movement
      if (state !== "kill") {
        const speed = state === "lock" ? 0.25 : 1.05;
        let want = Math.atan2(wp.y - b.y, wp.x - b.x);
        let d = want - heading; d = Math.atan2(Math.sin(d), Math.cos(d));
        heading += Math.max(-0.09, Math.min(0.09, d)) * dt + rnd(-0.03, 0.03);
        b.x += Math.cos(heading) * speed * dt; b.y += Math.sin(heading) * speed * dt;
        if (Math.hypot(wp.x - b.x, wp.y - b.y) < 12) wp = inCircle();
        if (Math.hypot(b.x - C, b.y - C) > R + 14) wp = inCircle();
        bug.setAttribute("transform", `translate(${b.x.toFixed(1)} ${b.y.toFixed(1)}) rotate(${((heading * 180) / Math.PI + 90).toFixed(1)}) scale(1.35)`);
      }

      // reticle
      const target = mouse || (state === "kill" ? { x: C, y: C } : b);
      const k = mouse ? 0.35 : state === "kill" ? 0.03 : state === "scan" ? 0.05 : 0.16;
      r.x += (target.x - r.x) * Math.min(1, k * dt); r.y += (target.y - r.y) * Math.min(1, k * dt);
      ret.setAttribute("transform", `translate(${r.x.toFixed(1)} ${r.y.toFixed(1)})`);

      // auto-lock
      const dist = Math.hypot(b.x - r.x, b.y - r.y);
      if (!mouse && (state === "scan" || state === "track")) {
        if (dist < 40 && state === "scan") setState("track");
        if (dist < 14) { lockT += dt; if (lockT > 50) setState("lock", 750); } else lockT = Math.max(0, lockT - dt * 0.5);
      }
      if (mouse && state !== "kill" && state !== "lock" && state !== "manual") setState("manual");
      if (!mouse && state === "manual") setState("scan");

      // HUD
      const s = flash || (state === "kill" ? lbl("kill") : state === "lock" ? lbl("lock") : state === "track" ? lbl("track") : state === "manual" ? lbl("manual") : lbl("scan"));
      if (elStatus.textContent !== s) elStatus.textContent = s;
      elCoords.textContent = `X:${String(Math.round(r.x)).padStart(3, "0")} Y:${String(Math.round(r.y)).padStart(3, "0")}`;
      const cnt = `${lbl("count")}: ${String(kills).padStart(2, "0")}`;
      if (elCount.textContent !== cnt) elCount.textContent = cnt;

      if (visible) raf = requestAnimationFrame(step);
    }

    // mouse interaction
    const toSvg = (e) => { const p = svg.getBoundingClientRect(); return { x: ((e.clientX - p.left) / p.width) * 320, y: ((e.clientY - p.top) / p.height) * 320 }; };
    svg.addEventListener("pointermove", (e) => { mouse = toSvg(e); });
    svg.addEventListener("pointerleave", () => { mouse = null; });
    svg.addEventListener("pointerdown", (e) => {
      const p = toSvg(e);
      if (state === "kill") return;
      if (Math.hypot(p.x - b.x, p.y - b.y) < 22) squash();
      else { flash = lbl("miss"); box.classList.add("miss"); setTimeout(() => { flash = ""; box.classList.remove("miss"); }, 500); }
    });

    if (reduced) {
      // statik: böcək mərkəzdə, nişangah kilidli
      b = { x: C + 30, y: C - 20 }; r = { ...b };
      bug.setAttribute("transform", `translate(${b.x} ${b.y}) rotate(30) scale(1.35)`);
      ret.setAttribute("transform", `translate(${r.x} ${r.y})`);
      box.dataset.state = "lock"; elStatus.textContent = lbl("lock"); elCount.textContent = "";
      return;
    }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((ents) => {
        visible = ents[0].isIntersecting;
        if (visible) { cancelAnimationFrame(raf); last = performance.now(); raf = requestAnimationFrame(step); }
      }).observe(box);
    }
    setState("scan");
    raf = requestAnimationFrame(step);
  }

  // ================= GAME =================
  let game = null;
  function initGame() {
    const G = S.game || {};
    const pool = (G.words || []).filter((w) => /^[A-Z]+$/.test(String(w.word || "").toUpperCase()));
    const box = $("#game");
    if (!box || !pool.length) { if (box) box.hidden = true; return null; }
    const parts = $$(".game-gallows .part");
    const gallows = $(".game-gallows");
    const MAX = parts.length;
    let cur, word, guessed, misses, over, inView = false, lastIdx = -1;

    const kb = $("#keyboard");
    kb.innerHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map((c) => `<button class="key" data-k="${c}" aria-label="${c}">${c}</button>`).join("");

    const drawWord = (showAll) => {
      $("#game-word").innerHTML = [...word].map((c) => {
        const hit = guessed.has(c);
        // Təxmin olunmamış hərf DOM-a yazılmır — seçib/kopyalayıb görmək olmur
        return `<span class="hl${hit || showAll ? " on" : ""}${!hit && showAll ? " miss" : ""}">${hit || showAll ? c : "&nbsp;"}</span>`;
      }).join("");
    };
    const lives = () => `${t("g.lives")}: ${"♥ ".repeat(MAX - misses)}${"♡ ".repeat(misses)}`;
    const status = () => {
      let html = lives();
      if (over === "win") html = `${t("g.win")} <span class="flag">${esc(G.flag || "flag{survived}")}</span>`;
      if (over === "lose") html = `${t("g.lose")} <b>${esc(word)}</b>`;
      $("#game-status").innerHTML = html;
    };
    const hint = () => { $("#game-hint").textContent = t("g.hint") + ": " + tr(cur.hint); };

    function start() {
      let i; do { i = Math.floor(Math.random() * pool.length); } while (pool.length > 1 && i === lastIdx);
      lastIdx = i; cur = pool[i];
      word = cur.word.toUpperCase();
      guessed = new Set(); misses = 0; over = false;
      parts.forEach((p) => p.classList.remove("show"));
      gallows.classList.remove("dead");
      $$(".key", kb).forEach((k) => { k.disabled = false; k.className = "key"; });
      hint(); drawWord(false); status();
    }
    function guess(c) {
      if (over || guessed.has(c)) return;
      guessed.add(c);
      const key = $(`.key[data-k="${c}"]`, kb);
      key.disabled = true;
      if (word.includes(c)) {
        key.classList.add("hit");
        if ([...word].every((x) => guessed.has(x))) over = "win";
        drawWord(false);
      } else {
        key.classList.add("miss");
        parts[misses].classList.add("show");
        misses++;
        if (misses >= MAX) { over = "lose"; gallows.classList.add("dead"); drawWord(true); }
      }
      status();
      if (over) $$(".key", kb).forEach((k) => (k.disabled = true));
    }

    kb.addEventListener("click", (e) => { const k = e.target.closest(".key"); if (k) guess(k.dataset.k); });
    $("#game-reset").addEventListener("click", start);
    if ("IntersectionObserver" in window) new IntersectionObserver((e) => { inView = e[0].isIntersecting; }, { threshold: 0.4 }).observe(box);
    addEventListener("keydown", (e) => {
      if (!inView || e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
      const c = e.key.toUpperCase();
      if (/^[A-Z]$/.test(c)) guess(c);
      else if (e.key === "Enter" && over) start();
    });
    start();
    return { relabel: () => { hint(); status(); } };
  }

  // ================= BLOG =================
  let activeTag = new URLSearchParams(location.search).get("tag") || "all";
  let blogBound = false;
  function renderBlog() {
    if (!$("#all-articles")) return;
    const tags = [...new Set(articles.flatMap((a) => a.tags || []))].sort();
    const search = $("#search");
    const draw = () => {
      const q = (search.value || "").toLocaleLowerCase().trim();
      const list = articles.filter((a) =>
        (activeTag === "all" || (a.tags || []).includes(activeTag)) &&
        (!q || [tr(a.title), tr(a.summary), ...(a.tags || [])].join(" ").toLocaleLowerCase().includes(q)));
      set("all-articles", list.map(articleCard).join(""));
      $("#no-results").hidden = list.length > 0;
      observe();
    };
    set("tag-filters", ["all", ...tags].map((x) =>
      `<button class="filter${x === activeTag ? " active" : ""}" data-tag="${esc(x)}">${x === "all" ? t("f.all") : "#" + esc(x)}</button>`).join(""));
    $("#tag-filters").onclick = (e) => {
      const b = e.target.closest(".filter"); if (!b) return;
      activeTag = b.dataset.tag;
      $$("#tag-filters .filter").forEach((x) => x.classList.toggle("active", x === b));
      draw();
    };
    if (!blogBound) { search.addEventListener("input", draw); blogBound = true; }
    draw();
  }

  // ================= POST =================
  let progressBound = false;
  function renderPost() {
    const box = $("#post");
    if (!box) return;
    const slug = new URLSearchParams(location.search).get("slug") || "";
    const meta = articles.find((a) => a.slug === slug);
    if (!/^[a-z0-9-]+$/i.test(slug) || !meta) {
      box.innerHTML = `<h1 class="hang-word" id="nf"></h1><p class="typewriter muted">${t("p.nf")}</p><p><a class="btn" href="blog.html">${t("p.back")}</a></p>`;
      const nf = $("#nf"); buildWord(nf, "404 " + t("w.404")); revealWord(nf);
      return;
    }
    document.title = tr(meta.title) + " | " + (S.handle || "Portfolio");
    box.innerHTML = `<p class="muted">${t("p.loading")}</p>`;
    const get = (f) => fetch(f).then((r) => { if (!r.ok) throw new Error(r.status); return r.text(); });
    const file = "posts/" + slug + ".md";
    (lang === "en" ? get("posts/" + slug + ".en.md").catch(() => get(file)) : get(file))
      .then((md) => {
        const html = window.DOMPurify.sanitize(window.marked.parse(md));
        box.innerHTML = `
          <header class="post-head">
            <span class="meta">${readMeta(meta)}</span>
            <h1>${esc(tr(meta.title))}</h1>
            <p class="muted" style="font-size:19px;margin:0">${esc(tr(meta.summary))}</p>
            <div class="chips">${(meta.tags || []).map((x) => `<a class="chip" href="blog.html?tag=${encodeURIComponent(x)}">#${esc(x)}</a>`).join("")}</div>
          </header>
          <div class="post-body">${html}</div>
          <p style="margin-top:50px"><a class="btn" href="blog.html">${t("p.back")}</a></p>`;
        if (window.hljs) $$("pre code", box).forEach((el) => window.hljs.highlightElement(el));
      })
      .catch(() => { box.innerHTML = `<h1>Error</h1><p class="muted">${t("p.err")}</p>`; });
    if (!progressBound) {
      progressBound = true;
      const bar = $("#progress");
      addEventListener("scroll", () => {
        const h = document.documentElement;
        bar.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100 + "%";
      }, { passive: true });
    }
  }

  // ================= reveal on scroll =================
  function observe() {
    const targets = $$(".reveal:not(.in), .hang-word:not(.done)");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => { el.classList.add("in", "done"); if (el.classList.contains("hang-word")) revealWord(el); });
      return;
    }
    io = io || new IntersectionObserver((ents) => ents.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.classList.contains("hang-word")) { el.classList.add("done"); revealWord(el); }
      else el.classList.add("in");
      io.unobserve(el);
    }), { threshold: 0.15 });
    targets.forEach((el) => io.observe(el));
  }

  function renderAll(isSwitch) {
    renderStatic(isSwitch);
    renderHome(isSwitch);
    renderBlog();
    renderPost();
    observe();
    if (isSwitch) $$(".reveal").forEach((el) => el.classList.add("in"));
  }
  renderAll(false);
})();
