const w3cws = require('websocket').w3cwebsocket;
const Wampy = require('wampy').Wampy;
const {MsgpackSerializer} = require('wampy/dist/serializers/MsgpackSerializer');
const ws = new Wampy('ws://localhost:85/ws/',
  {
    realm: 'app',
    onError: function(...args) {
      console.log('on error', ...args);
    },
    ws: w3cws,
    serializer: new MsgpackSerializer(),
  }
);
console.log(ws)
// ws.subscribe('system.monitor.update', function (dataArr, dataObj) { console.log('Received system.monitor.update event!'); })



ws.subscribe('client.message', function (dataArr, dataObj) { console.log('Received client.message event!'); })

/*ws.call('get.server.time', null, {
    onSuccess: function (dataArr, dataObj) {
        console.log('RPC successfully called');
        console.log('Server time is ' + dataArr[0]);
    },
    onError: function (err, detailsObj) {
        console.log('RPC call failed with error ' + err);
    }
});*/

// Somewhere else for example
//ws.publish('system.monitor.update');

ws.publish('client.message', 'Hi guys!');


function add2(args) {
  console.log(2)
   return args[0] + args[1];
}
ws.register('com.myrealm.add2', add2);
function add3(args) {
console.log(3)
   return args[0] + args[1];
}
// session.register('com.myrealm.add2', add3);


// 4) call a remote procedure
ws.call('com.myrealm.add2', [2, 3],
   function (res) {
      console.log("Result:", res);
   }
);

ws.call('com.myrealm.add2', [2, 3],
   function (res) {
      console.log("Result:", res);
   }
);
