using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace WebAPIFichajes.Models
{
    public partial class Modem
    {
        public Modem()
        {
            Dispositivos = new HashSet<Dispositivo>();
            IncidenciaModem = new HashSet<IncidenciaModem>();
        }

        public int IdModem { get; set; }
        public string Sim { get; set; }
        public string Proveedor { get; set; }
        public string Linea { get; set; }
        public string Ip { get; set; }
        public string Puerto { get; set; }
        public string Ssid { get; set; }
        public string Clave { get; set; }
        public string Modelo { get; set; }
        public string Fabricante { get; set; }
        public string Titular { get; set; }

        public virtual ICollection<Dispositivo> Dispositivos { get; set; }
        [JsonIgnore]
        public virtual ICollection<IncidenciaModem> IncidenciaModem { get; set; }
    }
}
