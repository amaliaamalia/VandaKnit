using Microsoft.EntityFrameworkCore;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Product> Products { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<ProductVariant> ProductVariants { get; set; }

    public DbSet<Inventory> Inventories { get; set; }

    public DbSet<Order> Orders { get; set; }

    public DbSet<User> Users { get; set; }
}
