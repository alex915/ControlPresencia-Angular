#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["ProyectoZabalburu/ProyectoZabalburu.csproj", "ProyectoZabalburu/"]
RUN dotnet restore "ProyectoZabalburu/ProyectoZabalburu.csproj"
COPY . .
WORKDIR "/src/ProyectoZabalburu"
RUN dotnet build "ProyectoZabalburu.csproj" -c Release -o /app/build

FROM node:12 AS spaBuild
WORKDIR /spa
COPY ProyectoZabalburu/spa/ .
RUN npm ci
RUN npm run build

FROM build AS publish
RUN dotnet publish "ProyectoZabalburu.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=spaBuild /spa/dist/ ./spa/dist/
ENTRYPOINT ["dotnet", "ProyectoZabalburu.dll"]