using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Dto;
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
    public async Task<IEnumerable<Product>> GetProducts(int page = 1, int pageSize = 10, string? orderBy = null, string sortOrder = "asc")
    {
        return await _productRepository.GetAsync((page - 1) * pageSize, pageSize, orderBy, sortOrder == "asc");
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
    public async Task<IEnumerable<Product>> GetProductsByCategoryId(Guid categoryId, int page = 1, int pageSize = 10, string? orderBy = null, string sortOrder = "asc")
    {
        return await _productRepository.GetByCategoryIdAsync(categoryId, (page - 1) * pageSize, pageSize, orderBy, sortOrder == "asc");
    }

    [HttpPost]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult<Product>> AddProduct([FromBody] CreateProductDto createProductRequest)
    {
        var product = new Product
        {
            Id = Guid.NewGuid(),
            Name = createProductRequest.Name,
            Description = createProductRequest.Description,
            Price = createProductRequest.Price,
            Inventory = createProductRequest.Inventory,
            CategoryId = createProductRequest.CategoryId
        };

        await _productRepository.AddAsync(product);
        return StatusCode(200, product);
    }

    [HttpPut("{Id}")]
    [Authorize(Policy = "AdminOnly")]
    public async Task<ActionResult> UpdateProduct(Guid Id, [FromBody] Product product)
    {
        var existingProduct = await _productRepository.GetByIdAsync(Id);
        if (existingProduct == null)
        {
            return StatusCode(404, "Product not found");
        }

        existingProduct.Name = product.Name;
        existingProduct.Description = product.Description;
        existingProduct.Inventory = product.Inventory;
        existingProduct.CategoryId = product.CategoryId;
        await _productRepository.UpdateAsync(existingProduct);
        return StatusCode(200);
    }

    [HttpDelete("{Id}")]
    [Authorize(Policy = "AdminOnly")]
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
