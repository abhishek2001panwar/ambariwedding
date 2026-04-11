#!/bin/bash
# Video Proxy Testing Script
# Run this to verify the CORS fix is working

echo "🎬 Ambari Wedding Video Proxy Test"
echo "=================================="
echo ""

# Test 1: Check if API route exists
echo "Test 1: Checking if API route exists..."
if [ -f "app/api/video/route.ts" ]; then
    echo "✅ API route found at app/api/video/route.ts"
else
    echo "❌ API route NOT found - implementation incomplete"
fi

# Test 2: Check if utility exists
echo ""
echo "Test 2: Checking if videoProxy utility exists..."
if [ -f "lib/videoProxy.ts" ]; then
    echo "✅ Utility found at lib/videoProxy.ts"
else
    echo "❌ Utility NOT found - implementation incomplete"
fi

# Test 3: Check if hero component imports proxy
echo ""
echo "Test 3: Checking if hero component uses proxy..."
if grep -q "getProxyVideoUrl" components/hero.tsx; then
    echo "✅ Hero component imports proxy utility"
else
    echo "❌ Hero component does NOT use proxy"
fi

# Test 4: Check feedback component
echo ""
echo "Test 4: Checking if feedback component uses proxy..."
if grep -q "getProxyVideoUrl" components/feedback.tsx; then
    echo "✅ Feedback component imports proxy utility"
else
    echo "❌ Feedback component does NOT use proxy"
fi

# Test 5: List all updated video files
echo ""
echo "Test 5: Files that should use proxy utility..."
echo "Checking the following components:"
for file in components/hero.tsx components/feedback.tsx components/projects-section.tsx app/gallery/page.tsx app/portfolio/page.tsx app/services/[slug]/page.tsx; do
    if grep -q "getProxyVideoUrl" "$file" 2>/dev/null; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file"
    fi
done

echo ""
echo "=================================="
echo "Next steps:"
echo "1. Run: pnpm dev"
echo "2. Open: http://localhost:3000"
echo "3. Open DevTools (F12)"
echo "4. Go to Network tab"
echo "5. Reload page"
echo "6. Look for /api/video?url=... requests"
echo "7. All should return Status 200 ✅"
echo ""
echo "🚀 If all tests pass above, you're good to deploy!"
