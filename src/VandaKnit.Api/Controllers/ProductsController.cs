using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductRepository _productRepository;

    public ProductsController(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<Product>> GetProducts(int skip = 0, int take = 10, string? orderBy = null)
    {
        return await _productRepository.GetAsync(skip, take, orderBy);
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<Product>> GetProductById(Guid Id)
    {
        var product = await _productRepository.GetByIdAsync(Id);

        if (product == null)
        {
            return StatusCode(404, "Product not found");
        }

        return StatusCode(200, product);
    }

    [HttpGet("category/{categoryId}")]
    public async Task<IEnumerable<Product>> GetProductsByCategoryId(Guid categoryId, int skip = 0, int take = 10, string? orderBy = null)
    {
        return await _productRepository.GetByCategoryIdAsync(categoryId, skip, take, orderBy);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<Product>> AddProduct([FromBody] Product product)
    {
        await _productRepository.AddAsync(product);
        return StatusCode(200, product);
    }

    [HttpPut("{Id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UpdateProduct(Guid Id, [FromBody] Product product)
    {
        var existingProduct = await _productRepository.GetByIdAsync(Id);
        if (existingProduct == null)
        {
            return StatusCode(404, "Product not found");
        }

        product.Id = Id;
        await _productRepository.UpdateAsync(product);
        return StatusCode(200);
    }

    [HttpDelete("{Id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteProduct(Guid Id)
    {
        var product = await _productRepository.GetByIdAsync(Id);
        if (product == null)
        {
            return StatusCode(404, "Product not found");
        }

        await _productRepository.DeleteAsync(product);
        return StatusCode(200);
    }
}
