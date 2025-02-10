namespace VandaKnit.Api.Models;

public class Inventory
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid ProductId { get; set; }
    public Product Variant { get; set; } = null!;
    public int Stock { get; set; }
}
