const Discord = require('discord.js')
const bot = new Discord.Client()
const ms = require('ms');
const PREFIX = '!';
const token = 'NjIxMDI5Njk4NDQ4OTE2NDgy.XaD8Kw.tz2UzWTV-PXRWZjKP5mhLexjNQE';
const HowToUse = 'you can type !help to see all commands and how to use them';
var version = '1.1.0';
var servers = {};
bot.on('ready', () => {
    console.log('this bot is here');
    bot.user.setActivity('youtube', { type: 'WATCHING'}).catch(console.error);
})



bot.on('guildMemberAdd', member => {
    const channel = member.guild.channels.find(channel => channel.name === "general");
    if(!channel) return;

    channel.send(`Welcome to the server ${member} read the rules in the rules channel!`)
    var role = member.guild.roles.find('name', 'member');
    member.addRole(role)
});




bot.on('message', message=>{
    let args = message.content.substring(PREFIX.length).split(" ");
    

//the minecraft role is member id is 613848083092078612

    switch(args[0]){
        case 'help':
            message.channel.send('some commands i have are \nPublic commands:\n!help\n!ping\nadmin/mod commands:\n!kick (user you want to kick)\n!ban (user you want to ban)\n!mute (user you want to mute) (time)\n!clear (number)\nMusic:\n coming soon!\n new commands will be added soon\n easier to read help box coming soon')
            break;
        case 'ping':
            message.reply('pong');
            break;
        case 'changelog':
            message.channel.send('There is now a !mute command for moderators/admins and a music feature' + HowToUse);
            break;
        case 'version':
            message.channel.send('bot version ' + version)    
        break;
        case 'warn':
                if (!message.member.roles.find(r => r.id === "631254552653594651")) return message.channel.send('You do not have permissions to run this command')
                var user = message.mentions.users.first();
                if (user) {
                    var member = message.guild.member(user);
    
                    if (member) {
                        message.member.send('you have been warned').then(() => {
                            message.reply(`Warned ${user.tag} \"This command is NOT finished yet and you can\'t provide a reason for warning yet\"`);
                        }).catch(err => {
                            message.reply('i was unable to warn the user');
                            console.log(err);
                        });
                    } else {
                        message.reply("That user isn\'t in this server")
                    }
                } else {
                    message.reply('you need to specify a person!');
                }
        break;
        
        
        case 'pizza':
            message.react('🍕')
            break;
            case 'kick':
                if (!message.member.roles.find(r => r.id === "613847890531450995")) return message.channel.send('You do not have permissions to run this command')
                var user = message.mentions.users.first();
                if (user) {
                    var member = message.guild.member(user);
    
                    if (member) {
                        member.kick('you were kicked!').then(() => {
                            message.reply(`Sucessfully kicked ${user.tag}`);
                        }).catch(err => {
                            message.reply('I was unable to kick the member');
                            console.log(err);
                        });
                    } else {
                        message.reply("That user isn\'t in this server")
                    }
                } else {
                    message.reply('you need to specify a person!');
                }
                    break;
                    case 'mute':
            if (!message.member.roles.find(r => r.id === "631254552653594651")) return message.channel.send('You do not have permissions to run this command')
            let person = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]))
            if(!person) return message.reply("I Could not find that user");

            let mainrole = message.guild.roles.find(role => role.name === "member");

            let muterole = message.guild.roles.find(role => role.name === "muted");


            if(!muterole) return message.reply("could not find a mute role");

            let time = args[2];

            if(!time){
                return message.reply("you did not specify a time");
            }


            person.removeRole(mainrole.id);
            person.addRole(muterole.id);


            message.channel.send(`@${person.user.tag} has now been muted for ${ms(ms(time))}`);

            setTimeout(function() {
                person.addRole(mainrole.id);
                person.removeRole(muterole.id);

                message.channel.send(`@${person.user.tag} has been unmuted!`)
            }, ms(time));
        
        
        break;
            


                    case 'ban':
                        if (!message.member.roles.find(r => r.id === "613847890531450995")) return message.channel.send('You do not have permissions to run this command')
                        var user = message.mentions.users.first();
                        if (user) {
                            var member = message.guild.member(user);
            
                            if (member) {
                               member.ban({ression: 'You were banned!'}).then(() => {
                                   message.reply(`Succesfully banned ${user.tag}`)
                               })
                            } else {
                                message.reply("That user isn\'t in this server")
                            }
                        } else {
                            message.reply('you need to specify a person!');
                        }
                    break;
        case 'clear':
                if (!message.member.roles.find(r => r.id === "613847890531450995")) return message.channel.send('You do not have permissions to run this command')
            if(!args[1]) return message.reply('Please define second arg')
            message.channel.bulkDelete(args[1]);
            break;
        

    

            

        
        

        
    }
    
});

bot.login(token);
