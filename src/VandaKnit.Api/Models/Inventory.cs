namespace VandaKnit.Api.Models;

public class Inventory
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid VariantId { get; set; }
    public ProductVariant Variant { get; set; } = null!;
    public int Stock { get; set; }
}
