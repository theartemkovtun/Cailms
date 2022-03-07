using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Cailms.Models;
using FluentValidation;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;

namespace Cailms.Middlewares
{
    public class ExceptionsHandlingMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionsHandlingMiddleware(RequestDelegate next)
        {
            _next = next;
        } 

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception exception)
            {
                await HandleExceptionAsync(context, exception);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            var errorMessage = new ErrorViewModel();
            
            if (exception is ValidationException validationException)
            {
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                
                errorMessage.Message = "Input model validation failed";
                errorMessage.Details = validationException.Errors?.Select(e => new { e.PropertyName, e.ErrorMessage} );
            }
            else
            {
                errorMessage.Message = exception.Message;
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            }

            context.Response.ContentType = "application/json";
            return context.Response.WriteAsync(JsonConvert.SerializeObject(errorMessage));
        }
    }
    
    public static class ExceptionsHandlingMiddlewareExtension
    {
        public static IApplicationBuilder UseExceptionsHandlingMiddleware(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ExceptionsHandlingMiddleware>();
        }
    }
}