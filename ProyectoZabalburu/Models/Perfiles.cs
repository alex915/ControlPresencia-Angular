using System;
using System.Collections.Generic;

namespace WebAPIFichajes.Models
{
    public partial class Perfiles
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Apellido1 { get; set; }
        public string Apellido2 { get; set; }
        public string NombreCompleto { get; set; }
        public string Dni { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public string Direccion { get; set; }
        public string NumeroVia { get; set; }
        public string Provincia { get; set; }
        public string Municipio { get; set; }
        public string Cp { get; set; }
        public string Telefono { get; set; }
        public string Email { get; set; }
        public string NombreUsuario { get; set; }
        public string Password { get; set; }
        public string Iban { get; set; }
        public string Bic { get; set; }
        public string Ssn { get; set; }
    }
}
