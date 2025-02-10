namespace VandaKnit.Api.Dto;

public record CreateProductDto(string Name, string? Description, int Price, int Inventory, Guid? CategoryId);
