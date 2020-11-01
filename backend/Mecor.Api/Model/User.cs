using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Mecor.Api.Model
{
    public class User
    {
        [BsonId]
        public Guid Id { get; set; }

        public string Email { get; set; }
        public string Name { get; set; }

        public string HashedPassword { get; set; }

    }
}
