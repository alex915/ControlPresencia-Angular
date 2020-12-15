
resource "azurerm_app_service_plan" "BI" {
  name                = local.app_service_plan.name
  location            = azurerm_resource_group.BI.location
  resource_group_name = azurerm_resource_group.BI.name
  kind                = "Linux"
  reserved            = true

  sku {
    tier = local.app_service_plan.tier
    size = local.app_service_plan.size
  }
}

resource "azurerm_app_service" "BI" {
  name                = local.app_service.name
  location            = azurerm_resource_group.BI.location
  resource_group_name = azurerm_resource_group.BI.name
  app_service_plan_id = azurerm_app_service_plan.BI.id

  https_only = local.app_service_plan.https_only

  app_settings = local.app_service.app_settings

  site_config {
    dotnet_framework_version = "v4.0"
    scm_type                 = "None"
    linux_fx_version         = local.app_service_plan.linux_fx_version
  }

  connection_string {
    name  = "fichajesSql"
    type  = "SQLServer"
    value = local.app_service.connection_string_sql
  }
}

