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
    public class QuestionController : ControllerBase
    {
        private readonly AppDataContext _context;
        private readonly IDataRepository<Question> _repo;

        //public QuestionController(AppDataContext context,)
        //{
        //    this._context = context;
        //}
        public QuestionController(AppDataContext context, IDataRepository<Question> repo)
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
        public IEnumerable<Question> GetQuestions()
        {
            return _context.Questions.OrderByDescending(q => q.QuestionId);
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
        public async Task<IActionResult> GetQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Questions.FindAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            return Ok(question);
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
        public async Task<IActionResult> PutQuestion([FromRoute] int id, [FromBody] Question question)
        {

            // to check or ge single question exist no need to use as using entry.state
            // var question = await _context.Questions.SingleOrDefaultAsync(q => q.ID == id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != question.QuestionId)
            {
                return BadRequest();
            }

            _context.Entry(question).State = EntityState.Modified;

            try
            {
                _repo.Update(question);
                var save = await _repo.SaveAsync(question);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuestionExists(id))
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
        public async Task<IActionResult> PostQuestion([FromBody] Question question)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(question);
            var save = await _repo.SaveAsync(question);

            return CreatedAtAction("Get Question", new { id = question.QuestionId }, question);
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
        public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var question = await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }

            _repo.Delete(question);
            var save = await _repo.SaveAsync(question);

            return Ok(question);
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(e => e.QuestionId == id);
        }
    }
}
