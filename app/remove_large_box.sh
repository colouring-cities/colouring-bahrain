#!/bin/bash
# Script to remove large geometries causing the big box issue

echo "Removing large geometries from database..."
echo "Please enter your database password when prompted:"

# Run the SQL script to remove large geometries
psql -h localhost -U ubuntu -d colouringcoredb -f remove_large_geometries.sql

if [ $? -eq 0 ]; then
    echo "✓ Large geometries removed from database"
else
    echo "✗ Error running SQL script. Please check database credentials."
    exit 1
fi

echo ""
echo "Clearing tile cache..."
rm -rf tilecache/*
echo "✓ Tile cache cleared"

echo ""
echo "Done! Please restart your server to see the changes."
echo "The large box should now be gone."
