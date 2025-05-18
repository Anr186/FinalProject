using WebApplication2.Model;

namespace WebApplication2.Repositories;

public interface IUserRepository
{
    IEnumerable<User> GetAll();
    User GetById(int id);
    User Add(User author);
    User Update(int id, User author);
    void Delete(int id);
    Task<IEnumerable<User>> GetAllAsync();
    Task<User?> GetByEmailAsync(string email);
    public record LoginRequest(string Email, string Password);
}