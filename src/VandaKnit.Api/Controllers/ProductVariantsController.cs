using Microsoft.AspNetCore.Mvc;
using VandaKnit.Api.Data.Repositories;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductVariantsController : ControllerBase
{
    private readonly IProductVariantRepository _productVariantRepository;

    public ProductVariantsController(IProductVariantRepository productVariantRepository)
    {
        _productVariantRepository = productVariantRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<ProductVariant>> GetProductVariants(int skip = 0, int take = 10, string? orderBy = null)
    {
        return await _productVariantRepository.GetAsync(skip, take, orderBy);
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<ProductVariant>> GetProductVariantById(Guid Id)
    {
        var productVariant = await _productVariantRepository.GetByIdAsync(Id);

        if (productVariant == null)
        {
            return StatusCode(404, "Product Variant not found");
        }

        return StatusCode(200, productVariant);
    }

    [HttpPost]
    public async Task<ActionResult<ProductVariant>> AddProductVariant([FromBody] ProductVariant productVariant)
    {
        await _productVariantRepository.AddAsync(productVariant);
        return StatusCode(200, productVariant);
    }

    [HttpPut("{Id}")]
    public async Task<ActionResult> UpdateProductVariant(Guid Id, [FromBody] ProductVariant productVariant)
    {
        var existingProductVariant = await _productVariantRepository.GetByIdAsync(Id);
        if (existingProductVariant == null)
        {
            return StatusCode(404, "Product Variant not found");
        }

        productVariant.Id = Id;
        await _productVariantRepository.UpdateAsync(productVariant);
        return StatusCode(200);
    }

    [HttpDelete("{Id}")]
    public async Task<ActionResult> DeleteProductVariant(Guid Id)
    {
        var productVariant = await _productVariantRepository.GetByIdAsync(Id);
        if (productVariant == null)
        {
            return StatusCode(404, "Product Variant not found");
        }

        await _productVariantRepository.DeleteAsync(productVariant);
        return StatusCode(200);
    }
}
