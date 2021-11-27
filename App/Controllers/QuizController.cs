using App.Data;
using App.Models;
using Microsoft.AspNetCore.Authorization;
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
    public class QuizController : ControllerBase
    {
        private readonly AppDataContext _context;
        private readonly IDataRepository<Quiz> _repo;

        //public QuestionController(AppDataContext context,)
        //{
        //    this._context = context;
        //}
        public QuizController(AppDataContext context, IDataRepository<Quiz> repo)
        {
            _context = context;
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<Quiz> GetQuizzes()
        {
            return _context.Quizzes.OrderByDescending(q => q.QuizId);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetQuiz([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quiz = await _context.Quizzes.FindAsync(id);

            if (quiz == null)
            {
                return NotFound();
            }

            return Ok(quiz);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuiz([FromRoute] int id, [FromBody] Quiz quiz)
        {

            // to check or ge single question exist no need to use as using entry.state
            // var question = await _context.Questions.SingleOrDefaultAsync(q => q.ID == id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != quiz.QuizId)
            {
                return BadRequest();
            }

            _context.Entry(quiz).State = EntityState.Modified;

            try
            {
                _repo.Update(quiz);
                var save = await _repo.SaveAsync(quiz);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuizExists(id))
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


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> PostQuiz([FromBody] Quiz quiz)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _repo.Add(quiz);
            var save = await _repo.SaveAsync(quiz);

            return CreatedAtAction("Get Quiz", new { id = quiz.QuizId }, quiz);
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQuiz([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var quiz = await _context.Quizzes.FindAsync(id);
            if (quiz == null)
            {
                return NotFound();
            }

            _repo.Delete(quiz);
            var save = await _repo.SaveAsync(quiz);

            return Ok(quiz);
        }

        private bool QuizExists(int id)
        {
            return _context.Questions.Any(e => e.QuestionId == id);
        }
    }
}
