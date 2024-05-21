using System.ComponentModel.DataAnnotations;

namespace ContactManagement.Models;

public class ContactModel
{
    [Key]
    public string? ContactId { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
}
