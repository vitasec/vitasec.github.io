/* =========================================================
   SAYTIN BÜTÜN MƏZMUNU BURADADIR
   Mətnləri iki dildə yazmaq üçün: { az: "...", en: "..." }
   Sadə mətn yazsanız, hər iki dildə eyni göstərilir.
   ========================================================= */
window.SITE = {
  // ---------- Əsas məlumat ----------
  name: "David Abdurahmanov",
  handle: "hangman",
  location: { az: "Bakı, Azərbaycan", en: "Baku, Azerbaijan" },
  roles: {
    az: ["Security Researcher", "Penetration Tester", "Source Code Auditor", "Hakaton Qalibi"],
    en: ["Security Researcher", "Penetration Tester", "Source Code Auditor", "Hackathon Winner"]
  },
  bio: {
    az: "Sistemlərin görünən funksionallığından daha dərinə enir, source code və biznes məntiqini analiz edərək gizli zəiflikləri üzə çıxarıram. Tətbiqlərin necə sındırıla biləcəyini anlamaqla kifayətlənmir, hər aşkarladığım boşluğu texniki sübut və məsuliyyətli açıqlama ilə nəticəyə çevirirəm.",
    en: "I go deeper than what a system shows on the surface, analyzing source code and business logic to uncover hidden vulnerabilities. Understanding how an application can be broken isn't enough for me: I turn every flaw I find into a result, backed by technical proof and responsible disclosure."
  },
  cv: "", // məs: "assets/cv.pdf" — boş qalsa düymə gizlənir

  // ---------- Əlaqə / sosial ----------
  contact: {
    email: "",          // məs: "siz@example.com"
    github: "https://github.com/vitasec",
    linkedin: "", // profil linki lazımdır: "https://www.linkedin.com/in/<istifadəçi-adı>/"
    medium: "https://medium.com/@davidabdurahmanov38",
    twitter: "",
    hackerone: "",
    bugcrowd: "",
    telegram: ""
  },

  // ---------- Statistika ----------
  // null qalsa, aşağıdakı siyahılardan avtomatik hesablanır
  stats: { bugs: null, companies: null, cves: null, ctfs: null, hackathons: null },

  // ---------- Hall of Fame / Uğurlar ----------
  // Hər layihə/şirkət üçün bir kart.
  // severity: critical | high | medium | low | info  (ən yüksək ciddilik; boş qalsa "Bildirildi")
  // count: tapılan zəiflik sayı (statistikada cəmlənir)
  // logo: "assets/img/logos/fayl.png" (istəyə bağlı)
  achievements: [
    { company: "Ever Gauzy", type: "Ever Technologies", severity: "", count: 6, date: "2026-07", logo: "", link: "",
      note: {
        az: "Mənbə kodu analizi ilə 6 zəiflik: tenant-lar arası məlumat sızması, JWT ilə deaktiv hesabın girişi, rate-limit bypass, webhook imza yoxlamasının olmaması və s.",
        en: "6 vulnerabilities via source-code review: cross-tenant data leak, deactivated accounts keeping JWT access, rate-limit bypass, missing webhook signature checks and more."
      } },
    { company: "TastyIgniter", type: "2 High · 1 Medium · 1 Low", severity: "high", count: 4, date: "2026-08", logo: "", link: "",
      note: {
        az: "4 zəiflik: Mollie ödənişində sifariş statusunun saxtalaşdırılması, SSRF gadget və şifrə bərpasında timing side-channel-lar. Hamısı üçün CVE sorğusu göndərilib.",
        en: "4 vulnerabilities: Mollie payment order-status forgery, an SSRF gadget and timing side-channels in password reset. CVE requests submitted for all."
      } }
  ],

  // ---------- CTF nəticələri ----------
  ctfs: [
    { name: "Nümunə CTF 2026", place: { az: "1-ci yer", en: "1st place" }, team: "Komanda adı", date: "2026-10", link: "" },
    { name: "Nümunə Online CTF", place: "Top 10", team: "Solo", date: "2026-06", link: "" },
    { name: "Universitetlərarası CTF", place: { az: "3-cü yer", en: "3rd place" }, team: "Komanda adı", date: "2026-02", link: "" }
  ],

  // ---------- Hakatonlar ----------
  // award: mükafat/yer, project: layihə adı, tech: istifadə olunan texnologiyalar
  hackathons: [
    {
      name: "Holberton School Azerbaijan Hackathon",
      award: { az: "1-ci yer", en: "1st place" },
      project: "AI-powered GRC Dashboard",
      desc: {
        az: "41 komanda arasında 1-ci yer. Kiçik və orta bizneslər və startaplar üçün kibertəhlükəsizlik risklərini və uyğunluğu idarə edən platforma: ISO 27001 uyğunluq xəritələməsini AI ilə avtomatlaşdırır, risk idarəetməsini sadələşdirir və prioritetləşdirilmiş təhlükəsizlik tövsiyələri verir.",
        en: "1st out of 41 teams. A platform that helps SMEs and startups manage cybersecurity risk and compliance: AI-automated ISO 27001 compliance mapping, simplified risk-management workflows and prioritized security recommendations."
      },
      team: { az: "5 nəfərlik komanda · 41 komanda arasında", en: "Team of 5 · out of 41 teams" },
      tech: ["AI", "GRC", "ISO 27001", "Risk Management"],
      date: "", // məs: "2026-05"
      link: ""  // LinkedIn post və ya GitHub linki
    }
  ],

  // ---------- CVE-lər ----------
  // Siyahı boşdursa CVE bölməsi və statistikası gizlənir.
  // Təsdiq gözləyən CVE üçün: pending: true  (id hələ yoxdursa id: "" yazın)
  // nümunə: { id: "", pending: true, date: "2026-11", title: { az: "...", en: "..." }, product: "...", link: "" }
  cves: [
    { id: "", pending: true, date: "2026-08", product: "TastyIgniter", link: "",
      title: { az: "Mollie ödənişində sifariş statusunun saxtalaşdırılması", en: "Mollie payment order status forgery" } },
    { id: "", pending: true, date: "2026-08", product: "TastyIgniter", link: "",
      title: { az: "Media::addFromUrl() SSRF gadget", en: "SSRF gadget in Media::addFromUrl()" } },
    { id: "", pending: true, date: "2026-08", product: "TastyIgniter", link: "",
      title: { az: "Şifrə bərpa kodunda timing side-channel", en: "Timing side-channel in password reset code comparison" } },
    { id: "", pending: true, date: "2026-08", product: "TastyIgniter", link: "",
      title: { az: "Şifrə bərpasında cavab vaxtı ilə hesab mövcudluğunun sızması", en: "Account existence leak via password-reset response timing" } }
  ],

  // ---------- Bacarıqlar ----------
  skills: [
    { group: { az: "Tətbiq Təhlükəsizliyi", en: "Application Security" }, items: ["OWASP Top 10", "API Security", "Business Logic", "Access Control"] },
    { group: { az: "Mənbə Kodu Analizi", en: "Source Code Review" }, items: ["Manual review", "PHP / Laravel", "Node.js / NestJS", "Auth & JWT flaws"] },
    { group: "Red Team", items: ["Active Directory", "C2 operations", "Lateral movement", "Privilege escalation"] },
    { group: { az: "Alətlər", en: "Tooling" }, items: ["Burp Suite Pro", "Nuclei", "ffuf", "Semgrep"] },
    { group: "Recon", items: ["Subfinder / Amass", "httpx", "Nmap", "OSINT"] },
    { group: { az: "Proqramlaşdırma", en: "Programming" }, items: ["Python", "Bash", "JavaScript / TypeScript", "PHP"] }
  ],

  // ---------- Təcrübə ----------
  experience: [
    {
      role: "Security Researcher",
      company: "TastyIgniter · Self-employed · Remote",
      period: { az: "Avq 2026 — Sen 2026", en: "Aug 2026 — Sep 2026" },
      points: {
        az: [
          "Əl ilə mənbə kodu analizi ilə TastyIgniter-də 4 zəiflik aşkarladım və məsuliyyətli şəkildə bildirdim.",
          "GitHub Security Advisories vasitəsilə maintainer-lərlə koordinasiyalı açıqlama: 2 High, 1 Medium, 1 Low.",
          "Reporter və collaborator kimi qeyd olundum; hər 4 tapıntı üçün CVE sorğusu göndərildi."
        ],
        en: [
          "Discovered and responsibly disclosed four vulnerabilities in TastyIgniter through manual source-code review.",
          "Coordinated disclosure with maintainers via GitHub Security Advisories; published as 2 High, 1 Medium and 1 Low.",
          "Credited as Reporter and collaborator; CVE requests submitted for all four findings."
        ]
      }
    },
    {
      role: "Penetration Tester",
      company: "Ever Technologies · Self-employed",
      period: { az: "İyl 2026 — Sen 2026", en: "Jul 2026 — Sep 2026" },
      points: {
        az: [
          "Ever Gauzy layihəsinə xarici təhlükəsizlik tədqiqatçısı kimi töhfə verdim.",
          "Mənbə kodu analizi və təhlükəsizlik testləri ilə bir neçə zəiflik aşkarlayıb məsuliyyətli şəkildə bildirdim.",
          "Avtorizasiya, giriş nəzarəti, autentifikasiya və tətbiq təhlükəsizliyi mexanizmlərində problemlər müəyyən etdim."
        ],
        en: [
          "Served as an external security research contributor to Ever Gauzy.",
          "Discovered and responsibly disclosed multiple vulnerabilities through manual source-code review and security testing.",
          "Identified issues affecting authorization, access control, authentication and application security controls."
        ]
      }
    }
  ],

  // ---------- Sertifikatlar ----------
  certs: [
    { name: "eWPTX", full: "Web Application Penetration Tester eXtreme", issuer: "INE Security", date: "", link: "" },
    { name: "CRTO", full: "Certified Red Team Operator", issuer: "Zero-Point Security", date: "", link: "" },
    { name: "CPTS", full: "Certified Penetration Testing Specialist", issuer: "Hack The Box", date: "", link: "" },
    { name: "BSCP", full: "Burp Suite Certified Practitioner", issuer: "PortSwigger", date: "", link: "" }
  ],

  // ---------- Hangman oyunu (söz yalnız A-Z hərfləri) ----------
  game: {
    flag: "flag{hangman_survived}",
    words: [
      { word: "XSS", hint: { az: "Brauzerdə başqasının adından JavaScript işlətmək", en: "Running JavaScript in someone else's browser" } },
      { word: "INJECTION", hint: { az: "İstifadəçi girişi birbaşa sorğuya düşür", en: "User input ends up straight in a query" } },
      { word: "PHISHING", hint: { az: "Saxta e-poçt ilə şifrə oğurlamaq", en: "Stealing passwords with fake emails" } },
      { word: "FIREWALL", hint: { az: "Şəbəkə trafikini süzgəcdən keçirən qoruyucu", en: "Filters network traffic" } },
      { word: "EXPLOIT", hint: { az: "Zəiflikdən istifadə edən kod", en: "Code that abuses a vulnerability" } },
      { word: "PAYLOAD", hint: { az: "Hücumun icra olunan hissəsi", en: "The part of an attack that actually runs" } },
      { word: "RECON", hint: { az: "Hücumdan əvvəl məlumat toplama", en: "Information gathering before an attack" } },
      { word: "BACKDOOR", hint: { az: "Sistemə gizli giriş qapısı", en: "A hidden way into a system" } },
      { word: "RANSOMWARE", hint: { az: "Faylları şifrələyib pul tələb edir", en: "Encrypts files and demands money" } },
      { word: "PRIVILEGE", hint: { az: "Escalation ilə artırılan şey", en: "What you escalate" } },
      { word: "BRUTEFORCE", hint: { az: "Bütün şifrələri bir-bir yoxlamaq", en: "Trying every password one by one" } },
      { word: "SANDBOX", hint: { az: "Şübhəli kodu təcrid olunmuş mühitdə işlətmək", en: "Running suspicious code in isolation" } },
      // --- Veb zəiflikləri ---
      { word: "IDOR", hint: { az: "ID-ni dəyişib başqasının məlumatını görmək", en: "Change an ID, see someone else's data" } },
      { word: "CSRF", hint: { az: "İstifadəçinin adından istəmədiyi sorğu göndərmək", en: "Forcing a user to send a request they didn't intend" } },
      { word: "SSRF", hint: { az: "Serveri daxili ünvanlara sorğu göndərməyə məcbur etmək", en: "Making the server request internal addresses" } },
      { word: "CORS", hint: { az: "Brauzerdə domenlər arası sorğu siyasəti", en: "Browser policy for cross-origin requests" } },
      { word: "CLICKJACKING", hint: { az: "Görünməz iframe altında klik oğurlamaq", en: "Stealing clicks with an invisible iframe" } },
      { word: "DESERIALIZATION", hint: { az: "Etibarsız obyektin bərpası ilə kod icrası", en: "Code execution by rebuilding untrusted objects" } },
      { word: "TRAVERSAL", hint: { az: "../../ ilə qovluqdan kənara çıxmaq (Path ...)", en: "Escaping a folder with ../../ (Path ...)" } },
      { word: "SMUGGLING", hint: { az: "Proxy və server sorğunu fərqli oxuyur (HTTP Request ...)", en: "Proxy and server parse a request differently (HTTP Request ...)" } },
      { word: "REDIRECT", hint: { az: "İstifadəçini saxta sayta yönləndirmək (Open ...)", en: "Sending users to a malicious site (Open ...)" } },
      { word: "RACECONDITION", hint: { az: "Eyni anda göndərilən sorğularla limiti aşmaq", en: "Beating a limit with simultaneous requests" } },
      // --- Autentifikasiya / kriptoqrafiya ---
      { word: "TOKEN", hint: { az: "Sessiyanı təsdiqləyən rəqəmsal açar", en: "A digital key that proves your session" } },
      { word: "SESSION", hint: { az: "Giriş etdikdən sonra serverin səni tanıması", en: "How the server remembers you after login" } },
      { word: "HASH", hint: { az: "Geri çevrilməyən barmaq izi funksiyası", en: "A one-way fingerprint function" } },
      { word: "SALT", hint: { az: "Şifrəni hash-ləməzdən əvvəl əlavə olunan təsadüfi dəyər", en: "Random value added before hashing a password" } },
      { word: "ENCRYPTION", hint: { az: "Məlumatı açar olmadan oxunmaz etmək", en: "Making data unreadable without a key" } },
      { word: "CERTIFICATE", hint: { az: "HTTPS-də saytın kimliyini təsdiqləyən sənəd", en: "Proves a website's identity in HTTPS" } },
      { word: "KERBEROS", hint: { az: "Active Directory-nin bilet əsaslı autentifikasiyası", en: "Active Directory's ticket-based authentication" } },
      { word: "MIMIKATZ", hint: { az: "Windows yaddaşından şifrə çıxaran məşhur alət", en: "Famous tool that dumps Windows credentials" } },
      // --- Red team / şəbəkə ---
      { word: "PIVOTING", hint: { az: "Ələ keçirilmiş maşından daxili şəbəkəyə keçmək", en: "Using a compromised host to reach internal networks" } },
      { word: "PERSISTENCE", hint: { az: "Yenidən başladıqdan sonra da sistemdə qalmaq", en: "Staying on a system even after a reboot" } },
      { word: "BEACON", hint: { az: "C2 serverinə mütəmadi siqnal göndərən agent", en: "An implant that checks in with a C2 server" } },
      { word: "SHELLCODE", hint: { az: "Yaddaşa yeridilən kiçik maşın kodu", en: "Small machine code injected into memory" } },
      { word: "ROOTKIT", hint: { az: "Özünü əməliyyat sistemində gizlədən zərərli proqram", en: "Malware that hides itself inside the OS" } },
      { word: "KEYLOGGER", hint: { az: "Basılan düymələri qeyd edən proqram", en: "Records every key you press" } },
      { word: "BOTNET", hint: { az: "Uzaqdan idarə olunan yoluxmuş cihazlar ordusu", en: "An army of remotely controlled infected devices" } },
      { word: "TROJAN", hint: { az: "Faydalı proqram kimi görünən zərərli proqram", en: "Malware disguised as useful software" } },
      { word: "WORM", hint: { az: "Özü-özünü şəbəkədə yayan zərərli proqram", en: "Malware that spreads itself across networks" } },
      { word: "SPOOFING", hint: { az: "Başqasının IP və ya e-poçt ünvanını saxtalaşdırmaq", en: "Faking someone else's IP or email address" } },
      { word: "SNIFFING", hint: { az: "Şəbəkə trafikini gizlicə dinləmək", en: "Secretly capturing network traffic" } },
      { word: "PORTSCAN", hint: { az: "Açıq portları axtarmaq (nmap bunu edir)", en: "Looking for open ports (what nmap does)" } },
      { word: "HONEYPOT", hint: { az: "Hücumçuları cəlb etmək üçün qurulmuş tələ", en: "A trap set up to lure attackers" } },
      // --- Ümumi ---
      { word: "ZERODAY", hint: { az: "Hələ heç kimin bilmədiyi və yamağı olmayan zəiflik", en: "A vulnerability nobody knows about yet, with no patch" } },
      { word: "PATCH", hint: { az: "Zəifliyi bağlayan yeniləmə", en: "An update that fixes a vulnerability" } },
      { word: "FUZZING", hint: { az: "Proqrama təsadüfi girişlər verib xəta axtarmaq", en: "Throwing random input at software to find bugs" } },
      { word: "MALWARE", hint: { az: "Zərərli proqram təminatının ümumi adı", en: "The general name for malicious software" } },
      { word: "ENUMERATION", hint: { az: "İstifadəçi, servis və resursları siyahıya almaq", en: "Listing users, services and resources" } },
      { word: "FORENSICS", hint: { az: "Hücumdan sonra rəqəmsal izləri araşdırmaq", en: "Investigating digital traces after an attack" } },
      { word: "STEGANOGRAPHY", hint: { az: "Mesajı şəkil və ya faylın içində gizlətmək", en: "Hiding a message inside an image or file" } },
      { word: "WIRESHARK", hint: { az: "Paketləri analiz edən məşhur alət", en: "Famous packet analysis tool" } },
      { word: "BURPSUITE", hint: { az: "Veb pentesterlərin əsas proxy aləti", en: "The web pentester's go-to proxy tool" } },
      { word: "OSINT", hint: { az: "Açıq mənbələrdən kəşfiyyat toplamaq", en: "Intelligence from public sources" } },
      { word: "VULNERABILITY", hint: { az: "Sistemdəki təhlükəsizlik boşluğu", en: "A security weakness in a system" } }
    ]
  },

  // ---------- Məqalələr ----------
  // posts/<slug>.md (AZ) və istəyə bağlı posts/<slug>.en.md (EN) faylları
  articles: [
    {
      slug: "ilk-bug-bounty-tapintim",
      title: { az: "İlk bug bounty tapıntım: IDOR necə tapdım", en: "My first bug bounty find: how I found an IDOR" },
      date: "2026-10-20",
      tags: ["bug-bounty", "idor", "web"],
      summary: {
        az: "Sadə bir ID dəyişikliyi ilə minlərlə istifadəçinin məlumatına necə çıxış əldə etdim və bunu necə bildirdim.",
        en: "How a simple ID change exposed thousands of users' data, and how I reported it."
      },
      readTime: 6
    },
    {
      slug: "recon-metodologiyasi",
      title: { az: "Mənim recon metodologiyam", en: "My recon methodology" },
      date: "2026-09-02",
      tags: ["recon", "osint", "methodology"],
      summary: {
        az: "Subdomain kəşfindən endpoint toplamağa qədər istifadə etdiyim alətlər və addımlar.",
        en: "The tools and steps I use, from subdomain discovery to endpoint collection."
      },
      readTime: 8
    }
  ]
};
