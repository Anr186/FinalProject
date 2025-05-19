using Microsoft.EntityFrameworkCore;
using WebApplication2.Model;

namespace WebApplication2.Repositories;

public class RecenseRepository : IRecenseRepository
{
    private readonly AppDbContext _context;

    public RecenseRepository(AppDbContext context)
    {
        _context = context;
    }

    public IEnumerable<Recense> GetAll()
    {
        return _context.Recenses.ToList();
    }

    public async Task<IEnumerable<Recense>> GetAllAsync()
    {
        return await _context.Recenses.ToListAsync();
    }

    public async Task<IEnumerable<Recense>> GetByArticleIdAsync(int articleId)
    {
        return await _context.Recenses
            .Where(r => r.ArticleId == articleId)
            .ToListAsync();
    }

    public async Task<IEnumerable<Recense>> GetByReviewerIdAsync(int reviewerId)
    {
        return await _context.Recenses
            .Where(r => r.ReviewerId == reviewerId)
            .ToListAsync();
    }

    public Recense GetById(int id)
    {
        return _context.Recenses.FirstOrDefault(r => r.Id == id) ?? throw new KeyNotFoundException("Recense not found");
    }

    public Recense Add(Recense recense)
    {
        recense.CreatedAt = DateTime.UtcNow;
        recense.UpdatedAt = DateTime.UtcNow;
        _context.Recenses.Add(recense);
        _context.SaveChanges();
        return recense;
    }

    public Recense Update(int id, Recense recense)
    {
        var existingRecense = GetById(id);
        
        existingRecense.Rating = recense.Rating;
        existingRecense.Recommendation = recense.Recommendation;
        existingRecense.Originality = recense.Originality;
        existingRecense.PresentationQuality = recense.PresentationQuality;
        existingRecense.CommentsToAuthors = recense.CommentsToAuthors;
        existingRecense.Status = recense.Status;
        existingRecense.Attachments = recense.Attachments;
        existingRecense.UpdatedAt = DateTime.UtcNow;

        _context.SaveChanges();
        return existingRecense;
    }

    public void Delete(int id)
    {
        var recense = GetById(id);
        _context.Recenses.Remove(recense);
        _context.SaveChanges();
    }
}