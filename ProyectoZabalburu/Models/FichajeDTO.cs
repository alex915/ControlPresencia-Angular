using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIFichajes.Models
{
    public class FichajeDTO
    {
        public int Id { get; set; }
        public string CodTipoFichaje { get; set; }
        public int? CodigoAusencia { get; set; }
        public DateTime? Fecha { get; set; }
        public string Latitud { get; set; }
        public string Longitud { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModificacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public string Estado { get; set; }

      
        public virtual Empleado Empleado { get; set; }
        public virtual Dispositivo Dispositivo { get; set; }
    }
}
