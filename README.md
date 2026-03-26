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
publie l'image `docker.io/hurtlinb/cicdpoc` :

- avec le tag `dev` pour la branche `dev`
- avec le tag `latest` pour la branche `main`

Dans les deux cas, il publie aussi un tag `sha-<commit>`.

## Déploiement avec Argo CD

Les manifests Kubernetes sont dans `k8s/base` et sont compatibles `kustomize`.

Le manifest Argo CD est dans `argocd/application-dev.yaml`.

Déploiement :

```bash
kubectl apply -f argocd/application-dev.yaml
```

Argo CD synchronisera :

- le dépôt `https://github.com/hurtlinb/cicdPOC.git`
- la branche `dev`
- le chemin `k8s/base`

Ressources créées :

- un namespace `cicd-poc`
- un `Deployment`
- un `Service` `ClusterIP`
- un `Ingress` Traefik exposé sur `poc.app.emfnet.ch`
