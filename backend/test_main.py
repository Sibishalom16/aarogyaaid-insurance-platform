from main import app
from fastapi.testclient import TestClient

client = TestClient(app)

def test_recommend():
    response = client.post(
        "/recommend",
        json={
            "fullName": "Sibi",
            "age": "50",
            "lifestyle": "Active",
            "conditions": "diabetes",
            "income": "under 3L",
            "city": "Metro"
        }
    )

    assert response.status_code == 200
    assert "best_policy" in response.json()
    assert "comparison" in response.json()