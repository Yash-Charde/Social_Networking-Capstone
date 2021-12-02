using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Social_Networking.Models;

namespace Social_Networking.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _singInManager;
        private ILogger<ApplicationUserController> _logger;
        private readonly ApplicationSettings _appSettings;
        private readonly IEmailSender _emailSender;

        public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, 
                ILogger<ApplicationUserController> logger, IOptions<ApplicationSettings> appSettings, IEmailSender emailSender)
        {
            _userManager = userManager;
            _singInManager = signInManager;
            _logger = logger;
            _appSettings = appSettings.Value;
            _emailSender = emailSender;
        }

        [HttpPost]
        [Route("Register")]
        //POST : /api/ApplicationUser/Register
        public async Task<Object> PostApplicationUser(ApplicationUserModel model)
        {
            _logger.LogInformation("called ApplicationUser Controller");
/*
            model.Followers = 0;
            model.Following = 0;
*/
            var applicationUser = new ApplicationUser()
            {
                UserName = model.UserName,
                Email = model.Email,
                FullName = model.FullName,
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        [Route("Login")]
        //POST : /api/ApplicationUser/Login
        public async Task<IActionResult> Login(LoginModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
            {
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID", user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                var token = tokenHandler.WriteToken(securityToken);
                return Ok(new { token });
            }
            else
                return BadRequest(new { messsage = "Username or Password is incorrect." });
        }

        /*[HttpPost]
        [Route("forgetPassword")]
        // POST: api/ApplicationUser/forgetPassword
        public async Task<IActionResult> forgetPassword(ApplicationUserModel model)
        {
            var user = await _userManager.FindByNameAsync(model.UserName);
            if((user != null) && (user.Email == _userManager.FindByEmailAsync(model.Email).ToString()))
            {
                var result = await _userManager.CreateAsync(user, model.Password);
                return Ok(result);
            }
        }*/
    }
}       