locals {
    prefix = lower(var.BASE_PREFIX)
    environment = lower(var.ENVIRONMENT)
    azure_region = var.AZURE_REGION

    resource_group = {
        name = "${local.prefix}-${local.environment}-rg"
    }

    app_service_plan = {
        name = "${local.prefix}-${local.environment}-sp"
        tier = var.APP_SERVICE_TIER
        size = var.APP_SERVICE_SIZE
        https_only = var.HTTPS_ONLY
        linux_fx_version = "DOCKER|${var.DOCKER_IMAGE}"
    }

    app_service = {
        name = "${local.environment}-fichajes"
        connection_string_sql = var.SQL_CONNECTION_STRINGS,
         app_settings = {
            "DOCKER_REGISTRY_SERVER_USERNAME"     = var.DOCKER_REGISTRY_SERVER_USERNAME
            "DOCKER_REGISTRY_SERVER_URL"          = var.DOCKER_REGISTRY_SERVER_URL
            "DOCKER_REGISTRY_SERVER_PASSWORD"     = var.DOCKER_REGISTRY_SERVER_PASSWORD
            "AzureAd__TenantId"     = var.AD_TENANTID
            "AzureAd__ClientId"          = var.AD_CLIENTID
            "AzureAd__Domain"     = var.AD_DOMAIN
        }
    }
}