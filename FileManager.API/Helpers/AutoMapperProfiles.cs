using System.Linq;
using AutoMapper;
using FileManager.API.Dtos;
using FileManager.API.Models;

namespace FileManager.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserForListDto>();
            CreateMap<User,UserForDetailedDto>();
            CreateMap<UserForUpdateDto,User>();
            CreateMap<UserForRegisterDto,User>();
            CreateMap<RoleForCreateDto,Role>();
            CreateMap<RoleForUpdateDto,Role>();
            CreateMap<Role,RoleForListDto>();
            CreateMap<CompanyForCreateDto,Company>();
            CreateMap<CompanyForUpdateDto,Company>();
            CreateMap<Company,CompanyForListDto>();
            CreateMap<FMAdminForCreateDto,FileManagerAdmin>();
            CreateMap<FMAdminForUpdateDto,FileManagerAdmin>();
            CreateMap<FileManagerAdmin,FMAdminForListDto>();

        }
    }
}