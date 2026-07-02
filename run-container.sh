#!/bin/bash
echo "Running container..."
docker build -t jdt-api-unifiedapi .
docker run --rm -p 3010:3010 jdt-api-unifiedapi
