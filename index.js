const Discord = require('discord.js')
const bot = new Discord.Client()
const PREFIX = '!';
var version = '1.0.0';
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
            message.channel.send('some commands i have are \nPublic commands:\n!help\n!ping\nMod commands:\n!kick (user you want to kick)\n!ban (user you want to ban)\n!clear (number)\nMusic:\n coming soon!\n new commands will be added soon\n easier to read help box coming soon')
            break;
        case 'ping':
            message.reply('pong');
            break;
        case 'changelog':
            message.channel.send(':x: Error :x:')
            break;
            const PIZZA = new Attachment('https://thestudentchannel.files.wordpress.com/2011/10/pizza_slice-60140003.jpg');
        case 'pizza':
            message.react('🍕')
            message.channel.send(PIZZA)
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

bot.login(process.env.BOT_TOKEN);
