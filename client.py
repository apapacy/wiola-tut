import asyncio
from autobahn.asyncio.wamp import ApplicationSession, ApplicationRunner
from autobahn.wamp import RegisterOptions


class Component(ApplicationSession):
    async def onJoin(self, details):
        print("Join:", details)

        self.register(self.ping, "com.myapp.ping", options=RegisterOptions(details_arg="details"))

        counter = 0
        while True:
            print("publish: com.myapp.hello", counter)
            self.publish("com.myapp.hello", counter)
            counter += 1
            await asyncio.sleep(1)

    def ping(self, details=None):
        print("ping called. details=", details)


if __name__ == "__main__":
    url = "ws://127.0.0.1:8080/ws"
    realm = "realm1"
    runner = ApplicationRunner(url, realm)
    runner.run(Component)
