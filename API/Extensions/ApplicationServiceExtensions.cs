using System;
using API.Data;
using API.Helpers;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtensions 
{
// static class to make it easier to call the methods, 
// allows to use the methods without creating an instance of the class
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, 
        IConfiguration config)
    {
        // extension method to add services to the IServiceCollection
        // Everything that was in Program.cs is now in this method
        // Everything apart rom the authentication stuff into the clipboards

        services.AddControllers();
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<IPhotoService, PhotoService>();
        services.AddScoped<LogUserActivity>();
        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        services.Configure<CloudinarySettings>(config.GetSection("CloudinarySettings"));

        return services;
    }
}
