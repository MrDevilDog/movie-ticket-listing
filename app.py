from flask import Flask, request, jsonify

app = Flask(__name__)

# In-memory movie ticket data
movies = [
    {
        "id": 1,
        "movie": "Avengers",
        "theatre": "PVR",
        "show_time": "7:30 PM",
        "price": 250
    },
    {
        "id": 2,
        "movie": "Interstellar",
        "theatre": "INOX",
        "show_time": "8:00 PM",
        "price": 300
    }
]


# GET /items
# Returns all movie ticket listings
@app.route("/items", methods=["GET"])
def get_items():
    return jsonify(movies)


# POST /items
# Adds a new movie ticket listing
@app.route("/items", methods=["POST"])
def add_item():
    data = request.get_json()

    item = {
        "id": len(movies) + 1,
        "movie": data["movie"],
        "theatre": data["theatre"],
        "show_time": data["show_time"],
        "price": data["price"]
    }

    movies.append(item)

    return jsonify(item), 201


# GET /health
# Checks whether the application is running
@app.route("/health", methods=["GET"])
def health():
    return "OK"


if __name__ == "__main__":
    app.run(debug=True)