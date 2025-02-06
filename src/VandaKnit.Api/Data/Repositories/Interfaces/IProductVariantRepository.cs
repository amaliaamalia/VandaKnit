using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories;

public interface IProductVariantRepository
{
    Task<IEnumerable<ProductVariant>> GetAsync(int skip = 0, int take = 100, string? orderBy = null);
    
    Task<ProductVariant?> GetByIdAsync(Guid id);

    Task AddAsync(ProductVariant entity);

    Task UpdateAsync(ProductVariant entity);
    
    Task DeleteAsync(ProductVariant entity);
}
