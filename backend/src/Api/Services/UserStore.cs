using Mecor.Domain.User;
using Microsoft.AspNetCore.Identity;

namespace Mecor.Api.Services;

public class UserStore : IUserStore<User>, IUserLoginStore<User>, IUserEmailStore<User>
{
    private static readonly List<User> users = new();

    public void Dispose() { }

    public Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken)
    {
        if (users.Any(u => u.Id == user.Id)) { return Task.FromResult(IdentityResult.Failed()); }

        users.Add(user);

        return Task.FromResult(IdentityResult.Success);
    }

    public Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken)
    {
        var existingUser = users.SingleOrDefault(u => u.Id == user.Id);

        if (existingUser == null) { return Task.FromResult(IdentityResult.Failed()); }

        users.Remove(existingUser);
        users.Add(user);

        return Task.FromResult(IdentityResult.Success);
    }

    public Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken)
        => Task.FromResult(
            users.RemoveAll(u => u.Id == user.Id) > 0
            ? IdentityResult.Success
            : IdentityResult.Failed());

    public Task<User> FindByIdAsync(string userId, CancellationToken cancellationToken)
        => Task.FromResult(users.FirstOrDefault(u => u.Id == userId));

    public Task<User> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        => Task.FromResult(users.FirstOrDefault(u => u.NormalizedUserName == normalizedUserName));

    public Task<User> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        => Task.FromResult(users.FirstOrDefault(u => u.NormalizedEmail == normalizedEmail));

    public Task<User> FindByLoginAsync(string loginProvider, string providerKey, CancellationToken cancellationToken)
        => Task.FromResult(users.FirstOrDefault(u => u.Logins.TryGetValue(loginProvider, out var login) && login.ProviderKey == providerKey));

    public Task<string> GetUserIdAsync(User user, CancellationToken cancellationToken)
        => Task.FromResult(user.Id);

    public Task<string> GetUserNameAsync(User user, CancellationToken cancellationToken)
        => Task.FromResult(user.UserName);

    public Task SetUserNameAsync(User user, string userName, CancellationToken cancellationToken)
    {
        user.UserName = userName;
        return Task.CompletedTask;
    }

    public Task<string> GetNormalizedUserNameAsync(User user, CancellationToken cancellationToken)
        => Task.FromResult(user.NormalizedUserName);

    public Task SetNormalizedUserNameAsync(User user, string normalizedName, CancellationToken cancellationToken)
    {
        user.NormalizedUserName = normalizedName;
        return Task.CompletedTask;
    }

    public Task<string> GetEmailAsync(User user, CancellationToken cancellationToken)
        => Task.FromResult(user.Email);

    public Task SetEmailAsync(User user, string email, CancellationToken cancellationToken)
    {
        user.Email = email;
        return Task.CompletedTask;
    }

    public Task<string> GetNormalizedEmailAsync(User user, CancellationToken cancellationToken)
        => Task.FromResult(user.Email);

    public Task SetNormalizedEmailAsync(User user, string normalizedEmail, CancellationToken cancellationToken)
    {
        user.Id = normalizedEmail;
        return Task.CompletedTask;
    }

    public Task<bool> GetEmailConfirmedAsync(User user, CancellationToken cancellationToken)
        => Task.FromResult(user.EmailConfirmed);

    public Task SetEmailConfirmedAsync(User user, bool confirmed, CancellationToken cancellationToken)
    {
        user.EmailConfirmed = confirmed;
        return Task.CompletedTask;
    }

    public async Task<IList<UserLoginInfo>> GetLoginsAsync(User user, CancellationToken cancellationToken)
        => user.Logins.Select(lpk => new UserLoginInfo(lpk.Key, lpk.Value.ProviderKey, lpk.Value.ProviderDisplayName)).ToList();

    public Task AddLoginAsync(User user, UserLoginInfo login, CancellationToken cancellationToken)
    {
        user.Logins[login.LoginProvider] = new()
        {
            ProviderKey = login.ProviderKey,
            ProviderDisplayName = login.ProviderDisplayName,
        };

        return Task.CompletedTask;
    }

    public Task RemoveLoginAsync(User user, string loginProvider, string providerKey, CancellationToken cancellationToken)
    {
        user.Logins.Remove(loginProvider);
        return Task.CompletedTask;
    }
}
