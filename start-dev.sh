#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Erreur : Node.js n'est pas installé. Installe Node.js 22."
  exit 1
fi

NODE_MAJOR="$(node -p "process.versions.node.split('.')[0]")"
if [ "$NODE_MAJOR" -lt 22 ]; then
  echo "Erreur : Node.js 22 minimum est nécessaire. Version actuelle : $(node -v)"
  exit 1
fi

if [ ! -x "node_modules/.bin/next" ]; then
  echo "Erreur : les dépendances incluses sont absentes ou endommagées."
  echo "Relance l'extraction complète du ZIP dans un nouveau dossier."
  exit 1
fi

echo "Démarrage du portfolio sur http://localhost:3000"
exec npm run dev
