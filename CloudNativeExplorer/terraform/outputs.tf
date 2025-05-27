output "application_url" {
  description = "URL of the deployed application"
  value       = "https://${var.app_domain}"
}

output "namespace" {
  description = "Kubernetes namespace where the app is deployed"
  value       = var.namespace
}

output "helm_release_name" {
  description = "Name of the Helm release"
  value       = helm_release.todo_app.name
}

output "helm_release_status" {
  description = "Status of the Helm release"
  value       = helm_release.todo_app.status
}