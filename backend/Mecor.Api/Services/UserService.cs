using Mecor.Api.Cross;
using Mecor.Api.Model;
using Mecor.Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace Mecor.Api.Services
{
    public class UserService
    {
        private readonly IUserRepository userRepository;
        private readonly IPasswordHasher<User> passwordHasher;

        public UserService(
            IUserRepository userRepository,
            IPasswordHasher<User> passwordHasher)
        {
            this.userRepository = userRepository;
            this.passwordHasher = passwordHasher;
        }

        public async Task<bool> CreateUserAsync(string email, string name, string password)
        {
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(name)
                || string.IsNullOrWhiteSpace(password) /*|| !password.IsStrongPassword()*/)
            { return false; }

            email = email.ToNormalizedEmail();

            if (await userRepository.ExistsWithEmailAsync(email)) { return false; }

            var user = new User
            {
                Id = Guid.NewGuid(),
                Email = email,
                Name = name,
            };

            user.HashedPassword = passwordHasher.HashPassword(user, password);

            await userRepository.AddAsync(user);

            return true;
        }
    }
}
