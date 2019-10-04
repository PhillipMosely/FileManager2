using System;

namespace FileManager.API.Models
{
    public class FMAdminForCreateDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SubFolderName { get; set; }
        public string FoldersXML { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }       
        public CompanyForCreateDto()
        {
            DateCreated = DateTime.Now;
            DateModified = DateTime.Now;
        }
    }
}