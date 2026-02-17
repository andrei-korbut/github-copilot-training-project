# Build stage
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy csproj and restore dependencies
COPY CarMaintenanceTracker.Api/*.csproj ./CarMaintenanceTracker.Api/
RUN dotnet restore "./CarMaintenanceTracker.Api/CarMaintenanceTracker.Api.csproj"

# Copy everything else and build
COPY CarMaintenanceTracker.Api/. ./CarMaintenanceTracker.Api/
WORKDIR /src/CarMaintenanceTracker.Api
RUN dotnet build "CarMaintenanceTracker.Api.csproj" -c Release -o /app/build

# Publish stage
FROM build AS publish
RUN dotnet publish "CarMaintenanceTracker.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 80
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CarMaintenanceTracker.Api.dll"]
