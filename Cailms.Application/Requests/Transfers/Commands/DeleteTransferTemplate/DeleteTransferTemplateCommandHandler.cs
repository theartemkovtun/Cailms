using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.DeleteTransferTemplate
{
    public class DeleteTransferTemplateCommandHandler : IRequestHandler<DeleteTransferTemplateCommand>
    {
        private readonly ITransferRepository _transferRepository;

        public DeleteTransferTemplateCommandHandler(ITransferRepository transferRepository)
        {
            _transferRepository = transferRepository;
        }

        public async Task<Unit> Handle(DeleteTransferTemplateCommand request, CancellationToken cancellationToken)
        {
            await _transferRepository.DeleteTransferTemplateAsync(request.Id);
            
            return Unit.Value;
        }
    }
}