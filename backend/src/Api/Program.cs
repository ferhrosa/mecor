using System.Net;
using Mecor.Api.Options;
using Mecor.Api.Services;
using Mecor.Api.Swagger;
using Mecor.Domain.User;
using Mecor.Infra.Storage.MongoDB;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;

var authenticationOptionsSection = configuration.GetSection(AuthenticationOptions.Key);
var authenticationOptions = authenticationOptionsSection.Get<AuthenticationOptions>();
services.Configure<AuthenticationOptions>(authenticationOptionsSection);

// Add services to the container.

services
    .AddDefaultIdentity<User>()
    .AddUserStore<UserStore>();

services.ConfigureApplicationCookie(options =>
{
    options.Events = new()
    {
        OnRedirectToLogin = context =>
        {
            context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
            return Task.CompletedTask;
        },
        OnRedirectToAccessDenied = context =>
        {
            context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
            return Task.CompletedTask;
        },
    };
});

services
    .AddAuthentication()
    .AddGoogle(options =>
    {
        options.ClientId = authenticationOptions.Google.ClientId;
        options.ClientSecret = authenticationOptions.Google.ClientSecret;
    });

SwaggerStartup.ConfigureServices(services);

MongoStartup.ConfigureServices(services, configuration);

services.AddControllers();
services.AddRazorPages();

var app = builder.Build();

// Configure the HTTP request pipeline.

SwaggerStartup.Configure(app);

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapRazorPages();
app.MapControllers();

app.Run();
