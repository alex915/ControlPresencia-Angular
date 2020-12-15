using Newtonsoft.Json;
using System;
using System.Collections.Generic;



namespace WebAPIFichajes.Models
{
    public partial class Dispositivo
    {
        public Dispositivo()
        {
            Fichajes = new HashSet<Fichaje>();
        }

        public int IdDispositivo { get; set; }
     
        public int? CodCentro { get; set; }
        public string Codigo { get; set; }
        public string Descripcion { get; set; }
        public int? CodTipoDispositivo { get; set; }
        public int? UsuarioCreacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
        public int? UsuarioModificacion { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public string Estado { get; set; }
        public int? IdModem { get; set; }

        [JsonIgnore]
        public virtual Centro CodCentroNavigation { get; set; }
        [JsonIgnore]
        public virtual Modem IdModemNavigation { get; set; }
        
        public virtual ICollection<Fichaje> Fichajes { get; set; }
    }
}
