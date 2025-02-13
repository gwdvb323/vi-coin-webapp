#!/bin/bash
zip -r project.zip . \
    -x "node_modules/*" \
    -x ".git/*" \
    -x "dist/*" \
    -x ".replit" \
    -x "package-lock.json" \
    -x "*.zip"
