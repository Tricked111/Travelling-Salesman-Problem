# tests/test_solver.py
import pytest
from app.tsp_solver import generate_mock_distance_matrix, tsp_greedy

def test_generate_mock_matrix():
    locations = ["A", "B", "C"]
    matrix = generate_mock_distance_matrix(locations)

    assert len(matrix) == len(locations)
    for row in matrix:
        assert len(row) == len(locations)
        assert all(isinstance(x, int) for x in row)

def test_tsp_greedy_returns_valid_result():
    locations = ["Start", "A", "B", "C"]
    matrix = generate_mock_distance_matrix(locations)
    result = tsp_greedy(locations, matrix)

    assert isinstance(result, dict)
    assert "route" in result
    assert "distances" in result
    assert "total_distance" in result

    route = result["route"]
    distances = result["distances"]
    total_distance = result["total_distance"]

    assert isinstance(route, list)
    assert isinstance(distances, list)
    assert isinstance(total_distance, int)

    assert len(route) == len(locations)
    assert len(distances) == len(locations) - 1
    assert set(route) == set(locations)
    assert sum(distances) == total_distance
