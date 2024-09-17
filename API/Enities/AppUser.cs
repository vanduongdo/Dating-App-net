using System;

namespace API.Enities;

public class AppUser
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public DateTime DateOfBirth { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}
