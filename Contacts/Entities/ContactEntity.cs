using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Contacts.Entities;

[Table(name:"Contacts")]
public class ContactEntity
{
    [Key]
    public Guid id { get; set; }
    public required string fullname { get; set; }  
    public required string phon_number { get; set; }
    public DateTime? birthday { get; set; }
    public string imgadress { get; set; } = "";
    public ImagesEntities? Image { get; set; }
}