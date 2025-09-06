import pytest
from services.ml_service import predict_delay

@pytest.mark.asyncio
async def test_predict_delay_missing_train():
    delay = await predict_delay("FAKE_ID")
    assert delay is None
