using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CarMaintenanceTracker.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddCarAndCarMaintenanceItemEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cars",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    CurrentKm = table.Column<int>(type: "int", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValueSql: "GETUTCDATE()")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cars", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CarMaintenanceItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CarId = table.Column<int>(type: "int", nullable: false),
                    MaintenanceTemplateId = table.Column<int>(type: "int", nullable: false),
                    LastServiceKm = table.Column<int>(type: "int", nullable: true),
                    LastServiceDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IntervalValue = table.Column<int>(type: "int", nullable: false),
                    IntervalType = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    CalculatedNextKm = table.Column<int>(type: "int", nullable: true),
                    CalculatedNextDate = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CarMaintenanceItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CarMaintenanceItems_Cars_CarId",
                        column: x => x.CarId,
                        principalTable: "Cars",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CarMaintenanceItems_MaintenanceTemplates_MaintenanceTemplateId",
                        column: x => x.MaintenanceTemplateId,
                        principalTable: "MaintenanceTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CarMaintenanceItems_CarId",
                table: "CarMaintenanceItems",
                column: "CarId");

            migrationBuilder.CreateIndex(
                name: "IX_CarMaintenanceItems_MaintenanceTemplateId",
                table: "CarMaintenanceItems",
                column: "MaintenanceTemplateId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CarMaintenanceItems");

            migrationBuilder.DropTable(
                name: "Cars");
        }
    }
}
