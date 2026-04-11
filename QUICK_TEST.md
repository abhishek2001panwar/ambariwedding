# 📋 Quick Test Checklist

## Before Testing
- [ ] All files committed
- [ ] No build errors: `pnpm build` ✅

## Testing (5 minutes)

### 1. Start Dev Server
```bash
pnpm dev
```
Expected: Server running on http://localhost:3000 ✅

### 2. Open in Browser
```
http://localhost:3000
```
Expected: Page loads normally ✅

### 3. Open DevTools
```
F12 or Ctrl+Shift+I
```
Go to: **Network** tab

### 4. Reload Page
```
F5 or Ctrl+R
```

### 5. Check Requests
Filter: type "video" in search or look for `/api/video`

You should see requests like:
```
/api/video?url=https%3A%2F%2Fhsrtiles.in%2F...
```

Status: **200** ✅

### 6. Verify Videos Play
- [ ] Hero section has background video
- [ ] Feedback section shows 3 testimonial videos  
- [ ] Gallery page videos play with controls
- [ ] Portfolio videos work
- [ ] Service pages show videos

### 7. Check Console
```
F12 → Console tab
```
- Should be **clean** ❌ no CORS errors
- No "Video failed" messages

---

## Result

### ✅ If All Tests Pass:
You're ready to deploy! Run:
```bash
# Build for production
pnpm build

# Test production build
pnpm start

# Deploy (your normal deployment)
```

### ❌ If Something Fails:
1. Check `/api/video/route.ts` exists
2. Check `/lib/videoProxy.ts` exists
3. Search for "getProxyVideoUrl" in error
4. Re-read CORS_SOLUTION_COMPLETE.md debug section

---

## Files You Need

All these files should exist:

```
✅ app/api/video/route.ts          (NEW - API proxy)
✅ lib/videoProxy.ts                (NEW - URL utility)
✅ components/hero.tsx              (UPDATED)
✅ components/feedback.tsx          (UPDATED)
✅ components/projects-section.tsx  (UPDATED)
✅ app/gallery/page.tsx             (UPDATED)
✅ app/portfolio/page.tsx           (UPDATED)
✅ app/services/[slug]/page.tsx     (UPDATED)
```

---

## Expected Network Requests

When you reload the page, you should see in Network tab:

```
✅ /api/video?url=...jayamahal_madap_sr0ll9.webm    Status: 200
✅ /api/video?url=...brand_ipduie.mp4               Status: 200
✅ /api/video?url=...AW_testimonial_xjjdey.webm     Status: 200
✅ /api/video?url=...Testimonial_1_1_g5dyft.mp4     Status: 200
✅ /api/video?url=...Testimonial_2_1_xm1x4v.mp4     Status: 200
... (more videos)
```

All Status **200** = Everything working ✅

---

## One-Command Test

```bash
# Test locally
pnpm dev

# In another terminal, after page loads:
curl -I http://localhost:3000/api/video?url=https://hsrtiles.in/wp-content/uploads/2026/04/jayamahal_madap_sr0ll9.webm

# Should return:
# HTTP/1.1 200 OK
# Content-Type: video/webm
# Content-Length: XXXXX
```

---

## Deploy Command

When ready:
```bash
# 1. Build
pnpm build

# 2. Test build
pnpm start

# 3. Deploy (your command, e.g., Vercel)
vercel deploy

# 4. Test production
# Go to your production URL
# Open DevTools Network tab
# Verify /api/video requests return 200
```

---

## That's It! 🎉

5 minute test = ✅ Deploy = 🚀 All videos working
