using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.DeleteSavedTransferFilter
{
    public class DeleteSavedTransferFilterCommandHandler : IRequestHandler<DeleteSavedTransferFilterCommand>
    {
        private readonly ITransferRepository _transferRepository;

        public DeleteSavedTransferFilterCommandHandler(ITransferRepository transferRepository)
        {
            _transferRepository = transferRepository;
        }

        public async Task<Unit> Handle(DeleteSavedTransferFilterCommand request, CancellationToken cancellationToken)
        {
            await _transferRepository.DeleteSavedTransferFilterAsync(request.Id);
            
            return Unit.Value;
        }
    }
}