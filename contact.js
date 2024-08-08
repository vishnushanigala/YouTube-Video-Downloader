document.addEventListener('DOMContentLoaded', function() {
    emailjs.init("shanigalavishnupatel@gmail.com"); // Replace with your EmailJS user ID

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault();
        
        const formData = new FormData(this);
        const data = {
            from_name: formData.get('name'),
            from_email: formData.get('email'),
            message: formData.get('message'),
        };

        emailjs.send("your_emailjs_service_id", "your_emailjs_template_id", data) // Replace with your EmailJS service and template IDs
            .then(function(response) {
                console.log('Success:', response); // Log success response
                document.getElementById('responseMessage').textContent = "Your message has been sent successfully!";
                document.getElementById('responseMessage').classList.remove('hidden');
                document.getElementById('contactForm').reset();
            }, function(error) {
                console.error('Error:', error); // Log error response
                document.getElementById('responseMessage').textContent = "Oops! Something went wrong.";
                document.getElementById('responseMessage').classList.remove('hidden');
            });
    });
});
