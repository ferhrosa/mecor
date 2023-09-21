namespace Mecor.Infra.Storage.MongoDB.Options;

internal sealed record MongoOptions
{
    public const string Key = "MongoDB";

    public string ConnectionString { get; init; }

    public MongoDatabaseOptions Databases { get; init; }

    internal sealed record MongoDatabaseOptions
    {
        public string Main { get; init; }
    }
}
