document.getElementById('urlForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const urlInput = document.getElementById('urlInput').value;
    const errorMessage = document.getElementById('errorMessage');
    const downloadMessage = document.getElementById('message');
    
    
    // Check if URL is valid
    if (!isValidUrl(urlInput)) {
        errorMessage.textContent = "Invalid URL format.";
        errorMessage.classList.remove('hidden');
        return;
    }

    try {
        const response = await fetch('https://youtube-video-downloader-wab5.onrender.com/download_video', { // Update the URL if needed
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: urlInput }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        document.getElementById('iframe').src = ''; // Clear iframe as it's not used for displaying videos
        errorMessage.classList.add('hidden');
        const msg=result.download_path;
        //console.log(result.download_path);
        downloadMessage.innerHTML=`Video downloaded at location : ${msg}`;
        showToast()
        // alert(result.message); // Display download success message

    } catch (error) {
        errorMessage.textContent = "An error occurred: " + error.message;
        errorMessage.classList.remove('hidden');
    }
});

function showToast() {
    Toastify({
        text: "Download Succesfull.",
        duration: 3000, // Duration in milliseconds
        close: true, // Show a close button
        gravity: "top", // Position: "top" or "bottom"
        position: "right", // Position: "left", "center", or "right"
        backgroundColor: "#4CAF50", // Background color
        stopOnFocus: true, // Stop timeout on focus
    }).showToast();
}

function isValidUrl(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}
