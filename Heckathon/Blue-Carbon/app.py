from flask import Flask, jsonify, request
from flask_cors import CORS
import ee
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS

# Initialize Earth Engine
try:
    ee.Authenticate()
    ee.Initialize()
    print("✅ Earth Engine initialized successfully")
except Exception as e:
    print(f"❌ Earth Engine initialization failed: {e}")
    print("💡 Run 'ee.Authenticate()' in a Python session first")

@app.route("/get_ndvi_evi", methods=["POST"])
def get_ndvi_evi():
    try:
        # Get request JSON from frontend
        req_data = request.get_json()
        print(f"📦 Received request: {req_data}")

        coords = req_data.get("coords")  # Expect polygon coordinates
        start_date = req_data.get("start_date")
        end_date = req_data.get("end_date")
        dataset = req_data.get("dataset", "MODIS/006/MOD13Q1")  # Default MODIS

        if not coords or not start_date or not end_date:
            return jsonify({"error": "coords, start_date, and end_date are required"}), 400

        print(f"🌍 Processing region: {coords}")
        print(f"📅 Date range: {start_date} to {end_date}")
        print(f"🛰️ Dataset: {dataset}")

        # Build region geometry
        region = ee.Geometry.Polygon(coords)

        # MODIS Dataset
        if dataset.startswith("MODIS"):
            print("🔍 Processing MODIS data...")
            collection = (ee.ImageCollection(dataset)
                          .filterDate(start_date, end_date)
                          .select(["NDVI", "EVI"])
                          .filterBounds(region))

            def get_mean(img):
                mean_dict = img.reduceRegion(ee.Reducer.mean(), region, 250)
                return img.set("meanNDVI", mean_dict.get("NDVI")) \
                          .set("meanEVI", mean_dict.get("EVI")) \
                          .set("system:time_start", img.get("system:time_start"))

            stats = collection.map(get_mean)

            ndvi_values = stats.aggregate_array("meanNDVI").getInfo()
            evi_values = stats.aggregate_array("meanEVI").getInfo()
            dates = [datetime.datetime.utcfromtimestamp(t / 1000).strftime("%Y-%m-%d")
                     for t in stats.aggregate_array("system:time_start").getInfo()]

            data = [
                {"date": d, "NDVI": (n * 0.0001 if n else None), "EVI": (e * 0.0001 if e else None)}
                for d, n, e in zip(dates, ndvi_values, evi_values)
            ]

        # Sentinel-2 Dataset
        elif dataset.startswith("COPERNICUS/S2"):
            print("🔍 Processing Sentinel-2 data...")
            collection = (ee.ImageCollection(dataset)
                          .filterDate(start_date, end_date)
                          .filterBounds(region)
                          .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20)))  # optional cloud filter

            def calc_indices(img):
                # NDVI = (NIR - RED)/(NIR + RED)
                ndvi = img.normalizedDifference(['B8', 'B4']).rename('NDVI')
                # EVI = 2.5 * (NIR - RED)/(NIR + 6*RED - 7.5*BLUE + 1)
                evi = img.expression(
                    '2.5 * ((NIR - RED) / (NIR + 6 * RED - 7.5 * BLUE + 1))',
                    {
                        'NIR': img.select('B8'),
                        'RED': img.select('B4'),
                        'BLUE': img.select('B2')
                    }
                ).rename('EVI')
                combined = img.addBands([ndvi, evi])
                mean_dict = combined.reduceRegion(ee.Reducer.mean(), region, 10)
                return img.set("meanNDVI", mean_dict.get("NDVI")) \
                          .set("meanEVI", mean_dict.get("EVI")) \
                          .set("system:time_start", img.get("system:time_start"))

            stats = collection.map(calc_indices)
            ndvi_values = stats.aggregate_array("meanNDVI").getInfo()
            evi_values = stats.aggregate_array("meanEVI").getInfo()
            dates = [datetime.datetime.utcfromtimestamp(t / 1000).strftime("%Y-%m-%d")
                     for t in stats.aggregate_array("system:time_start").getInfo()]

            data = [
                {"date": d, "NDVI": n, "EVI": e}
                for d, n, e in zip(dates, ndvi_values, evi_values)
            ]

        else:
            return jsonify({"error": f"Dataset '{dataset}' not supported"}), 400

        print(f"✅ Successfully processed {len(data)} data points")
        return jsonify(data)

    except Exception as e:
        print(f"❌ Error in get_ndvi_evi: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    try:
        # Test Earth Engine connection
        ee.Number(1).getInfo()
        return jsonify({"status": "healthy", "earth_engine": "connected"}), 200
    except Exception as e:
        return jsonify({"status": "unhealthy", "earth_engine": "disconnected", "error": str(e)}), 503

@app.route("/", methods=["GET"])
def home():
    """Root endpoint"""
    return jsonify({
        "message": "Blue Carbon NDVI/EVI API", 
        "endpoints": {
            "/get_ndvi_evi": "POST - Get NDVI/EVI time series data",
            "/health": "GET - Health check",
        },
        "supported_datasets": [
            "MODIS/006/MOD13Q1",
            "COPERNICUS/S2_SR_HARMONIZED"
        ]
    })

if __name__ == "__main__":
    print("🚀 Starting Blue Carbon NDVI/EVI API server...")
    print("📍 Server will run on http://localhost:5000")
    print("🌍 Make sure Earth Engine is authenticated!")
    app.run(port=5000, debug=True)
