using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<User>> GetAsync(int skip, int take, string? orderBy)
    {
        return await _context.Users
            .Include(u => u.Role)
            .OrderBy(GetOrderByExpression(orderBy))
            .Skip(skip).Take(take).ToListAsync();
    }

    public async Task<User?> GetByIdAsync(Guid id)
    {
        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Id == id);
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task AddAsync(User user)
    {
        await _context.Users.AddAsync(user);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(User user)
    {
        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }

    private static Expression<Func<User, object>> GetOrderByExpression(string? column)
    {
        return column?.ToUpperInvariant() switch
        {
            "EMAIL" => entity => entity.Email,
            _ => entity => entity.Id,
        };
    }
}
