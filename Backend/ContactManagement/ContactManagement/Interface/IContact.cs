using ContactManagement.Models;

namespace ContactManagement.Interface;

public interface IContact
{
    Task<IEnumerable<ContactModel>> GetContactsList();
    Task<string> AddContact(ContactModel model);
    Task<ContactModel?> GetContact(string phoneNumber, string email);
    Task<ContactModel?> GetContactById(string id);
    Task<string> UpdateContact(ContactModel model);
    Task<string> DeleteContact(string id);
}
