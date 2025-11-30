using System.ComponentModel.DataAnnotations;

namespace Contacts.Dtos;


public class ContactCreateDto
{

    public required string fullname { get; set; }  


    public required string phon_number { get; set; }


    public DateTime? birthday { get; set; }

    public string imgadress { get; set; } = "";
}


public class ContactResponse
{
    [Key]
    public Guid id { get; set; }
    public  string? fullname { get; set; }  
    public  string? phon_number { get; set; }
    public DateTime? birthday { get; set; }
    public string? imgadress { get; set; }
}