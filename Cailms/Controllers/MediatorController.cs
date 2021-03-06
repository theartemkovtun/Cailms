using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Cailms.Controllers
{
    public abstract class MediatorController : Controller
    {
        public IMediator _mediator;
        public IMapper _mapper;

        protected string Email =>  HttpContext.Items["Email"]?.ToString();
        protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
        protected IMapper Mapper => _mapper ??= HttpContext.RequestServices.GetService<IMapper>();
    }
}