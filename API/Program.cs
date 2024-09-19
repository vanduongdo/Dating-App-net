using System.Text;
using API.Extensions;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Add custom services
builder.Services.AddApplicationServices(config: builder.Configuration);
builder.Services.AddIndentityServices(config: builder.Configuration);

var app = builder.Build();
// Configure middleware
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200", "https://localhost:4200"));

// Add JWT authentication
app.UseAuthentication();
app.UseAuthorization();

// Configure the HTTP request pipeline.
app.MapControllers();

app.Run();
