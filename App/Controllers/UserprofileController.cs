using App.Data;
using App.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;


namespace App.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        //[Authorize]
        public async Task<Object> GetUserProfile()
        {

            //var identity = (ClaimsPrincipal)Thread.CurrentPrincipal;
            //var userId = identity.Claims.Where(c => c.Type == ClaimTypes.NameIdentifier)
            //       .Select(c => c.Value).SingleOrDefault();
            try
            {
                //var claims = ClaimsPrincipal.Current.Identities.First().Claims.ToList();

                ////Filter specific claim    
                //var userId = claims?.FirstOrDefault(x => x.Type.Equals("UserName", StringComparison.OrdinalIgnoreCase))?.Value;
                var userId = HttpContext.User.Claims.First().Value;
                var user = await _userManager.FindByIdAsync(userId);

                //var userId = User.Claims.First(c => c.Type == ClaimTypes.NameIdentifier).Value;
                //var user = await _userManager.FindByIdAsync(userId);
                return new
                {
                    user.FullName,
                    user.Email,
                    user.UserName
                };
            }
            catch(Exception ex)
            {
                throw (ex);
            }
            
           
        }

    }
}
