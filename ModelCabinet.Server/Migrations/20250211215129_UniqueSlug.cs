using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModelCabinet.Server.Migrations
{
    /// <inheritdoc />
    public partial class UniqueSlug : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Project",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 1,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2025, 2, 11, 13, 51, 27, 863, DateTimeKind.Local).AddTicks(4318), new DateTime(2025, 2, 11, 13, 51, 27, 863, DateTimeKind.Local).AddTicks(4367) });

            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 2,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2025, 2, 11, 13, 51, 27, 863, DateTimeKind.Local).AddTicks(4371), new DateTime(2025, 2, 11, 13, 51, 27, 863, DateTimeKind.Local).AddTicks(4373) });

            migrationBuilder.UpdateData(
                table: "Project",
                keyColumn: "ProjectId",
                keyValue: 1,
                columns: new[] { "CreationDate", "ModifiedDate" },
                values: new object[] { new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.UpdateData(
                table: "Project",
                keyColumn: "ProjectId",
                keyValue: 2,
                columns: new[] { "CreationDate", "ModifiedDate" },
                values: new object[] { new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });

            migrationBuilder.CreateIndex(
                name: "IX_Project_Slug",
                table: "Project",
                column: "Slug",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Project_Slug",
                table: "Project");

            migrationBuilder.AlterColumn<string>(
                name: "Slug",
                table: "Project",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 1,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2025, 2, 6, 13, 58, 5, 872, DateTimeKind.Local).AddTicks(986), new DateTime(2025, 2, 6, 13, 58, 5, 872, DateTimeKind.Local).AddTicks(989) });

            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 2,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2025, 2, 6, 13, 58, 5, 872, DateTimeKind.Local).AddTicks(992), new DateTime(2025, 2, 6, 13, 58, 5, 872, DateTimeKind.Local).AddTicks(994) });

            migrationBuilder.UpdateData(
                table: "Project",
                keyColumn: "ProjectId",
                keyValue: 1,
                columns: new[] { "CreationDate", "ModifiedDate" },
                values: new object[] { new DateTime(2025, 2, 6, 13, 58, 5, 872, DateTimeKind.Local).AddTicks(791), new DateTime(2025, 2, 6, 13, 58, 5, 872, DateTimeKind.Local).AddTicks(835) });

            migrationBuilder.UpdateData(
                table: "Project",
                keyColumn: "ProjectId",
                keyValue: 2,
                columns: new[] { "CreationDate", "ModifiedDate" },
                values: new object[] { new DateTime(2025, 2, 6, 13, 58, 5, 872, DateTimeKind.Local).AddTicks(839), new DateTime(2025, 2, 6, 13, 58, 5, 872, DateTimeKind.Local).AddTicks(840) });
        }
    }
}
