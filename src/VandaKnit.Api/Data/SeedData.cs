using Azure.Core;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data;

public static class SeedData
{
    public static void Seed(this AppDbContext context)
    {
        if (context.Categories.Any() 
            || context.Products.Any()
            || context.Users.Any()
            || context.Roles.Any())
        {
            return;
        }

        var categories = new List<Category>
        {
            new Category
            {
                Name = "Clothing",
            },
            new Category
            {
                Name = "Accessories",
            }
        };

        var products = new List<Product>
        {
            new Product
            {
                Name = "T-Shirt",
                Description = "A comfortable cotton t-shirt",
                Category = categories[0],
                Price = 19.99m,
                Inventory = 100
            },
            new Product
            {
                Name = "Handbag",
                Description = "A stylish leather handbag",
                Category = categories[1],
                Price = 49.99m,
                Inventory = 0
            }
        };


        User admin = new User
        {
            Email = "admin@vandaKnit.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("password"),
            Role = new Role
            {
                Name = "Admin"
            }
        };

        context.Users.Add(admin);
        context.Categories.AddRange(categories);
        context.Products.AddRange(products);
        context.SaveChanges();
    }
}
