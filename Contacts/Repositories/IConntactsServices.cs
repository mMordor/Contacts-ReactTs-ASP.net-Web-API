using Contacts.Dtos;
using Contacts.Entities;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Repositories;


public interface IContactsServices
{
    Task<List<ContactResponse>> GetAllContacts();
    Task<ContactResponse?> GetById(Guid id);
    Task<ContactResponse> Create(ContactCreateDto contact);
    Task<ContactResponse?> UpdateContacts(ContactResponse contact);
    Task DeleteContact(Guid id);

}






public class ContactsServices(AppDbContext dbContext) : IContactsServices
{

    public async Task<ContactResponse> Create(ContactCreateDto contact)
    {
        ContactEntity newcontact = new ContactEntity()
        {
            id = Guid.NewGuid(),
            fullname = contact.fullname,
            phon_number = contact.phon_number,
            birthday = contact.birthday,
            imgadress = contact.imgadress
        };

        var res = dbContext.Contacts.Add(newcontact);
        await dbContext.SaveChangesAsync();
        return new ContactResponse
        {
            id = res.Entity.id,
            fullname = res.Entity.fullname,
            phon_number = res.Entity.phon_number,
            birthday = res.Entity.birthday,
            imgadress = res.Entity.imgadress,
        };
    }





    public async Task<List<ContactResponse>> GetAllContacts()
    {
        List<ContactResponse> list = await dbContext.Contacts.Select(x =>
            new ContactResponse()
            {
                id = x.id,
                fullname = x.fullname,
                phon_number = x.phon_number,
                birthday = x.birthday ,
                imgadress = x.imgadress
            }).ToListAsync();

        return list;

    }





    public async Task<ContactResponse?> GetById(Guid id)
    {
        ContactEntity? res = await dbContext.Contacts.FindAsync(id);

        if(res == null)
        {
            return null;
        }

        return new ContactResponse
        {
            id = res.id,
            fullname = res.fullname,
            birthday = res.birthday,
            imgadress = res.imgadress,
            phon_number = res.phon_number
        };
    }





    public async Task DeleteContact(Guid id)
    {
        ContactEntity? res = await dbContext.Contacts.FindAsync(id);
        if(res == null) return;
        dbContext.Contacts.Remove(res);
        await dbContext.SaveChangesAsync();
    }





    public async Task<ContactResponse?> UpdateContacts(ContactResponse contact)
    {
        ContactEntity? res = await dbContext.Contacts.FindAsync(contact.id);
        if(res == null)
        {
            return null;
        }

        if(contact.fullname != null) res.fullname = contact.fullname;
        if(contact.phon_number != null) res.phon_number = contact.phon_number;
        if(contact.birthday != null) res.birthday = contact.birthday;
        if(contact.imgadress != null) res.imgadress = contact.imgadress;

        dbContext.Contacts.Update(res);
        await dbContext.SaveChangesAsync();

        return new ContactResponse()
        {
            id = res.id,
            fullname = res.fullname,
            phon_number = res.phon_number,
            birthday = res.birthday,
            imgadress = res.imgadress,
        };
    }



}