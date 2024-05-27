using ContactManagement.Controllers;
using ContactManagement.Interface;
using ContactsTest.MockData;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace ContactsTest.Controller;
//Example test cases
public class TestContactController
{
    [Fact]
    public async Task GetContactList_200Status()
    {
        //Arrange
        var contactService = new Mock<IContact>();//Creating mock service
        contactService.Setup(c => c.GetContactsList()).ReturnsAsync(ContactsMockData.GetContactList());//using dummy data

        //Act
        var sut = new ContactsController(contactService.Object);
        var result = await sut.GetContacts();

        //Assert
        result.GetType().Should().Be(typeof(OkObjectResult));
        ((OkObjectResult)result).StatusCode.Should().Be(200);
    }


    [Fact]
    public async Task GetContactList_204Status()
    {
        //Arrange
        var contactService = new Mock<IContact>();
        contactService.Setup(c => c.GetContactsList()).ReturnsAsync(ContactsMockData.GetEmptyContactList());

        //Act
        var sut = new ContactsController(contactService.Object);
        var result = await sut.GetContacts();

        //Assert
        result.GetType().Should().Be(typeof(NoContentResult));
        ((NoContentResult)result).StatusCode.Should().Be(204);
    }
}
