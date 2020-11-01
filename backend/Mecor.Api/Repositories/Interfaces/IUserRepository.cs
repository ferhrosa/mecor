using Mecor.Api.Cross;
using Mecor.Api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mecor.Api.Repositories.Interfaces
{
    public interface IUserRepository
    {
        /// <summary>
        /// Checks if there is a user with the given email.
        /// </summary>
        /// <param name="normalizedEmail">Email to be checked (already normalized using <see cref="StringExtensions.ToNormalizedEmail"/>).</param>
        public Task<bool> ExistsWithEmailAsync(string normalizedEmail);

        /// <summary>
        /// Gets a user data by its email.
        /// </summary>
        /// <param name="normalizedEmail">Email to be checked (already normalized using <see cref="StringExtensions.ToNormalizedEmail"/>).</param>
        Task<User> GetByEmailAsync(string normalizedEmail);

        /// <summary>
        /// Adds a new user to the repository.
        /// </summary>
        /// <param name="user">User to be added.</param>
        Task AddAsync(User user);

        /// <summary>
        /// Updates the stored hashed password of a user.
        /// </summary>
        /// <param name="id">ID of the user to have the hashed password updated.</param>
        /// <param name="hashedPassword">Hashed password to set to the user.</param>
        Task UpdateHashedPasswordAsync(Guid id, string hashedPassword);
    }
}
