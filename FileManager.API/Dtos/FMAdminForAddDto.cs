using System;
using System.ComponentModel.DataAnnotations;

namespace FileManager.API.Models
{
    public class FMAdminForAddDto
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }
        [Required]
        public string SubFolderName { get; set; }
        public string FoldersXML { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }       
        public FMAdminForAddDto()
        {
            DateCreated = DateTime.Now;
            DateModified = DateTime.Now;
        }
    }
}