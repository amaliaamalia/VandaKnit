using Microsoft.EntityFrameworkCore;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories;

public class ShippingAddressRepository : IShippingAddressRepository
{
    private readonly AppDbContext _context;

    public ShippingAddressRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ShippingAddress?> GetByIdAsync(Guid id)
    {
        return await _context.ShippingAddresses.FindAsync(id);
    }

    public async Task AddAsync(ShippingAddress address)
    {
        await _context.ShippingAddresses.AddAsync(address);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateAsync(ShippingAddress address)
    {
        _context.ShippingAddresses.Update(address);
        await _context.SaveChangesAsync();
    }
}
