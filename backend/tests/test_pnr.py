import pytest
from httpx import AsyncClient
from app import app

@pytest.mark.asyncio
async def test_pnr_not_found():
    async with AsyncClient(app=app, base_url="http://test") as ac:
        resp = await ac.get("/api/pnr/9999999999")
        assert resp.status_code == 404
