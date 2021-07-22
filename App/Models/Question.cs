using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace App.Models
{
    public class Question
    {
		[Key]
		public int QuestionId { get; set; }

		[Required]
		public string QuestionText { get; set; }

	}
}
