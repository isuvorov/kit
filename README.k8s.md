# How to work with K8s

### Manual deploy
`kubectl apply -f ./deploy/k8s-deploy.yaml`

### Not for this project, but for all:

### Config for kubectl
The easiest way to apply the configuration to kubectl is to put it in `~/.kube/config` and check it with `kubectl cluster-info`, it should output the cluster ip or just no errors

#### Dashboard 
##### Install
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/dashboard/v2.7.0/aio/deploy/recommended.yaml`

##### Use
`kubectl proxy`

Open in browser:

`http://localhost:8001/api/v1/namespaces/kubernetes-dashboard/services/https:kubernetes-dashboard:/proxy/`

#### Traefik

`kubectl apply -f ./deploy/traefik-deployment.yaml`

Use `kubectl get services` until services starting with `traefik` get the EXTERNAL-IP