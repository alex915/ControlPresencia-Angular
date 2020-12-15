using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace WebAPIFichajes.Models
{
    public partial class Fichaje
    {
        public int Id { get; set; }
        public int? CodEmpleado { get; set; }
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
        public int? IdDispositivo { get; set; }
        [JsonIgnore]
        public virtual Empleado CodEmpleadoNavigation { get; set; }
        [JsonIgnore]
        public virtual Dispositivo IdDispositivoNavigation { get; set; }
    }
}
