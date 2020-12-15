using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIFichajes.Models;

namespace WebAPIFichajes.Controllers
{
    [Route("api/signings")]
    [ApiController]
#nullable enable
    public class FichajesController : ControllerBase
    {
        private readonly ProyectoFichajesdbContext _context;

        public FichajesController(ProyectoFichajesdbContext context)
        {
            _context = context;
        }

        // GET: api/Fichajes => ok
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Fichaje>>> GetFichajes(DateTime? startDate, DateTime? endDate, string? tipo)
        {
            if (startDate != null && endDate != null)
            {
                return await _context.Fichajes.Where(x => x.Fecha >= startDate && x.Fecha <= endDate).Where(x => x.Estado.Equals("A")).ToListAsync();
            }
            else if (tipo != null)
            {
                return await _context.Fichajes.Where(x => x.CodTipoFichaje.ToLower().Equals(tipo.ToLower())).Where(x => x.Estado.Equals("A")).ToListAsync();
            }

            return await _context.Fichajes.ToListAsync();

        }


        // GET: api/Fichajes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FichajeDTO>> GetFichaje(int id)
        {
            var fichaje = await _context.Fichajes
                .Include(x => x.CodEmpleadoNavigation.IdCentroNavigation.CodClienteNavigation)
                .Include(x => x.IdDispositivoNavigation.CodCentroNavigation.CodClienteNavigation).
                Select(f=>new FichajeDTO() { 
                 Id = f.Id,
                 CodTipoFichaje = f.CodTipoFichaje,
                 CodigoAusencia = f.CodigoAusencia, 
                 Fecha = f.Fecha,
                 Latitud = f.Latitud,
                 Longitud = f.Longitud,
                 UsuarioCreacion = f.UsuarioCreacion,
                 FechaCreacion = f.FechaCreacion,
                 UsuarioModificacion = f.UsuarioModificacion,
                 FechaModificacion = f.FechaModificacion,
                 Estado = f.Estado,
                 Empleado = f.CodEmpleadoNavigation,
                 Dispositivo = f.IdDispositivoNavigation

                }).Where(x => x.Estado.Equals("A"))
                .FirstOrDefaultAsync(x=>x.Id==id);

            if (fichaje == null)
            {
                return NotFound();
            }

            return fichaje;
        }

        // PUT: api/Fichajes/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFichaje(int id, Fichaje fichaje)
        {
            if (fichaje!=null && id != fichaje.Id)
            {
                return BadRequest();
            }

            _context.Entry(fichaje).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FichajeExists(id))
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

        // POST: api/Fichajes
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Fichaje>> PostFichaje(Fichaje fichaje)
        {
            fichaje.Estado = "A";
            _context.Fichajes.Add(fichaje);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFichaje", new { id = fichaje.Id }, fichaje);
        }

        // DELETE: api/Fichajes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Fichaje>> DeleteFichaje(int id)
        {
            var fichaje = await _context.Fichajes.FindAsync(id);
            if (fichaje == null)
            {
                return NotFound();
            }

            _context.Fichajes.Remove(fichaje);
            await _context.SaveChangesAsync();

            return fichaje;
        }

        private bool FichajeExists(int id)
        {
            return _context.Fichajes.Any(e => e.Id == id);
        }
    }
}
