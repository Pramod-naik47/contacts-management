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
        base.OnModelCreating(modelBuilder);
        //Some data on startup
        modelBuilder.Entity<ContactModel>().HasData(
            new ContactModel
            {
                ContactId = Guid.NewGuid().ToString(),
                Name = "Jhon",
                Email = "jhon@gmail.com",
                PhoneNumber = "8956857456",
                Address = "Canada"
            },
            new ContactModel
            {
                ContactId = Guid.NewGuid().ToString(),
                Name = "Erik",
                Email = "erik@gmail.com",
                PhoneNumber = "8965845862",
                Address = "Maxico"
            }
        );
    }
}
