using Mecor.Api.Options;
using Microsoft.AspNetCore.Authorization;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Mecor.Api.Swagger
{
    internal sealed class AuthorizeCheckOperationFilter : IOperationFilter
    {
        public void Apply(OpenApiOperation operation, OperationFilterContext context)
        {
            bool typeContainsAuthorize = context.MethodInfo?.DeclaringType?.GetCustomAttributes(true)?.OfType<AuthorizeAttribute>()?.Any() ?? false;
            bool methodContainsAuthorize = context.MethodInfo?.GetCustomAttributes(true)?.OfType<AuthorizeAttribute>()?.Any() ?? false;

            if (!typeContainsAuthorize && !methodContainsAuthorize) { return; }

            operation.Responses.Add("401", new OpenApiResponse { Description = "Unauthorized" });
            operation.Responses.Add("403", new OpenApiResponse { Description = "Forbidden" });

            operation.Security = new List<OpenApiSecurityRequirement>
            {
                new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Google-OAuth",
                            },
                        },
                        AuthenticationOptions.GoogleOptions.Scopes.Select(s => s.Key).ToArray()
                    }
                }
            };
        }
    }
}
