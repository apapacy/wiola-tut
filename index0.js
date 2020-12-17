try {
   // for Node.js
   var autobahn = require('autobahn');
} catch (e) {
   // for browsers (where AutobahnJS is available globally)
}

var connection = new autobahn.Connection({url: 'ws://127.0.0.1:85/ws/', realm: 'app'});

connection.onopen = function (session) {

   // 1) subscribe to a topic
   function onevent(args) {
      console.log("Event:", args[0]);
   }
   session.subscribe('com.myrealm.hello', onevent);

   // 2) publish an event
   session.publish('com.myrealm.hello', ['Hello, world!']);

   // 3) register a procedure for remoting
   function add2(args) {
	   console.log(2)
      return args[0] + args[1];
   }
   session.register('com.myrealm.add2', add2);
 function add3(args) {
	 console.log(3)
      return args[0] + args[1];
   }
  // session.register('com.myrealm.add2', add3);


   // 4) call a remote procedure
   session.call('com.myrealm.add2', [2, 3]).then(
      function (res) {
         console.log("Result:", res);
      }
   );

 session.call('com.myrealm.add2', [2, 3]).then(
      function (res) {
         console.log("Result:", res);
      }
   );


};

connection.open();
