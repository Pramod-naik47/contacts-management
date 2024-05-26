using ContactManagement.DatabaseContext;
using ContactManagement.Interface;
using ContactManagement.Middlewares;
using ContactManagement.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//regstering inmemory db context
builder.Services.AddDbContext<ContactContext>(option => option.UseInMemoryDatabase(builder.Configuration["ConnectionString"]));

//registering services
builder.Services.AddScoped<IContact, ContactService>();

//Adding cors
builder.Services.AddCors((setup) =>
{
    setup.AddPolicy("default", (options) =>
    {
        options.WithOrigins("http://localhost:3000")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});

var app = builder.Build();
app.UseCors("default");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//Registering global exception handling middleware
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.Run();
