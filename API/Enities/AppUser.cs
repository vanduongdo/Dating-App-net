using System;
using API.Extensions;
using Microsoft.AspNetCore.Identity;

namespace API.Enities;

public class AppUser : IdentityUser<int>
{
    public DateOnly DateOfBirth { get; set; }
    public required string KnownAs { get; set; }
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    public string? Introduction { get; set; }
    public string? Interests { get; set; }
    public string? LookingFor { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public List<Photo> Photos { get; set; } = [];

    // public int GetAge() { // GetAge is a method that returns the age of the user
    // but memberDto has a property Age, so we can use a method in AutoMapperProfiles.cs, 
    // query the database and calculate the age of the user, it will get all the fialds from the database because we are using ProjectTo<MemberDto>
    //     return DateOfBirth.CalculateAge();
    // }

    public List<UserLike> LikeByUsers { get; set; } = [];
    public List<UserLike> LikedUsers { get; set; } = [];
    public List<Message> MessagesSent { get; set; } = [];
    public List<Message> MessagesReceived { get; set; } = [];
    public ICollection<AppUserRole> UserRoles { get; set; } = []; 
}
