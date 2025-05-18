using WebApplication2.Model;
using WebApplication2.Repositories;

namespace WebApplication2.Services;

public class UserService
{
    private IUserRepository _repository;

    public UserService(IUserRepository repository)
    {
        _repository = repository;
    }
    public IEnumerable<User> GetAll() => _repository.GetAll();
    public async Task<IEnumerable<User>> GetAllAsync() => await _repository.GetAllAsync();
    public User GetById(int id) => _repository.GetById(id);
    public User Add(User User) => _repository.Add(User);
    public User Update(int id, User User) => _repository.Update(id, User);
    public void Delete(int id) => _repository.Delete(id);

    public async Task<User?> Authenticate(string email, string password)
{
    var user = await _repository.GetByEmailAsync(email);
    if (user == null) 
    {
        Console.WriteLine($"User with email {email} not found");
        return null;
    }
    
    Console.WriteLine($"Stored password: {user.Password}, input password: {password}");
    return user.Password == password ? user : null;
}
}