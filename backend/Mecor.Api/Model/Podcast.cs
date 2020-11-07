using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System;
using System.Collections.Generic;

namespace Mecor.Api.Model
{
    public class Podcast
    {
        //[BsonId(IdGenerator = typeof(GuidGenerator))]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public List<PodcastFeed> Feeds { get; set; }
    }

    public class PodcastFeed
    {
        public string Url { get; set; }
        public List<PodcastSeries> Series { get; set; }
    }

    public class PodcastSeries
    {
        public string Name { get; set; }
        public List<string> Patterns { get; set; }
    }
}
