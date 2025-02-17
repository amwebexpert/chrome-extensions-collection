# **Structure de la Présentation (45 minutes)**

## **1. Introduction (5 minutes)**
- **Accroche** : Présenter un cas d'utilisation concret dans l'industrie (ex : analyse de données géologiques ou prédiction de maintenance d'équipements).
- **Problématique** : Pourquoi dépendre du cloud peut être un frein (latence, coûts, sécurité des données).
- **Solution proposée** : ONNX Runtime comme solution pour exécuter des modèles d'IA localement, en toute sécurité.
- **Public cible** : Expliquer que la présentation s'adresse à la fois aux gestionnaires (aspects stratégiques) et aux développeurs (aspects techniques).

---

## **2. Présentation de ONNX Runtime (5 minutes)**
- **Qu'est-ce que ONNX Runtime ?**  
  - Un moteur d'exécution pour modèles d'IA optimisé pour la performance.
  - Supporte multi-plateforme (navigateur, mobile, serveur).
  - Utilisation de WASM pour le navigateur et l'embarqué.
- **Avantages clés** :
  - Exécution hors ligne.
  - Optimisation pour CPU et GPU.
  - Sécurité des données (pas de transfert vers le cloud).

---

## **3. Démo 1 : Recherche Sémantique dans le Navigateur (10 minutes)**
- **Contexte** : Utilisation de Transformers.js et ONNX Runtime pour une recherche sémantique dans une base de connaissances (ex : guide de développement TypeScript/React).
- **Étapes** :
  1. Chargement du modèle LLM dans le navigateur.
  2. Calcul des embeddings (vecteurs sémantiques) pour les règles de codage.
  3. Stockage des embeddings dans le localStorage pour éviter des recalculs inutiles.
  4. Recherche sémantique en temps réel avec calcul des embeddings pour la requête.
- **Points clés** :
  - Pas de dépendance au cloud.
  - Utilisation de WASM pour des calculs intensifs.
  - Sérialisation des données pour une réutilisation optimale.
- **Extrait de code** : Montrer un exemple de chargement de modèle et de calcul d'embeddings avec Transformers.js.

---

## **4. Transition vers le Mobile (5 minutes)**
- **Pourquoi le mobile ?**  
  - Les travailleurs de l'industrie ont souvent besoin d'accéder à des outils d'IA sur le terrain, sans connexion internet.
  - Les données sensibles (ex : cartes géologiques, rapports de maintenance) doivent rester sécurisées.
- **ONNX Runtime sur mobile** :  
  - Supporte iOS et Android.
  - Modèles optimisés pour les appareils mobiles.
  - Encryption des données locales.

---

## **5. Démo 2 : Applications Mobiles avec ONNX Runtime (15 minutes)**
- **Exemple 1 : Traduction Hors Ligne**  
  - Chargement d'un modèle de traduction (ex : OpenAI Whisper) avec ONNX Runtime.
  - Démontrer la traduction d'un texte en direct.
  - Montrer comment les données sont encryptées sur l'appareil.

- **Exemple 2 : Classification de Texte par Sentiments**  
  - Utilisation d'un modèle de classification pour analyser des commentaires ou des rapports.
  - Montrer comment le modèle peut être utilisé pour prendre des décisions en temps réel.

- **Exemple 3 : Reconnaissance d'Objets dans les Images**  
  - Chargement d'un modèle de vision par ordinateur (ex : YOLO ou MobileNet) avec ONNX Runtime.
  - Démontrer la reconnaissance d'objets dans une image prise par l'appareil photo du mobile.
  - Expliquer comment les données sensibles (ex : images de sites miniers) restent sécurisées.

- **Extraits de code** : Montrer des exemples de chargement de modèles et d'exécution d'inférence avec ONNX Runtime sur mobile.

---

## **6. Conclusion et Appel à l'Action (5 minutes)**
- **Récapitulatif** :  
  - ONNX Runtime permet d'exécuter des modèles d'IA hors ligne, en toute sécurité.
  - Les données sensibles peuvent être encryptées et rester sur l'appareil.
  - Le mobile est prêt pour l'IA embarquée, même dans des environnements exigeants comme l'industrie minière.
- **Appel à l'Action** :  
  - Pour les gestionnaires : Explorer comment l'IA embarquée peut améliorer l'efficacité et la sécurité des opérations.
  - Pour les développeurs : Commencer à expérimenter avec ONNX Runtime et des modèles optimisés pour le mobile.
- **Questions et Discussions** : Ouvrir la séance pour des questions et des échanges.

