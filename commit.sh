#!/bin/bash

# Git commit script
# Usage: ./commit.sh "Your commit message"

# Check if commit message is provided
if [ -z "$1" ]; then
    echo "Error: Commit message is required"
    echo "Usage: ./commit.sh \"Your commit message\""
    exit 1
fi

# Add all changes
git add .

# Commit with the provided message
git commit -m "$1"

# Show status
git status

echo ""
echo "Commit completed: $1"
