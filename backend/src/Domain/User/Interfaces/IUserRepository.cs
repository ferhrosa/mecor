namespace Mecor.Domain.User.Interfaces;

public interface IUserRepository
{
    Task<User> GetSingleByIdAsync(string userId, CancellationToken cancellationToken = default);
    Task<User> GetSingleByNormalizedUserNameAsync(string normalizedUserName, CancellationToken cancellationToken = default);
    Task<User> GetSingleByNormalizedEmailAsync(string normalizedEmail, CancellationToken cancellationToken = default);
    Task<User> GetSingleByLoginAsync(string loginProvider, string providerKey, CancellationToken cancellationToken = default);

    Task AddAsync(User user, CancellationToken cancellationToken = default);
    Task UpdateAsync(User user, CancellationToken cancellationToken = default);
    Task RemoveAsync(string userId, CancellationToken cancellationToken = default);
}
