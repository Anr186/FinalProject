using Microsoft.EntityFrameworkCore;
using WebApplication2.Model;

namespace WebApplication2.Repositories;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    modelBuilder.Entity<User>(entity =>
    {
        entity.HasKey(a => a.Id);
        entity.Property(a => a.FullName).IsRequired();
        entity.Property(a => a.Email).IsRequired();
        entity.Property(a => a.Password).IsRequired();
        entity.Property(a => a.Role).IsRequired().HasDefaultValue("Author");
        entity.Property(a => a.Specialization);
        entity.Property(a => a.Location);
        entity.Property(a => a.Bio);
        
        entity.HasMany(a => a.Articles).WithOne(a => a.User).HasForeignKey(a => a.UserId);
    });
    }
}