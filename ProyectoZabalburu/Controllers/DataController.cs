using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPIFichajes.Models;

namespace ProyectoZabalburu.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {

        private readonly ProyectoFichajesdbContext _context;

        public DataController(ProyectoFichajesdbContext context)
        {
            _context = context;
        }

        [HttpGet("employee/total/{id}")]
        public async Task<ActionResult<int>> GetSumFichajesEmpleadoMonth(int id)
        {
            var month = DateTime.Now.Month;
            var year = DateTime.Now.Year;
            var fichajes = await _context.Fichajes
                .Where(x => x.CodEmpleado == id && x.Fecha.Value.Month == month && x.Fecha.Value.Year == year && x.Estado == "A").CountAsync();

            return fichajes;
        }

        [HttpGet("employee/media/{id}")]
        public  IEnumerable<int> GetSumFichajesEmpleadoYear(int id)
        {
            var firstMonth = DateTime.Now.AddMonths(-12);
            var lastMonth = DateTime.Now;
            var list = new List<int>();

            var fichajes = _context.Fichajes
                .Where(x => x.CodEmpleado == id && x.Fecha.Value >= firstMonth && x.Estado == "A")
                .OrderByDescending(x => x.Fecha).AsEnumerable()
          .GroupBy(x => x.Fecha.Value.Month);

            var date = DateTime.Now;
            int month = date.Month;

            for (int i = month; i > 0; i--)
            {
                var month2 = fichajes.FirstOrDefault(x => x.Key == i);
                if (month2 is null)
                {
                    list.Add(0);
                }
                else
                {
                    list.Add(month2.Count());
                }
            }

            for (int i = 12; i > month; i--)
            {
                var month2 = fichajes.FirstOrDefault(x => x.Key == i);
                if (month2 is null)
                {
                    list.Add(0);
                }
                else
                {
                    list.Add(month2.Count());
                }
            }
            list.Reverse();
            return list;
        }

        [HttpGet("center/total/{id}")]
        public IEnumerable<int> GetSumFichajesClienteYear(int id)
        {
            var firstMonth = DateTime.Now.AddMonths(-12);
            var lastMonth = DateTime.Now;
            var list = new List<int>();
            var year = DateTime.Now.Year;

            var fichajes = _context.Centros
                .Include(x => x.Empleados)
                .ThenInclude(x => x.Fichajes)
                .Where(x => x.IdCentro == id && x.Estado == "A")
                .SelectMany(x => x.Empleados)
                .Where(x => x.Estado == "A")
                .SelectMany(x => x.Fichajes)
                .Where(x => x.Fecha.Value >= firstMonth && x.Estado == "A")
                .OrderByDescending(x => x.Fecha).AsEnumerable()
          .GroupBy(x => x.Fecha.Value.Month);

            var date = DateTime.Now;
            int month = date.Month;

            for (int i = month; i > 0; i--)
            {
                var month2 = fichajes.FirstOrDefault(x => x.Key == i);
                if (month2 is null)
                {
                    list.Add(0);
                }
                else
                {
                    list.Add(month2.Count());
                }
            }

            for (int i = 12; i > month; i--)
            {
                var month2 = fichajes.FirstOrDefault(x => x.Key == i);
                if (month2 is null)
                {
                    list.Add(0);
                }
                else
                {
                    list.Add(month2.Count());
                }
            }
            list.Reverse();
            return list;
        }



        [HttpGet("center/totalday/{id}")]
        public IEnumerable<int> GetSumFichajesClienteDay(int id)
        {
            var currentMonth = DateTime.Now.Month;
            var list = new List<int>();
            var year = DateTime.Now.Year;

            var fichajes = _context.Centros
                .Include(x => x.Empleados)
                .ThenInclude(x => x.Fichajes)
                .Where(x => x.IdCentro == id && x.Estado == "A")
                .SelectMany(x => x.Empleados)
                .Where(x => x.Estado == "A")
                .SelectMany(x => x.Fichajes)
                .Where(x => x.Fecha.Value.Month == currentMonth && x.Fecha.Value.Year == year && x.Estado == "A")
                .OrderByDescending(x => x.Fecha).AsEnumerable()
                .GroupBy(x => x.Fecha.Value.Day);

            var currentDate = DateTime.Now;
            var lastDay = DateTime.DaysInMonth(currentDate.Year, currentDate.Month);

            for (int i = 1; i <= lastDay; i++)
            {
                var day = fichajes.FirstOrDefault(x => x.Key == i);
                if (day is null)
                {
                    list.Add(0);
                }
                else
                {
                    list.Add(day.Count());
                }

                if (currentDate.Day == i)
                {
                    break;
                }
            }

            return list;
        }




    }
}