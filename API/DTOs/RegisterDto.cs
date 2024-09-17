using System;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [Required]
    [StringLength(8, MinimumLength = 4)]
    public required string Username { get; set; }
    [Required]
    [StringLength(8, MinimumLength = 4)]
    public required string Password { get; set; }
    public DateTime DateOfBirth { get; set; }
}
