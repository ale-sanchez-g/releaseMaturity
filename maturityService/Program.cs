using dotenv.net;
using Amazon.S3;
using Amazon;
using Amazon.Extensions.NETCore.Setup;
using SimpleMicroservice.Services;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env file
DotEnv.Load();

// Check if .env.local file exists and load it if present
if (File.Exists(".env.local"))
{
    DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] { ".env.local" }));
}

// Add services to the container.
builder.Services.AddControllers();

// Register AWS S3 service
builder.Services.AddAWSService<IAmazonS3>();

// Register S3Service
builder.Services.AddScoped<S3Service>();

// Configure CORS (if not already configured)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});


// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Optionally, specify the AWS region if not set in credentials
builder.Services.AddDefaultAWSOptions(new AWSOptions
{
    Region = RegionEndpoint.USWest2 // Replace with your region
});

var app = builder.Build();

// Use CORS
app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var dorametrics = new[]
{
    "Mean Time to Restore",
    "Change Failure Rate",
    "Deployment Frequency",
    "Lead Time for Changes"
};

app.MapGet("/DoraMetrics", () =>
{
    var forecast =  Enumerable.Range(1, 5).Select(index =>
        new DoraMetrics
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(0, 32),
            dorametrics[Random.Shared.Next(dorametrics.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetDoraMetrics")
.WithOpenApi();

app.Run();

record DoraMetrics(DateOnly Date, int DoraMetricScore, string? Metric)
{
    public DoraMetrics() : this(default!, default!, default!) { }
}
