using ContactManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactManagement.DatabaseContext;

public class ContactContext : DbContext
{
    private IConfiguration _configuration { get; }
    public ContactContext(DbContextOptions<ContactContext> options, IConfiguration configuration) : base(options)
    {
         _configuration = configuration;
    }

    public DbSet<ContactModel> Contacts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactModel>().HasData(
            new ContactModel
            {
                ContactId = Guid.NewGuid().ToString(),
                Name = "Pramod",
                Email = "pramodnaik221@gmail.com",
                PhoneNumber = "9482022134",
                Address = "Chilimbi"
            }
        );
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseInMemoryDatabase(_configuration["ConnectionString"]);
    }
}
