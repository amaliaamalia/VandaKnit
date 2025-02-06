using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using VandaKnit.Api.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace VandaKnit.Api.Data.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly AppDbContext _context;

    public ProductRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Product>> GetByCategoryIdAsync(Guid categoryId, int skip = 0, int take = 100, string? orderBy = null)
    {
        return await _context.Products
            .Where(p => p.CategoryId == categoryId)
            .Skip(skip)
            .Take(take)
            .OrderBy(GetOrderByExpression(orderBy)).ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetAsync(int skip = 0, int take = 100, string? orderBy = null)
    {
        return await _context.Products
            .Skip(skip)
            .Take(take)
            .OrderBy(GetOrderByExpression(orderBy)).ToListAsync();
    }

    public async Task<Product?> GetByIdAsync(Guid id)
    {
        return await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task AddAsync(Product entity)
    {
        await _context.Products.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Product entity)
    {
        _context.Products.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Product entity)
    {
        _context.Products.Remove(entity);
        await _context.SaveChangesAsync();
    }

    private static Expression<Func<Product, object>> GetOrderByExpression(string? column)
    {
        return column?.ToUpperInvariant() switch
        {
            "NAME" => product => product.Name,
            "PRICE" => product => product.Price,
            _ => product => product.Id,
        };
    }
}
