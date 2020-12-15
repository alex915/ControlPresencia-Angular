using System;
using System.Collections.Generic;

namespace WebAPIFichajes.Models
{
    public partial class Cliente
    {
        public Cliente()
        {
            Centros = new HashSet<Centro>();
        }

        public int IdCliente { get; set; }
        public string CodigoCliente { get; set; }
        public int? CodClienteDarwin { get; set; }
        public string Descripcion { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModificacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public string Estado { get; set; }

        public virtual ICollection<Centro> Centros { get; set; }
    }
}
