#!/bin/bash
echo "Linting project..."
docker build -f dockerfile.lint -t app-lint .
docker run --rm app-lint
