variable "AZURE_SUBSCRIPTION_ID" {
  description = "The Azure subscription ID."
}

variable "AZURE_CLIENT_ID" {
  description = "The Azure Service Principal app ID."
}

variable "AZURE_CLIENT_SECRET" {
  description = "The Azure Service Principal password."
}

variable "AZURE_TENANT_ID" {
  description = "The Azure Tenant ID."
}

variable "AZURE_REGION" {
  description = "The Azure region to create things in."
  default     = "West Europe"
}

variable "BASE_PREFIX" {
  description = "The prefix applied to all resource names."
}

variable "ENVIRONMENT" {
  description = "The environment applied to all resource names."
}

variable "HTTPS_ONLY" {
  description = "Https variable that will be used to restrict the request by https"
}

variable "DOCKER_IMAGE" {
  description = "Docker variable that will be used to set the image to acr"
}

variable "APP_SERVICE_TIER" {
  description = "Tier variable that will be used to set the tier of app service"
}

variable "APP_SERVICE_SIZE" {
  description = "Size variable that will be used to set the tier of app service"
}

variable "DOCKER_REGISTRY_SERVER_USERNAME" {
  description = "Docker registry server username that will be used to set the docker registry"
}

variable "DOCKER_REGISTRY_SERVER_URL" {
  description = "Docker registry server url that will be used to set the docker registry"
}

variable "DOCKER_REGISTRY_SERVER_PASSWORD" {
  description = "Docker registry server password that will be used to set the docker registry"
}
variable "SQL_CONNECTION_STRINGS" {
  description = "Sql connection string"
}
variable "AD_CLIENTID" {
  description = "Client id from Azure"
}
variable "AD_TENANTID" {
  description = "Tenant id from Azure"
}
variable "AD_DOMAIN" {
  description = "Domain from Azure"
}