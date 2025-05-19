using WebApplication2.Model;
using WebApplication2.Repositories;

namespace WebApplication2.Services;

public class RecenseService
{
    private readonly IRecenseRepository _repository;

    public RecenseService(IRecenseRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<Recense> GetAll() => _repository.GetAll();
    public async Task<IEnumerable<Recense>> GetAllAsync() => await _repository.GetAllAsync();
    public async Task<IEnumerable<Recense>> GetByArticleIdAsync(int articleId) => await _repository.GetByArticleIdAsync(articleId);
    public async Task<IEnumerable<Recense>> GetByReviewerIdAsync(int reviewerId) => await _repository.GetByReviewerIdAsync(reviewerId);
    public Recense GetById(int id) => _repository.GetById(id);
    public Recense Add(Recense recense) => _repository.Add(recense);
    public Recense Update(int id, Recense recense) => _repository.Update(id, recense);
    public void Delete(int id) => _repository.Delete(id);
}