import pytest
from httpx import AsyncClient
from app import app

@pytest.mark.asyncio
async def test_alerts_sse():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        resp = await ac.get("/api/alerts/sse")
        assert resp.status_code == 200
