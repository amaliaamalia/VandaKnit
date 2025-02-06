using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories;

public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAsync(int skip = 0, int take = 100, string? orderBy = null);

    Task<IEnumerable<Product>> GetByCategoryIdAsync(Guid categoryId, int skip = 0, int take = 100, string? orderBy = null);

    Task<Product?> GetByIdAsync(Guid id);

    Task AddAsync(Product entity);

    Task UpdateAsync(Product entity);
    
    Task DeleteAsync(Product entity);
}