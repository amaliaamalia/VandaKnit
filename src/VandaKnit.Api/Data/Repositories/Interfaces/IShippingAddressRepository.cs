using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories.Interfaces;

public interface IShippingAddressRepository
{
    Task<ShippingAddress?> GetByIdAsync(Guid id);
    Task AddAsync(ShippingAddress address);
    Task UpdateAsync(ShippingAddress address);
}
