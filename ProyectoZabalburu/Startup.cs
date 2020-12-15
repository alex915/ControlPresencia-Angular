using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using WebAPIFichajes.Models;

namespace ProyectoZabalburu
{
    public class Startup
    {
        public string cors = "AllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration; 

        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<ProyectoFichajesdbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("fichajesSQL")));
            
            services.AddCors(options =>
            {
                options.AddPolicy(name: cors,
                                  builder =>
                                  {
                                      builder.AllowAnyOrigin()
                                                             .AllowAnyMethod()
                                                              .AllowAnyHeader();
                                  });
            });

            services.AddDbContext<ProyectoFichajesdbContext>(options =>
              options.UseSqlServer(Configuration.GetConnectionString("fichajesSQL")));

            services.AddAuthentication(AzureADDefaults.BearerAuthenticationScheme)
                .AddAzureADBearer(options => Configuration.Bind("AzureAd", options));

            services.AddAuthorization(x =>
            {
                x.AddPolicy("User", y => y.RequireRole("User").RequireRole("Admin").RequireRole("Super"));
            });

            services.AddControllers(
                x =>
            {
                var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .RequireRole(new[] { "Super","Admin","User" })
                .Build();
                x.Filters.Add(new AuthorizeFilter(policy));
                }
            ).AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore); ;
            
            services.AddSpaStaticFiles(c =>
            {
                c.RootPath = "spa/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors(cors);

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSpaStaticFiles();

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "spa/";
            });
        }
    }
}
