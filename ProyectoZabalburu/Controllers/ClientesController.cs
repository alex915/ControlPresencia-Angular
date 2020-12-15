using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIFichajes.Models;

namespace WebAPIFichajes.Controllers
{
    [Route("api/clients")]
    [ApiController]

    public class ClientesController : ControllerBase
    {
        private readonly ProyectoFichajesdbContext _context;

        public ClientesController(ProyectoFichajesdbContext context)
        {
            _context = context;
        }

        // GET: api/Clientes =>ok
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes(string? q)
        {
            if (q != null)
            {
                return await _context.Clientes.Where(x => x.CodigoCliente.ToLower().Contains(q.ToLower()) || x.Descripcion.ToLower().Contains(q.ToLower())).Where(x => x.Estado.Equals("A")).Include(y => y.Centros).ThenInclude(x => x.Dispositivos).Include(y => y.Centros).ThenInclude(x => x.Empleados).ToListAsync();

            }
            return await _context.Clientes.Where(x => x.Estado.Equals("A")).Include(y => y.Centros).ThenInclude(x => x.Dispositivos).Include(y => y.Centros).ThenInclude(x => x.Empleados).ToListAsync();
        }


        // GET: api/Clientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(int id)
        {
            var cliente = await _context.Clientes.Where(x => x.Estado.Equals("A")).
                Include(x => x.Centros).ThenInclude(x => x.Dispositivos).
                Include(x => x.Centros).ThenInclude(x => x.Empleados)
                .FirstOrDefaultAsync(x => x.IdCliente == id);

            if (cliente == null)
            {
                return NotFound();
            }

            var centros = new List<Centro>();
            foreach (var centro in cliente.Centros)
            {
                if(centro.Estado == "A")
                {
                    centros.Add(new Centro()
                    {
                        Estado = centro.Estado,
                        CodCentroDarwin = centro.CodCentroDarwin,
                        CodCliente = centro.CodCliente,
                        CodClienteNavigation = centro.CodClienteNavigation,
                        CodigoCtrTrabajo = centro.CodigoCtrTrabajo,
                        Cp = centro.Cp,
                        FechaCreacion = centro.FechaCreacion,
                        FechaModificacion = centro.FechaModificacion,
                        IdCentro = centro.IdCentro,
                        IdCtrTrab = centro.IdCtrTrab,
                        Poblacion = centro.Poblacion,
                        UsuarioCreacion = centro.UsuarioCreacion,
                        UsuarioModificacion = centro.UsuarioModificacion,
                        Dispositivos = centro.Dispositivos.Where(x => x.Estado == "A").ToList(),
                        Empleados = centro.Empleados.Where(x => x.Estado == "A").ToList(),
                    });
                }
            }


            var client = new Cliente()
            {
                Centros = centros,
                UsuarioModificacion = cliente.UsuarioModificacion,
                UsuarioCreacion = cliente.UsuarioCreacion,
                FechaModificacion = cliente.FechaModificacion,
                FechaCreacion = cliente.FechaCreacion,
                CodClienteDarwin = cliente.CodClienteDarwin,
                CodigoCliente = cliente.CodigoCliente,
                Descripcion = cliente.Descripcion,
                Estado = cliente.Estado,
                IdCliente = cliente.IdCliente
            };

            return client;
        }

        // PUT: api/Clientes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(int id, Cliente cliente)
        {
            if (cliente != null && id != cliente.IdCliente)
            {
                return BadRequest();
            }

            _context.Entry(cliente).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClienteExists(id))
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

        // POST: api/Clientes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            cliente.Estado = "A";
            _context.Clientes.Add(cliente);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (cliente != null && ClienteExists(cliente.IdCliente))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCliente", new { id = cliente.IdCliente }, cliente);
        }

        // DELETE: api/Clientes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Cliente>> DeleteCliente(int id)
        {
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            cliente.Estado = "B";
            await PutCliente(id, cliente);

            return cliente;
        }

        private bool ClienteExists(int id)
        {
            return _context.Clientes.Any(e => e.IdCliente == id);
        }
    }
}
