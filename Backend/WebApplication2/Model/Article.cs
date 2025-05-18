namespace WebApplication2.Model;

public class Article {
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty; 
    public string Category { get; set; } = string.Empty; 
    public string Content { get; set; } = string.Empty; 
    public string Status { get; set; }  = string.Empty; 
    public DateTime SubmittedDate { get; set; }
    public int UserId { get; set; }
    public User User { get; set; } = new User(); 
}