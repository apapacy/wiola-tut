try {
   // for Node.js
   var autobahn = require('autobahn');
} catch (e) {
   // for browsers (where AutobahnJS is available globally)
}

var connection = new autobahn.Connection({url: 'ws://127.0.0.1:87/ws', realm: 'com'});

var connection0 = new autobahn.Connection({url: 'ws://127.0.0.1:87/ws', realm: 'com'});

connection.onopen = function (session) {
  //session.subscribe('wamp', function(){console.log('*************************')});
  function onevent(args) {
     console.log("Event1:", args[0]);
  }

   setTimeout(() => session.publish('com.myapp.hello', ['Hello, world!']), 5000);
   session.subscribe('com.myapp.hello', onevent);

   // 3) register a procedure for remoting
   function add2(args) {
      return args[0] + args[1];
   }
   session.register('com.myapp.add2', add2);

};
connection.open();


connection0.onopen = function (session) {
   function onevent(args) {
      console.log("Event0:", args[0]);
   }
   setTimeout(() => session.subscribe('com.myapp.hello', onevent), 3000);
   setTimeout(() => session.subscribe('com.myapp.hello', onevent), 2000);

   setTimeout( () => session.call('com.myapp.add2', [2, 3]).then(
      function (res) {
         console.log("Result:", res);
      }
   ), 7000);
};

connection0.open();
