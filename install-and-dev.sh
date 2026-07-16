#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Erreur : Node.js 22 n'est pas installé."
  exit 1
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -ne 22 ]; then
  echo "Erreur : utilise Node.js 22. Version actuelle : $(node -v)"
  echo "Avec nvm : nvm install 22 && nvm use 22"
  exit 1
fi

rm -rf node_modules .next

echo "Installation propre des dépendances..."
npm ci --no-audit --no-fund --loglevel=info

echo "Démarrage sur http://localhost:3000"
npm run dev
