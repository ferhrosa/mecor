using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Mecor.Api.Model.Inputs;
using Mecor.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Mecor.Api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        private readonly UserService userService;

        public SignupController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> SignupUser([FromBody] UserSignupInput input)
        {
            bool success = await userService.CreateUserAsync(input.Email, input.Name, input.Password);

            if (!success) { return BadRequest(); }

            return Ok();
        }
    }
}
