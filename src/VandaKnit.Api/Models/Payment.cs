namespace VandaKnit.Api.Models;

public class Payment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public string PaymentStatus { get; set; } = "Pending";
    public string PaymentMethod { get; set; } = string.Empty;
    public string? TransactionId { get; set; }
}
