from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable universal CORS across all origins, headers and methods
CORS(
    app,
    resources={r"/*": {"origins": "*"}},
    supports_credentials=False,
    allow_headers=["Content-Type", "Authorization", "X-Requested-With", "Accept"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

# In-memory movie ticket data with rich BookMyShow details
movies = [
    {
        "id": 1,
        "movie": "Avengers: Endgame",
        "theatre": "PVR ICON: Phoenix Palladium, Lower Parel",
        "show_time": "07:30 PM",
        "price": 320,
        "language": "English",
        "format": "IMAX 3D",
        "genre": "Action/Sci-Fi",
        "rating": 9.4,
        "votes": "410.2K",
        "city": "Mumbai",
        "badge": "Filling Fast"
    },
    {
        "id": 2,
        "movie": "Interstellar",
        "theatre": "INOX: Megaplex, Inorbit Mall, Malad",
        "show_time": "08:00 PM",
        "price": 350,
        "language": "English",
        "format": "IMAX 2D",
        "genre": "Sci-Fi/Adventure",
        "rating": 9.6,
        "votes": "320.5K",
        "city": "Mumbai",
        "badge": "Available"
    },
    {
        "id": 3,
        "movie": "Dune: Part Two",
        "theatre": "Cinepolis: Viviana Mall, Thane",
        "show_time": "06:15 PM",
        "price": 280,
        "language": "English",
        "format": "4DX 3D",
        "genre": "Sci-Fi/Action",
        "rating": 9.2,
        "votes": "189.4K",
        "city": "Mumbai",
        "badge": "Available"
    },
    {
        "id": 4,
        "movie": "Kalki 2898 AD",
        "theatre": "PVR: ECX, Chanakyapuri",
        "show_time": "09:00 PM",
        "price": 300,
        "language": "Hindi",
        "format": "3D",
        "genre": "Action/Mythology",
        "rating": 8.9,
        "votes": "512.1K",
        "city": "Delhi-NCR",
        "badge": "Filling Fast"
    },
    {
        "id": 5,
        "movie": "Stree 2: Sarkate Ka Aatank",
        "theatre": "Miraj Cinemas: Shalimar",
        "show_time": "04:45 PM",
        "price": 220,
        "language": "Hindi",
        "format": "2D",
        "genre": "Comedy/Horror",
        "rating": 8.8,
        "votes": "380.0K",
        "city": "Delhi-NCR",
        "badge": "Almost Full"
    },
    {
        "id": 6,
        "movie": "Spider-Man: Beyond the Spider-Verse",
        "theatre": "PVR: Forum Mall, Koramangala",
        "show_time": "07:15 PM",
        "price": 290,
        "language": "English",
        "format": "4DX",
        "genre": "Animation/Action",
        "rating": 9.5,
        "votes": "194.8K",
        "city": "Bengaluru",
        "badge": "Available"
    }
]


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization,X-Requested-With,Accept"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return response


# Preflight handler for any route
@app.route("/", defaults={"path": ""}, methods=["OPTIONS"])
@app.route("/<path:path>", methods=["OPTIONS"])
def handle_options_preflight(path=""):
    response = jsonify({"status": "ok"})
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization,X-Requested-With,Accept"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
    return response, 204


# GET /items
# Returns all movie ticket listings
@app.route("/items", methods=["GET"])
def get_items():
    return jsonify(movies)


# POST /items
# Adds a new movie ticket listing
@app.route("/items", methods=["POST"])
def add_item():
    data = request.get_json(silent=True) or {}

    item = {
        "id": len(movies) + 1,
        "movie": data.get("movie", "Untitled Movie"),
        "theatre": data.get("theatre", "PVR Cinemas"),
        "show_time": data.get("show_time", "07:00 PM"),
        "price": int(data.get("price", 250)),
        "language": data.get("language", "English"),
        "format": data.get("format", "2D"),
        "genre": data.get("genre", "Drama/Action"),
        "rating": float(data.get("rating", 8.8)),
        "votes": data.get("votes", "10.5K"),
        "city": data.get("city", "Mumbai"),
        "badge": data.get("badge", "Available")
    }

    movies.append(item)

    return jsonify(item), 201


# GET /health
# Checks whether the application is running
@app.route("/health", methods=["GET"])
def health():
    return "OK"


if __name__ == "__main__":
    app.run(debug=True, port=5000, host="0.0.0.0")
