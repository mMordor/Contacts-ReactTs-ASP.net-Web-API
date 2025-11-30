using Contacts.Entities;
using Microsoft.EntityFrameworkCore;

namespace Contacts.Repositories;


public interface IImagesServices
{
    Task<IResult> getImage(Guid id);
    Task<IResult> deleteImage(Guid id);
    Task<IResult> uploadImage(Guid parentId, IFormFile imagefile);
}



public class ImagesServices(AppDbContext dbContext) : IImagesServices
{
    public async Task<IResult> deleteImage(Guid id)
    {
        ImagesEntities? res = await dbContext.Images.FirstOrDefaultAsync(i => i.ParentId == id);
        if(res == null) return Results.NotFound();
        dbContext.Images.Remove(res);
        await dbContext.SaveChangesAsync();
        return Results.Ok();
    }

    public async Task<IResult> getImage(Guid id)
    {
        var image = await dbContext.Images.FirstAsync(i => i.ParentId == id);

        if(image == null)
        {
            return Results.NotFound() ;
        }

        return  Results.File(image.Data, image.ContentType);
    }

    public async Task<IResult> uploadImage(Guid parentId, IFormFile imagefile)
    {
        byte[] imgaeBbytes;

        using(var memoryStream = new MemoryStream())
        {
            await imagefile.CopyToAsync(memoryStream);
            imgaeBbytes = memoryStream.ToArray();
        }

        var fetchedimage = await dbContext.Images.FirstOrDefaultAsync(i => i.ParentId == parentId);

        if (fetchedimage != null)
        {
            fetchedimage.FileName = imagefile.FileName;
            fetchedimage.ContentType = imagefile.ContentType;
            fetchedimage.Data = imgaeBbytes;

            dbContext.Images.Update(fetchedimage);
            dbContext.SaveChanges();
            return Results.Ok();
        }
        else
        {
            var imageEntity = new ImagesEntities()
            {
                ParentId = parentId,
                FileName = imagefile.FileName,
                ContentType = imagefile.ContentType,
                Data = imgaeBbytes
            };

            dbContext.Images.Add(imageEntity);
            await dbContext.SaveChangesAsync();
            return Results.Ok();
        }
        
    }

}