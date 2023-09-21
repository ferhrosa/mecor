using AutoMapper;
using Mecor.Api.Models;
using Mecor.Domain.User;

namespace Mecor.Api;

internal sealed class MapperProfile : Profile
{
    public MapperProfile()
    {
        CreateMap<User, UserModel>();
    }
}

