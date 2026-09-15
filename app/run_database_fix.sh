#!/bin/bash
# Script to fix database issues with building geometries and date_year relations

set -e

echo "Running database fix script..."

# Get database connection details from environment or use defaults
PGHOST=${PGHOST:-localhost}
PGDATABASE=${PGDATABASE:-postgres}
PGUSER=${PGUSER:-postgres}
PGPORT=${PGPORT:-5432}

# Check if PGPASSWORD is set, if not, prompt for it
if [ -z "$PGPASSWORD" ]; then
    echo "PGPASSWORD not set. You may be prompted for a password."
fi

# Run the SQL fix script
psql -h "$PGHOST" -d "$PGDATABASE" -U "$PGUSER" -p "$PGPORT" -f fix_database_issues.sql

echo "Database fix completed!"
