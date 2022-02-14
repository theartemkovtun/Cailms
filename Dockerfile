FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build
WORKDIR /Cailms

COPY *.sln .
COPY Cailms/*.csproj ./Cailms/
RUN dotnet restore

# Copy everything else and build website
COPY Cailms/. ./Cailms/
WORKDIR /Cailms/Cailms
RUN dotnet publish -c release -o /Cailms/Website --no-restore

# Final stage
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /Cailms/Website
COPY --from=build /Cailms/Website ./
ENTRYPOINT ["dotnet", "Cailms.dll"]