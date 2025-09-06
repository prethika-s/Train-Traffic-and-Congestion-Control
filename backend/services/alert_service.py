import asyncio

class AlertManager:
    def __init__(self):
        self.active_connections = []
        self.queue = asyncio.Queue()

    async def connect(self, websocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket):
        self.active_connections.remove(websocket)

    async def send_message(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)
        await self.queue.put(message)

    async def next_message(self):
        return await self.queue.get()

alert_manager = AlertManager()
