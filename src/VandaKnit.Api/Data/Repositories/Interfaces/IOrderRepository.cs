using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories.Interfaces;

public interface IOrderRepository
{
    Task<IEnumerable<Order>> GetAsync(int skip, int take, string? orderBy);
    Task<Order?> GetByIdAsync(Guid id);
    Task AddAsync(Order order);
    Task UpdateAsync(Order order);
    Task DeleteAsync(Order order);
}
