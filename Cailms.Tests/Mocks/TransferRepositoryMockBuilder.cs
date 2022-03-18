using System;
using System.Collections.Generic;
using Cailms.Domain.Models.Transfers;
using Cailms.Domain.Repositories;
using Moq;

namespace Cailms.Tests.Mocks
{
    public static class TransferRepositoryMockBuilder
    {
        public static Mock<TransferRepository> GetRepository()
        {
            var transfers = new List<Transfer>
            {
                new Transfer
                {
                    Id = new Guid("516ea4ac-aa71-4872-86e2-0e562d9a0fb1"),
                    Date = DateTime.Now,
                    Name = "Transfer",
                    Description = "Description",
                    Category = "Food"
                }
            };

            var transferRepositoryMock = new Mock<TransferRepository>();

            transferRepositoryMock.Setup(r => r.AddTransferAsync(It.IsAny<AddTransferDomainModel>()))
                .ReturnsAsync((AddTransferDomainModel model) =>
                {
                    var id = new Guid();
                    
                    transfers.Add(new Transfer
                    {
                        Id = id,
                        Date = new DateTime(model.Year, model.Month, model.Day),
                        Name = model.Name,
                        Description = model.Description,
                        Category = model.Category,
                        Tags = model.Tags,
                        Type = model.Type,
                        Value = model.Value
                    });
                    
                    return id;
                });
            
            
            return transferRepositoryMock;
        }
    }
}