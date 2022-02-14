using AutoMapper;
using Cailms.Application.Requests.Transfers.Queries.GetUserTransfers;
using Cailms.Domain.Repositories.Contracts;
using Moq;
using Xunit;

namespace Cailms.Tests.Transfers
{
    public class TransfersTests
    {
        private readonly IMapper _mapper;
        private const string UserEmail = "email@artemkovtun.com";

        public TransfersTests()
        {
            var mapperConfig = new MapperConfiguration(c =>
            {
                c.AddProfile<Mappings.Profiles.TransferProfile>();
                c.AddProfile<Application.Mappings.Profiles.TransferProfile>();
            });

            _mapper = mapperConfig.CreateMapper();
        }
        
        [Fact]
        public void GetUserTransfer()
        {
            var repo = new Mock<ITransferRepository>();
            var mapper = new Mock<Mapper>();
            
            var command = new GetUserTransfersQuery(UserEmail);
            var handler = new GetUserTransfersQueryHandler(repo.Object, mapper.Object);

            var a = handler.Handle(command, new System.Threading.CancellationToken());
            
        }
        
        [Fact]
        public void AddTransfers()
        {
            var repo = new Mock<ITransferRepository>();
            var mapper = new Mock<Mapper>();
            
            var command = new GetUserTransfersQuery(UserEmail);
            var handler = new GetUserTransfersQueryHandler(repo.Object, mapper.Object);

            var a = handler.Handle(command, new System.Threading.CancellationToken());
            
        }
    }
}