# Guide de Contribution

Merci de votre intérêt pour contribuer au projet Task Manager ! Ce document fournit les directives et les bonnes pratiques pour contribuer au projet.

## Table des matières
- [Prérequis](#prérequis)
- [Processus de contribution](#processus-de-contribution)
- [Conventions de code](#conventions-de-code)
- [Tests](#tests)
- [Documentation](#documentation)
- [Pull Requests](#pull-requests)

## Prérequis

### Outils nécessaires
- Git
- .NET 8 SDK
- Node.js 18+
- Docker et Docker Compose
- Un IDE (Visual Studio, VS Code, Rider, etc.)

### Configuration de l'environnement
1. Fork du repository
2. Clone de votre fork
3. Configuration des remotes
```bash
git remote add upstream https://github.com/original/task-managing.git
```

## Processus de contribution

1. **Créer une branche**
   ```bash
   git checkout -b feature/nom-de-la-fonctionnalite
   ```

2. **Développer**
   - Suivre les conventions de code
   - Écrire des tests
   - Mettre à jour la documentation

3. **Tester**
   ```bash
   # Backend
   cd TaskManager.API
   dotnet test

   # Frontend
   cd TaskManager.Web
   npm test
   ```

4. **Commit**
   - Utiliser des messages de commit conventionnels
   - Exemple : `feat: ajout de la fonctionnalité X`

5. **Push**
   ```bash
   git push origin feature/nom-de-la-fonctionnalite
   ```

6. **Pull Request**
   - Créer une PR sur GitHub
   - Suivre le template de PR
   - Attendre la review

## Conventions de code

### Backend (.NET)
- Suivre les conventions C#
- Utiliser les async/await pour les opérations I/O
- Documenter les méthodes publiques
- Utiliser les annotations pour la validation

### Frontend (Angular)
- Suivre le style guide Angular
- Utiliser TypeScript strict mode
- Implémenter les interfaces
- Documenter les composants

## Tests

### Backend
- Tests unitaires avec xUnit
- Tests d'intégration
- Mocks avec Moq
- Couverture de code > 80%

### Frontend
- Tests unitaires avec Jest
- Tests e2e avec Cypress
- Tests de composants avec Angular Testing Module

## Documentation

- Mettre à jour la documentation existante
- Ajouter des commentaires pour le code complexe
- Documenter les changements d'API
- Mettre à jour le changelog

## Pull Requests

### Template de PR
```markdown
## Description
[Description détaillée des changements]

## Type de changement
- [ ] Correction de bug
- [ ] Nouvelle fonctionnalité
- [ ] Changement majeur
- [ ] Documentation

## Tests
- [ ] Tests unitaires
- [ ] Tests d'intégration
- [ ] Tests e2e

## Checklist
- [ ] Mon code suit les conventions
- [ ] J'ai mis à jour la documentation
- [ ] J'ai ajouté des tests
- [ ] Les tests passent
- [ ] J'ai mis à jour le changelog
```

### Process de review
1. Vérification du code
2. Exécution des tests
3. Review de la documentation
4. Validation des changements

## Questions et Support

Pour toute question ou problème :
- Ouvrir une issue sur GitHub
- Consulter la documentation
- Contacter l'équipe de maintenance 