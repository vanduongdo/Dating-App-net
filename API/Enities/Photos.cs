namespace API.Enities;

public class Photos
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public bool IsMain { get; set; }
    public string? PublicId { get; set; }
    public  AppUser AppUser { get; set; }
    public int AppUserId { get; set; }
}