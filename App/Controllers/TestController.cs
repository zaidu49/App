using App.Data;
using App.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace App.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private readonly AppDataContext _context;
        private readonly IDataRepository<Test> _repo;

        public TestController(AppDataContext context, IDataRepository<Test> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/tests
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Test>>> GetTests()
        //{
        //    return await _context.Tests.ToListAsync();
        //}
        [HttpGet]
        public IEnumerable<Test> GetTests()
        {
            return _context.Tests.OrderByDescending(p => p.TestId);
        }

        // GET: api/Test/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<Test>> GetTest(int id)
        //{
        //    var test = await _context.Tests.FindAsync(id);

        //    if (test == null)
        //    {
        //        return NotFound();
        //    }

        //    return test;
        //}

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTest([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var test = await _context.Tests.FindAsync(id);

            if (test == null)
            {
                return NotFound();
            }

            return Ok(test);
        }

        // PUT: api/Test/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTest(int id, Test test)
        //{
        //    if (id != test.TestId)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(test).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TestExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTest([FromRoute] int id, [FromBody] Test test)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != test.TestId)
            {
                return BadRequest();
            }

            _context.Entry(test).State = EntityState.Modified;

            try
            {
                _repo.Update(test);
                var save = await _repo.SaveAsync(test);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TestExists(id))
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

        // POST: api/test
        //[HttpPost]
        //public async Task<ActionResult<Test>> PostTest(Test test)
        //{
        //    _context.Tests.Add(test);
        //    await _context.SaveChangesAsync();

        //    return CreatedAtAction("GetTest", new { id = test.TestId }, test);
        //}
        [HttpPost]
        public async Task<IActionResult> PostTest([FromBody] Test test)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(test);
            var save = await _repo.SaveAsync(test);

            return CreatedAtAction("Get test", new { id = test.TestId }, test);
        }

        // DELETE: api/Test/5
        //[HttpDelete("{id}")]
        //public async Task<ActionResult<Test>> DeleteTest(int id)
        //{
        //    var test = await _context.Tests.FindAsync(id);
        //    if (test == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Tests.Remove(test);
        //    await _context.SaveChangesAsync();

        //    return test;
        //}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTest([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var test = await _context.Tests.FindAsync(id);
            if (test == null)
            {
                return NotFound();
            }

            _repo.Delete(test);
            var save = await _repo.SaveAsync(test);

            return Ok(test);
        }

        private bool TestExists(int id)
        {
            return _context.Tests.Any(e => e.TestId == id);
        }
    }
}
