namespace WebApplication2.Model;

public class Recense
{
    public int Id { get; set; }
    public int ArticleId { get; set; }
    public int ReviewerId { get; set; }
    public string Author { get; set; }
    public int Rating { get; set; }
    public string Recommendation { get; set; }
    public string? Originality { get; set; }
    public string? PresentationQuality { get; set; }
    public string? CommentsToAuthors { get; set; }
    public string Status { get; set; } = "Pending"; // "Pending", "InProgress", "Completed"
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public string? Attachments { get; set; }

}
