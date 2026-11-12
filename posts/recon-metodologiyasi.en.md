> This is a sample article. Replace it with your own content.

## 1. Subdomain discovery

```bash
subfinder -d example.com -all -silent | tee subs.txt
amass enum -passive -d example.com >> subs.txt
sort -u subs.txt -o subs.txt
```

## 2. Live hosts

```bash
httpx -l subs.txt -title -tech-detect -status-code -o alive.txt
```

## 3. Collecting endpoints

```bash
katana -list alive.txt -jc -o endpoints.txt
```

## 4. Automated checks

```bash
nuclei -l alive.txt -severity medium,high,critical
```

## Conclusion

Recon is 70% of bug bounty. The more attack surface you find, the better your chances.
