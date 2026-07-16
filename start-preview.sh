#!/usr/bin/env bash
set -e

cd "$(dirname "$0")"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Erreur : Python 3 est nécessaire pour lancer l'aperçu sans installation."
  exit 1
fi

if [ ! -f "out/index.html" ]; then
  echo "Erreur : le dossier précompilé 'out' est absent."
  exit 1
fi

echo "Portfolio disponible sur http://localhost:3000"
echo "Pour arrêter : Ctrl+C"
python3 -m http.server 3000 --directory out
