using System;
using API.Enities;

namespace API.Interfaces;

public interface ITokenService
{
    Task<string> CreateToken(AppUser user);
}
