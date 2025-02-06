using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories;

public class ProductVariantRepository : IProductVariantRepository
{
    private readonly AppDbContext _context;

    public ProductVariantRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ProductVariant>> GetAsync(int skip = 0, int take = 100, string? orderBy = null)
    {
        return await _context.ProductVariants
            .Skip(skip)
            .Take(take)
            .OrderBy(GetOrderByExpression(orderBy))
            .ToListAsync();
    }

    public async Task<ProductVariant?> GetByIdAsync(Guid id)
    {
        return await _context.ProductVariants.FirstOrDefaultAsync(pv => pv.Id == id);
    }

    public async Task AddAsync(ProductVariant entity)
    {
        await _context.ProductVariants.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(ProductVariant entity)
    {
        _context.ProductVariants.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(ProductVariant entity)
    {
        _context.ProductVariants.Remove(entity);
        await _context.SaveChangesAsync();
    }

    private static Expression<Func<ProductVariant, object>> GetOrderByExpression(string? column)
    {
        return column?.ToUpperInvariant() switch
        {
            "PRICE" => productVariant => productVariant.Price,
            _ => productVariant => productVariant.Id,
        };
    }
}
