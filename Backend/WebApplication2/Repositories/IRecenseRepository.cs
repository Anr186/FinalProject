using WebApplication2.Model;

namespace WebApplication2.Repositories;

public interface IRecenseRepository
{
    IEnumerable<Recense> GetAll();
    Recense GetById(int id);
    Recense Add(Recense recense);
    Recense Update(int id, Recense recense);
    void Delete(int id);
    Task<IEnumerable<Recense>> GetAllAsync();
    Task<IEnumerable<Recense>> GetByArticleIdAsync(int articleId);
    Task<IEnumerable<Recense>> GetByReviewerIdAsync(int reviewerId);
}