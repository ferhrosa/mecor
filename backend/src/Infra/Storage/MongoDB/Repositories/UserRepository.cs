using Mecor.Domain.User;
using Mecor.Domain.User.Interfaces;
using MongoDB.Driver;

namespace Mecor.Infra.Storage.MongoDB.Repositories;

internal sealed class UserRepository : IUserRepository
{
    private readonly IMongoCollection<User> _collection;

    public UserRepository(IMongoCollection<User> collection)
    {
        _collection = collection;
    }

    public Task<User> GetSingleByIdAsync(string userId, CancellationToken cancellationToken = default)
        => _collection.Find(FilterById(userId)).FirstOrDefaultAsync(cancellationToken);

    public Task<User> GetSingleByNormalizedUserNameAsync(string normalizedUserName, CancellationToken cancellationToken = default)
        => _collection.Find(FilterByNormalizedUserName(normalizedUserName)).FirstOrDefaultAsync(cancellationToken);

    public Task<User> GetSingleByUserNameAsync(string userName, CancellationToken cancellationToken = default)
        => _collection.Find(FilterByUserName(userName)).FirstOrDefaultAsync(cancellationToken);

    public Task<User> GetSingleByNormalizedEmailAsync(string normalizedEmail, CancellationToken cancellationToken = default)
        => _collection.Find(FilterByNormalizedEmail(normalizedEmail)).FirstOrDefaultAsync(cancellationToken);

    public Task<User> GetSingleByLoginAsync(string loginProvider, string providerKey, CancellationToken cancellationToken = default)
        => _collection.Find(FilterByLogin(loginProvider, providerKey)).FirstOrDefaultAsync(cancellationToken);

    public Task AddAsync(User user, CancellationToken cancellationToken = default)
        => _collection.InsertOneAsync(user, cancellationToken: cancellationToken);

    public Task UpdateAsync(User user, CancellationToken cancellationToken = default)
        => _collection.FindOneAndReplaceAsync(FilterById(user.Id), user, cancellationToken: cancellationToken);

    public Task RemoveAsync(string userId, CancellationToken cancellationToken = default)
        => _collection.FindOneAndDeleteAsync(FilterById(userId), cancellationToken: cancellationToken);

    private static FilterDefinition<User> FilterById(string userId)
        => Builders<User>.Filter.Eq(u => u.Id, userId);

    private static FilterDefinition<User> FilterByUserName(string userName)
        => Builders<User>.Filter.Eq(u => u.UserName, userName);

    private static FilterDefinition<User> FilterByNormalizedUserName(string normalizedUserName)
        => Builders<User>.Filter.Eq(u => u.NormalizedUserName, normalizedUserName);

    private static FilterDefinition<User> FilterByNormalizedEmail(string normalizedEmail)
        => Builders<User>.Filter.Eq(u => u.NormalizedEmail, normalizedEmail);

    private static FilterDefinition<User> FilterByLogin(string loginProvider, string providerKey)
        => Builders<User>.Filter.Eq($"{nameof(User.Logins)}.{loginProvider}.{nameof(UserLogin.ProviderKey)}", providerKey);
}
