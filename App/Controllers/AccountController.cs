using App.Data;
using App.Models;
using App.Models.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace App.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly AppDataContext _context;
        private readonly UserDbContext _userContext;
        private readonly IDataRepository<Question> _repo;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IConfiguration _configuration;

        //public QuestionController(AppDataContext context,)
        //{
        //    this._context = context;
        //}
        public AccountController(AppDataContext context,
            IDataRepository<Question> repo,
            IConfiguration configuration,
            UserManager<ApplicationUser> userManager,
            SignInManager<ApplicationUser> signInManager
            )
        {
            _context = context;
            _repo = repo;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterVM registerVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Provide all the required information");
            }

            var userExists = await _userManager.FindByEmailAsync(registerVM.Email);
            if (userExists != null)
            {
                return BadRequest($"User {registerVM.Email} already Exist");
            }

            ApplicationUser applicationUser = new ApplicationUser()
            {
                UserName = registerVM.UserName,
                Email = registerVM.Email,
                FullName = registerVM.FullName,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, registerVM.Password);

                //TO ADD ROLES LATER ON (CAN  LOOK FOR OTHER WAY)
                //if (result.Succeeded)
                //{
                //    //add user role

                //    switch (registerVM.Role)
                //    {
                //        case UserRoles.Manager:
                //            await _userManager.AddToRoleAsync(newUser, UserRoles.Manager);
                //            break;

                //        case UserRoles.Student:
                //            await _userManager.AddToRoleAsync(newUser, UserRoles.Student);
                //            break;
                //        default:
                //            break;
                //    }

                //    return Ok("Registered");
                //}
                //else
                //{
                //    return BadRequest("Something went wrong");
                //}

                return Ok(result);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginVM loginVM)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("cannot login");
            }
            var userExist = await _userManager.FindByNameAsync(loginVM.UserName);

            if (userExist != null && await _userManager.CheckPasswordAsync(userExist, loginVM.Password))
            {

                var sKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]));
                var signingCredentials = new SigningCredentials(sKey, SecurityAlgorithms.HmacSha256);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, userExist.UserName),

                };

                var tokenOptions = new JwtSecurityToken(
                    issuer: "http://localhost:34467",
                    //_configuration["JWT:Issuer"],
                    audience: "http://localhost:34467",
                    //_configuration["JWT:Audience"],
                    claims: new List<Claim>(),
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: signingCredentials
                    );


                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                try
                {
                    await _signInManager.SignInAsync(userExist, isPersistent: false);
                }
                catch(Exception e)
                {
                    throw (e);
                }
                
                return Ok(new { Token = tokenString});
            }
            else
            {
                return BadRequest(new { message = "Incorrect" });
            }


        }

        //public async Task<IActionResult> Login(LoginVM loginVM)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest("cannot login");
        //    }
        //    var userExist = await _userManager.FindByNameAsync(loginVM.UserName);

        //    if(userExist != null && await _userManager.CheckPasswordAsync(userExist, loginVM.Password))
        //    {

        //        //var tokenValue = await GenerateJWTTokenAsync(userExist, null);
        //        //var tokenValue = await GenerateJWTTokenAsync(userExist);
        //        await _signInManager.SignInAsync(userExist, isPersistent: false);

        //        var authClaims = new List<Claim>()
        //        {
        //            new Claim(ClaimTypes.Name, userExist.UserName),
        //            new Claim(ClaimTypes.NameIdentifier, userExist.Id),
        //            new Claim(JwtRegisteredClaimNames.Email, userExist.Email),
        //            new Claim(JwtRegisteredClaimNames.Sub, userExist.Email),
        //            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        //        };
        //        //var authSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]));
        //        //var token = new JwtSecurityToken(
        //        //       //issuer: _configuration["JWT:Issuer"],
        //        //       //audience: _configuration["JWT:Audience"],
        //        //       expires: DateTime.UtcNow.AddMinutes(5),
        //        //       claims: authClaims,
        //        //       signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));
        //        //var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

        //        var tokenDescriptor = new SecurityTokenDescriptor
        //        {
        //            Subject = new ClaimsIdentity(authClaims),
        //            //Subject = new ClaimsIdentity (new Claim[]
        //            //{
        //            //    new Claim("UserName", userExist.UserName),
        //            //      new Claim(ClaimTypes.Name, userExist.UserName),
        //            //        new Claim(ClaimTypes.NameIdentifier, userExist.Id),
        //            //        //new Claim(JwtRegisteredClaimNames.Email, userExist.Email),
        //            //        //new Claim(JwtRegisteredClaimNames.Sub, userExist.Email),
        //            //        //new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        //            //    //new Claim("UserId", userExist.Id.ToString())
        //            //}),
        //            Expires = DateTime.UtcNow.AddMinutes(5),
        //            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"])), SecurityAlgorithms.HmacSha256)
        //        };


        //        var tokenHandler = new JwtSecurityTokenHandler();
        //        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        //        var token = tokenHandler.WriteToken(securityToken);


        //        return Ok(new { token });
        //    }
        //    else
        //    {
        //        return BadRequest(new { message = "Incorrect" });
        //    }


        //}

        //private async Task<Object> GenerateJWTTokenAsync(ApplicationUser user)
        //{
        //    var authClaims = new List<Claim>()
        //    {
        //        new Claim(ClaimTypes.Name, user.UserName),
        //        new Claim(ClaimTypes.NameIdentifier, user.Id),
        //        new Claim(JwtRegisteredClaimNames.Email, user.Email),
        //        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
        //        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        //    };

        //    var authSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JWT:SecretKey"]));

        //    var token = new JwtSecurityToken(
        //       issuer: _configuration["JWT:Issuer"],
        //       audience: _configuration["JWT:Audience"],
        //       expires: DateTime.UtcNow.AddMinutes(5),
        //       claims: authClaims,
        //       signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256));

        //    //var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

        //    var tokenhandler = new JwtSecurityTokenHandler();
        //    var jwtToken = tokenhandler.WriteToken(token);

        //    return jwtToken;


        //}
        //old from yt method
        //[HttpPost("login")]
        //public async Task<IActionResult> Login(LoginVM loginVM)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest("cannot login");
        //    }
        //    var userExist = await _userManager.FindByNameAsync(loginVM.UserName);

        //    if (userExist != null && await _userManager.CheckPasswordAsync(userExist, loginVM.Password))
        //    {
        //        var tokenDescriptor = new SecurityTokenDescriptor
        //        {
        //            Subject = new ClaimsIdentity(new Claim[]
        //            {
        //                 new Claim(ClaimTypes.NameIdentifier, userExist.Id.ToString()),
        //                //new Claim("UserId", userExist.Id.ToString())
        //            }),
        //            Expires = DateTime.UtcNow.AddMinutes(5),
        //            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("this-is-the-secret-jwt-key-authApp")), SecurityAlgorithms.HmacSha256)
        //        };
        //        var tokenHandler = new JwtSecurityTokenHandler();
        //        var securityToken = tokenHandler.CreateToken(tokenDescriptor);
        //        var token = tokenHandler.WriteToken(securityToken);
        //        return Ok(new { token });
        //    }
        //    else
        //    {
        //        return BadRequest(new { message = "Incorrect" });
        //    }


        //}
    }
}
