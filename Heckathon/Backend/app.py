from flask import Flask, jsonify, request
from flask_cors import CORS
import ee
import datetime
import os
import json
import tempfile

app = Flask(__name__)
CORS(app)  # Enable CORS

# Initialize Earth Engine using service account JSON from environment variable
SERVICE_ACCOUNT = "my-service@ee-baraiyavishalbhai32.iam.gserviceaccount.com"
key_json = os.environ.get("EE_SERVICE_ACCOUNT_JSON")  # Your JSON stored as env variable

if not key_json:
    raise Exception("EE_SERVICE_ACCOUNT_JSON environment variable not set!")

# Write JSON to temporary file
with tempfile.NamedTemporaryFile(mode="w+", delete=False, suffix=".json") as f:
    f.write(key_json)
    key_file = f.name

credentials = ee.ServiceAccountCredentials(SERVICE_ACCOUNT, key_file)
ee.Initialize(credentials)


@app.route("/get_ndvi_evi", methods=["POST"])
def get_ndvi_evi():
    try:
        req_data = request.get_json()

        min_lon = req_data.get("min_lon")
        max_lon = req_data.get("max_lon")
        min_lat = req_data.get("min_lat")
        max_lat = req_data.get("max_lat")
        start_date = req_data.get("start_date")
        end_date = req_data.get("end_date")
        dataset = "MODIS/006/MOD13Q1"

        # Validate inputs
        if None in [min_lon, max_lon, min_lat, max_lat, start_date, end_date]:
            return jsonify({"error": "min_lon, max_lon, min_lat, max_lat, start_date, end_date are required"}), 400

        # Polygon region
        region = ee.Geometry.Polygon([[
            [min_lon, min_lat],
            [min_lon, max_lat],
            [max_lon, max_lat],
            [max_lon, min_lat],
            [min_lon, min_lat]
        ]])

        # Load MODIS NDVI/EVI
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
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
