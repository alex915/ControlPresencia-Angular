using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIFichajes.Models
{
    public class CentroDTO
    {
        public int IdCentro { get; set; }

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


        public virtual Cliente Cliente { get; set; }
        public virtual ICollection<Dispositivo> Dispositivos { get; set; }
        public virtual ICollection<Empleado> Empleados { get; set; }
    }
}
