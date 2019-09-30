# Steps to run the project

1. Clone the project using command `git clone https://github.com/mrameezraja/InfoSalons.Contacts.Angular`
2. Make sure to run [InfoSalons.Contacts.WebApi](https://github.com/mrameezraja/InfoSalons.Contacts.WebApi) project first
3. Check if you have installed [angular cli](https://cli.angular.io/)
4. Open the `InfoSalons.Contacts.Angular` folder in terminal/command prompt (git bash is recommended).
5. Run the command `npm install`
6. If you face any issue due to node version, proceed according to your system. Try deleting `node_modules` folder and re-running `npm install`
7. [Optional] If you need to change the API url that can be done in `src/app/_shared/app-constants.ts`, update the value of `remoteServiceBaseUrl` variable.
8. Then run `ng serve --open`, (ignore the cli.misMatch warnings if you see one :) )
9. Application will start running in browser after successful build
10. I have also implemented paging. It will be displayed after 10 records.


# Screenshots

## Contacts List: 
![Contacts List](https://raw.githubusercontent.com/mrameezraja/InfoSalons.Contacts.Angular/master/screenshots/contacts-list.png "Contacts List")

## Add/Edit Contact: 
![Add/Edit Contact](https://raw.githubusercontent.com/mrameezraja/InfoSalons.Contacts.Angular/master/screenshots/create-contact.png "Add/Edit Contact")