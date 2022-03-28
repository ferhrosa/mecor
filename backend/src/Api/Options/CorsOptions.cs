namespace Mecor.Api.Options;

public record CorsOptions
{
    public const string Key = "CORS";

    public string[] AllowedOrigins { get; init; } = Array.Empty<string>();
}
