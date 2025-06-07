# app/routes.py
from flask import Blueprint, request, jsonify
from .tsp_solver import generate_mock_distance_matrix, tsp_greedy

bp = Blueprint('api', __name__)

@bp.route('/api/solve', methods=['POST'])
def solve():
    data = request.get_json()
    start_location = data.get("start_location")
    cities = data.get("cities")

    if not start_location or not cities:
        return jsonify({"error": "Missing data"}), 400

    start_label = f"User Location ({start_location['lat']:.4f},{start_location['lng']:.4f})"
    all_locations = [start_label] + cities

    distance_matrix = generate_mock_distance_matrix(all_locations)
    print('\n')
    [print(i) for i in distance_matrix]

    result = tsp_greedy(all_locations, distance_matrix)

    return jsonify({
        "route": result["route"],
        "distances": result["distances"],
        "total_distance": result["total_distance"]
    })
