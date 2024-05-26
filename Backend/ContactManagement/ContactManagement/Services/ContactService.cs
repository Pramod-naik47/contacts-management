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

    //NOTE:: always return tru from boolean return type because my middleware is taking care of exceptions.

    public async Task<IEnumerable<ContactModel>> GetContactsList()
    {
        return await _dbContext.Contacts.ToListAsync();
    }
    public async Task<string> AddContact(ContactModel model)
    {
        ContactModel? contact = await GetContact(model.PhoneNumber, model.Email);
        if (contact == null)
        {
            model.ContactId = Guid.NewGuid().ToString();
            await _dbContext.AddAsync(model);
            await _dbContext.SaveChangesAsync();
            return "Contact created successfully";
        }
        return "Contact with same name and email already exist";
    }

    public async Task<ContactModel?> GetContact(string phoneNumber, string email)
    {
        if (!string.IsNullOrWhiteSpace(phoneNumber) && !string.IsNullOrWhiteSpace(email))
            return await _dbContext.Contacts.Where(c => c.PhoneNumber == phoneNumber && c.Email == email).FirstOrDefaultAsync();

        return null;
    }

    public async Task<ContactModel?> GetContactById(string id)
    {
        if (!string.IsNullOrWhiteSpace(id))
            return await _dbContext.Contacts.Where(c => c.ContactId == id).FirstOrDefaultAsync();

        return null;
    }

    public async Task<string> UpdateContact(ContactModel model)
    {
        ContactModel? contact = await GetContactById(model.ContactId);

        if (contact != null)
        {
            contact.Name = model.Name;
            contact.Email = model.Email;
            contact.PhoneNumber = model.PhoneNumber;
            contact.Address = model.Address;
            _dbContext.Contacts.Update(contact);
            await _dbContext.SaveChangesAsync();
            return "Contact updated sucessfully";
        }
        return "Contact not found";
    }

    public async Task<string> DeleteContact(string id)
    {
        ContactModel? contact = await GetContactById(id);
        if ( contact != null )
        {
            _dbContext.Contacts.Remove(contact);
            await _dbContext.SaveChangesAsync();
            return "Contact Deleted Successfully";
        }
        return "Contact not found";
    }
}
