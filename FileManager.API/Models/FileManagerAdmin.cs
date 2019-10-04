namespace FileManager.API.Models
{
    public class FileManagerAdmin
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string SubFolderName { get; set; }
        public string FoldersXML { get; set; }
        public virtual User User { get; set;}
    }
}