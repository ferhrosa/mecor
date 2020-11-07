using Mecor.Api.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mecor.Api.Repositories.Interfaces
{
    public interface IPodcastRepository
    {
        Task<List<Podcast>> GetAllAsync();
        Task<Podcast> GetSingleAsync(Guid id);
        Task<Podcast> CreateAsync(Podcast podcast);
        Task<Podcast> UpdateAsync(Guid id, Podcast podcast);
        Task DeleteAsync(Guid id);
    }
}
