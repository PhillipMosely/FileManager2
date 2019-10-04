using System;

namespace FileManager.API.Dtos
{
    public class CompanyForAddDto
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }        
        public CompanyForAddDto()
        {
            DateCreated = DateTime.Now;
            DateModified = DateTime.Now;
        }
    }
}