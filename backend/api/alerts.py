from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from fastapi.responses import StreamingResponse
from services.alerts_service import alert_manager

router = APIRouter()

# WebSocket endpoint for real-time alerts
@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await alert_manager.connect(websocket)
    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        alert_manager.disconnect(websocket)

# SSE (Server-Sent Events) endpoint
@router.get("/sse")
async def sse_alerts():
    async def event_stream():
        while True:
            message = await alert_manager.next_message()
            yield f"data: {message}\n\n"
    return StreamingResponse(event_stream(), media_type="text/event-stream")
