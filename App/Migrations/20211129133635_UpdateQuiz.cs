using Microsoft.EntityFrameworkCore.Migrations;

namespace App.Migrations
{
    public partial class UpdateQuiz : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "QuestionId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Questions",
                keyColumn: "QuestionId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Quizzes",
                keyColumn: "QuizId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Quizzes",
                keyColumn: "QuizId",
                keyValue: 2);

            migrationBuilder.AddColumn<string>(
                name: "OwnerId",
                table: "Quizzes",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Quizzes");

            migrationBuilder.InsertData(
                table: "Questions",
                columns: new[] { "QuestionId", "Answer1", "Answer2", "Answer3", "CorrectAnswer", "QuestionText", "QuizId" },
                values: new object[,]
                {
                    { 1, "answer 1", "answer 2", "answer 3", "Correct answer", "question1", 1 },
                    { 2, "answer 1", "answer 2", "answer 3", "Correct answer", "question2", 2 }
                });

            migrationBuilder.InsertData(
                table: "Quizzes",
                columns: new[] { "QuizId", "QuizTitle" },
                values: new object[,]
                {
                    { 1, "quiz1" },
                    { 2, "quiz2" }
                });
        }
    }
}
