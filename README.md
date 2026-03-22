# ImmoPulse 🏢

ImmoPulse est un projet d’analyse du marché immobilier français basé sur le jeu de données officiel DVF (Demandes de Valeurs Foncières).
Il permet d’exploiter plusieurs millions de transactions immobilières afin de produire des indicateurs fiables sur l’évolution des prix et l’activité du marché.

## 📊 Données
* **Source :** Demandes de valeurs foncières (DVF – données publiques).
* **Volume :** Plusieurs millions de lignes par an (environ 30 millions de transactions sur les 5 dernières années).
* **Contenu principal :**
  * Prix de vente
  * Surface des biens
  * Localisation (code postal, ville, etc.)
  * Date de la transaction
  * Type de bien

## 🎯 Objectifs
* Calculer le prix moyen au m² par département.
* Analyser les tendances du marché immobilier sur plusieurs années.
* Générer des statistiques visuelles (ex : histogrammes des ventes).
* Fournir des données exploitables pour des fonctionnalités utilisateur avancées (favoris, alertes, etc.).

---

## 🚀 Lancement de l'application

Le projet est structuré autour d'une infrastructure Docker (pour la base de données et l'interface utilisateur) et d'une API backend Spring Boot.

### 1. Démarrer l'infrastructure et le Frontend
Un fichier `docker-compose.yml` est présent à la racine du projet. Pour tout lancer, ouvrez un terminal à la racine du projet et exécutez la commande suivante :

```bash
docker compose up -d
```
🌐 L'application (interface utilisateur) sera alors accessible à l'adresse : http://localhost:81

### 2. Démarrer l'API (Backend)

Ouvrez le dossier du backend dans votre IDE.

Lancez l'application Spring Boot.

⚙️ L'API sera accessible à l'adresse par défaut : http://localhost:8080
📖 La documentation Swagger de l'API est consultable sur : http://localhost:8080/docs