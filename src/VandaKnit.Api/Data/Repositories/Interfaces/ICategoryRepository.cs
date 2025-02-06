using VandaKnit.Api.Models;

namespace VandaKnit.Api.Data.Repositories;

public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAsync(int skip = 0, int take = 100, string? orderBy = null);
    
    Task<Category?> GetByIdAsync(Guid id);

    Task AddAsync(Category entity);

    Task UpdateAsync(Category entity);
    
    Task DeleteAsync(Category entity);
}
