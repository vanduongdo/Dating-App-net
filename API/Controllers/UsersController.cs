using System;
using API.Data;
using API.Enities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(DataContext context) : BaseApiController
{
    // private readonly DataContext _context = context;
    // public UsersController(DataContext context)
    // {
    //     _context = context;
    // }
    [AllowAnonymous]
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        var users = await context.Users.ToListAsync();

        return users;
    }

    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUser>> GetUser(int id) // ActionResult<AppUser> is a generic type, it can return any type of data, Task so it can return async data
    {
        var user = await context.Users.FindAsync(id);

        if (user == null)
            return NotFound();
        return user;
    }
}
