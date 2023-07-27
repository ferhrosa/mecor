namespace Mecor.Api.Swagger;

public static class SwaggerStartup
{
    public static void ConfigureServices(IServiceCollection services)
    {
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle

        services.AddEndpointsApiExplorer();

        services.AddSwaggerGen(setup =>
        {
            setup.SwaggerDoc("v1", new()
            {
                Title = "MECOR",
                Description = "Media Consumer Organizer",
                Contact = new()
                {
                    Name = "Fernando Henrique Rosa",
                    Url = new("https://github.com/ferhrosa"),
                },
            });

            setup.OperationFilter<AuthorizeCheckOperationFilter>();
        });
    }

    public static void Configure(WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
    }
}
