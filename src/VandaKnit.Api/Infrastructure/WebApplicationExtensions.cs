using VandaKnit.Api.Data;

namespace VandaKnit.Api.Infrastructure;

public static class WebApplicationExtensions
{
    public static void InitialiseDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();

        var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        context.Database.EnsureCreated();
    }
}
