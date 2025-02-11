using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories;

public class OrderRepository : IOrderRepository
{
    private readonly AppDbContext _context;

    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Order>> GetByUserIdAsync(Guid userId, int skip, int take, string? orderBy, bool orderAscending = true)
    {

        var query = _context.Orders
            .Where(o => o.UserId == userId)
            .Include(o => o.OrderItems)
            .Include(o => o.Payment)
            .Include(o => o.ShippingAddress)
            .OrderBy(GetOrderByExpression(orderBy))
            .Skip(skip).Take(take);

        if (!orderAscending)
            query = query.OrderDescending();

        return await query.ToListAsync();
    }

    public async Task<Order?> GetByIdAsync(Guid id)
    {
        return await _context.Orders
            .Include(o => o.OrderItems)
                .ThenInclude(o => o.Product)
            .Include(o => o.Payment)
            .Include(o => o.ShippingAddress)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task AddAsync(Order order)
    {
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(Order order)
    {
        _context.Orders.Update(order);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Order order)
    {
        _context.Orders.Remove(order);
        await _context.SaveChangesAsync();
    }

    private static Expression<Func<Order, object>> GetOrderByExpression(string? column)
    {
        return column?.ToUpperInvariant() switch
        {
            "STATUS" => entity => entity.Status,
            "TOTAL" => entity => entity.Total,
            _ => entity => entity.Id,
        };
    }
}
