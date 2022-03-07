using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.RenameTransferTemplate
{
    public class RenameTransferTemplateCommandHandler : IRequestHandler<RenameTransferTemplateCommand>
    {
        private readonly ITransferRepository _transferRepository;

        public RenameTransferTemplateCommandHandler(ITransferRepository transferRepository)
        {
            _transferRepository = transferRepository;
        }

        public async Task<Unit> Handle(RenameTransferTemplateCommand request, CancellationToken cancellationToken)
        {
            await _transferRepository.RenameTransferTemplateAsync(request.Id, request.Name);
            
            return Unit.Value;
        }
    }
}