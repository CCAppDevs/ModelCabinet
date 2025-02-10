using System.ComponentModel.DataAnnotations;

namespace ModelCabinet.Server.Models
{
    public class Project
    {
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string Description { get; set; }
        public string Author { get; set; }
        public string Version { get; set; }
        public virtual List<Asset> Assets { get; set; }

        [RegularExpression("^[^\\s]+$")]
        public string Slug { get; set; }
        public string ShortDescription { get; set; }

    }
}
