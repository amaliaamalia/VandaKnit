namespace VandaKnit.Api.Dto;

public record CreateOrderRequest(Guid UserId, List<OrderItemDto> Items);

