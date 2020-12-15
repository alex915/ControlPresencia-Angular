using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIFichajes.Models;

namespace WebAPIFichajes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ModemsController : ControllerBase
    {
        private readonly ProyectoFichajesdbContext _context;

        public ModemsController(ProyectoFichajesdbContext context)
        {
            _context = context;
        }

        // GET: api/Modems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Modem>>> GetModem()
        {
            return await _context.Modem.Include(x=>x.Dispositivos).ToListAsync();
        }

        // GET: api/Modems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Modem>> GetModem(int id)
        {
            var modem = await _context.Modem.Include(x=>x.Dispositivos).FirstOrDefaultAsync(m=>m.IdModem == id);

            if (modem == null)
            {
                return NotFound();
            }

            return modem;
        }

        // PUT: api/Modems/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModem(int id, Modem modem)
        {
            if (id != modem.IdModem)
            {
                return BadRequest();
            }

            _context.Entry(modem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModemExists(id))
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

        // POST: api/Modems
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Modem>> PostModem(Modem modem)
        {
            _context.Modem.Add(modem);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (modem!=null && ModemExists(modem.IdModem))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetModem", new { id = modem.IdModem }, modem);
        }

        // DELETE: api/Modems/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Modem>> DeleteModem(int id)
        {
            var modem = await _context.Modem.FindAsync(id);
            if (modem == null)
            {
                return NotFound();
            }

            _context.Modem.Remove(modem);
            await _context.SaveChangesAsync();

            return modem;
        }

        private bool ModemExists(int id)
        {
            return _context.Modem.Any(e => e.IdModem == id);
        }
    }
}
