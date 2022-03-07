using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Transfers;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.AddTransferTemplate
{
    public class AddTransferTemplateCommandHandler : IRequestHandler<AddTransferTemplateCommand>
    {
        private readonly ITransferRepository _transferRepository;
        private readonly IMapper _mapper;

        public AddTransferTemplateCommandHandler(ITransferRepository transferRepository, IMapper mapper)
        {
            _transferRepository = transferRepository;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(AddTransferTemplateCommand request, CancellationToken cancellationToken)
        {
            var domainModel = _mapper.Map<AddTransferTemplateDomainModel>(request);

            await _transferRepository.AddTransferTemplateAsync(domainModel);
            
            return Unit.Value;
        }
    }
}