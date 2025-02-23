# R6.05 - Développement avancé
L'API filmothèque  

## Sujet
Concevoir une API permettant de gérer des utilisateurs ainsi qu'une bibliothèque de films.  
Lien vers le cours -> [NodeJS](https://drjs-organization.gitbook.io/nodejs)  

## Setup
Pour récuperer et utiliser le projet, il suffit d'utiliser les commandes suivantes :  
```bash
git clone https://github.com/ArkAow/R6.05.git
```
à la racine du projet cloné :  
```bash
npm i
```
une fois les dépendances installées, lancer le serveur :  
```bash
npm start
```
L'application s'ouvre sur le port 3000.  
Lien vers la documentation de l'API -> [Swagger](http://localhost:3000/documentation#/) (une fois le projet lancé seulement)  
  
Depuis la page swagger vous pourrez utiliser et tester les routes de l'API.  
  
Certaines routes nécéssites d'être connecté pour les utiliser, pour ce faire vous pouvez utiliser la route `/user/login`, entrez des identifiants correspondant à un utilisateur (vous pouvez en ajouter depuis la route _POST_ `/user`) et copiez le token renvoyé. Dans un bouton en haut à droite "Authorize", si vous cliquez dessus, vous pouvez saisir le token obtenu lorsque vous vous êtes logué correctement. Il faudra saisir `Bearer ` (avec un espace après) devant le token dans le champ qui s'affiche sur swagger afin de se donner les permissions correctement.  
  
Certaines routes nécéssites d'être _admin_ pour les utiliser, pour ce faire vous pouvez utiliser la route `/user/role/{id}` et saisir l'id de l'utilisateur à promouvoir (récupérale depuis la route _GET_ `/users`). Il faudra recharger la page et se reloguer pour se donner les permissions correctement.
