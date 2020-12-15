resource "azurerm_resource_group" "BI" {
  name = local.resource_group.name
  location = var.AZURE_REGION
}
