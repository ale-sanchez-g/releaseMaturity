using dotenv.net;
using Amazon.S3;
using Amazon;
using Amazon.Extensions.NETCore.Setup;
using SimpleMicroservice.Services;
using System.IO;
using LaunchDarkly.Sdk.Server;
using LaunchDarkly.Sdk.Server.Interfaces;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env file
DotEnv.Load();

// Check if .env.local file exists and load it if present
if (File.Exists(".env.local"))
{
    DotEnv.Load(options: new DotEnvOptions(envFilePaths: new[] { ".env.local" }));
}

// Retrieve the SDK key from environment variables
var sdkKey = Environment.GetEnvironmentVariable("LAUNCHDARKLY_SDK_KEY");
if (string.IsNullOrEmpty(sdkKey))
{
    throw new InvalidOperationException("LaunchDarkly SDK key is not set in environment variables.");
}

// Initialize LaunchDarkly client
var ldConfig = Configuration.Default(sdkKey);
var ldClient = new LdClient(ldConfig);

// Register services
ConfigureServices(builder.Services, ldClient);

var app = builder.Build();

// Configure middleware
ConfigureMiddleware(app, ldClient);

app.Run();

void ConfigureServices(IServiceCollection services, ILdClient ldClient)
{
    // Register LaunchDarkly client as a singleton service
    services.AddSingleton(ldClient);

    // Add services to the container.
    services.AddControllers();

    // Register AWS S3 service
    services.AddAWSService<IAmazonS3>();

    // Register S3Service
    services.AddScoped<S3Service>();

    // Configure CORS
    services.AddCors(options =>
    {
        options.AddPolicy("AllowAll",
            builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });
    });

    // Add Swagger/OpenAPI
    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();

    // Optionally, specify the AWS region if not set in credentials
    services.AddDefaultAWSOptions(new AWSOptions
    {
        Region = RegionEndpoint.USWest2 // Replace with your region
    });
}

void ConfigureMiddleware(WebApplication app, ILdClient ldClient)
{
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

    // Ensure the LaunchDarkly client is disposed of properly
    app.Lifetime.ApplicationStopping.Register(() => ((LdClient)ldClient).Dispose());
}

record DoraMetrics(DateOnly Date, int DoraMetricScore, string? Metric)
{
    public DoraMetrics() : this(default!, default!, default!) { }
}

record Metrics(string Name, int Value)
{
    public Metrics() : this(default!, default!) { }
}