using System;
using System.Collections.Generic;

namespace WebAPIFichajes.Models
{
    public partial class Reloj
    {
        public int IdReloj { get; set; }
        public string Sn { get; set; }
        public string Modelo { get; set; }
        public string Fabricante { get; set; }
        public string VersionSoftware { get; set; }
        public string Mac { get; set; }
        public string Servidor { get; set; }
        public string Proveedor { get; set; }
        public string LicenciaFuturaServidor { get; set; }
        public int Cliente { get; set; }
        public string LicenciaFuturaManagerProduccion { get; set; }
        public string LicenciaFuturaManagerRis { get; set; }
        public string Tipo { get; set; }
        public string TipoTarjeta { get; set; }
        public string Software { get; set; }
        public string Contacto { get; set; }
        public string TlfContacto { get; set; }
        public string MailContacto { get; set; }
        public DateTime? FechaEnvio { get; set; }
        public DateTime? FechaEntrega { get; set; }
        public DateTime? FechcaInstalacionSoftware { get; set; }
        public DateTime? FechaInstalacionFisica { get; set; }
        public string Observaciones { get; set; }
        public string Oficina { get; set; }
        public int? Zona { get; set; }
        public string TipoRed { get; set; }
        public int? IdRouter { get; set; }
        public bool? Caja { get; set; }
    }
}
