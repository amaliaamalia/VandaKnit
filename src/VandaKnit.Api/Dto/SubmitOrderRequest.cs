namespace VandaKnit.Api.Dto;

public record SubmitOrderRequest(Guid OrderId, ShippingAddressDto ShippingAddress, PaymentDto Payment);