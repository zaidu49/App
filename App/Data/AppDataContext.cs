using App.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.Data
{
    public class AppDataContext: DbContext
    {

        public AppDataContext(DbContextOptions<AppDataContext> options)
            : base(options)
        {
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer("Data Source=DESKTOP-7EG800L\\SQLEXPRESS;Initial Catalog=AppDb;Integrated Security=SSPI;" + "Trusted_Connection=True");
        //}
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseSqlServer(ConfigurationManager.ConnectionStrings["BloggingDatabase"].ConnectionString);
        //}

        public DbSet<Test> Tests { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Quiz> Quizzes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Test>().HasData(
                new Test { TestId = 2, Title = "z1", Body = "Male", Creator = "IT" },
                new Test { TestId = 3,  Title = "z2", Body = "Male", Creator = "IT" }
                );

            modelBuilder.Entity<Quiz>().HasData(
                new Quiz { QuizId = 1, QuizTitle = "quiz1" },
                new Quiz { QuizId = 2, QuizTitle = "quiz2" }
                );

            modelBuilder.Entity<Question>().HasData(
                new Question { QuestionId = 1, QuestionText = "question1", CorrectAnswer = "Correct answer", Answer1 = "answer 1", Answer2 = "answer 2", Answer3 = "answer 3", QuizId=1 },
                new Question { QuestionId = 2, QuestionText = "question2", CorrectAnswer = "Correct answer", Answer1 = "answer 1", Answer2 = "answer 2", Answer3 = "answer 3", QuizId=2 }
                );
        }

    }
}
