using System;
using Microsoft.AspNetCore.Identity;

namespace API.Enities;

public class AppRole : IdentityRole<int>
{
    public ICollection<AppUserRole> UserRoles { get; set; } = [];
}
