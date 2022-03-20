using Mecor.Api.Options;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Interfaces;
using Microsoft.OpenApi.Models;

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
                Description = "Media Collection Organizer",
                Version = "v1",
                Contact = new()
                {
                    Name = "Fernando Henrique Rosa",
                    Url = new("https://github.com/ferhrosa"),
                },
            });

            setup.AddSecurityDefinition("Google-OAuth", new()
            {
                Type = SecuritySchemeType.OAuth2,
                Description = "Google OAuth",
                Flows = new()
                {
                    AuthorizationCode = new()
                    {
                        AuthorizationUrl = new("https://accounts.google.com/o/oauth2/v2/auth"),
                        TokenUrl = new("https://www.googleapis.com/oauth2/v4/token"),
                        Scopes = AuthenticationOptions.GoogleOptions.Scopes,
                    },
                },
                Extensions = new Dictionary<string, IOpenApiExtension>()
                {
                    { "x-tokenName", new OpenApiString("id_token") },
                },
            });

            setup.OperationFilter<AuthorizeCheckOperationFilter>();
        });
    }

    public static void Configure(WebApplication app, AuthenticationOptions authenticationOptions)
    {
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();

            app.UseSwaggerUI(setup =>
            {
                setup.OAuthClientId(authenticationOptions.Google.ClientId);
                setup.OAuthClientSecret(authenticationOptions.Google.ClientSecret);
            });
        }
    }
}
