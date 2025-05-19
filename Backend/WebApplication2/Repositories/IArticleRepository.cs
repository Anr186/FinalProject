using WebApplication2.Model;

namespace WebApplication2.Repositories;

public interface IArticleRepository
{
    IEnumerable<Article> GetAll();
    Article GetById(int id);
    Article Add(Article article);
    Article Update(int id, Article article);
    void Delete(int id);
    Task<IEnumerable<Article>> GetAllAsync();
    Task<IEnumerable<Article>> GetByUserIdAsync(int userId);
}