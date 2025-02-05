using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Enities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration config, UserManager<AppUser> userManager) : ITokenService
{
    public async Task<string> CreateToken(AppUser user)
    {
        var tokenKey = config["TokenKey"] ?? throw new Exception("Cannot find TokenKey in appsettings");
        if (tokenKey.Length < 64) throw new Exception("TokenKey needs to be longer");
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)); // create a key from the tokenKey

        if (user.UserName == null) throw new Exception("User has no username");

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new(ClaimTypes.Name, user.UserName),
        };

        var roles = await userManager.GetRolesAsync(user);

        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var TokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(7),
            SigningCredentials = creds,
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(TokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}
