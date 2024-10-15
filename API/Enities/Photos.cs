using System.ComponentModel.DataAnnotations.Schema;

namespace API.Enities;

[Table("Photos")]
public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }

    // Navigation properties
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!; 
    // Navigation property, it's a reference to the AppUser entity
    // it will be a possible object cycle was detected, so we need to ignore it
}