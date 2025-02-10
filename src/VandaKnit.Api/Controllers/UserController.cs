using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Dto;
using VandaKnit.Api.Models;
using VandaKnit.Api.Services;

namespace VandaKnit.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IAuthenticationService _authenticationService;

    public UserController(IUserRepository userRepository, IAuthenticationService authenticationService)
    {
        _userRepository = userRepository;
        _authenticationService = authenticationService;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterRequest request)
    {
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser != null)
        {
            return BadRequest("User already exists");
        }

        User user = new User
        {
            Email = request.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
        };

        await _userRepository.AddAsync(user);
        return Ok();
    }

    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginRequest request)
    {
        var existingUser = await _userRepository.GetByEmailAsync(request.Email);
        if (existingUser == null || !BCrypt.Net.BCrypt.Verify(request.Password, existingUser.PasswordHash))
        {
            return Unauthorized("Wrong email or password");
        }

        var token = _authenticationService.GenerateToken(existingUser);
        return Ok(token);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet]
    public async Task<IEnumerable<User>> GetUsers(int skip = 0, int take = 10, string? orderBy = null)
    {
        return await _userRepository.GetAsync(skip, take, orderBy);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserById(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        return Ok(user);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateUser(Guid id, [FromBody] User user)
    {
        var existingUser = await _userRepository.GetByIdAsync(id);
        if (existingUser == null)
        {
            return NotFound();
        }

        existingUser.Email = user.Email;
        existingUser.RoleId = user.RoleId;
        await _userRepository.UpdateAsync(existingUser);
        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteUser(Guid id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        await _userRepository.DeleteAsync(user);
        return Ok();
    }
}
