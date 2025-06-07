import random

def generate_mock_distance_matrix(locations: list[str]) -> list[list[int]]:
    n = len(locations)
    matrix = [[0]*n for _ in range(n)]

    for i in range(n):
        for j in range(i+1, n):
            dist = random.randint(1000, 30000)
            matrix[i][j] = dist
            matrix[j][i] = dist

    return matrix


def tsp_greedy(locations: list[str], matrix: list[list[int]]) -> dict:
    n = len(locations)
    visited = [False] * n
    path = [0]
    visited[0] = True
    total_distance = 0
    distances = []

    for _ in range(n - 1):
        last = path[-1]
        next_city, dist = min(
            [(i, d) for i, d in enumerate(matrix[last]) if not visited[i]],
            key=lambda x: x[1]
        )
        path.append(next_city)
        visited[next_city] = True
        distances.append(dist)
        total_distance += dist

    route_names = [locations[i] for i in path]
    return {
        "route": route_names,
        "distances": distances,
        "total_distance": total_distance
    }

    