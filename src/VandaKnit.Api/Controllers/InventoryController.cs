using Microsoft.AspNetCore.Mvc;
using VandaKnit.Api.Data.Repositories;
using VandaKnit.Api.Data.Repositories.Interfaces;
using VandaKnit.Api.Models;

namespace VandaKnit.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class InventoryController : ControllerBase
{
    private readonly IInventoryRepository _inventoryRepository;

    public InventoryController(IInventoryRepository inventoryRepository)
    {
        _inventoryRepository = inventoryRepository;
    }

    [HttpGet]
    public async Task<IEnumerable<Inventory>> GetInventories(int skip = 0, int take = 10)
    {
        return await _inventoryRepository.GetAsync(skip, take);
    }

    [HttpGet("{Id}")]
    public async Task<ActionResult<Inventory>> GetInventoryById(Guid Id)
    {
        var inventory = await _inventoryRepository.GetByIdAsync(Id);

        if (inventory == null)
        {
            return StatusCode(404, "Inventory not found");
        }

        return StatusCode(200, inventory);
    }

    [HttpPost]
    public async Task<ActionResult<Inventory>> AddInventory([FromBody] Inventory inventory)
    {
        await _inventoryRepository.AddAsync(inventory);
        return StatusCode(200, inventory);
    }

    [HttpPut("{Id}")]
    public async Task<ActionResult> UpdateInventory(Guid Id, [FromBody] Inventory inventory)
    {
        var existingInventory = await _inventoryRepository.GetByIdAsync(Id);
        if (existingInventory == null)
        {
            return StatusCode(404, "Inventory not found");
        }

        inventory.Id = Id;
        await _inventoryRepository.UpdateAsync(inventory);
        return StatusCode(200);
    }

    [HttpDelete("{Id}")]
    public async Task<ActionResult> DeleteInventory(Guid Id)
    {
        var inventory = await _inventoryRepository.GetByIdAsync(Id);
        if (inventory == null)
        {
            return StatusCode(404, "Inventory not found");
        }

        await _inventoryRepository.DeleteAsync(inventory);
        return StatusCode(200);
    }
}
