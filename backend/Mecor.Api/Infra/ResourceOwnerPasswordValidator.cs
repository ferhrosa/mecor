using IdentityServer4.Validation;
using Mecor.Api.Model;
using Mecor.Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace Mecor.Api.Infra
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IUserRepository userRepository;
        private readonly IPasswordHasher<User> passwordHasher;

        public ResourceOwnerPasswordValidator(
            IUserRepository userRepository,
            IPasswordHasher<User> passwordHasher)
        {
            this.userRepository = userRepository;
            this.passwordHasher = passwordHasher;
        }

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            var user = await userRepository.GetByEmailAsync(context.UserName);

            if (user != null)
            {
                var passwordResult = passwordHasher.VerifyHashedPassword(user, user.HashedPassword, context.Password);
                bool success = false;
                switch (passwordResult)
                {
                    case PasswordVerificationResult.Success:
                        success = true;
                        break;
                    case PasswordVerificationResult.SuccessRehashNeeded:
                        string newHashedPassword = passwordHasher.HashPassword(user, context.Password);
                        await userRepository.UpdateHashedPasswordAsync(user.Id, newHashedPassword);
                        success = true;
                        break;
                }

                if (success)
                {
                    context.Result = new GrantValidationResult(user.Id.ToString(), "password");
                }
            }
        }
    }
}
