namespace VandaKnit.Api.Models;

public class Order
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;
    public string Status { get; set; } = "Pending";
    public decimal Total { get; set; }
    public List<OrderItem> OrderItems { get; set; } = new();
    public Payment Payment { get; set; } = null!;
    public ShippingAddress ShippingAddress { get; set; } = null!;
}
