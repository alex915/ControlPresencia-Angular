using System;
using System.Collections.Generic;

namespace WebAPIFichajes.Models
{
    public partial class IncidenciaModem
    {
        public int IdIncidenciasModem { get; set; }
        public string ResponsableIncidencia { get; set; }
        public string ResponsableSolucion { get; set; }
        public string Motivo { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public string Observaciones { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public DateTime? FechaSolucion { get; set; }
        public string Gravedad { get; set; }
        public int? Modem { get; set; }

        public virtual Modem ModemNavigation { get; set; }
    }
}
