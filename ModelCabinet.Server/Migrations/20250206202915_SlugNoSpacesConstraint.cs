using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModelCabinet.Server.Migrations
{
    /// <inheritdoc />
    public partial class SlugNoSpacesConstraint : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 1,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2025, 2, 6, 12, 29, 14, 314, DateTimeKind.Local).AddTicks(7342), new DateTime(2025, 2, 6, 12, 29, 14, 314, DateTimeKind.Local).AddTicks(7347) });

            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 2,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2025, 2, 6, 12, 29, 14, 314, DateTimeKind.Local).AddTicks(7354), new DateTime(2025, 2, 6, 12, 29, 14, 314, DateTimeKind.Local).AddTicks(7356) });

            migrationBuilder.UpdateData(
                table: "Project",
                keyColumn: "ProjectId",
                keyValue: 1,
                columns: new[] { "CreationDate", "ModifiedDate", "Slug" },
                values: new object[] { new DateTime(2025, 2, 6, 12, 29, 14, 314, DateTimeKind.Local).AddTicks(7022), new DateTime(2025, 2, 6, 12, 29, 14, 314, DateTimeKind.Local).AddTicks(7069), "nomen-est-omen" });

            migrationBuilder.UpdateData(
                table: "Project",
                keyColumn: "ProjectId",
                keyValue: 2,
                columns: new[] { "CreationDate", "ModifiedDate", "Slug" },
                values: new object[] { new DateTime(2025, 2, 6, 12, 29, 14, 314, DateTimeKind.Local).AddTicks(7074), new DateTime(2025, 2, 6, 12, 29, 14, 314, DateTimeKind.Local).AddTicks(7075), "this is not good" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 1,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2024, 11, 27, 12, 31, 28, 793, DateTimeKind.Local).AddTicks(3778), new DateTime(2024, 11, 27, 12, 31, 28, 793, DateTimeKind.Local).AddTicks(3786) });

            migrationBuilder.UpdateData(
                table: "Asset",
                keyColumn: "AssetId",
                keyValue: 2,
                columns: new[] { "DateCreation", "DateUpdated" },
                values: new object[] { new DateTime(2024, 11, 27, 12, 31, 28, 793, DateTimeKind.Local).AddTicks(3800), new DateTime(2024, 11, 27, 12, 31, 28, 793, DateTimeKind.Local).AddTicks(3804) });

            migrationBuilder.UpdateData(
                table: "Project",
                keyColumn: "ProjectId",
                keyValue: 1,
                columns: new[] { "CreationDate", "ModifiedDate", "Slug" },
                values: new object[] { new DateTime(2024, 11, 27, 12, 31, 28, 793, DateTimeKind.Local).AddTicks(3181), new DateTime(2024, 11, 27, 12, 31, 28, 793, DateTimeKind.Local).AddTicks(3290), "nomen est omen" });

            migrationBuilder.UpdateData(
                table: "Project",
                keyColumn: "ProjectId",
                keyValue: 2,
                columns: new[] { "CreationDate", "ModifiedDate", "Slug" },
                values: new object[] { new DateTime(2024, 11, 27, 12, 31, 28, 793, DateTimeKind.Local).AddTicks(3300), new DateTime(2024, 11, 27, 12, 31, 28, 793, DateTimeKind.Local).AddTicks(3305), "nomen est omen" });
        }
    }
}
