using App.Data;
using App.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace App
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            //might not need this
            //services.AddCors(options =>
            //{
            //    options.AddPolicy("EnableCORS", builder =>
            //    {
            //        builder.AllowAnyOrigin()
            //        .AllowAnyHeader()
            //        .AllowAnyMethod();
            //    });
            //});
            services.AddControllersWithViews();

            services.AddDbContext<AppDataContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("AppDataContext")));
            services.AddDbContext<UserDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("AppDataContext")));

            //n token validation parameters
            var tokenValidationParameters = new TokenValidationParameters()
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = "http://localhost:34467",
                //Configuration["JWT:Issuer"],
                ValidAudience = "http://localhost:34467",
                //Configuration["JWT:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:SecretKey"])),

                //ClockSkew = TimeSpan.Zero
            };

            services.AddIdentity<ApplicationUser, IdentityRole>().AddEntityFrameworkStores<UserDbContext>().AddDefaultTokenProviders();


            //n Add authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                //options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                //Add JWT Bearer
                .AddJwtBearer(options =>
                {
                    options.SaveToken = true;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = tokenValidationParameters;
                });

            //old add auth with token valid parameters
            // var secretKey = Encoding.UTF8.GetBytes(Configuration["JWT:SecretKey"].ToString());
            // services.AddAuthentication(options =>
            // {
            //     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //     options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            // }).AddJwtBearer(configure =>
            //{
            //    configure.RequireHttpsMetadata = false;
            //    configure.SaveToken = false;
            //    configure.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(secretKey),
            //        //ValidateIssuer = false,
            //        ValidIssuer = Configuration["JWT:Issuer"],
            //        ValidateAudience = true,
            //        //ValidateAudience = false,
            //        ValidAudience = Configuration["JWT:Audience"],
            //        ClockSkew = TimeSpan.Zero
            //    };
            //});

            

            services.AddScoped(typeof(IDataRepository<>), typeof(DataRepository<>));

            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/dist";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.Use(async (ctx, next) =>
            //{
            //    await next();
            //    if (ctx.Response.StatusCode == 204)
            //    {
            //        ctx.Response.ContentLength = 0;
            //    }
            //});

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            if (!env.IsDevelopment())
            {
                app.UseSpaStaticFiles();
            }

            app.UseRouting();

            //might not need this
            //app.UseCors("EnableCORS");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                // To learn more about options for serving an Angular SPA from ASP.NET Core,
                // see https://go.microsoft.com/fwlink/?linkid=864501

                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseAngularCliServer(npmScript: "start");
                }
            });
        }
    }
}
