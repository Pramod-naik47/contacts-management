using ContactManagement.Interface;
using ContactManagement.Models;
using Microsoft.AspNetCore.Mvc;

namespace ContactManagement.Controllers;

[ApiController]
[Route("[controller]")]
public class ContactsController : ControllerBase
{
    private IContact _contact { get; }
    public ContactsController(IContact contact)
    {
        _contact = contact;
    }

    [HttpGet("GetContacts")]
    public async Task<IActionResult> GetContacts()
    {
        IEnumerable<ContactModel> contacts = await _contact.GetContactsList();
        if (contacts.Any())
            return Ok(contacts);
        else
            return NoContent();
    }
}
