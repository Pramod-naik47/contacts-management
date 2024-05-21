using ContactManagement.DatabaseContext;
using ContactManagement.Interface;
using ContactManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactManagement.Services;

public class ContactService : IContact
{
    private ContactContext _dbContext { get; }
    public ContactService(ContactContext context)
    {
        _dbContext = context;
    }
    public async Task<IEnumerable<ContactModel>> GetContactsList()
    {
        return await _dbContext.Contacts.ToListAsync();
    }
}
