using Contacts.Entities;
using Microsoft.EntityFrameworkCore;

namespace Contacts;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<ContactEntity> Contacts { get; set; } = null!;
    public DbSet<ImagesEntities> Images { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContactEntity>().HasOne(u => u.Image).WithOne(i => i.contact).HasForeignKey<ImagesEntities>(i => i.ParentId).OnDelete(DeleteBehavior.Cascade);
        base.OnModelCreating(modelBuilder);
    }
}