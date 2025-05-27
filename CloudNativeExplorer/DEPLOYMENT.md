# Deployment Guide

This guide covers different deployment options for My Cloud Native Todo App using Kubernetes, Istio, Helm, and Terraform.

## Prerequisites

- Kubernetes cluster (1.21+)
- kubectl configured
- Helm 3.x installed
- Docker for building images
- PostgreSQL database

## Quick Start with Kubernetes

1. **Build and push the Docker image:**
```bash
docker build -t your-registry/my-cloud-native-todo:latest .
docker push your-registry/my-cloud-native-todo:latest
```

2. **Deploy using raw Kubernetes manifests:**
```bash
kubectl apply -f k8s-deployment.yaml
```

## Deployment with Helm

1. **Install the application:**
```bash
# From the project root
helm install my-todo ./helm \
  --set image.repository=your-registry/my-cloud-native-todo \
  --set image.tag=latest \
  --set database.url="your-database-url"
```

2. **Upgrade the application:**
```bash
helm upgrade my-todo ./helm \
  --set image.tag=new-version
```

3. **Uninstall:**
```bash
helm uninstall my-todo
```

## Deployment with Terraform

1. **Initialize Terraform:**
```bash
cd terraform
terraform init
```

2. **Configure variables:**
```bash
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
```

3. **Deploy:**
```bash
terraform plan
terraform apply
```

4. **Destroy:**
```bash
terraform destroy
```

## Istio Service Mesh (Optional)

If you have Istio installed in your cluster:

1. **Apply Istio configurations:**
```bash
kubectl apply -f istio/
```

2. **Verify the gateway:**
```bash
kubectl get gateway
kubectl get virtualservice
```

## Environment Variables

Set these environment variables for your deployment:

- `NODE_ENV`: Environment (production/staging/development)
- `DATABASE_URL`: PostgreSQL connection string
- `APP_VERSION`: Application version

## Health Checks

The application provides health check endpoints:

- `/health/ready` - Readiness probe
- `/health/live` - Liveness probe

## Monitoring

The application exposes metrics and system information at:

- `/api/system-info` - System metrics
- Application logs via stdout/stderr

## Scaling

The application supports horizontal scaling:

```bash
# Scale with kubectl
kubectl scale deployment my-cloud-native-todo --replicas=5

# Scale with Helm
helm upgrade my-todo ./helm --set replicaCount=5
```

## Troubleshooting

1. **Check pod status:**
```bash
kubectl get pods -l app.kubernetes.io/name=my-cloud-native-todo
```

2. **View logs:**
```bash
kubectl logs -l app.kubernetes.io/name=my-cloud-native-todo
```

3. **Check service:**
```bash
kubectl get svc my-cloud-native-todo
```

4. **Test health endpoints:**
```bash
kubectl port-forward svc/my-cloud-native-todo 8080:80
curl http://localhost:8080/health/ready
```