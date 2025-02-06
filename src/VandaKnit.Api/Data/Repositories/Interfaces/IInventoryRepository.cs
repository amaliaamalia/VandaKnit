using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories.Interfaces;

public interface IInventoryRepository
{
    Task<IEnumerable<Inventory>> GetAsync(int skip, int take);
    Task<Inventory?> GetByIdAsync(Guid id);
    Task AddAsync(Inventory inventory);
    Task UpdateAsync(Inventory inventory);
    Task DeleteAsync(Inventory inventory);
}
