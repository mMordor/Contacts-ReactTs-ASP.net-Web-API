using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Contacts.Entities;

[Table(name:"Images")]
public class ImagesEntities
{
        [Key]
    public Guid ImageID { get; set; }
    public Guid? ParentId { get; set; }
    public ContactEntity? contact { get; set; }
    public required string FileName { get; set; }
    public required string ContentType { get; set; }
    public required byte[] Data { get; set; }

}
