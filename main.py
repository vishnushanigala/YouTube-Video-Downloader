from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import yt_dlp
import os
import uvicorn

app = FastAPI()

# CORS middleware to allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL if not "*" (for production use)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the download path as a 'downloads' folder in the project directory

download_path = os.path.join(os.path.expanduser("~"), "Videos", "YouTube")
#print(f" hiii : {download_path}")
# Ensure the download directory exists
if not os.path.exists(download_path):
    os.makedirs(download_path)

@app.post("/download_video")
async def download_video(request: Request):
    try:
        data = await request.json()
        video_url = data.get("url")

        if not video_url:
            raise HTTPException(status_code=400, detail="URL is required")

        # Define options for yt-dlp
        ydl_opts = {
            'format': 'best',
            'outtmpl': os.path.join(download_path, '%(title)s.%(ext)s'),
        }

        # Download the video
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([video_url])
            

        # Response with a success message
        return JSONResponse(content={"message": f"Download started for video: {video_url}", "download_path": download_path})

    except Exception as e:
        # Return error response
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
