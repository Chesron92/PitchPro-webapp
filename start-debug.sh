#!/bin/bash

echo "========== STARTING DEBUG MODE =========="
echo "Clearing node_modules/.cache"
rm -rf node_modules/.cache

echo "Starting React app with debugging flags"
BROWSER=none REACT_APP_DEBUG=true npm start 