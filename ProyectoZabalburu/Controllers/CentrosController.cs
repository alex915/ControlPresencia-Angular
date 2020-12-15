using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIFichajes.Models;

namespace WebAPIFichajes.Controllers
{
    [Route("api/centers")]
    [ApiController]

    public class CentrosController : ControllerBase
    {
        private readonly ProyectoFichajesdbContext _context;

        public CentrosController(ProyectoFichajesdbContext context)
        {
            _context = context;
        }

        // GET: api/Centros =>ok
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CentroDTO>>> GetCentros(string? q)
        {

            if (q != null)
            {
                return await _context.Centros.Include(x => x.CodClienteNavigation)
                .Include(x => x.Dispositivos)
                .Include(x => x.Empleados).Where(x => x.CodigoCtrTrabajo.ToLower().Contains(q.ToLower()))
                    .Select(c => new CentroDTO()
                {
                    IdCentro = c.IdCentro,
                    CodigoCtrTrabajo = c.CodigoCtrTrabajo,
                    CodCentroDarwin = c.CodCentroDarwin,
                    Poblacion = c.Poblacion,
                    Cp = c.Cp,
                    UsuarioCreacion = c.UsuarioCreacion,
                    FechaCreacion = c.FechaCreacion,
                    UsuarioModificacion = c.UsuarioModificacion,
                    FechaModificacion = c.FechaModificacion,
                    Estado = c.Estado,
                    IdCtrTrab = c.IdCtrTrab,
                    Cliente = c.CodClienteNavigation,
                    Dispositivos = c.Dispositivos.Where(x => x.Estado.Equals("A")).ToList(),
                    Empleados = c.Empleados.Where(x => x.Estado.Equals("A")).ToList()


                    }).Where(x=>x.Estado.Equals("A")).ToListAsync();
            }
            return await _context.Centros.Include(x => x.CodClienteNavigation)
                .Include(x => x.Dispositivos)
                .Include(x => x.Empleados)
                .Where(x=> x.Estado == "A")
                .Select(c => new CentroDTO()
                {
                    IdCentro = c.IdCentro,
                    CodigoCtrTrabajo = c.CodigoCtrTrabajo,
                    CodCentroDarwin = c.CodCentroDarwin,
                    Poblacion = c.Poblacion,
                    Cp = c.Cp,
                    UsuarioCreacion = c.UsuarioCreacion,
                    FechaCreacion = c.FechaCreacion,
                    UsuarioModificacion = c.UsuarioModificacion,
                    FechaModificacion = c.FechaModificacion,
                    Estado = c.Estado,
                    IdCtrTrab = c.IdCtrTrab,
                    Cliente = c.CodClienteNavigation,
                    Dispositivos = c.Dispositivos.Where(x=> x.Estado == "A").ToList(),
                    Empleados = c.Empleados.Where(x => x.Estado == "A").ToList()


                }).Where(x => x.Estado.Equals("A")).ToListAsync();
        }


        // GET: api/Centros/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CentroDTO>> GetCentro(int id)
        {
            var centro = await _context.Centros
                .Include(x => x.CodClienteNavigation)
                .Include(x => x.Dispositivos)
                .Include(x => x.Empleados)
                .Where(x => x.Estado == "A")
                .Select(c=> new CentroDTO() { 
                    IdCentro = c.IdCentro,
                    CodigoCtrTrabajo = c.CodigoCtrTrabajo,
                    CodCentroDarwin = c.CodCentroDarwin,
                    Poblacion = c.Poblacion,
                    Cp = c.Cp,
                    UsuarioCreacion = c.UsuarioCreacion,
                    FechaCreacion = c.FechaCreacion,
                    UsuarioModificacion = c.UsuarioModificacion,
                    FechaModificacion = c.FechaModificacion,
                    Estado = c.Estado,
                    IdCtrTrab = c.IdCtrTrab,
                    Cliente = c.CodClienteNavigation,
                    Dispositivos = c.Dispositivos.Where(x => x.Estado == "A").ToList(),
                    Empleados = c.Empleados.Where(x => x.Estado == "A").ToList()


                }).Where(x => x.Estado.Equals("A"))
                .FirstOrDefaultAsync(x=>x.IdCentro==id);

            if (centro == null)
            {
                return NotFound();
            }

            return centro;
        }

        // PUT: api/Centros/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCentro(int id, Centro centro)
        {
            if (centro!=null && id != centro.IdCentro)
            {
                return BadRequest();
            }

            _context.Entry(centro).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CentroExists(id))
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

        // POST: api/Centros
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Centro>> PostCentro(Centro centro)
        {
            centro.Estado = "A";
            _context.Centros.Add(centro);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (centro!=null && CentroExists(centro.IdCentro))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetCentro", new { id = centro.IdCentro }, centro);
        }

        // DELETE: api/Centros/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Centro>> DeleteCentro(int id)
        {
            var centro = await _context.Centros.FindAsync(id);
            if (centro == null)
            {
                return NotFound();
            }

            centro.Estado = "B";
            await PutCentro(id, centro);

            return centro;
        }

        private bool CentroExists(int id)
        {
            return _context.Centros.Any(e => e.IdCentro == id);
        }
    }
}
