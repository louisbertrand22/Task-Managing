# Documentation de l'API Task Manager

## Vue d'ensemble
L'API Task Manager est une API RESTful construite avec .NET 8 qui permet de gérer des tâches. Elle utilise Entity Framework Core avec SQLite comme base de données.

## Points d'entrée de l'API

### Tâches

#### GET /api/tasks
Récupère la liste de toutes les tâches.

**Paramètres de requête :**
- `status` (optionnel) : Filtre par statut (TODO, IN_PROGRESS, DONE)
- `priority` (optionnel) : Filtre par priorité (LOW, MEDIUM, HIGH)
- `sortBy` (optionnel) : Tri par champ (createdAt, priority, status)
- `sortOrder` (optionnel) : Ordre de tri (asc, desc)

**Réponse :**
```json
[
  {
    "id": 1,
    "title": "Exemple de tâche",
    "description": "Description de la tâche",
    "status": "TODO",
    "priority": "MEDIUM",
    "createdAt": "2024-03-20T10:00:00Z",
    "updatedAt": "2024-03-20T10:00:00Z"
  }
]
```

#### POST /api/tasks
Crée une nouvelle tâche.

**Corps de la requête :**
```json
{
  "title": "Nouvelle tâche",
  "description": "Description de la nouvelle tâche",
  "status": "TODO",
  "priority": "MEDIUM"
}
```

**Réponse :**
```json
{
  "id": 1,
  "title": "Nouvelle tâche",
  "description": "Description de la nouvelle tâche",
  "status": "TODO",
  "priority": "MEDIUM",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

#### GET /api/tasks/{id}
Récupère une tâche spécifique par son ID.

**Paramètres de chemin :**
- `id` : ID de la tâche

**Réponse :**
```json
{
  "id": 1,
  "title": "Exemple de tâche",
  "description": "Description de la tâche",
  "status": "TODO",
  "priority": "MEDIUM",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T10:00:00Z"
}
```

#### PUT /api/tasks/{id}
Met à jour une tâche existante.

**Paramètres de chemin :**
- `id` : ID de la tâche

**Corps de la requête :**
```json
{
  "title": "Tâche mise à jour",
  "description": "Description mise à jour",
  "status": "IN_PROGRESS",
  "priority": "HIGH"
}
```

**Réponse :**
```json
{
  "id": 1,
  "title": "Tâche mise à jour",
  "description": "Description mise à jour",
  "status": "IN_PROGRESS",
  "priority": "HIGH",
  "createdAt": "2024-03-20T10:00:00Z",
  "updatedAt": "2024-03-20T11:00:00Z"
}
```

#### DELETE /api/tasks/{id}
Supprime une tâche.

**Paramètres de chemin :**
- `id` : ID de la tâche

**Réponse :**
- 204 No Content

## Codes d'erreur

- 400 Bad Request : Requête invalide
- 404 Not Found : Ressource non trouvée
- 500 Internal Server Error : Erreur serveur

## Authentification

L'API utilise l'authentification JWT. Pour accéder aux endpoints protégés, incluez le token JWT dans l'en-tête Authorization :

```
Authorization: Bearer <votre_token_jwt>
```

## Rate Limiting

L'API implémente un rate limiting de 100 requêtes par minute par IP.

## Exemples d'utilisation

### cURL

```bash
# Récupérer toutes les tâches
curl -X GET "http://localhost:8080/api/tasks"

# Créer une nouvelle tâche
curl -X POST "http://localhost:8080/api/tasks" \
     -H "Content-Type: application/json" \
     -d '{"title":"Nouvelle tâche","description":"Description","status":"TODO","priority":"MEDIUM"}'

# Mettre à jour une tâche
curl -X PUT "http://localhost:8080/api/tasks/1" \
     -H "Content-Type: application/json" \
     -d '{"title":"Tâche mise à jour","description":"Description mise à jour","status":"IN_PROGRESS","priority":"HIGH"}'

# Supprimer une tâche
curl -X DELETE "http://localhost:8080/api/tasks/1"
```

### JavaScript (Fetch)

```javascript
// Récupérer toutes les tâches
fetch('http://localhost:8080/api/tasks')
  .then(response => response.json())
  .then(data => console.log(data));

// Créer une nouvelle tâche
fetch('http://localhost:8080/api/tasks', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Nouvelle tâche',
    description: 'Description',
    status: 'TODO',
    priority: 'MEDIUM'
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

## Versions de l'API

- v1.0.0 : Version initiale
  - Gestion CRUD des tâches
  - Filtrage et tri
  - Authentification JWT
  - Rate limiting 