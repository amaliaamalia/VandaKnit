using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories.Interfaces;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAsync(int skip = 0, int take = 100, string? orderBy = null, bool orderAscending = true);

    Task<IEnumerable<Product>> GetByCategoryIdAsync(Guid categoryId, int skip = 0, int take = 100, string? orderBy = null, bool orderAscending = true);

    Task<Product?> GetByIdAsync(Guid id);

    Task AddAsync(Product entity);

    Task UpdateAsync(Product entity);

    Task DeleteAsync(Product entity);
}