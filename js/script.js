// Form Submission Script
document.getElementById('tour-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Map to Google Form entry IDs
    document.getElementById('entry-name').value = data.name;
    document.getElementById('entry-email').value = data.email;
    document.getElementById('entry-phone').value = data.phone;
    
    // Build client request summary combining tour-type, date, and message
    let request = '';
    if (data['tour-type']) {
        const tourLabels = {
            'in-person': 'In-Person Tour',
            'virtual': 'Virtual Tour (Video Call)',
            'open-house': 'Open House (Sun 12-2 PM)'
        };
        request += 'Tour Type: ' + (tourLabels[data['tour-type']] || data['tour-type']) + '\n';
    }
    if (data.date) {
        request += 'Preferred Date: ' + data.date + '\n';
    }
    if (data.message) {
        request += 'Message: ' + data.message;
    }
    document.getElementById('entry-request').value = request.trim();
    
    // Submit to Google Form
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    fetch('https://docs.google.com/forms/d/e/1FAIpQLSdFEUf4u5hOriK0ljlJ_fJumRKcN4rOwVQnqgVMH89n4d-_9A/formResponse', {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams({
            'entry.2005620554': data.name,
            'entry.1045781291': data.email,
            'entry.1166974658': data.phone,
            'entry.839337160': request.trim()
        })
    }).then(() => {
        alert('Thank you for your interest! We will contact you within 2 hours to schedule your tour.');
        this.reset();
    }).catch(() => {
        alert('Thank you for your interest! We will contact you within 2 hours to schedule your tour.');
        this.reset();
    }).finally(() => {
        submitBtn.textContent = 'Request Tour';
        submitBtn.disabled = false;
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Track page views (add Google Analytics or similar)
// gtag('event', 'page_view', {
//     page_title: 'Pearland Lakefront Home',
//     page_location: window.location.href
// });
