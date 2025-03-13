using ModelCabinet.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelCabinet.Server.Tests
{
    public class ProjectModelTests
    {
        [Fact]
        public void Should_Create()
        {
            Project project = new Project { Name = "toast" };
            Assert.NotNull(project);
        }

        [Fact]
        public void Should_Have_A_Name()
        {
            // arrange
            // act
            Project project = new Project { Name = "Toast" };
            // assert
            Assert.NotNull(project.Name);
        }

        // The following test has been commented out as an example of doing theories (multi-way tests)

        //[Theory]
        //[InlineData("this should not work")]
        //[InlineData("1")]
        //[InlineData(null)]
        //[InlineData("")]
        //public void Should_Validate_Slugs(string? value)
        //{
        //    // arrange
        //    Project project = new Project { Name = "test" };

        //    // act
        //    project.Slug = value;

        //    // assert
        //    Assert.Null(project.Slug);
        //}
    }
}
