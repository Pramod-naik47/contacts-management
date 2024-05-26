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

    /// <summary>
    /// Get all the contact list 
    /// </summary>
    /// <returns>List of contacts</returns>
    [HttpGet("GetContactList")]
    public async Task<IActionResult> GetContacts()
    {
        IEnumerable<ContactModel> contacts = await _contact.GetContactsList();
        if (contacts.Any())
            return Ok(contacts);
        else
            return NoContent();
    }

    /// <summary>
    /// Insert new records to the database using given details.
    /// </summary>
    /// <param name="model"></param>
    /// <returns>message</returns>
    [HttpPost("AddContact")]
    public async Task<IActionResult> AddContact([FromBody]ContactModel model)
    {
        if (model != null)
        {
            string result = await _contact.AddContact(model);
            return Ok(result);
        }
        return BadRequest();
    }

    /// <summary>
    /// Update the given contact
    /// </summary>
    /// <param name="model"></param>
    /// <returns>message wheather contact updated or not</returns>
    [HttpPost("UpdateContact")]
    public async Task<IActionResult> UpdateContact([FromBody] ContactModel model)
    {
        if (model != null)
        {
            return Ok(await _contact.UpdateContact(model));
        }
        return BadRequest();
    }

    /// <summary>
    /// Delete the given contact by given Id
    /// </summary>
    /// <param name="id"></param>
    /// <returns>message wheather contact deleted or not</returns>
    [HttpDelete("DeleteContact/{id}")]
    public async Task<IActionResult> DeleteContact(string id)
    {
        if (!string.IsNullOrWhiteSpace(id))
        {
            return Ok(await _contact.DeleteContact(id));
        }
        return BadRequest();
    }
}
