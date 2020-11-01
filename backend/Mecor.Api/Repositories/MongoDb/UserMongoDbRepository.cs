using Mecor.Api.Model;
using Mecor.Api.Repositories.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mecor.Api.Repositories.MongoDb
{
    public class UserMongoDbRepository : IUserRepository
    {
        private readonly IMongoCollection<User> collection;

        public UserMongoDbRepository(IMongoDatabase mongoDatabase)
        {
            collection = mongoDatabase.GetCollection<User>(nameof(User));
        }

        public async Task<bool> ExistsWithEmailAsync(string normalizedEmail)
            => (await collection.CountDocumentsAsync(Builders<User>.Filter.Eq(u => u.Email, normalizedEmail))) > 0;

        public Task<User> GetByEmailAsync(string normalizedEmail)
            => collection.Find(Builders<User>.Filter.Eq(u => u.Email, normalizedEmail)).SingleOrDefaultAsync();

        public Task AddAsync(User user) => collection.InsertOneAsync(user);

        public Task UpdateHashedPasswordAsync(Guid id, string hashedPassword)
            => collection.UpdateOneAsync(
                Builders<User>.Filter.Eq(u => u.Id, id),
                Builders<User>.Update.Set(u => u.HashedPassword, hashedPassword));
    }
}
