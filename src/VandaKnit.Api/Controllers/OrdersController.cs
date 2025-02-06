using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Controllers;

[ApiController]
[Authorize]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderRepository _orderRepository;

    public OrdersController(IOrderRepository orderRepository)
    {
        _orderRepository = orderRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<Order>> GetOrders(int skip = 0, int take = 10, string? orderBy = null)
    {
        return await _orderRepository.GetAsync(skip, take, orderBy);
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<Order>> GetOrderById(Guid Id)
    {
        var order = await _orderRepository.GetByIdAsync(Id);

        if (order == null)
        {
            return StatusCode(404, "Order not found");
        }

        return StatusCode(200, order);
    }

    [HttpPost]
    public async Task<ActionResult<Order>> AddOrder([FromBody] Order order)
    {
        await _orderRepository.AddAsync(order);
        return StatusCode(200, order);
    }

    [HttpPut("{Id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> UpdateOrder(Guid Id, [FromBody] Order order)
    {
        var existingOrder = await _orderRepository.GetByIdAsync(Id);
        if (existingOrder == null)
        {
            return StatusCode(404, "Order not found");
        }

        order.Id = Id;
        await _orderRepository.UpdateAsync(order);
        return StatusCode(200);
    }

    [HttpDelete("{Id}")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult> DeleteOrder(Guid Id)
    {
        var order = await _orderRepository.GetByIdAsync(Id);
        if (order == null)
        {
            return StatusCode(404, "Order not found");
        }

        await _orderRepository.DeleteAsync(order);
        return StatusCode(200);
    }
}
