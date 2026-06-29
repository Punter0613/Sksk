import sys
import requests

CLOUD_URL = https://zfqzw-34-10-44-160.run.pinggy-free.link

def get_cloud_response(prompt):
    try:
        response = requests.post(
            f"{CLOUD_URL}/api/generate",
            json={
                "model": "llama3.2",
                "prompt": prompt,
                "stream": False
            },
            timeout=60
        )
        if response.status_code == 200:
            return response.json().get("response", "No response text found.")
        else:
            return f"Server returned error code: {response.status_code}"
    except Exception as e:
        return f"Could not reach cloud service. Error: {e}"

if __name__ == "__main__":
    user_input = " ".join(sys.argv[1:])
    print(get_cloud_response(user_input))
