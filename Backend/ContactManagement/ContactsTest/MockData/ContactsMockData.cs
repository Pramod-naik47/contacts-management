using ContactManagement.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactsTest.MockData;

public static class ContactsMockData
{
    public static IEnumerable<ContactModel> GetContactList()
    {
        return new List<ContactModel>
        {
            new ContactModel
            {
                ContactId = "71415435-7126-4c6a-82ce-c8a22de0e3eb",
                Name = "Pramod Naik",
                Email = "pramod@gmail.com",
                PhoneNumber = "7896584568",
                Address = "Chilimbi"
            },
            new ContactModel
            {
                ContactId = "e041efe0-463d-452c-9c50-df92f97e648d",
                Name = "Erik",
                Email = "erk@gmail.com",
                PhoneNumber = "7896584789",
                Address = "Bangalore"
            }
        };
    }

    public static IEnumerable<ContactModel> GetEmptyContactList()
    {
        return Enumerable.Empty<ContactModel>();
    }
}
