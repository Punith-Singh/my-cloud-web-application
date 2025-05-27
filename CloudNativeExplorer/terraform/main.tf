terraform {
  required_version = ">= 1.0"
  required_providers {
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.16"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.8"
    }
  }
}

provider "kubernetes" {
  config_path = var.kubeconfig_path
}

provider "helm" {
  kubernetes {
    config_path = var.kubeconfig_path
  }
}

variable "kubeconfig_path" {
  description = "Path to the kubeconfig file"
  type        = string
  default     = "~/.kube/config"
}

variable "namespace" {
  description = "Kubernetes namespace"
  type        = string
  default     = "default"
}

variable "app_domain" {
  description = "Domain for the application"
  type        = string
  default     = "todo.example.com"
}

variable "database_url" {
  description = "Database connection URL"
  type        = string
  sensitive   = true
}

# Create namespace
resource "kubernetes_namespace" "todo_namespace" {
  metadata {
    name = var.namespace
  }
}

# Create database secret
resource "kubernetes_secret" "database_secret" {
  metadata {
    name      = "my-cloud-native-todo-db"
    namespace = var.namespace
  }

  data = {
    database-url = var.database_url
  }

  type = "Opaque"
}

# Deploy application using Helm
resource "helm_release" "todo_app" {
  name       = "my-cloud-native-todo"
  namespace  = var.namespace
  chart      = "../helm"

  values = [
    yamlencode({
      ingress = {
        enabled = true
        hosts = [{
          host = var.app_domain
          paths = [{
            path     = "/"
            pathType = "Prefix"
          }]
        }]
        tls = [{
          secretName = "todo-tls"
          hosts      = [var.app_domain]
        }]
      }
      database = {
        enabled = true
        url     = var.database_url
      }
    })
  ]

  depends_on = [
    kubernetes_namespace.todo_namespace,
    kubernetes_secret.database_secret
  ]
}