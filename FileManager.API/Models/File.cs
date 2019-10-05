using System;

namespace FileManager.API.Models
{
    public class File
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public int Size { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int FileManagerAdminId { get; set; }
        public virtual FileManagerAdmin FMAdmin { get; set; }

    }
}