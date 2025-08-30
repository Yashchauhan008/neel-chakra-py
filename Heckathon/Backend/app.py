from flask import Flask, jsonify, request
from flask_cors import CORS
import ee
import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS

# Initialize Earth Engine
ee.Authenticate()
ee.Initialize()

@app.route("/get_ndvi_evi", methods=["POST"])
def get_ndvi_evi():
    try:
        # Get JSON data from frontend
        req_data = request.get_json()

        min_lon = req_data.get("min_lon")
        max_lon = req_data.get("max_lon")
        min_lat = req_data.get("min_lat")
        max_lat = req_data.get("max_lat")
        start_date = req_data.get("start_date")
        end_date = req_data.get("end_date")
        dataset = req_data.get("dataset", "MODIS/006/MOD13Q1")  # Only MODIS dataset supported

        # Validate dataset - only MODIS allowed
        if dataset != "MODIS/006/MOD13Q1":
            return jsonify({"error": "Only MODIS/006/MOD13Q1 dataset is supported"}), 400

        # Validate inputs
        if None in [min_lon, max_lon, min_lat, max_lat, start_date, end_date]:
            return jsonify({"error": "min_lon, max_lon, min_lat, max_lat, start_date, end_date are required"}), 400

        # Build polygon region
        region = ee.Geometry.Polygon([[
            [min_lon, min_lat],
            [min_lon, max_lat],
            [max_lon, max_lat],
            [max_lon, min_lat],
            [min_lon, min_lat]
        ]])

        # Load NDVI/EVI from selected dataset
        modis = (ee.ImageCollection(dataset)
                 .filterDate(start_date, end_date)
                 .select(["NDVI", "EVI"])
                 .filterBounds(region))

        # Compute mean NDVI/EVI
        def get_mean(img):
            mean_dict = img.reduceRegion(ee.Reducer.mean(), region, 250)
            return img.set("meanNDVI", mean_dict.get("NDVI")) \
                      .set("meanEVI", mean_dict.get("EVI")) \
                      .set("system:time_start", img.get("system:time_start"))

        stats = modis.map(get_mean)

        ndvi_values = stats.aggregate_array("meanNDVI").getInfo()
        evi_values = stats.aggregate_array("meanEVI").getInfo()
        dates = [datetime.datetime.utcfromtimestamp(t / 1000).strftime("%Y-%m-%d")
                 for t in stats.aggregate_array("system:time_start").getInfo()]

        data = [
            {"date": d, "NDVI": (n * 0.0001 if n else None), "EVI": (e * 0.0001 if e else None)}
            for d, n, e in zip(dates, ndvi_values, evi_values)
        ]

        return jsonify(data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
