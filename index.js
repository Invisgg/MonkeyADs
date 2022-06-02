const mineflayer = require('mineflayer')
const prompt2 = require('prompt-sync')({ sigint: true})
const setTitle = require('node-bash-title');
const pathfinder = require('mineflayer-pathfinder').pathfinder
const Movements = require('mineflayer-pathfinder').Movements
const { GoalNear } = require('mineflayer-pathfinder').goals
var admin = false
var admessage = "/ad"
setTitle('MonkeyADS Laucher');
start()

//------------------------------------
// LAST UPDATE: 9/13/2021
//------------------------------------

async function start() {
    function getRandomInt(){
        return Math.floor(Math.random() * 20);
    }
    createBots()
    console.clear()
    var wait = false
    var addoge = false
    function createBots(){
        let bot = mineflayer.createBot({
            username: prompt2("What is your email: "),
            password: prompt2("What is your pasword: "),
            auth: 'microsoft',
            host: prompt2("Enter a server ip: "),
            version: '1.18.2',
            brand: prompt2("What client brand do you want: ")
        });
        bot.loadPlugin(pathfinder)

        const mcData = require('minecraft-data')(bot.version)
        const defaultMove = new Movements(bot, mcData)
        bot.once('spawn', () => {
            bot.pathfinder.setMovements(defaultMove)

            x = '14'
            y = '44'
            z = '112'

            p = Math.floor(Math.random() * 2);
            bot.pathfinder.setGoal(new GoalNear(p*x,y,p*z, 1))
            
            t = Math.floor(Math.random() * 5);
            setTimeout(function(){
                bot.pathfinder.stop()
            }, t*1000);
        })

        console.clear()
        let adignore = prompt2("What ad do you want to doge: ")
        admessage = prompt2("What is the ad message: ");
        const adcooldown = prompt2("What is your adcooldown: ");

        bot.on('message', (message) => {
            let msg = message.toString();
            if ((msg.includes('[AD]'))) {
                if (msg.includes(adignore)){
                    if (!(msg.includes(bot.username))){
                        addoge = true
                        console.log("---------------------------------")
                        console.log("       (MONKEYADS) ")
                        console.log(" ")
                        console.log("Avoided stacking an avertisement!")
                        console.log("---------------------------------")
                        setTimeout(function(){
                            addoge = false
                        }, 6*1000);
                    }
                }
            }
            console.log(message.toAnsi() + " ")
        })
        
        bot.on('login', (listener) => {
            setTitle(bot.username + "'s ADBot");
        })

        function commands(command) {
            if (command.includes('-stop')) {
                process.abort()
            } else if (command.includes('-respawn')) {
                bot.world.respawn;
            }
        }
            
        setInterval(function() {
            if (!(wait === true)){
                wait = true 
                setTimeout(function(){
                    if (!(addoge === true)){
                        bot.chat(admessage)
                        wait = false
                    } else {
                        //console.log("Failed doge ad function!")
                    }
                }, getRandomInt()*1000);
            }
        }, adcooldown*1000);


          const stdin = process.stdin;
          const stdout = process.stdout;
          const prompt = ">";
          let current = "";
          let done = false;
      
          stdin.setRawMode(true);
          stdin.setEncoding('utf8');
          stdout.write(prompt);
      
          stdin.on( 'data', function( key ){
      
              switch (key){
                  case '\u001B\u005B\u0041'://up
                  case '\u001B\u005B\u0043'://right
                  case '\u001B\u005B\u0042'://down
                  case '\u001B\u005B\u0044'://left
                      break;
                  case '\u0003':
                      process.exit();
                      break;
                  case '\u000d':
                      done = true;
                      if (current.includes('-')) {
                          print(current)
                          commands(current)
                      } else {
                          print(current)
                          bot.chat(current)
                      }
                      current = "";
                      break;
                  case '\u007f':
                      stdout.write("\r\x1b[K") ;
                      current = current.slice(0, -1);
                      stdout.write(prompt + current);
                      break;
                  default:
                      stdout.write(key);
                      current += key;
                      break;
              }
          });
          

          // Print function
          function print(str) {
      
              let totalCurrentLength = current.length + prompt.length;
              let lines = Math.ceil(totalCurrentLength / stdout.columns);
      
              for (i = 0; i < lines; i++) {
                  stdout.clearLine();
                  stdout.write('\u001B\u005B\u0041');
              }
      
              stdout.write('\u001B\u005B\u0042');
      
              stdout.cursorTo(0)
              console.log(str);
              if (done === false) {
                  stdout.write(prompt + current) // Not printing out the line of previous input if it was entered
              } else {
                  stdout.write(prompt)
                  done = false;
              }
          }
    }

    setInterval(function() {
        console.log("Ending client in 5 seconds")
        setTimeout(function(){
            process.abort()
        }, 5*1000);
    }, 60000*120); // x = 120 here
}