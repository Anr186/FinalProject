using Microsoft.EntityFrameworkCore;
using WebApplication2.Model;

namespace WebApplication2.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public IEnumerable<User> GetAll()
    {
        return _context.Users.ToList();
    }

    public async Task<IEnumerable<User>> GetAllAsync()
    {
        return await _context.Users.ToListAsync();
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
    }
    public User GetById(int id)
    {
        return _context.Users.FirstOrDefault(a => a.Id == id) ?? throw new KeyNotFoundException("User not found");
    }

    public User Add(User User)
    {
        _context.Users.Add(User);
        _context.SaveChanges();
        return User;
    }

    public User Update(int id, User User)
    {
        var existingUser = GetById(id);
        
        existingUser.FullName = User.FullName;
        existingUser.Email = User.Email;
        existingUser.Password = User.Password;
        existingUser.Specialization = User.Specialization;
        existingUser.Location = User.Location;
        existingUser.Bio = User.Bio;

        _context.SaveChanges();
        return existingUser;
    }

    public void Delete(int id)
    {
        var User = GetById(id);
        _context.Users.Remove(User);
        _context.SaveChanges();
    }
}