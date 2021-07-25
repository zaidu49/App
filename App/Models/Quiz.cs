using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace App.Models
{
    public class Quiz
    {
		[Key]
		public int QuizId { get; set; }

		[Required]
		public string QuizTitle { get; set; }


	}
}
