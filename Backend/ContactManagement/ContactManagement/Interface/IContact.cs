using ContactManagement.Models;

namespace ContactManagement.Interface;

public interface IContact
{
    Task<IEnumerable<ContactModel>> GetContactsList();
}
