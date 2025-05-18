# FinalProject


# Install Terminal
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL 
dotnet add package Microsoft.EntityFrameworkCore.Design

# Migrations
dotnet ef migrations add InitialCreate
dotnet ef database update