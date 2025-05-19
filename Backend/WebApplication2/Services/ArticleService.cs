using WebApplication2.Model;
using WebApplication2.Repositories;

namespace WebApplication2.Services;

public class ArticleService
{
    private readonly IArticleRepository _repository;

    public ArticleService(IArticleRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<Article> GetAll() => _repository.GetAll();
    public async Task<IEnumerable<Article>> GetAllAsync() => await _repository.GetAllAsync();
    public async Task<IEnumerable<Article>> GetByUserIdAsync(int userId) => await _repository.GetByUserIdAsync(userId);
    public Article GetById(int id) => _repository.GetById(id);
    public Article Add(Article article) => _repository.Add(article);
    public Article Update(int id, Article article) => _repository.Update(id, article);
    public void Delete(int id) => _repository.Delete(id);
}