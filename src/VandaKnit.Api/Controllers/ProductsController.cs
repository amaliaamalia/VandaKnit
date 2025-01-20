using Microsoft.AspNetCore.Mvc;
using VandaKnit.Api.Data;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class ProductsController : ControllerBase
{
    private JsonRepository<Product> _productRepository = new JsonRepository<Product>("products");

    [HttpGet]
    public IEnumerable<Product> GetProducts()
    {
        return _productRepository.GetAll();
    }

    [HttpGet("{Id}")]
    public ActionResult<Product> GetProductById(int Id)
    {
        var product = _productRepository.FirstOrDefault(p => p.Id == Id);

        if (product == null)
        {
            return StatusCode(404, "Product not found");
        }

        return StatusCode(200, product);
    }

    [HttpPost]
    public ActionResult<Product> AddProduct([FromBody]Product product) { 
        _productRepository.Add(product);

        return StatusCode(200, product);
    }
}