using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Security.Claims;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Dto;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderRepository _orderRepository;
    private readonly IProductRepository _productRepository;
    private readonly IPaymentRepository _paymentRepository;
    private readonly IShippingAddressRepository _shippingAddressRepository;

    public OrdersController(
        IOrderRepository orderRepository,
        IProductRepository productRepository,
        IPaymentRepository paymentRepository,
        IShippingAddressRepository shippingAddressRepository)
    {
        _orderRepository = orderRepository;
        _productRepository = productRepository;
        _paymentRepository = paymentRepository;
        _shippingAddressRepository = shippingAddressRepository;
    }

    [HttpGet]
    [Authorize]
    public async Task<IEnumerable<Order>> GetUserOrders(int page = 1, int pageSize = 10, string? orderBy = null, string sortOrder = "asc")
    {
        var userId = User.FindFirstValue("Id");
        if (userId == null)
        {
            return Enumerable.Empty<Order>();
        }

        var userGuid = Guid.Parse(userId);
        return await _orderRepository.GetByUserIdAsync(userGuid, (page - 1) * pageSize, pageSize, orderBy, sortOrder == "asc");
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Order>> GetOrderById(Guid id)
    {
        var order = await _orderRepository.GetByIdAsync(id);
        if (order == null)
        {
            return NotFound("Order not found.");
        }

        var userId = User.FindFirstValue("Id");
        if (userId == null || order.UserId != Guid.Parse(userId))
        {
            return Forbid();
        }

        return Ok(order);
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Order>> CreateOrder([FromBody] CreateOrderRequest createOrderRequest)
    {
        var orderItems = new List<OrderItem>();
        decimal total = 0;

        foreach (var item in createOrderRequest.Items)
        {
            var product = await _productRepository.GetByIdAsync(item.ProductId);
            if (product == null || product.Inventory < item.Quantity)
            {
                return BadRequest($"Product {item.ProductId} is not available or insufficient inventory.");
            }

            product.Inventory -= item.Quantity;
            await _productRepository.UpdateAsync(product);

            var orderItem = new OrderItem
            {
                ProductId = product.Id,
                Product = product,
                Quantity = item.Quantity,
                Price = product.Price
            };

            orderItems.Add(orderItem);
            total += product.Price * item.Quantity;
        }

        var order = new Order
        {
            UserId = createOrderRequest.UserId,
            Status = "Pending",
            Total = total,
            OrderItems = orderItems
        };

        await _orderRepository.AddAsync(order);
        return StatusCode(201, order);
    }

    [HttpPost("submit")]
    [Authorize]
    public async Task<ActionResult<Order>> SubmitOrder([FromBody] SubmitOrderRequest submitOrderRequest)
    {
        var order = await _orderRepository.GetByIdAsync(submitOrderRequest.OrderId);
        if (order == null)
        {
            return NotFound("Order not found.");
        }

        if (order.Status != "Pending")
        {
            return BadRequest("Order is not in a valid state for submission.");
        }

        var shippingAddress = new ShippingAddress
        {
            OrderId = order.Id,
            Street = submitOrderRequest.ShippingAddress.Street,
            City = submitOrderRequest.ShippingAddress.City,
            PostalCode = submitOrderRequest.ShippingAddress.PostalCode,
            Country = submitOrderRequest.ShippingAddress.Country
        };
        await _shippingAddressRepository.AddAsync(shippingAddress);

        var payment = new Payment
        {
            OrderId = order.Id,
            PaymentMethod = submitOrderRequest.Payment.PaymentMethod,
            TransactionId = Guid.NewGuid().ToString(),
            PaymentStatus = "Pending"
        };
        await _paymentRepository.AddAsync(payment);

        var paymentSuccess = ProcessPayment(payment);
        if (!paymentSuccess)
        {
            return StatusCode(400, "Payment processing failed.");
        }

        payment.PaymentStatus = "Completed";
        await _paymentRepository.UpdateAsync(payment);

        order.Payment = payment;
        order.ShippingAddress = shippingAddress;
        order.Status = "Confirmed";
        await _orderRepository.UpdateAsync(order);

        return StatusCode(200, order);
    }

    private bool ProcessPayment(Payment payment)
    {
        // Simulate payment processing logic here
        // For example, call a payment gateway API and return the result
        return true;
    }
}
