namespace Mecor.Api.Options
{
    public record AuthenticationOptions
    {
        public const string Key = "Authentication";

        public GoogleOptions Google { get; init; } = new();

        public record GoogleOptions
        {
            public static readonly IDictionary<string, string> Scopes = new Dictionary<string, string>()
            {
                {"https://www.googleapis.com/auth/userinfo.email", "View your email address" },
                {"https://www.googleapis.com/auth/userinfo.profile", "See your personal info, including any personal info you've made publicly available" },
                {"openid", "Associate you with your personal info on Google" },
            };

            public string ClientId { get; init; }
            public string ClientSecret { get; init; }
        }
    }
}
