# tests/test_routes.py
import pytest
from app import create_app

@pytest.fixture
def client():
    app = create_app()
    app.config['TESTING'] = True
    return app.test_client()

def test_api_solve_valid_input_1(client):
    payload = {
        "start_location": { "lat": 49.1951, "lng": 16.6068 },
        "cities": ["Vienna", "Prague", "Berlin"]
    }

    response = client.post("/api/solve", json=payload)
    assert response.status_code == 200

    data = response.get_json()
    assert "route" in data
    assert "distances" in data
    assert "total_distance" in data

    assert isinstance(data["route"], list)
    assert isinstance(data["distances"], list)
    assert isinstance(data["total_distance"], int)

    assert len(data["route"]) == 4
    assert len(data["distances"]) == 3

def test_api_solve_valid_input_2(client):
    payload = {
        "start_location": { "lat": 49.1951, "lng": 16.6068 },
        "cities": ["Vienna", "Prague", "Berlin", "Paris", "Lisabon"]
    }

    response = client.post("/api/solve", json=payload)
    assert response.status_code == 200

    data = response.get_json()
    assert "route" in data
    assert "distances" in data
    assert "total_distance" in data

    assert isinstance(data["route"], list)
    assert isinstance(data["distances"], list)
    assert isinstance(data["total_distance"], int)

    assert len(data["route"]) == 6
    assert len(data["distances"]) == 5
