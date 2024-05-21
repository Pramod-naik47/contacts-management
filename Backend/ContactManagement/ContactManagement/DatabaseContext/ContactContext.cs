using ContactManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactManagement.DatabaseContext;

public class ContactContext : DbContext
{
    public ContactContext(DbContextOptions<ContactContext> options) : base(options)
    {
    }

    public DbSet<ContactModel> Contacts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactModel>().HasData(
            new ContactModel
            {
                ContactId = Guid.NewGuid().ToString(),
                Name = "William",
                Email = "pramodnaik221@gmail.com"
            }
        );
    }
}
