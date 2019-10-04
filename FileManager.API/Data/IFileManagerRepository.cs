using System.Collections.Generic;
using System.Threading.Tasks;
using FileManager.API.Helpers;
using FileManager.API.Models;

namespace FileManager.API.Data
{
    public interface IFileManagerRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<PagedList<User>> GetUsers(UserParams userParams);
         Task<User> GetUser(int id);

         Task<PagedList<Company>> GetCompanies(UserParams userParams);
         Task<Company> GetCompany(int id);

         Task<PagedList<FileManagerAdmin>> GetFMAdmins(UserParams userParams);
         Task<FileManagerAdmin> GetFMAdmin(int id);
         
         Task<File> GetFile(int id);
      
         Task<Role> GetRole(int id);
         
         Task<PagedList<Role>> GetRoles(UserParams userParams);

        
    }
}