import pytest
from httpx import AsyncClient
from app import app

@pytest.mark.asyncio
async def test_search_trains():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        resp = await ac.get("/api/trains/search?query=T001")
        assert resp.status_code == 200
