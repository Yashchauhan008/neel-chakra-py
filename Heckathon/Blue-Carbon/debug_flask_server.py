# Flask Server Diagnostic Script
# Save as check_flask_server.py and run to test your Flask API

import requests
import json

def test_flask_server():
    base_url = "http://localhost:5000"
    endpoint = "/get_ndvi_evi"
    
    # Test payload
    test_payload = {
        "coords": [[[88.7, 21.5], [89.0, 21.5], [89.0, 22.0], [88.7, 22.0], [88.7, 21.5]]],
        "start_date": "2023-01-01",
        "end_date": "2023-01-31"
    }
    
    print(f"🧪 Testing Flask server at {base_url}{endpoint}")
    print(f"📦 Payload: {json.dumps(test_payload, indent=2)}")
    print("-" * 50)
    
    try:
        response = requests.post(
            f"{base_url}{endpoint}",
            json=test_payload,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        print(f"✅ Status Code: {response.status_code}")
        print(f"📄 Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"🎉 Success! Received {len(data) if isinstance(data, list) else 1} data points")
            if isinstance(data, list) and len(data) > 0:
                print(f"📊 Sample data: {json.dumps(data[0], indent=2)}")
        else:
            print(f"❌ Error: {response.status_code}")
            try:
                error_data = response.json()
                print(f"🔍 Error details: {json.dumps(error_data, indent=2)}")
            except:
                print(f"🔍 Raw error: {response.text}")
                
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Flask server is not running or not accessible")
        print("💡 Make sure to run: python your_flask_app.py")
    except requests.exceptions.Timeout:
        print("⏰ Timeout Error: Request took too long (>30s)")
        print("💡 Earth Engine queries can be slow, try smaller date ranges")
    except Exception as e:
        print(f"❌ Unexpected Error: {str(e)}")

if __name__ == "__main__":
    test_flask_server()
