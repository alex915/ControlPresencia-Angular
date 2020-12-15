using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace WebAPIFichajes.Models
{
    public partial class Centro
    {
        public Centro()
        {
            Dispositivos = new HashSet<Dispositivo>();
            Empleados = new HashSet<Empleado>();
        }

        public int IdCentro { get; set; }

        public int? CodCliente { get; set; }
        public string CodigoCtrTrabajo { get; set; }
        public int? CodCentroDarwin { get; set; }
        public string Poblacion { get; set; }
        public string Cp { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModificacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public string Estado { get; set; }
        public int? IdCtrTrab { get; set; }

        [JsonIgnore]
        public virtual Cliente CodClienteNavigation { get; set; }

        public virtual ICollection<Dispositivo> Dispositivos { get; set; }

        public virtual ICollection<Empleado> Empleados { get; set; }
    }
}
