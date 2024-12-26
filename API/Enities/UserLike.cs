using System;

namespace API.Enities;

public class UserLike
{
    public AppUser SourceUser { get; set; } = null!; // ! means it is not null, it will throw an exception if it is null
    public int SourceUserId { get; set; }
    public AppUser TargetUser { get; set; } = null!;
    public int TargetUserId { get; set; }
}
