# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY maturityService/ ./maturityService/
COPY .env.local ./maturityService/
WORKDIR /app/maturityService
RUN dotnet restore
RUN dotnet build -c Release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-env /app/maturityService/out .

# Copy .env.local file to the runtime image
COPY .env.local .

# Set environment variable to listen on port 80
ENV ASPNETCORE_URLS=http://+:80

#set ASPNETCORE_ENVIRONMENT to Development for development environment
ENV ASPNETCORE_ENVIRONMENT=Development

# Expose the port the app runs on
EXPOSE 80

# Run the application
ENTRYPOINT ["dotnet", "maturityService.dll"]