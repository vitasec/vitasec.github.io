> Bu nümunə məqalədir. Öz məzmununuzla əvəz edin.

## 1. Subdomain kəşfi

```bash
subfinder -d example.com -all -silent | tee subs.txt
amass enum -passive -d example.com >> subs.txt
sort -u subs.txt -o subs.txt
```

## 2. Canlı hostlar

```bash
httpx -l subs.txt -title -tech-detect -status-code -o alive.txt
```

## 3. Endpoint toplamaq

```bash
katana -list alive.txt -jc -o endpoints.txt
```

## 4. Avtomatik yoxlamalar

```bash
nuclei -l alive.txt -severity medium,high,critical
```

## Nəticə

Recon — bug bounty-nin 70%-dir. Nə qədər çox səth tapsanız, o qədər çox şans var.
