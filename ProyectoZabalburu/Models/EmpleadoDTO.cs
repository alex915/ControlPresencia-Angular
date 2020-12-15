using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPIFichajes.Models
{
    public class EmpleadoDTO
    {
        public int EmpleadoId { get; set; }
        public string Nombre { get; set; }
        public string PrimerApellido { get; set; }
        public string SegundoApellido { get; set; }
        public string Dni { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public string Direccion { get; set; }
        public string NumeroVia { get; set; }
        public string Provincia { get; set; }
        public string Municipio { get; set; }
        public string Cp { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public DateTime? FechaAlta { get; set; }
        public string oid { get; set; }
        public string Estado { get; set; }
        public virtual Centro Centro { get; set; }
        public virtual ICollection<Fichaje> Fichajes { get; set; }
    }
}
