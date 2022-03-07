using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.RenameSavedTransferFilter
{
    public class RenameSavedTransferFilterCommandHandler : IRequestHandler<RenameSavedTransferFilterCommand>
    {
        private readonly ITransferRepository _transferRepository;

        public RenameSavedTransferFilterCommandHandler(ITransferRepository transferRepository)
        {
            _transferRepository = transferRepository;
        }

        public async Task<Unit> Handle(RenameSavedTransferFilterCommand request, CancellationToken cancellationToken)
        {
            await _transferRepository.RenameSavedTransferFilterAsync(request.Id, request.Name);
            
            return Unit.Value;
        }
    }
}