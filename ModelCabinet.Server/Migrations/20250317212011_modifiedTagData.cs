using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ModelCabinet.Server.Migrations
{
    /// <inheritdoc />
    public partial class modifiedTagData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tag",
                columns: table => new
                {
                    TagId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TagName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Color = table.Column<string>(type: "char(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tag", x => x.TagId);
                });

            migrationBuilder.CreateTable(
                name: "AssetTag",
                columns: table => new
                {
                    AssetId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AssetTag", x => new { x.AssetId, x.TagId });
                    table.ForeignKey(
                        name: "FK_AssetTag_Asset_AssetId",
                        column: x => x.AssetId,
                        principalTable: "Asset",
                        principalColumn: "AssetId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AssetTag_Tag_TagId",
                        column: x => x.TagId,
                        principalTable: "Tag",
                        principalColumn: "TagId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTag",
                columns: table => new
                {
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    TagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTag", x => new { x.ProjectId, x.TagId });
                    table.ForeignKey(
                        name: "FK_ProjectTag_Project_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Project",
                        principalColumn: "ProjectId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectTag_Tag_TagId",
                        column: x => x.TagId,
                        principalTable: "Tag",
                        principalColumn: "TagId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 1,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2025, 3, 17, 14, 20, 10, 930, DateTimeKind.Local).AddTicks(2109), new DateTime(2025, 3, 17, 14, 20, 10, 930, DateTimeKind.Local).AddTicks(2164) });

            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 2,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2025, 3, 17, 14, 20, 10, 930, DateTimeKind.Local).AddTicks(2169), new DateTime(2025, 3, 17, 14, 20, 10, 930, DateTimeKind.Local).AddTicks(2171) });

            migrationBuilder.InsertData(
                table: "Tag",
                columns: new[] { "TagId", "Color", "TagName" },
                values: new object[,]
                {
                    { 1, "fae033", "Stress Test" },
                    { 2, "df0000", "D&D" },
                    { 3, "40E0D0", "Pathfinder" },
                    { 4, "afafaf", "Low Detail" },
                    { 5, "3f3f3f", "High Detail" },
                    { 6, "23a300", "Video Game" }
                });

            migrationBuilder.InsertData(
                table: "AssetTag",
                columns: new[] { "AssetId", "TagId" },
                values: new object[,]
                {
                    { 1, 4 },
                    { 1, 6 },
                    { 2, 1 },
                    { 2, 2 },
                    { 2, 5 }
                });

            migrationBuilder.InsertData(
                table: "ProjectTag",
                columns: new[] { "ProjectId", "TagId" },
                values: new object[,]
                {
                    { 1, 3 },
                    { 1, 4 },
                    { 1, 5 },
                    { 2, 1 },
                    { 2, 2 },
                    { 2, 5 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AssetTag_TagId",
                table: "AssetTag",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTag_TagId",
                table: "ProjectTag",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_Tag_TagName",
                table: "Tag",
                column: "TagName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AssetTag");

            migrationBuilder.DropTable(
                name: "ProjectTag");

            migrationBuilder.DropTable(
                name: "Tag");

            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 1,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2025, 2, 25, 14, 39, 3, 727, DateTimeKind.Local).AddTicks(5697), new DateTime(2025, 2, 25, 14, 39, 3, 727, DateTimeKind.Local).AddTicks(5756) });

            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 2,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2025, 2, 25, 14, 39, 3, 727, DateTimeKind.Local).AddTicks(5760), new DateTime(2025, 2, 25, 14, 39, 3, 727, DateTimeKind.Local).AddTicks(5761) });
        }
    }
}
