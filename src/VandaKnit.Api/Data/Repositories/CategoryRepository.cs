using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private readonly AppDbContext _context;

    public CategoryRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Category>> GetAsync(int skip = 0, int take = 100, string? orderBy = null, bool orderAscending = true)
    {
        var query = _context.Categories
            .Skip(skip)
            .Take(take)
            .OrderBy(GetOrderByExpression(orderBy));

        if (!orderAscending)
            query = query.OrderDescending();

        return await query.ToListAsync();
    }

    public async Task<Category?> GetByIdAsync(Guid id)
    {
        return await _context.Categories.FirstOrDefaultAsync(c => c.Id == id);
    }

    public async Task AddAsync(Category entity)
    {
        await _context.Categories.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Category entity)
    {
        _context.Categories.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Category entity)
    {
        _context.Categories.Remove(entity);
        await _context.SaveChangesAsync();
    }

    private static Expression<Func<Category, object>> GetOrderByExpression(string? column)
    {
        return column?.ToUpperInvariant() switch
        {
            "NAME" => category => category.Name,
            _ => category => category.Id,
        };
    }
}
