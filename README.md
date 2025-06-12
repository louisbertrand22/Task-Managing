# Task Manager Application

Une application de gestion de tâches moderne construite avec Angular et .NET Core.

## Technologies utilisées

### Frontend
- Angular 20
- Angular Material
- TypeScript
- SCSS

### Backend
- .NET 8
- Entity Framework Core
- SQLite
- Swagger/OpenAPI

### Infrastructure
- Docker
- Docker Compose
- Nginx

## Prérequis

- Docker
- Docker Compose
- Git

## Installation

1. Cloner le repository :
```bash
git clone [URL_DU_REPO]
cd Task-Managing
```

2. Lancer l'application avec Docker Compose :
```bash
docker compose up --build
```

3. Accéder à l'application :
- Frontend : http://localhost
- API Swagger : http://localhost:8080/swagger

## Structure du projet

```
Task-Managing/
├── TaskManager.Web/          # Frontend Angular
├── TaskManager.API/          # Backend .NET
│   └── docs/                # Documentation détaillée de l'API
├── docker-compose.yml        # Configuration Docker
└── README.md                 # Documentation
```

## Fonctionnalités

- Création, modification et suppression de tâches
- Filtrage des tâches par statut et priorité
- Tri des tâches par date de création
- Interface utilisateur responsive
- API RESTful documentée avec Swagger

## Documentation

### API
Une documentation détaillée de l'API est disponible dans le dossier `TaskManager.API/docs/`. Elle inclut :
- Description complète des endpoints
- Exemples de requêtes et réponses
- Codes d'erreur
- Authentification
- Rate limiting
- Exemples d'utilisation avec cURL et JavaScript

## Développement

### Frontend
```bash
cd TaskManager.Web
npm install
ng serve
```

### Backend
```bash
cd TaskManager.API
dotnet restore
dotnet run
```

## Licence

MIT 