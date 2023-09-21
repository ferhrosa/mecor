using Mecor.Domain.User;
using Mecor.Domain.User.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace Mecor.Api.Services;

public class UserStore : IUserStore<User>, IUserLoginStore<User>, IUserEmailStore<User>
{
    private readonly IUserRepository _userRepository;

    public UserStore(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public void Dispose() { }

    public async Task<IdentityResult> CreateAsync(User user, CancellationToken cancellationToken)
    {
        await _userRepository.AddAsync(user, cancellationToken);
        return IdentityResult.Success;
    }

    public async Task<IdentityResult> UpdateAsync(User user, CancellationToken cancellationToken)
    {
        await _userRepository.UpdateAsync(user, cancellationToken);
        return IdentityResult.Success;
    }

    public async Task<IdentityResult> DeleteAsync(User user, CancellationToken cancellationToken)
    {
        await _userRepository.RemoveAsync(user.Id, cancellationToken);
        return IdentityResult.Success;
    }

    public Task<User> FindByIdAsync(string userId, CancellationToken cancellationToken)
        => _userRepository.GetSingleByIdAsync(userId, cancellationToken);

    public Task<User> FindByNameAsync(string normalizedUserName, CancellationToken cancellationToken)
        => _userRepository.GetSingleByNormalizedUserNameAsync(normalizedUserName, cancellationToken);

    public Task<User> FindByEmailAsync(string normalizedEmail, CancellationToken cancellationToken)
        => _userRepository.GetSingleByNormalizedEmailAsync(normalizedEmail, cancellationToken);

    public Task<User> FindByLoginAsync(string loginProvider, string providerKey, CancellationToken cancellationToken)
        => _userRepository.GetSingleByLoginAsync(loginProvider, providerKey, cancellationToken);

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
