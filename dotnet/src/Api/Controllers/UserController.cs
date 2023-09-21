using AutoMapper;
using Mecor.Api.Models;
using Mecor.Domain.User.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Mecor.Api.Controllers;

[Route("api/users")]
[ApiController]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IUserRepository _userRepository;

    public UserController(
        IMapper mapper,
        IUserRepository userRepository)
    {
        _mapper = mapper;
        _userRepository = userRepository;
    }

    [HttpGet("current")]
    public async Task<ActionResult<UserModel>> GetCurrentUser()
    {
        if (User.Identity?.Name == null) { return Unauthorized(); }

        var user = await _userRepository.GetSingleByUserNameAsync(User.Identity.Name);
        return _mapper.Map<UserModel>(user);
    }
}
