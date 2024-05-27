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

    /// <summary>
    /// Get the list of contacts
    /// </summary>
    /// <returns>List of contacts</returns>
    public async Task<IEnumerable<ContactModel>> GetContactsList()
    {
        return await _dbContext.Contacts.ToListAsync();
    }

    /// <summary>
    /// Create new contacts
    /// </summary>
    /// <param name="model"></param>
    /// <returns>message</returns>
    public async Task<string> AddContact(ContactModel model)
    {
        //Check before creating wheather contact exist or not
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

    /// <summary>
    /// Check the given phone number and email combination exist in our db.
    /// </summary>
    /// <param name="phoneNumber"></param>
    /// <param name="email"></param>
    /// <returns>contacts if exist or null</returns>
    public async Task<ContactModel?> GetContact(string phoneNumber, string email)
    {
        if (!string.IsNullOrWhiteSpace(phoneNumber) && !string.IsNullOrWhiteSpace(email))
            return await _dbContext.Contacts.Where(c => c.PhoneNumber == phoneNumber && c.Email == email).FirstOrDefaultAsync();

        return null;
    }

    /// <summary>
    /// Get the contact by id
    /// </summary>
    /// <param name="id"></param>
    /// <returns> contact object</returns>
    public async Task<ContactModel?> GetContactById(string id)
    {
        if (!string.IsNullOrWhiteSpace(id))
            return await _dbContext.Contacts.Where(c => c.ContactId == id).FirstOrDefaultAsync();

        return null;
    }

    /// <summary>
    /// Update the given contact
    /// </summary>
    /// <param name="model"></param>
    /// <returns> messsage</returns>
    public async Task<string> UpdateContact(ContactModel model)
    {
        //Check before the given contact exist or not
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

    /// <summary>
    /// Delete the given contact
    /// </summary>
    /// <param name="id"></param>
    /// <returns>message</returns>
    public async Task<string> DeleteContact(string id)
    {
        //Check before given contact exist in our db.
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
