using Contacts;
using Contacts.Dtos;
using Contacts.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<AppDbContext>();
builder.Services.AddDbContextPool<AppDbContext>(o =>
{
    o.UseSqlServer(builder.Configuration.GetConnectionString(name: "DefaultDBsql")!);
});

builder.Services.AddScoped<IContactsServices,ContactsServices>();
builder.Services.AddScoped<IImagesServices,ImagesServices>();

builder.Services.AddCors(optios => {
    optios.AddPolicy("AllowFrontAccess" , builder => {
        builder.WithOrigins("http://localhost:5173");
        builder.AllowAnyHeader();
        builder.AllowAnyMethod();
});});

// builder.Services.AddAntiforgery(options =>
// {
//     options.Cookie.Name = "X-CSRF-TOKEN";
// });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontAccess");
app.UseHttpsRedirection();

//app.UseAntiforgery();

app.MapPost("contacts/create",async (IContactsServices contactsServices, ContactCreateDto dto) =>
{
    ContactResponse res = await contactsServices.Create(dto);
    return Results.Ok(res);
});

app.MapGet("contacts/getallcontacts",async (IContactsServices contactsServices) =>
{
    List<ContactResponse> res = await contactsServices.GetAllContacts();
    return Results.Ok(res);
});

app.MapGet("contacts/get/{id:guid}",async (IContactsServices contactsServices, Guid id) =>
{
    ContactResponse? res = await contactsServices.GetById(id);
    if(res == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(res);
});

app.MapPut("contacts/upcontacts",async (IContactsServices contactsServices, ContactResponse dto) =>
{
    ContactResponse? res = await contactsServices.UpdateContacts(dto);
     if(res == null)
    {
        return Results.NotFound();
    }
    return Results.Ok(res);
});

app.MapDelete("contacts/delcontact/{id:guid}" ,async (IContactsServices contactsServices ,Guid id )=>
{
    await contactsServices.DeleteContact(id);
    return Results.Ok();
});

app.MapGet("contacts/images/{id:guid}" ,async (IImagesServices imagesServices ,Guid id) =>
{
    return await imagesServices.getImage(id);
});

app.MapPost("contacts/images",async (IImagesServices imagesServices ,[FromForm] Guid parentId, IFormFile imagefile) =>
{
    return await imagesServices.uploadImage(parentId,imagefile);
}).DisableAntiforgery();

app.MapPut("contacts/images",async (IImagesServices imagesServices ,[FromForm] Guid parentId, IFormFile imagefile) =>
{
    return await imagesServices.uploadImage(parentId,imagefile);
}).DisableAntiforgery();

app.MapDelete("contacts/delcontactimg/{id:guid}",async (IImagesServices imagesServices,Guid id) =>
{
    await imagesServices.deleteImage(id);
    return Results.Ok();
});

app.Run();
