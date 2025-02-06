namespace VandaKnit.Api.Models;

public class OrderItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public Guid VariantId { get; set; }
    public ProductVariant Variant { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}
