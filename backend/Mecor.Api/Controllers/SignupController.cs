using Mecor.Api.Model.Inputs;
using Mecor.Api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Mecor.Api.Controllers
{
    [Route("signup")]
    [ApiController]
    public class SignupController : ControllerBase
    {
        private readonly UserService userService;

        public SignupController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(BadRequestResult), StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> SignupUser([FromBody] UserSignupInput input)
        {
            bool success = await userService.CreateUserAsync(input.Email, input.Name, input.Password);

            if (!success) { return BadRequest(); }

            return Ok();
        }
    }
}
