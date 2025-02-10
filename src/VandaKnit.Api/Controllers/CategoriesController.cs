using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoriesController(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<Category>> GetCategories(int page = 1, int pageSize = 10, string? orderBy = null, bool orderAscending = true)
    {
        return await _categoryRepository.GetAsync((page - 1) * pageSize, pageSize, orderBy);
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<Category>> GetCategoryById(Guid Id)
    {
        var category = await _categoryRepository.GetByIdAsync(Id);

        if (category == null)
        {
            return StatusCode(404, "Category not found");
        }

        return StatusCode(200, category);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Category>> AddCategory([FromBody] Category category)
    {
        await _categoryRepository.AddAsync(category);
        return StatusCode(200, category);
    }

    [HttpPut("{Id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UpdateCategory(Guid Id, [FromBody] Category category)
    {
        var existingCategory = await _categoryRepository.GetByIdAsync(Id);
        if (existingCategory == null)
        {
            return StatusCode(404, "Category not found");
        }

        category.Id = Id;
        await _categoryRepository.UpdateAsync(category);
        return StatusCode(200);
    }

    [HttpDelete("{Id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteCategory(Guid Id)
    {
        var category = await _categoryRepository.GetByIdAsync(Id);
        if (category == null)
        {
            return StatusCode(404, "Category not found");
        }

        await _categoryRepository.DeleteAsync(category);
        return StatusCode(200);
    }
}
