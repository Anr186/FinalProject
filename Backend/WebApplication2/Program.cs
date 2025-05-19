using Microsoft.EntityFrameworkCore;
using WebApplication2.Model;
using WebApplication2.Repositories;
using WebApplication2.Services;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<UserService>();

builder.Services.AddScoped<IArticleRepository, ArticleRepository>();
builder.Services.AddScoped<ArticleService>();

builder.Services.AddScoped<IRecenseRepository, RecenseRepository>();
builder.Services.AddScoped<RecenseService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder => builder
            .WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

app.UseCors("AllowReactApp");
app.UseStaticFiles(); 
app.UseStaticFiles(new StaticFileOptions {
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "Uploads")),
    RequestPath = "/Uploads"
});
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.Migrate();
}

app.MapGet("/users", (UserService service) =>
{
    var users = service.GetAll();
    return Results.Ok(users);
});

app.MapGet("/users/{id}", (int id, UserService service) =>
{
    try
    {
        var user = service.GetById(id);
        return Results.Ok(user);
    }
    catch (KeyNotFoundException)
    {
        return Results.NotFound();
    }
});
app.MapGet("/users/by-email", async (string email, UserService service) =>
{
    var user = await service.GetByEmailAsync(email);
    if (user == null)
        return Results.NotFound();

    return Results.Ok(user);
});

app.MapGet("/users/check-email", async (string email, UserService service) =>
{
    try
    {
        var users = await service.GetAllAsync();
        var exists = users.Any(u => u.Email.Equals(email, StringComparison.OrdinalIgnoreCase));
        return Results.Ok(new { exists });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPost("/login", async (LoginRequest request, UserService service) =>
{
    if (string.IsNullOrEmpty(request.Email))
        return Results.BadRequest("Email is required");
    
    if (string.IsNullOrEmpty(request.Password))
        return Results.BadRequest("Password is required");

    try
    {
        var user = await service.Authenticate(request.Email, request.Password);
        if (user == null)
            return Results.Unauthorized();
            
        return Results.Ok(new { 
            message = "Login successful",
            user = new
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                Role = user.Role,
                Specialization = user.Specialization,
                Location = user.Location,
                Bio = user.Bio
            }
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPost("/users", (User user, UserService service) =>
{
    if (string.IsNullOrEmpty(user.FullName))
        return Results.BadRequest("Full name is required");
    
    if (string.IsNullOrEmpty(user.Email))
        return Results.BadRequest("Email is required");
    
    if (string.IsNullOrEmpty(user.Password))
        return Results.BadRequest("Password is required");
        
    if (string.IsNullOrEmpty(user.Role))
    {
        user.Role = UserService.AuthorRole;
    }

    try
    {
        var createdUser = service.Add(user);
        return Results.Created($"/users/{createdUser.Id}", new
        {
            message = "User registered successfully",
            user = createdUser
        });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPost("/users/admin", (User user, UserService service) =>
{
    if (string.IsNullOrEmpty(user.Email))
        return Results.BadRequest("Email is required");

    if (string.IsNullOrEmpty(user.Password))
        return Results.BadRequest("Password is required");

    user.Role = UserService.AdminRole;

    if (string.IsNullOrEmpty(user.FullName)) user.FullName = "Admin";
    try
    {
        var createdUser = service.Add(user);
        return Results.Created($"/users/{createdUser.Id}", createdUser);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPost("/users/reviewer", (User user, UserService service) =>
{
    if (string.IsNullOrEmpty(user.Email))
        return Results.BadRequest("Email is required");
    
    if (string.IsNullOrEmpty(user.Password))
        return Results.BadRequest("Password is required");

    user.Role = UserService.ReviewerRole;
    
    if (string.IsNullOrEmpty(user.FullName)) user.FullName = "Reviewer";
    try
    {
        var createdUser = service.Add(user);
        return Results.Created($"/users/{createdUser.Id}", createdUser);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPatch("/users/{id}", (int id, User user, UserService service) =>
{
    try
    {
        var updatedUser = service.Update(id, user);
        return Results.Ok(updatedUser);
    }
    catch (KeyNotFoundException)
    {
        return Results.NotFound();
    }
});

app.MapDelete("/users/{id}", (int id, UserService service) =>
{
    try
    {
        service.Delete(id);
        return Results.NoContent();
    }
    catch (KeyNotFoundException)
    {
        return Results.NotFound();
    }
});
app.MapGet("/articles", (ArticleService service) =>
{
    var articles = service.GetAll();
    return Results.Ok(articles);
});

app.MapGet("/articles/{id}", (int id, ArticleService service) =>
{
    try
    {
        var article = service.GetById(id);
        return Results.Ok(article);
    }
    catch (KeyNotFoundException)
    {
        return Results.NotFound();
    }
});
app.MapPost("/articles", (Article article, ArticleService service) =>
{
    if (string.IsNullOrEmpty(article.Title))
        return Results.BadRequest("Title is required");
    
    if (string.IsNullOrEmpty(article.Content))
        return Results.BadRequest("Content is required");

    article.Status = "Submitted";
    article.SubmittedDate = DateTime.UtcNow;
    article.ImagePngPath = ""; 
    article.WordDocumentPath = ""; 

    try
    {
        var createdArticle = service.Add(article);
        return Results.Created($"/articles/{createdArticle.Id}", createdArticle);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});
app.MapGet("/articles/user/{userId}", async (int userId, ArticleService service) =>
{
    var articles = await service.GetByUserIdAsync(userId);
    return Results.Ok(articles);
});

app.MapPatch("/articles/{id}", (int id, Article article, ArticleService service) =>
{
    try
    {
        var updatedArticle = service.Update(id, article);
        return Results.Ok(updatedArticle);
    }
    catch (KeyNotFoundException)
    {
        return Results.NotFound();
    }
});

app.MapDelete("/articles/{id}", (int id, ArticleService service) =>
{
    try
    {
        service.Delete(id);
        return Results.NoContent();
    }
    catch (KeyNotFoundException)
    {
        return Results.NotFound();
    }
});
app.MapGet("/recenses", (RecenseService service) =>
{
    var recenses = service.GetAll();
    return Results.Ok(recenses);
});

app.MapGet("/recenses/{id}", (int id, RecenseService service) =>
{
    try
    {
        var recense = service.GetById(id);
        return Results.Ok(recense);
    }
    catch (KeyNotFoundException)
    {
        return Results.NotFound();
    }
});

app.MapGet("/recenses/article/{articleId}", async (int articleId, RecenseService service) =>
{
    var recenses = await service.GetByArticleIdAsync(articleId);
    return Results.Ok(recenses);
});

app.MapGet("/recenses/reviewer/{reviewerId}", async (int reviewerId, RecenseService service) =>
{
    var recenses = await service.GetByReviewerIdAsync(reviewerId);
    return Results.Ok(recenses);
});

app.MapPost("/recenses", (Recense recense, RecenseService service) =>
{
    // if (recense.ArticleId <= 0)
    //     return Results.BadRequest("ArticleId is required");
    
    // if (recense.ReviewerId <= 0)
    //     return Results.BadRequest("ReviewerId is required");
    
    // if (string.IsNullOrEmpty(recense.Recommendation))
    //     return Results.BadRequest("Recommendation is required");

    recense.Status = "Pending";
    recense.CreatedAt = DateTime.UtcNow;
    recense.UpdatedAt = DateTime.UtcNow;

    try
    {
        var createdRecense = service.Add(recense);
        return Results.Created($"/recenses/{createdRecense.Id}", createdRecense);
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPatch("/recenses/{id}", (int id, Recense recense, RecenseService service) =>
{
    try
    {
        var updatedRecense = service.Update(id, recense);
        return Results.Ok(updatedRecense);
    }
    catch (KeyNotFoundException)
    {
        return Results.NotFound();
    }
});

app.MapDelete("/recenses/{id}", (int id, RecenseService service) =>
{
    try
    {
        service.Delete(id);
        return Results.NoContent();
    }
    catch (KeyNotFoundException)
    {
        return Results.NotFound();
    }
});
app.MapPost("/articles/{id}/upload-word", async (int id, HttpRequest request, ArticleService service) =>
{
    var file = request.Form.Files.FirstOrDefault();
    if (file == null || file.Length == 0)
        return Results.BadRequest("No file uploaded");

    if (Path.GetExtension(file.FileName).ToLower() != ".docx")
        return Results.BadRequest("Only .docx files are allowed");

    try
    {
        var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
        if (!Directory.Exists(uploadsDir))
            Directory.CreateDirectory(uploadsDir);

        var fileName = $"article_{id}_{DateTime.Now.Ticks}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploadsDir, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        var relativePath = $"/Uploads/{fileName}";
        return Results.Ok(new { filePath = relativePath });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});

app.MapPost("/articles/{id}/upload-image", async (int id, HttpRequest request, ArticleService service) => 
{
    var file = request.Form.Files.FirstOrDefault();
    if (file == null || file.Length == 0)
        return Results.BadRequest("No file uploaded");

    var extension = Path.GetExtension(file.FileName).ToLower();
    if (extension != ".png" && extension != ".jpg" && extension != ".jpeg")
        return Results.BadRequest("Only PNG or JPEG images are allowed");

    try
    {
        var uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
        if (!Directory.Exists(uploadsDir))
            Directory.CreateDirectory(uploadsDir);

        var fileName = $"article_{id}_{DateTime.Now.Ticks}{extension}";
        var filePath = Path.Combine(uploadsDir, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }
        var relativePath = $"/Uploads/{fileName}";
        return Results.Ok(new { filePath = relativePath });
    }
    catch (Exception ex)
    {
        return Results.Problem(ex.Message);
    }
});
app.Run();