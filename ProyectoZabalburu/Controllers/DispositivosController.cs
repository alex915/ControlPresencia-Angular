using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIFichajes.Models;

namespace WebAPIFichajes.Controllers
{
    [Route("api/devices")]
    [ApiController]

    public class DispositivosController : ControllerBase
    {
        private readonly ProyectoFichajesdbContext _context;

        public DispositivosController(ProyectoFichajesdbContext context)
        {
            _context = context;
        }

        // GET: api/Dispositivos =>ok
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Dispositivo>>> GetDispositivos(string? q)
        {

            if (q != null)
            {
                return await _context.Dispositivos.Where(x => x.Codigo.ToLower().Contains(q.ToLower())
                || x.Descripcion.ToLower().Contains(q.ToLower())).Where(x => x.Estado.Equals("A")).ToListAsync();
            }
            return await _context.Dispositivos.ToListAsync();


        }


        // GET: api/Dispositivos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DispositivoDTO>> GetDispositivo(int id)
        {
            var dispositivo = await _context.Dispositivos
                .Include(x => x.CodCentroNavigation.CodClienteNavigation)
                .Include(x => x.Fichajes).ThenInclude(x => x.CodEmpleadoNavigation)
                .Select(d => new DispositivoDTO()
                {
                    IdDispositivo = d.IdDispositivo,
                    Codigo = d.Codigo,
                    Descripcion = d.Descripcion,
                    CodTipoDispositivo = d.CodTipoDispositivo,
                    UsuarioCreacion = d.UsuarioCreacion,
                    UsuarioModificacion = d.UsuarioModificacion,
                    FechaCreacion = d.FechaCreacion,
                    FechaModificacion = d.FechaModificacion,
                    Estado = d.Estado,
                    Centro = d.CodCentroNavigation,
                    Modem = d.IdModemNavigation,
                    Fichajes = d.Fichajes.OrderByDescending(x => x.Fecha).Where(x => x.Estado.Equals("A")).ToArray()
                }).Where(x => x.Estado.Equals("A"))
                .FirstOrDefaultAsync(d => d.IdDispositivo == id);

            //var dispositivo = await _context.Dispositivos
            //    .Include(x => x.CodCentroNavigation.CodClienteNavigation)
            //    .Include(x=>x.Fichajes)
            //    .FirstOrDefaultAsync(d=> d.IdDispositivo==id);
            if (dispositivo == null)
            {
                return NotFound();
            }

            return dispositivo;
        }

        // PUT: api/Dispositivos/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDispositivo(int id, Dispositivo dispositivo)
        {
            if (dispositivo != null && id != dispositivo.IdDispositivo)
            {
                return BadRequest();
            }

            _context.Entry(dispositivo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DispositivoExists(id))
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

        // POST: api/Dispositivos
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Dispositivo>> PostDispositivo(Dispositivo dispositivo)
        {
            _context.Dispositivos.Add(dispositivo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDispositivo", new { id = dispositivo.IdDispositivo }, dispositivo);
        }

        // DELETE: api/Dispositivos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Dispositivo>> DeleteDispositivo(int id)
        {
            var dispositivo = await _context.Dispositivos.FindAsync(id);
            if (dispositivo == null)
            {
                return NotFound();
            }
        
            await PutDispositivo(id, dispositivo);

            return dispositivo;
        }

        private bool DispositivoExists(int id)
        {
            return _context.Dispositivos.Any(e => e.IdDispositivo == id);
        }
    }
}
