using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.DeleteTransfer
{
    public class DeleteTransferCommandHandler : IRequestHandler<DeleteTransferCommand>
    {
        private readonly ITransferRepository _repository;

        public DeleteTransferCommandHandler(ITransferRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(DeleteTransferCommand request, CancellationToken cancellationToken)
        {
            await _repository.DeleteTransferAsync(request.Id);
            
            return Unit.Value;
        }
    }
}