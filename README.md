# cicdPOC

Application Node.js minimale affichant `Bienvenue` et son numéro de version.

## Exécution locale

```bash
npm start
```

L'application écoute sur le port `3000`.

## Image Docker

Build local :

```bash
docker build -t cicd-poc .
```

Le workflow GitHub Actions de [`.github/workflows/docker-image.yml`](./.github/workflows/docker-image.yml)
agit ainsi :

- sur `dev` : build Docker, push de l'image avec le tag de version lu dans `package.json`, puis mise à jour du tag dans GitOps
- sur `main` : pas de build Docker, uniquement mise à jour du tag dans GitOps

Sur `dev`, le workflow publie aussi un tag `sha-<commit>`.

## Déploiement avec Argo CD

Les manifests Kubernetes sont organisés avec `kustomize` :

- `k8s/base` contient les ressources communes
- `k8s/overlays/dev` déploie l'environnement de développement
- `k8s/overlays/prod` déploie l'environnement de production

Les applications Argo CD sont :

- `argocd/application-dev.yaml`
- `argocd/application-prod.yaml`

Déploiement :

```bash
kubectl apply -f argocd/application-dev.yaml
kubectl apply -f argocd/application-prod.yaml
```

Configuration Argo CD :

- `application-dev.yaml` synchronise la branche `dev` sur `k8s/overlays/dev`
- `application-prod.yaml` synchronise la branche `main` sur `k8s/overlays/prod`
- le workflow met à jour le tag d'image dans le repo GitOps avec la version applicative, par exemple `1.1.3`

Ressources déployées :

- un namespace `cicd-poc-dev` pour la dev
- un namespace `cicd-poc-prod` pour la prod
- un `Deployment`
- un `Service` `ClusterIP`
- un `Ingress` Traefik par environnement

Hôtes exposés :

- dev : `poc-dev.app.emfnet.ch`
- prod : `poc.app.emfnet.ch`
