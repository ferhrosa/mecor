namespace Mecor.Domain.User;

public class User
{
    public string Id { get; set; }

    public string UserName { get; set; }
    public string NormalizedUserName { get; set; }

    public string Email { get; set; }
    public string NormalizedEmail { get; set; }
    public bool EmailConfirmed { get; set; }

    public SortedDictionary<string, UserLogin> Logins { get; init; } = new();
}

public class UserLogin
{
    public string ProviderKey { get; init; }
    public string ProviderDisplayName { get; init; }
}
