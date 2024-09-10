using System;

namespace API.Enities;

public class AppUser
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public DateTime DateOfBirth { get; set; }
}
