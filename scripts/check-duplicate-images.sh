#!/bin/bash
# check-duplicate-images.sh
# Validates that no two articles share the same featured image
# Run this before committing new articles

POSTS_DIR="$(dirname "$0")/../posts"

echo "🔍 Checking for duplicate images in $POSTS_DIR..."
echo ""

# Extract all image URLs and count occurrences
duplicates=$(grep -h "^image:" "$POSTS_DIR"/*.md 2>/dev/null | \
    sed 's/image: "//g' | sed 's/"//g' | \
    sort | uniq -c | sort -rn | \
    awk '$1 > 1 {print $0}')

if [ -z "$duplicates" ]; then
    echo "✅ PASS: All images are unique"
    exit 0
else
    echo "❌ FAIL: Duplicate images found!"
    echo ""
    echo "$duplicates"
    echo ""
    echo "Files with duplicates:"
    for img in $(echo "$duplicates" | awk '{print $2}'); do
        echo "  Image: $img"
        grep -l "$img" "$POSTS_DIR"/*.md | sed 's|.*/||' | sed 's|^|    - |'
    done
    echo ""
    echo "Fix these before committing!"
    exit 1
fi
