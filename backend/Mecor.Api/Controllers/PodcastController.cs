using Mecor.Api.Model;
using Mecor.Api.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Mecor.Api.Controllers
{
    [Route("podcasts")]
    [ApiController]
    [Authorize]
    public class PodcastController : ControllerBase
    {
        private readonly IPodcastRepository podcastRepository;

        public PodcastController(IPodcastRepository podcastRepository)
        {
            this.podcastRepository = podcastRepository;
        }

        [HttpGet]
        public Task<List<Podcast>> Get()
        {
            return podcastRepository.GetAllAsync();
        }

        [HttpGet("{id}")]
        public Task<Podcast> GetSingle(Guid id)
        {
            return podcastRepository.GetSingleAsync(id);
        }

        [HttpPost]
        public Task<Podcast> Create([FromBody] Podcast podcast)
        {
            return podcastRepository.CreateAsync(podcast);
        }

        [HttpPut("{id}")]
        public Task<Podcast> Update(Guid id, [FromBody] Podcast podcast)
        {
            return podcastRepository.UpdateAsync(id, podcast);
        }

        [HttpDelete("{id}")]
        public Task Delete(Guid id)
        {
            return podcastRepository.DeleteAsync(id);
        }
    }
}
