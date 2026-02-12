# ImmoPulse

ImmoPulse est un projet d’analyse du marché immobilier français basé sur le jeu de données officiel DVF (Demandes de valeurs foncières).
Il permet d’exploiter plusieurs millions de transactions immobilières afin de produire des indicateurs fiables sur l’évolution des prix et l’activité du marché.

## Données
Source : Demandes de valeurs foncières (DVF – données publiques).

Volume : Plusieurs millions de lignes par an. Environ 30 millions de transactions sur les 5 dernières années

Contenu :
- Prix de vente
- Surface des biens
- Localisation (code postal, ...)
- Date de transaction
- Type de bien (≈ 40 colonnes au total)

## Objectifs
- Calculer le prix moyen au m² par département
- Analyser les tendances du marché immobilier sur plusieurs années
- Générer des histogrammes de ventes par mois
- Fournir des données exploitables pour des fonctionnalités utilisateur (favoris, alertes)
