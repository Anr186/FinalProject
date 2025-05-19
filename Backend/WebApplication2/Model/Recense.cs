namespace WebApplication2.Model;

public class Recense
{
    public int Id { get; set; }
    public int ArticleId { get; set; }
    public int ReviewerId { get; set; }
    public string AuthorId { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string Recommendation { get; set; } = string.Empty;
    public string Originality { get; set; } = string.Empty;
    public string PresentationQuality { get; set; } = string.Empty;
    public string CommentsToAuthors { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // "Pending", "InProgress", "Completed"
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public string? Attachments { get; set; }

}
