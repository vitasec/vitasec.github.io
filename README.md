# Kibertəhlükəsizlik Portfolio Saytı

Statik sayt (HTML + CSS + JS), heç bir build addımı lazım deyil. GitHub Pages üçün hazırdır.

## Struktur

```
index.html        Ana səhifə (uğurlar, CTF, CVE, bacarıqlar, təcrübə, məqalələr, əlaqə)
blog.html         Bütün məqalələr (axtarış + teq filtri)
post.html         Tək məqalə səhifəsi (?slug=...)
data/site.js      ⭐ BÜTÜN MƏZMUN BURADADIR
posts/*.md        Məqalələr (Markdown)
assets/css/       Dizayn
assets/js/        Məntiq
assets/img/logos/ Şirkət loqoları
```

## Məzmunu dəyişmək

Hər şeyi `data/site.js` faylında dəyişin: ad, bio, sosial linklər, uğurlar, CTF-lər, CVE-lər, bacarıqlar, təcrübə, sertifikatlar.

- **Yeni uğur:** `achievements` siyahısına bir sətir əlavə edin. `severity`: `critical`, `high`, `medium`, `low`, `info`. Loqo üçün şəkli `assets/img/logos/` qovluğuna qoyub `logo: "assets/img/logos/ad.png"` yazın.
- **CV:** PDF-i `assets/cv.pdf` kimi qoyun və `cv: "assets/cv.pdf"` yazın.
- Statistika rəqəmləri siyahılardan avtomatik hesablanır.

## Yeni məqalə əlavə etmək

1. `posts/menim-meqalem.md` faylı yaradın (Markdown, kod blokları dəstəklənir).
2. `data/site.js` → `articles` siyahısına əlavə edin:
   ```js
   { slug: "menim-meqalem", title: "Başlıq", date: "2026-11-12",
     tags: ["ctf", "web"], summary: "Qısa təsvir", readTime: 5 }
   ```
   `slug` fayl adı ilə eyni olmalıdır (yalnız latın hərfləri, rəqəm və `-`).

## Lokal baxmaq

Məqalələr `fetch` ilə yükləndiyi üçün faylı birbaşa açmaq əvəzinə server istifadə edin:

```bash
python3 -m http.server 8000
# brauzerdə: http://localhost:8000
```

## GitHub Pages-də yayımlamaq

```bash
git init && git add . && git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/<istifadəçi>/<istifadəçi>.github.io.git
git push -u origin main
```

Sonra GitHub-da **Settings → Pages → Branch: main / root** seçin. Sayt `https://<istifadəçi>.github.io` ünvanında açılacaq. Öz domeniniz varsa, `CNAME` faylı əlavə edin.
