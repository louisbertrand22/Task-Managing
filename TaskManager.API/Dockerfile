# Use the official .NET SDK image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY TaskManager.API.csproj ./
RUN dotnet restore

# Copy the rest of the code
COPY . .

# Build and publish the application
RUN dotnet publish -c Release -o /app/publish

# Use the official .NET runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Copy the published application
COPY --from=build /app/publish .

# Set the entry point for the application
ENTRYPOINT ["dotnet", "TaskManager.API.dll", "--urls", "http://0.0.0.0:8080"] 