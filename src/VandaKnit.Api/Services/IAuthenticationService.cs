using VandaKnit.Api.Models;

namespace VandaKnit.Api.Services;

public interface IAuthenticationService
{
    string GenerateToken(User user);
}