using Mecor.Domain.User;
using Mecor.Domain.User.Interfaces;
using Mecor.Infra.Storage.MongoDB.Options;
using Mecor.Infra.Storage.MongoDB.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;

namespace Mecor.Infra.Storage.MongoDB;

public static class MongoStartup
{
    public static void ConfigureServices(IServiceCollection services, ConfigurationManager configuration)
    {
        var mongoOptionsSection = configuration.GetSection(MongoOptions.Key);
        var mongoOptions = mongoOptionsSection.Get<MongoOptions>();
        services.Configure<MongoOptions>(mongoOptionsSection);

#pragma warning disable CS0618
        // TODO: Remove this line when the default mode is set to V3.
        BsonDefaults.GuidRepresentationMode = GuidRepresentationMode.V3;
#pragma warning restore CS0618

        // Use Decimal128 MongoDB storage type for decimal .NET value type.
        BsonSerializer.RegisterSerializer(typeof(decimal), new DecimalSerializer(BsonType.Decimal128));
        BsonSerializer.RegisterSerializer(typeof(decimal?), new NullableSerializer<decimal>(new DecimalSerializer(BsonType.Decimal128)));

        // This convention makes the serializers ignore properties which value is null.
        // This way the Bson document will almost not contain nulls in the database.
        ConventionRegistry.Register(
            "Ignore null values",
            new ConventionPack { new IgnoreIfNullConvention(true) },
            t => true);

        // If some type from the project was changed by removing some property, this
        // convention makes MongoDB driver just ignore the fields for the removed
        // properties from the database, so no error will happen when extra fields exist.
        ConventionRegistry.Register(
            "Ignore extra elements",
            new ConventionPack { new IgnoreExtraElementsConvention(true) },
            t => true);

        MongoClient mongoClient = new(mongoOptions.ConnectionString);
        services.AddSingleton<IMongoClient>(mongoClient);

        var mainDatabase = mongoClient.GetDatabase(mongoOptions.Databases.Main);
        services.AddSingleton(mainDatabase);

        // Collections and repositories for main database.
        (services, mainDatabase)
            .AddCollectionAndRepository<User, IUserRepository, UserRepository>();
    }

    private static (IServiceCollection services, IMongoDatabase database) AddCollectionAndRepository
        <TEntity, TIRepository, TRepository>
        (this (IServiceCollection services, IMongoDatabase database) t)
        where TIRepository : class
        where TRepository : class, TIRepository
    {
        t.services.AddSingleton(GetCollection<TEntity>(t.database));
        t.services.AddScoped<TIRepository, TRepository>();
        return t;
    }

    private static IMongoCollection<T> GetCollection<T>(IMongoDatabase database)
    {
        var name = GetCollectionName<T>();
        CreateCollection(database, name);
        return database.GetCollection<T>(name);
    }

    private static void CreateCollection(IMongoDatabase database, string name)
    {
        if (database.ListCollectionNames().ToList().Contains(name)) { return; }
        database.CreateCollection(name);
    }

    private static string GetCollectionName<T>() => typeof(T).Name switch
    {
        // Add new entities and their collection names below.
        nameof(User) => "Users",
        _ => throw new NotImplementedException($"MongoDB collection name is missing for type '{typeof(T).Name}'!"),
    };
}
