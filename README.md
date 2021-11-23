<div align="center">
  
# Ticket System

Discord.js Ticket System
  
![Discord](https://img.shields.io/static/v1?label=Discord.JS&message=V13&color=red)
![NodeJS](https://img.shields.io/static/v1?label=Node.JS&message=V16.10.0&color=green)
![Javascript](https://img.shields.io/static/v1?label=Code%20Language&message=Javascript&color=yellow)

</div>

### About
* This is an open source Ticket system Bot for Discord.js v13.
* No need of any Database.
* Bot will log every ticket with transcript.

### Setup the bot

#### Discord Developer Portal
1. First create a application on the [Developer Portal](https://discord.com/developers/applications)

#### Adding your details!
1. Edit details in config.js [here](https://github.com/hav0ky/Ticket-System-Discord.js/blob/master/config/config.json)
2. Add your bot token
3. Add Parent Category ID | This is the Category where all your tickets will be created [parentCategory](https://github.com/hav0ky/Ticket-System-Discord.js/blob/master/data/categoryID.PNG?raw=true)
4. Add Author ID | Author will have access to the ticket panel [authorID](https://github.com/hav0ky/Ticket-System-Discord.js/blob/master/data/authorID.PNG?raw=true)
5. Add Role Name | Person whoever has this role will have access to commands [roleName](https://github.com/hav0ky/Ticket-System-Discord.js/blob/master/data/roleName.PNG?raw=true)
6. Add Channel ID | Bot will send logs of ticket in this channel [channelID](https://github.com/hav0ky/Ticket-System-Discord.js/blob/master/data/channelD.PNG?raw=true)
4. When you changed the token, you can simply start up the bot using: `node index.js` in your terminal.

### Features
* Ticket System (Ticketpanel, Remove, Add)
* Transcript System [Example](https://github.com/hav0ky/Ticket-System-Discord.js/blob/master/data/transcript.PNG?raw=true)
* Interaction (Select Menu, Buttons)
* Changeable (Messages and Config)

### Commands
* Ticketpanel | This creates a panel with a button! | [Example](https://github.com/hav0ky/Ticket-System-Discord.js/blob/master/data/ticketpanel.PNG?raw=true)
* Add | Add a mentioned user to the ticket | [Example](https://github.com/hav0ky/Ticket-System-Discord.js/blob/master/data/add.PNG?raw=true)
* Remove  Remove the mentioned user form the channel | [Example](https://github.com/hav0ky/Ticket-System-Discord.js/blob/master/data/remove.PNG?raw=true)

### Example config.json
```js
{
    "token": "BOT_Token",
    "prefix": "!",
    "parentCategory": "911857732078948443",
    "authorId": "717914067481788418",
    "roleName": "Moderators",
    "channelId" : "736693656244846626"
  }
```
