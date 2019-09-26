## Classes

<dl>
<dt><a href="#Server">Server</a></dt>
<dd><p>TicTacToe Websocket server class</p>
</dd>
<dt><a href="#Session">Session</a></dt>
<dd><p>Server session class</p>
</dd>
<dt><a href="#Board">Board</a></dt>
<dd><p>TicTacToe Board class</p>
</dd>
</dl>

<a name="Server"></a>

## Server
TicTacToe Websocket server class

**Kind**: global class  

* [Server](#Server)
    * [new Server(address, port)](#new_Server_new)
    * [.sessionID()](#Server+sessionID) ⇒ <code>string</code>
    * [.dropSession(id)](#Server+dropSession)
    * [.addSession(socket)](#Server+addSession)
    * [.setDebugMode()](#Server+setDebugMode)

<a name="new_Server_new"></a>

### new Server(address, port)
Server class constructor

**Returns**: <code>Object</code> - server object and methods.  

| Param | Type | Description |
| --- | --- | --- |
| address | <code>string</code> | server ip or url, if null the default value is 127.0.0.1 |
| port | <code>string</code> | port number to server the connection. If null the default port is set to 1337.. |

**Example**  
```js
To run the server, install nodejs and run the following command
node server.js
Optionally, to run in debug mode use the following command:
node server.js -debug
To play the game using the browser run browser-client.html
```
<a name="Server+sessionID"></a>

### server.sessionID() ⇒ <code>string</code>
Generates a session id

**Kind**: instance method of [<code>Server</code>](#Server)  
**Returns**: <code>string</code> - A short session id  
<a name="Server+dropSession"></a>

### server.dropSession(id)
Drops/remove the session

**Kind**: instance method of [<code>Server</code>](#Server)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | the session id to remove |

<a name="Server+addSession"></a>

### server.addSession(socket)
add a new session

**Kind**: instance method of [<code>Server</code>](#Server)  

| Param | Type | Description |
| --- | --- | --- |
| socket | <code>class</code> | a referance to the websocket object |

<a name="Server+setDebugMode"></a>

### server.setDebugMode()
runs the server in debug mode

**Kind**: instance method of [<code>Server</code>](#Server)  
<a name="Session"></a>

## Session
Server session class

**Kind**: global class  

* [Session](#Session)
    * [new Session(id, server, socket)](#new_Session_new)
    * [.init()](#Session+init)
    * [.read(data)](#Session+read)
    * [.write(data)](#Session+write)
    * [.playEvent(ctx)](#Session+playEvent)
    * [.prompt(ctx)](#Session+prompt)
    * [.exit()](#Session+exit)
    * [.ping()](#Session+ping)
    * [.pong()](#Session+pong)

<a name="new_Session_new"></a>

### new Session(id, server, socket)
Session class constructor

**Returns**: <code>Object</code> - A client session.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | required session id generated by the server class. |
| server | <code>class</code> | required Server object. |
| socket | <code>class</code> | required Websocket object. |

<a name="Session+init"></a>

### session.init()
Initialises a new game and board

**Kind**: instance method of [<code>Session</code>](#Session)  
<a name="Session+read"></a>

### session.read(data)
Called whenever a new message is sent from the client

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | data in json format sent from the client |

<a name="Session+write"></a>

### session.write(data)
Encodes and emits data to the client

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | A valid object to stringify and emit to client |

<a name="Session+playEvent"></a>

### session.playEvent(ctx)
Called whenever a player makes a move
 evaluates the next move and respondes accordingly

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>Object</code> | A valid object sent from client |

<a name="Session+prompt"></a>

### session.prompt(ctx)
Called whenever a prompt response from the client is made.

**Kind**: instance method of [<code>Session</code>](#Session)  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>Object</code> | A valid prompt object from the client |

<a name="Session+exit"></a>

### session.exit()
Terminates the session, clears the interval on broken connections

**Kind**: instance method of [<code>Session</code>](#Session)  
<a name="Session+ping"></a>

### session.ping()
ping the client to check if its still available

**Kind**: instance method of [<code>Session</code>](#Session)  
<a name="Session+pong"></a>

### session.pong()
called whenever a new pong is received from the client

**Kind**: instance method of [<code>Session</code>](#Session)  
<a name="Board"></a>

## Board
TicTacToe Board class

**Kind**: global class  

* [Board](#Board)
    * [new Board(player, opponent)](#new_Board_new)
    * [.getMove(state, player)](#Board+getMove)
    * [.getSlots(State)](#Board+getSlots)
    * [.checkWinner(State, player)](#Board+checkWinner)
    * [.setPlayer(name)](#Board+setPlayer)
    * [.getPlayer()](#Board+getPlayer)
    * [.setWinner(player)](#Board+setWinner)
    * [.setState(key, player)](#Board+setState)
    * [.validMove(key)](#Board+validMove)
    * [.tie()](#Board+tie)
    * [.reset()](#Board+reset)
    * [.emptyState()](#Board+emptyState)

<a name="new_Board_new"></a>

### new Board(player, opponent)
Board class attached to each game session

**Returns**: <code>Object</code> - A new game/board used with the Session Class.  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>string</code> | player symbol the defualt is "X". |
| opponent | <code>Class</code> | opponent symbol the default is "O" |

<a name="Board+getMove"></a>

### board.getMove(state, player)
Evaluates the next move based on the minimax algorithm

**Kind**: instance method of [<code>Board</code>](#Board)  

| Param | Type | Description |
| --- | --- | --- |
| state | <code>Array</code> | The current game state |
| player | <code>string</code> | the players symbol "X" or "O" |

<a name="Board+getSlots"></a>

### board.getSlots(State)
Return available/left slot to play

**Kind**: instance method of [<code>Board</code>](#Board)  

| Param | Type | Description |
| --- | --- | --- |
| State | <code>Array</code> | The current game state |

<a name="Board+checkWinner"></a>

### board.checkWinner(State, player)
Check the winner and return the results

**Kind**: instance method of [<code>Board</code>](#Board)  

| Param | Type | Description |
| --- | --- | --- |
| State | <code>Array</code> | The current game state |
| player | <code>string</code> | the players symbol "X" or "O" |

<a name="Board+setPlayer"></a>

### board.setPlayer(name)
Register and Set the players name

**Kind**: instance method of [<code>Board</code>](#Board)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | The players name, if name is not set the default in anonymous. |

<a name="Board+getPlayer"></a>

### board.getPlayer()
Return the players abne

**Kind**: instance method of [<code>Board</code>](#Board)  
<a name="Board+setWinner"></a>

### board.setWinner(player)
Return a message to emit to client whenever there is winner

**Kind**: instance method of [<code>Board</code>](#Board)  

| Param | Type | Description |
| --- | --- | --- |
| player | <code>string</code> | The players symbol "X" or "O" |

<a name="Board+setState"></a>

### board.setState(key, player)
Updates and set the state in sync with the client

**Kind**: instance method of [<code>Board</code>](#Board)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>number</code> | A number from 1 - 9 |
| player | <code>string</code> | The players symbol "X" or "O" |

<a name="Board+validMove"></a>

### board.validMove(key)
Validates a move on the board
 Evaluates whenever a player make a move

**Kind**: instance method of [<code>Board</code>](#Board)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>number</code> | a number from 1 - 9 |

<a name="Board+tie"></a>

### board.tie()
Return the correct message to emit to client whenever there is a tie.

**Kind**: instance method of [<code>Board</code>](#Board)  
<a name="Board+reset"></a>

### board.reset()
Return an empty message to emit to client

**Kind**: instance method of [<code>Board</code>](#Board)  
<a name="Board+emptyState"></a>

### board.emptyState()
Sets an empty state and resets moves.

**Kind**: instance method of [<code>Board</code>](#Board)  


## Classes

<dl>
<dt><a href="#Client">Client</a></dt>
<dd><p>TicTacToe Client class</p>
</dd>
<dt><a href="#Player">Player</a></dt>
<dd><p>TicTacToe Player class</p>
</dd>
</dl>

<a name="Client"></a>

## Client
TicTacToe Client class

**Kind**: global class  

* [Client](#Client)
    * [new Client(string, string)](#new_Client_new)
    * [.init()](#Client+init)
    * [.clear()](#Client+clear)
    * [.write()](#Client+write)
    * [.prompt(ctx)](#Client+prompt)
    * [.read(data)](#Client+read)
    * [.start()](#Client+start)
    * [.keyEvent(str, key)](#Client+keyEvent)
    * [.emptyState()](#Client+emptyState)
    * [.println()](#Client+println)
    * [.print(help)](#Client+print)
    * [.help(name)](#Client+help)
    * [.getKey(index, help)](#Client+getKey)
    * [.error(err)](#Client+error)
    * [.heartBeat()](#Client+heartBeat)
    * [.close()](#Client+close)
    * [.setDebugMode()](#Client+setDebugMode)

<a name="new_Client_new"></a>

### new Client(string, string)
A Client class that establishes a websocket connection to server when initialised.

**Returns**: <code>Object</code> - client object and methods.  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>address</code> | server ip or url, if null the default value is 127.0.0.1 |
| string | <code>port</code> | port number to establish the connection. If null the default port is set to 1337. |

**Example**  
```js
To play the game from the console, install nodejs and run the following command:
node client.js
Optionally, to run in debug mode use the following command:
node client.js -debug
To play the game using the browser run browser-client.html
```
<a name="Client+init"></a>

### client.init()
Initialises cli after a successfull server connection

**Kind**: instance method of [<code>Client</code>](#Client)  
<a name="Client+clear"></a>

### client.clear()
clears the console

**Kind**: instance method of [<code>Client</code>](#Client)  
<a name="Client+write"></a>

### client.write()
Stringify messages and emit them to server

**Kind**: instance method of [<code>Client</code>](#Client)  
<a name="Client+prompt"></a>

### client.prompt(ctx)
Called whenever a prompt request from the server is made.

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| ctx | <code>Object</code> | A valid prompt object from the server |

<a name="Client+read"></a>

### client.read(data)
Called whenever a new message is sent from the server

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>string</code> | data in json format sent from the server |

<a name="Client+start"></a>

### client.start()
Clears the screen, sets an empty state and starts a new game

**Kind**: instance method of [<code>Client</code>](#Client)  
<a name="Client+keyEvent"></a>

### client.keyEvent(str, key)
Key board input event handler thats acts as a game console to emit inputs to the server

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | input value |
| key | <code>Object</code> | key details |

<a name="Client+emptyState"></a>

### client.emptyState()
Reset the state and moves of the game

**Kind**: instance method of [<code>Client</code>](#Client)  
<a name="Client+println"></a>

### client.println()
Consolidated log handler for common massages

**Kind**: instance method of [<code>Client</code>](#Client)  
<a name="Client+print"></a>

### client.print(help)
Draws Tic Tac Toe on the console and prints out instructions if help is true

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| help | <code>bool</code> | prints help keys |

<a name="Client+help"></a>

### client.help(name)
prints playing instruction

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | the name of the player |

<a name="Client+getKey"></a>

### client.getKey(index, help)
returns the correct keys to be displayed on the console

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| index | <code>number</code> | index from 0 to 8 |
| help | <code>bool</code> | prints out intructions |

<a name="Client+error"></a>

### client.error(err)
Websocket client error handler, exits upon error

**Kind**: instance method of [<code>Client</code>](#Client)  

| Param | Type | Description |
| --- | --- | --- |
| err | <code>Object</code> | connecion error |

<a name="Client+heartBeat"></a>

### client.heartBeat()
Monitors connection to the remote server and terminates connections if broken

**Kind**: instance method of [<code>Client</code>](#Client)  
<a name="Client+close"></a>

### client.close()
Clears the interval and exists the game

**Kind**: instance method of [<code>Client</code>](#Client)  
<a name="Client+setDebugMode"></a>

### client.setDebugMode()
runs the client in debug mode

**Kind**: instance method of [<code>Client</code>](#Client)  
<a name="Player"></a>

## Player
TicTacToe Player class

**Kind**: global class  

* [Player](#Player)
    * [new Player(string)](#new_Player_new)
    * [.getSymbol()](#Player+getSymbol) ⇒ <code>string</code>
    * [.incScore()](#Player+incScore)
    * [.getScore()](#Player+getScore) ⇒ <code>number</code>
    * [.meta()](#Player+meta) ⇒ <code>string</code>

<a name="new_Player_new"></a>

### new Player(string)
Player class to handle different players

**Returns**: <code>Object</code> - A player object to be used with the Client class  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>player</code> | a symbol to used for the play, the default is "X". |

<a name="Player+getSymbol"></a>

### player.getSymbol() ⇒ <code>string</code>
Gets the players symbol

**Kind**: instance method of [<code>Player</code>](#Player)  
**Returns**: <code>string</code> - "X" or "O"  
<a name="Player+incScore"></a>

### player.incScore()
Increments the players score

**Kind**: instance method of [<code>Player</code>](#Player)  
<a name="Player+getScore"></a>

### player.getScore() ⇒ <code>number</code>
Return the players score

**Kind**: instance method of [<code>Player</code>](#Player)  
**Returns**: <code>number</code> - current score  
<a name="Player+meta"></a>

### player.meta() ⇒ <code>string</code>
Return the players formated score and symbol

**Kind**: instance method of [<code>Player</code>](#Player)  
**Returns**: <code>string</code> - current score  