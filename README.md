# Turn-admin-client

Allows you to go into a the TURN server's administrative interface - TURN server can be found on [google-code](https://code.google.com/p/rfc5766-turn-server/)

![TravisCI Build Status](https://travis-ci.org/danjenkins/node-turn-admin-client.svg?branch=master "TravisCI Build Status")

## How to use

```js
	var TurnAdminClient = require('turn-admin-client');
	
	var client = new TurnAdminClient({
      port: 8124
    });

    client.init();
    
    //do something
    
    client.getActiveSessions(function(err, sessions){
    
    	//got an array of sessions
    	//each session is an object
    
    	client.disconnect();
    })
    
    
```