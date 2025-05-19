using Microsoft.EntityFrameworkCore;
using WebApplication2.Model;

namespace WebApplication2.Repositories;

public class ArticleRepository : IArticleRepository
{
    private readonly AppDbContext _context;

    public ArticleRepository(AppDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Article> GetAll()
    {
        return _context.Articles.Include(a => a.User).ToList();
    }

    public async Task<IEnumerable<Article>> GetAllAsync()
    {
        return await _context.Articles.Include(a => a.User).ToListAsync();
    }

    public async Task<IEnumerable<Article>> GetByUserIdAsync(int userId)
    {
        return await _context.Articles
            .Where(a => a.UserId == userId)
            .Include(a => a.User)
            .ToListAsync();
    }

    public Article GetById(int id)
    {
        return _context.Articles.Include(a => a.User).FirstOrDefault(a => a.Id == id) ?? throw new KeyNotFoundException("Article not found");
    }

    public Article Add(Article article)
    {
        article.SubmittedDate = DateTime.UtcNow;
        _context.Articles.Add(article);
        _context.SaveChanges();
        return article;
    }

    public Article Update(int id, Article article)
    {
        var existingArticle = GetById(id);
    
        if (!string.IsNullOrEmpty(article.Title)) existingArticle.Title = article.Title;
    
        if (!string.IsNullOrEmpty(article.Category)) existingArticle.Category = article.Category;
    
        if (!string.IsNullOrEmpty(article.Content)) existingArticle.Content = article.Content;
    
        if (!string.IsNullOrEmpty(article.Status)) existingArticle.Status = article.Status;
    
        if (!string.IsNullOrEmpty(article.ImagePngPath)) existingArticle.ImagePngPath = article.ImagePngPath;
    
        if (!string.IsNullOrEmpty(article.WordDocumentPath)) existingArticle.WordDocumentPath = article.WordDocumentPath;

        _context.SaveChanges();
        return existingArticle;
    }

    public void Delete(int id)
    {
        var article = GetById(id);
        _context.Articles.Remove(article);
        _context.SaveChanges();
    }
}