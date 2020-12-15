using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace WebAPIFichajes.Models
{
    public partial class Empleado
    {
        public Empleado()
        {
            Fichajes = new HashSet<Fichaje>();
        }
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
        public int? IdCentro { get; set; }
        public string oid { get; set; }
        public string Estado { get; set; }

        [JsonIgnore]
        public virtual Centro IdCentroNavigation { get; set; }
        [JsonIgnore]
        public virtual ICollection<Fichaje> Fichajes { get; set; }
    }
}
