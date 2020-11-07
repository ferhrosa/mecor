using Mecor.Api.Model;
using Mecor.Api.Repositories.Interfaces;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mecor.Api.Repositories.MongoDb
{
    public class PodcastMongoDbRepository : IPodcastRepository
    {
        private readonly IMongoCollection<Podcast> collection;

        public PodcastMongoDbRepository(IMongoDatabase mongoDatabase)
        {
            collection = mongoDatabase.GetCollection<Podcast>(nameof(Podcast));
        }

        public Task<List<Podcast>> GetAllAsync()
            => collection.Find(Builders<Podcast>.Filter.Empty).ToListAsync();

        public Task<Podcast> GetSingleAsync(Guid id)
            => collection.Find(FilterById(id)).SingleOrDefaultAsync();

        public async Task<Podcast> CreateAsync(Podcast podcast)
        {
            await collection.InsertOneAsync(podcast);
            return podcast;
        }

        public Task<Podcast> UpdateAsync(Guid id, Podcast podcast)
            => collection.FindOneAndReplaceAsync(FilterById(id), podcast);

        public Task DeleteAsync(Guid id)
            => collection.FindOneAndDeleteAsync(FilterById(id));

        private static FilterDefinition<Podcast> FilterById(Guid id)
            => Builders<Podcast>.Filter.Eq(p => p.Id, id);
    }
}
