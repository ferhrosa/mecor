using Mecor.Api.Options;
using Mecor.Api.Swagger;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Logging;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

var authenticationOptionsSection = configuration.GetSection(AuthenticationOptions.Key);
var authenticationOptions = authenticationOptionsSection.Get<AuthenticationOptions>();
services.Configure<AuthenticationOptions>(authenticationOptionsSection);

// Add services to the container.

// Add authentication using Google (with OAuth2).
services
    //.AddAuthentication()
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    //.AddAuthentication("Google")
    //.AddAuthentication(Microsoft.AspNetCore.Authentication.Google.GoogleDefaults.AuthenticationScheme)
    //.AddAuthentication(options =>
    //{
    //    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    //    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    //})
    //.AddGoogle(options =>
    //{
    //    options.ClientId = authenticationOptions.Google.ClientId;
    //    options.ClientSecret = authenticationOptions.Google.ClientSecret;
    //    //options.
    //})
    .AddJwtBearer(options =>
    {
        options.UseGoogle(authenticationOptions.Google.ClientId);
    })
    ;

IdentityModelEventSource.ShowPII = true;

SwaggerStartup.ConfigureServices(services);

services.AddControllers();
services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.

SwaggerStartup.Configure(app, authenticationOptions);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.MapRazorPages();

app.Run();
