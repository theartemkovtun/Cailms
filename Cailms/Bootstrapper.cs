using System;
using System.Reflection;
using AutoMapper;
using Cailms.Application.Options;
using Cailms.Application.Requests.Transfers.Commands.AddTransfer;
using Cailms.Application.Requests.Users.Commands.LoginUser;
using Cailms.Application.Requests.Users.Commands.SignupUser;
using Cailms.Domain.Configurations;
using Cailms.Domain.Repositories;
using Cailms.Domain.Repositories.Contracts;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;

namespace Cailms
{
    public static class Bootstrapper
    {
        public static void Initialize(IServiceCollection services, IConfiguration configuration)
        {
            services.AddDistributedMemoryCache();
            services.AddHttpContextAccessor();
            
            services.AddMediatR(typeof(AddTransferCommand).GetTypeInfo().Assembly);
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            
            services.AddCors(options =>
            {
                options.AddPolicy("Default", 
                    builder => builder
                        .SetIsOriginAllowed(_ => true)
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
            });
            
            services.AddControllers();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme);
            
            services.AddAuthorization();

            services.AddSpaStaticFiles(c =>
            {
                c.RootPath = "ClientApp/dist/ClientApp";
            });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Cailms API", Version = "V1" });
            });
            
            services.BindOptions(configuration);
            services.AddRepositories();
            services.AddValidators();
            services.AddEngines();
        }
        
        private static void BindOptions(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<DatabaseConfiguration>(configuration.GetSection("DatabaseConfiguration"));
            services.Configure<AuthorizationOptions>(configuration.GetSection("AuthorizationOptions"));
        }

        private static void AddEngines(this IServiceCollection services)
        {
        }
        
        private static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<ITransferRepository, TransferRepository>();
            services.AddScoped<IStatisticsRepository, StatisticsRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
        }

        private static void AddValidators(this IServiceCollection services)
        {
            services.AddTransient<IValidator<SignupUserCommand>, SignupUserCommandValidator>();
            services.AddTransient<IValidator<LoginUserCommand>, LoginUserCommandValidator>();
        }
    }
}