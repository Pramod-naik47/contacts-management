namespace ContactManagement.Models;

public class ErrorModel
{
    public int Code { get; set; }
    public string? Message { get; set; }
    public string? StackTrace { get; set; }
}
