const WebSocket = require('ws');
const readline = require("readline");

/**
 * TicTacToe Client class
 * @example
 * To play the game from the console, install nodejs and run the following command:
 * node client.js
 * Optionally, to run in debug mode use the following command:
 * node client.js -debug
 * To play the game using the browser run browser-client.html
 */
class Client {
    /**
     *  A Client class that establishes a websocket connection to server when initialised.
     *  @constructor
     *  @param {address} string server ip or url, if null the default value is 127.0.0.1
     *  @param {port} string port number to establish the connection. If null the default port is set to 1337.
     *  @returns {Object} client object and methods.
     */
     constructor(address, port){
         this.setDebugMode()
         this.address = address || "127.0.0.1"
         this.port = port || 1337
         this.client = new WebSocket(`ws://${this.address}:${this.port}`);
         this.client.on("open", this.init.bind(this))
         this.client.on("message", this.read.bind(this))
         this.client.on("error", this.error.bind(this))
         this.client.on("close", this.close);
         // CONF
         this.player = new Player("X")
         this.opponent = new Player("O")
         this.moves = 0
         this.active = false
         this.pad = "    "
     }
     /**
      *  Initialises cli after a successfull server connection
      */
     init() {
         this.cli = readline.createInterface({
             input: process.stdin,
             output: process.stdout
         });
         this.cli.input.on('keypress', this.keyEvent.bind(this));
         this.cli.on("close", e => {
             console.log("Game over \n")
             process.exit(0);
         });
         this.emptyState()
     }
     /**
      *  clears the console
      */
     clear() {
         const blank = '\n'.repeat(process.stdout.rows)
         console.log(blank)
         readline.cursorTo(process.stdout, 0, 0)
         readline.clearScreenDown(process.stdout)
     }
     /**
      *  Stringify messages and emit them to server
      */
     write(ctx) {
         let data = JSON.stringify(ctx)
         if(this._debug) console.log(data)
         this.client.send(data)
     }
     /**
     *  Called whenever a prompt request from the server is made.
     *  @param {Object} ctx A valid prompt object from the server
      */
     prompt(ctx) {

         this.clear()
         if (ctx.key == "help") {
             this.help()
         } else if (ctx.key == "start") {
             return this.start()
         } else if (ctx.key == "win") {
             this.print()
             this.println(`${ctx.winner == "O"? "Your opponent won !!": "You win"}`)
             ctx.key = "start"
         } else if (ctx.key == "tie") {
             this.print()
             ctx.key = "start"
         }
         // questions
         readline.cursorTo(process.stdout, 5);
         readline.clearLine();
         this.cli.question("\n" + this.pad + ctx.question + "  ", resp => {
             this.write({
                 prompt: {
                     key: ctx.key,
                     response: resp || true,
                 }
             })
         })
     }
     /**
      *  Called whenever a new message is sent from the server
      *  @param {string} data data in json format sent from the server
      */
     read(data) {

         this.waiting = false
         let ctx = JSON.parse(data.toString())
         if (ctx.state) {
             this.state = ctx.state
         }
         if (ctx.exception) {
             return this.println(ctx.exception)
         } else if (ctx.prompt) {
             return this.prompt(ctx.prompt)
         } else {
             this.moves = ctx.moves || 0
             this.clear()
             this.print()
         }
     }
     /**
      *  Clears the screen, sets an empty state and starts a new game
      */
     start() {
         this.emptyState()
         this.print()
         this.active = true
     }
     /**
     *  Key board input event handler thats acts as a game console to emit inputs to the server
     *  @param {string} str input value
     *  @param {Object} key key details
      */
     keyEvent(str, key) {
         if (Number.isInteger(parseInt(str))) {
             if (this.waiting) return
             this.println("Awaiting response..", this.state)
             this.waiting = true
             this.write({
                 playEvent: {
                     key: parseInt(str) - 1,
                     symbol: this.player.getSymbol(),
                     opponent: this.opponent.getSymbol(),
                     state: this.state || this.emptyState(),
                     moves: this.moves,
                 }
             })
         }
     }
     /**
     * Reset the state and moves of the game
      */
     emptyState() {
         this.state = [0, 1, 2, 3, 4, 5, 6, 7, 8]
         this.moves = 0
     }
     /**
     * Consolidated log handler for common massages
      */
     println(i) {
         console.log(this.pad + i)
     }
     /**
     * Draws Tic Tac Toe on the console and prints out instructions if help is true
     *  @param {bool} help prints help keys
      */
     print(help) {
         console.log("\n")
         console.log(`
                     |         |
                 ${this.getKey(6,help)}   |    ${this.getKey(7,help)}    |    ${this.getKey(8,help)}
                     |         |
             —————————————————————————————
                     |         |
                 ${this.getKey(3,help)}   |    ${this.getKey(4,help)}    |    ${this.getKey(5,help)}
                     |         |
             —————————————————————————————
                     |         |
                 ${this.getKey(0,help)}   |    ${this.getKey(1,help)}    |    ${this.getKey(2,help)}
                     |         |
         `)
     }
     /**
     * prints playing instruction
     *  @param {string} name the name of the player
      */
     help(name) {
         console.log("")
         if (name) {
             this.println(`Hello ${name}!`)
             this.println("To play, use the following keys on your keyboard.")
         }
         this.print(true)
     }
     /**
     *  returns the correct keys to be displayed on the console
     *  @param {number} index index from 0 to 8
     *  @param {bool} help prints out intructions
      */
     getKey(index, help) {
         if (help) {
             return this.state[index] + 1
         }
         if (typeof this.state[index] === "number") {

             return "-"
         }
         return this.state[index]
     }
     /**
     * Websocket client error handler, exits upon error
     *  @param {Object} err connecion error
      */
     error(err) {
         if (this._debug) console.log(err)
         process.exit(0);
     }
     /**
     * Monitors connection to the remote server and terminates connections if broken
      */
     heartBeat() {
         clearTimeout(this.pingTimeout);
         this.pingTimeout = setTimeout(() => {
             this.terminate();
         }, 5000 + 1000);
     }
     /**
     * Clears the interval and exists the game
      */
     close() {
         clearInterval(this.pingTimeout);
         console.log("remote server disconnected")
         process.exit(0);
     }
     /**
     * runs the client in debug mode
      */
     setDebugMode(debug){
        process.argv.forEach((val, index, array) => {
          if(val == "-debug" || val == "-D"){
              this._debug = true
          }
        })
     }
}

/**
 * TicTacToe Player class
 */
class Player {
    /**
     *  Player class to handle different players
     *  @constructor
     *  @param {player} string a symbol to used for the play, the default is "X".
     *  @returns {Object} A player object to be used with the Client class
     */
     constructor(symbol){
         this.score = 0
         this.symbol = symbol
     }
     /**
      *  Gets the players symbol
      *  @returns {string} "X" or "O"
      */
     getSymbol() {
         return this.symbol
     }
     /**
      *  Increments the players score
      */
     incScore() {
         this.score+=1
     }
     /**
      *  Return the players score
      *  @returns {number} current score
      */
     getScore() {
         return this.score
     }
     /**
      *  Return the players formated score and symbol
      *  @returns {string} current score
      */
     meta() {
         return `${this.symbol} : ${this.score}`
     }
}


// RUN
var cons = new Client()
