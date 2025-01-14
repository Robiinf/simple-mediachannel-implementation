# WebRTC MediaChannel Example

## Description

Ce projet est une implémentation simple d'une application WebRTC utilisant un MediaChannel. L'objectif est de permettre un appel vidéo peer-to-peer entre deux pairs, avec transmission et affichage des flux audio et vidéo en temps réel.

## Fonctionnalités

- **Connexion Peer-to-Peer** : 
  Deux PeerConnections sont établis pour simuler une communication locale et distante.

- **Capture des flux locaux** : 
  Utilisation de `getUserMedia` pour capturer l'audio et la vidéo de l'utilisateur local.

- **Transmission des flux** : 
  Partage des flux audio et vidéo entre deux pairs via des MediaChannels.

- **Interface utilisateur minimaliste** : 
  Deux éléments vidéo pour afficher les flux local et distant, ainsi que des boutons pour démarrer et arrêter l'appel.

## Structure des fichiers

- **index.html** : Contient l'interface utilisateur avec les éléments vidéo et les boutons de contrôle.
- **main.js** : Contient la logique WebRTC pour gérer les MediaChannels et les flux.
