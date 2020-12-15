using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using IdentityModel.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Graph;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
using Newtonsoft.Json;
using WebAPIFichajes.Models;

namespace WebAPIFichajes.Controllers
{
    [Route("api/employees")]
    [ApiController]

    public class EmpleadosController : ControllerBase
    {
        private readonly ProyectoFichajesdbContext _context;

        public EmpleadosController(ProyectoFichajesdbContext context)
        {
            _context = context;
        }

        // GET: api/Empleados =>ok
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Empleado>>> GetEmpleados(string? q)
        {
            if (q != null)
            {
                return await _context.Empleados
                .Where(x => x.Nombre.ToLower().Contains(q.ToLower()) ||
                x.PrimerApellido.ToLower().Contains(q.ToLower()) ||
                x.SegundoApellido.ToLower().Contains(q.ToLower())).Where(x => x.Estado.Equals("A")).ToListAsync();
            }
            return await _context.Empleados.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmpleadoDTO>> GetEmpleado(int id)
        {
            var empleado = await _context.Empleados
            .Include(x => x.IdCentroNavigation.CodClienteNavigation)
            .Include(x => x.Fichajes).ThenInclude(x => x.IdDispositivoNavigation).
                Select(e => new EmpleadoDTO()
                {
                    EmpleadoId = e.EmpleadoId,
                    Nombre = e.Nombre,
                    PrimerApellido = e.PrimerApellido,
                    SegundoApellido = e.SegundoApellido,
                    Dni = e.Dni,
                    FechaNacimiento = e.FechaNacimiento,
                    Direccion = e.Direccion,
                    NumeroVia = e.NumeroVia,
                    Provincia = e.Provincia,
                    Municipio = e.Municipio,
                    Cp = e.Cp,
                    Telefono = e.Telefono,
                    Email = e.Email,
                    FechaAlta = e.FechaAlta,
                    Centro = e.IdCentroNavigation,
                    Fichajes = e.Fichajes,
                    oid = e.oid,
                    Estado = e.Estado
                }).Where(x => x.Estado.Equals("A"))
                .FirstOrDefaultAsync(e => e.EmpleadoId == id);

            if (empleado == null)
            {
                return NotFound();
            }
            return empleado;
        }
        // GET: api/Empleados/5
        [HttpGet("oid/{oid}")]
        public async Task<ActionResult<EmpleadoDTO>> GetEmpleado(string oid)
        {
            var empleado = await _context.Empleados
                .Include(x => x.IdCentroNavigation.CodClienteNavigation)
                .Include(x => x.Fichajes).ThenInclude(x => x.IdDispositivoNavigation).
                Select(e => new EmpleadoDTO()
                {
                    EmpleadoId = e.EmpleadoId,
                    Nombre = e.Nombre,
                    PrimerApellido = e.PrimerApellido,
                    SegundoApellido = e.SegundoApellido,
                    Dni = e.Dni,
                    FechaNacimiento = e.FechaNacimiento,
                    Direccion = e.Direccion,
                    NumeroVia = e.NumeroVia,
                    Provincia = e.Provincia,
                    Municipio = e.Municipio,
                    Cp = e.Cp,
                    Telefono = e.Telefono,
                    Email = e.Email,
                    FechaAlta = e.FechaAlta,
                    Centro = e.IdCentroNavigation,
                    Fichajes = e.Fichajes.Where(x => x.Estado.Equals("A")).ToList(),
                    oid = e.oid,
                    Estado = e.Estado
                }).Where(x => x.Estado.Equals("A"))
                .FirstOrDefaultAsync(e => e.oid.Equals(oid));

            if (empleado == null)
            {
                return NotFound();
            }

            return empleado;
        }

        // PUT: api/Empleados/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmpleado(int id, Empleado empleado)
        {

            if (empleado != null && id != empleado.EmpleadoId)
            {
                return BadRequest();
            }
            var empActual = _context.Empleados.Find(id);
            Centro c = _context.Centros.Find(empleado.IdCentro);
            Cliente cl = _context.Clientes.Find(c.CodCliente);
            var guidUser = new Guid("680ef8c6-e3eb-4f75-8597-2529c7c304d8");
            var mensaje = $"Hola {empleado.Nombre}." +
                $" Hemos detectado un cambio en su correo electrónico para la empresa {cl.Descripcion}." +
                $" Acepte la invitación para seguir resgistrando sus fichajes y continar donde lo dejó.";
            if (empleado.Email != empActual.Email)
            {
                await DeleteUserAsync(empleado.oid);
                var oid = await PostUserAsync(empleado.Email, empleado.Nombre, mensaje);
                empActual.oid = oid;
                await PostRolAsync(oid, guidUser);

            }

            empActual.Cp = empleado.Cp;
            empActual.Direccion = empleado.Direccion;
            empActual.Dni = empleado.Dni;
            empActual.Email = empleado.Email;
            empActual.Estado = empleado.Estado;
            empActual.FechaAlta = empleado.FechaAlta;
            empActual.FechaNacimiento = empleado.FechaNacimiento;
            empActual.IdCentro = empleado.IdCentro;
            empActual.Municipio = empleado.Municipio;
            empActual.Nombre = empleado.Nombre;
            empActual.NumeroVia = empleado.NumeroVia;
            empActual.PrimerApellido = empleado.PrimerApellido;
            empActual.Provincia = empleado.Provincia;
            empActual.SegundoApellido = empleado.SegundoApellido;
            empActual.Telefono = empleado.Telefono;
           
            _context.SaveChanges();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }


        [HttpPut("admin/{id}")]
        public async Task<IActionResult> PutAdminEmpleado(int id, Empleado empleado)
        {

            if (empleado != null && id != empleado.EmpleadoId)
            {
                return BadRequest();
            }
            var empActual = _context.Empleados.Find(id);
            Centro c = _context.Centros.Find(empleado.IdCentro);
            Cliente cl = _context.Clientes.Find(c.CodCliente);
            var guidAdmin = new Guid("b3086b0c-0a59-4a7f-addd-60c725b7bedd");
            var mensaje = $"Hola {empleado.Nombre}." +
                $" Hemos detectado un cambio en su correo electrónico para la empresa {cl.Descripcion}." +
                $" Acepte la invitación para seguir resgistrando sus fichajes y continar donde lo dejó.";

            if (empleado.Email != empActual.Email)
            {
                await DeleteUserAsync(empleado.oid);
                var oid = await PostUserAsync(empleado.Email, empleado.Nombre, mensaje);
                empActual.oid = oid;
                await PostRolAsync(oid, guidAdmin);

            }

            empActual.Cp = empleado.Cp;
            empActual.Direccion = empleado.Direccion;
            empActual.Dni = empleado.Dni;
            empActual.Email = empleado.Email;
            empActual.Estado = empleado.Estado;
            empActual.FechaAlta = empleado.FechaAlta;
            empActual.FechaNacimiento = empleado.FechaNacimiento;
            empActual.IdCentro = empleado.IdCentro;
            empActual.Municipio = empleado.Municipio;
            empActual.Nombre = empleado.Nombre;
            empActual.NumeroVia = empleado.NumeroVia;
            empActual.PrimerApellido = empleado.PrimerApellido;
            empActual.Provincia = empleado.Provincia;
            empActual.SegundoApellido = empleado.SegundoApellido;
            empActual.Telefono = empleado.Telefono;

            _context.SaveChanges();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpleadoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Empleados
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost("user")]
        public async Task<ActionResult<Empleado>> PostEmpleado(Empleado empleado)
        {
            Centro c = _context.Centros.Find(empleado.IdCentro);
            Cliente cl = _context.Clientes.Find(c.CodCliente);
            var guidUser = new Guid("680ef8c6-e3eb-4f75-8597-2529c7c304d8");
            var mensaje = $"Bienvenido {empleado.Nombre}. La empresa {cl.Descripcion} le ha dado de alta y le ha asignado al centro {c.CodigoCtrTrabajo}. Acepte la invitación para comenzar a registrar sus fichajes.";
            var oid = await PostUserAsync(empleado.Email, empleado.Nombre, mensaje);
            await PostRolAsync(oid, guidUser);

            empleado.oid = oid;
            empleado.Estado = "A";
            _context.Empleados.Add(empleado);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmpleado", new { id = empleado.EmpleadoId }, empleado);
        }

        [HttpPost("admin")]
        public async Task<ActionResult<Empleado>> PostAdmin(Empleado empleado)
        {
            Centro c = _context.Centros.Find(empleado.IdCentro);
            Cliente cl = _context.Clientes.Find(c.CodCliente);
            var guidAdmin = new Guid("b3086b0c-0a59-4a7f-addd-60c725b7bedd");
            var mensaje = $"Bienvenido {empleado.Nombre}. Se le ha dado de alta para la gestión de la empresa {cl.Descripcion}, con funciones de administrador, " +
                $"siendo asignado al centro {c.CodigoCtrTrabajo}. Acepte la invitación para comenzar a gestionar los fichajes del cliente y registrar sus propios fichajes.";


            var oid = await PostUserAsync(empleado.Email, empleado.Nombre,mensaje);
            await PostRolAsync(oid, guidAdmin);
            empleado.Estado = "A";
            empleado.oid = oid;
            _context.Empleados.Add(empleado);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmpleado", new { id = empleado.EmpleadoId }, empleado);
        }


        // DELETE: api/Empleados/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Empleado>> DeleteEmpleado(int id)
        {
            var empleado = await _context.Empleados.FindAsync(id);
            if (empleado == null)
            {
                return NotFound();
            }
            empleado.Estado = "B";
            await DeleteUserAsync(empleado.oid);
            empleado.oid = "";
            await PutEmpleado(id, empleado);

            return empleado;
        }

        private bool EmpleadoExists(int id)
        {
            return _context.Empleados.Any(e => e.EmpleadoId == id);
        }

        public async Task<string> AcquireAsync()
        {
            var tokenCache = new TokenCache();
            var clientCredential = new ClientCredential("7d12ade7-affb-4cf5-8117-8efc631144e6", "xXd9Op4-H91M~0h-ZM4.AZViIhWV4bsL.h");
            var authenticationContext = new AuthenticationContext($"https://login.microsoftonline.com/729d3718-8bf3-48c2-96ad-35e9eeeb2456", tokenCache);
            var authenticationResult = await authenticationContext.AcquireTokenAsync("https://graph.microsoft.com/", clientCredential);

            return authenticationResult.AccessToken;
        }

        public async Task<string> PostUserAsync(string email,string name, string mensaje)
        {
            HttpClient client = new HttpClient();
            var token = await AcquireAsync();
            client.SetBearerToken(token);
            var invitation = $"https://graph.microsoft.com/v1.0/invitations";

            var inv = new Invitation();
            var invM = new InvitedUserMessageInfo();
            invM.CustomizedMessageBody = mensaje;
            inv.InvitedUserDisplayName = name;
            inv.InvitedUserEmailAddress = email;
            inv.InvitedUserMessageInfo = invM;
            inv.InviteRedirectUrl = "https://dev-fichajes.azurewebsites.net";
            inv.SendInvitationMessage = true;
            var cont = JsonConvert.SerializeObject(inv);
            var buffer = System.Text.Encoding.UTF8.GetBytes(cont);
            var c = new ByteArrayContent(buffer);
            c.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await client.PostAsync(new Uri(invitation), c);

            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                var dataComplete = JsonConvert.DeserializeXmlNode(content, "root");
                var data = dataComplete.LastChild.LastChild.InnerText;

                return data;
            }

            return null;

        }
        public async Task DeleteUserAsync(string oid)
        {
            HttpClient client = new HttpClient();
            var token = await AcquireAsync();
            client.SetBearerToken(token);
            var delete = $"https://graph.microsoft.com/v1.0//users/{oid}";

            await client.DeleteAsync(new Uri(delete));

        }

        public async Task<bool> PostRolAsync(string oid, Guid rolguid)
        {
            HttpClient client = new HttpClient();
            var token = await AcquireAsync();
            client.SetBearerToken(token);
            var role = $"https://graph.microsoft.com/v1.0/users/{oid}/appRoleAssignments";

            var rol = new AppRoleAssignment();
            rol.AppRoleId = rolguid;
            rol.ResourceId = new Guid("a3c988aa-a379-42af-97de-571305d7c572");
            rol.PrincipalId = new Guid(oid);

            var control = JsonConvert.SerializeObject(rol);
            var bufferrol = System.Text.Encoding.UTF8.GetBytes(control);
            var r = new ByteArrayContent(bufferrol);
            r.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var response = await client.PostAsync(new Uri(role), r);

            if (response.IsSuccessStatusCode)
            {
                return true;
            }

            return false;

        }

    }
}
