using System;
using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Enities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController(IUserRepository userRepository, IMapper mapper) : BaseApiController
{
    // private readonly DataContext _context = context;
    // public UsersController(DataContext context)
    // {
    //     _context = context;
    // }


    [HttpGet]
    public async Task<ActionResult<IEnumerable<MemberDto>>> GetUsers()
    {
        var users = await userRepository.GetMembersAsync();

        return Ok(users);
    }

    [Authorize]
    [HttpGet("{username}")] // api/users/username
    public async Task<ActionResult<MemberDto>> GetUser(string username) // ActionResult<AppUser> is a generic type, it can return any type of data, Task so it can return async data
    {
        var user = await userRepository.GetMemberAsync(username);

        if (user == null)
            return NotFound();
        return user;
    }

    [HttpPut]
    public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
    {
        var username = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (username == null) return BadRequest("No user found");

        var user = await userRepository.GetUserByUserNameAsync(username);

        if (user == null) return BadRequest("Could not find user");

        mapper.Map(memberUpdateDto, user);

        if (await userRepository.SaveAllAsync()) return NoContent();

        return BadRequest("Failed to update user");
    }
}
