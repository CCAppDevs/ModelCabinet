using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ModelCabinet.Server.Data;
using ModelCabinet.Server.Models;

namespace ModelCabinet.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssetsController : ControllerBase
    {
        private readonly ModelCabinetContext _context;
        IHttpContextAccessor httpContext;

        public AssetsController(ModelCabinetContext context, IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            httpContext = httpContextAccessor;
        }

        // GET: api/Assets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Asset>>> GetAsset()
        {
            return await _context.Asset.ToListAsync();
        }

        // GET: api/Assets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Asset>> GetAsset(int id)
        {
            var asset = await _context.Asset.FindAsync(id);

            if (asset == null)
            {
                return NotFound();
            }

            return asset;
        }

        // I added these for the cors because i could not make a put request
        // should we make a master controller that all the common code goes into?????
        private void AddCorsHeaders()
        {
            // should we check the request origin coming in???? 
            httpContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*"); // should I only allow http://localhost:4200 ??????
            httpContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT"); // i removed the delete and options as I dont think we will need them???
            httpContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        }

        [HttpOptions("{id}")]
        public IActionResult Options()
        {
            AddCorsHeaders();
            return Ok();
        }
        /////////

        // PUT: api/Assets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsset(int id, Asset asset)
        {
            AddCorsHeaders();

            if (id != asset.AssetId)
            {
                return BadRequest();
            }

            _context.Entry(asset).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssetExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(asset); // changed this from NoContent so I could see what was being returned - Clarissa
        }

        // POST: api/Assets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Asset>> PostAsset(Asset asset)
        {
            _context.Asset.Add(asset);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAsset", new { id = asset.AssetId }, asset);
        }

        // DELETE: api/Assets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsset(int id)
        {
            var asset = await _context.Asset.FindAsync(id);
            if (asset == null)
            {
                return NotFound();
            }

            _context.Asset.Remove(asset);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AssetExists(int id)
        {
            return _context.Asset.Any(e => e.AssetId == id);
        }
    }
}
