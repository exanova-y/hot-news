#!/bin/bash
# Clear server-side cache for testing updated scrapers

echo "Clearing server cache..."

# Option 1: Delete SQLite database (nuclear option)
if [ -f ".data/db.sqlite3" ]; then
    rm -f .data/db.sqlite3
    echo "✅ Deleted SQLite cache database"
fi

# Option 2: Or just delete specific source cache
# (requires database tools like sqlite3)
if command -v sqlite3 &> /dev/null && [ -f ".data/db.sqlite3" ]; then
    sqlite3 .data/db.sqlite3 "DELETE FROM cache WHERE id='ao3';"
    echo "✅ Cleared AO3 cache entry"
fi

echo ""
echo "Cache cleared. Next request will fetch fresh data."
echo "Visit: http://localhost:5173/api/s?id=ao3"

