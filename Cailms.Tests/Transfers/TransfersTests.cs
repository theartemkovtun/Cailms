using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cailms.Application.Requests.Transfers.Queries.GetUserCategories;
using Cailms.Controllers;
using Cailms.Domain.Models.Shared;
using MediatR;
using Moq;
using Xunit;

namespace Cailms.Tests.Transfers
{
    public class TransfersTests
    {
        private readonly TransferController _transferController;
        private List<SingleValue<string>> _categories = new List<SingleValue<string>>
        {
            new SingleValue<string>
            {
                Value = "Food"
            },
            new SingleValue<string>
            {
                Value = "Education"
            },
            new SingleValue<string>
            {
                Value = "Food"
            },
        };

        public TransfersTests()
        {
            var mediatorMock = new Mock<IMediator>();

            mediatorMock
                .Setup(m => m.Send(
                    It.IsAny<GetUserCategoriesQuery>(),
                    It.IsAny<CancellationToken>()))
                .ReturnsAsync(() => _categories);
        }

        [Fact]
        public async Task GetCategories()
        {
            var response = await _transferController.GetCategories();
            
            Assert.Equal(response, _categories);
        }
    }
}