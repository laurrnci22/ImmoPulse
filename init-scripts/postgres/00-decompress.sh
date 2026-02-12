#!/bin/bash
set -e

echo "--- Décompression des données pour Postgres ---"

# Si le fichier CSV n'existe pas mais que le GZ existe
if [ ! -f "/data_import/ValeursFoncieres-2025-S1.csv" ] && [ -f "/data_import/ValeursFoncieres-2025-S1.csv.gz" ]; then
    echo "Fichier .gz trouvé. Décompression en cours..."
    # -k garde le fichier original .gz
    # -c écrit vers la sortie standard (ou on décompresse sur place si on veut)
    
    # Ici, on décompresse directement dans le dossier partagé
    gunzip -k /data_import/ValeursFoncieres-2025-S1.csv.gz
    
    echo "Fichier prêt : /data_import/ValeursFoncieres-2025-S1.csv"
else
    echo "Fichier déjà décompressé ou introuvable."
fi