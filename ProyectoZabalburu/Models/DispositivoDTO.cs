using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIFichajes.Models
{
    public class DispositivoDTO
    {
        public int IdDispositivo { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public int? CodTipoDispositivo { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModificacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public string Estado { get; set; }
    

        public virtual Centro Centro { get; set; }
       
        public virtual Modem Modem { get; set; }
        public virtual ICollection<Fichaje> Fichajes { get; set; }
    }
}
