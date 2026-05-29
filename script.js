document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. VIDEO AUDIO CONTROL (MUTED/UNMUTED)
    // ==========================================
    var video = document.getElementById("bgVideo");
    var muteBtn = document.getElementById("muteBtn");

    if (muteBtn && video) {
        // User ആദ്യ തവണ പേജിൽ എവിടെയെങ്കിലും ക്ലിക്ക് ചെയ്താൽ ഓട്ടോമാറ്റിക്കായി അൺമ്യൂട്ട് ആവാൻ
        document.body.addEventListener('click', function() {
            if (video.muted) {
                video.muted = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }
        }, { once: true });

        // ബട്ടൺ വഴിയുള്ള മ്യൂട്ട്/അൺമ്യൂട്ട് കൺട്രോൾ
        muteBtn.addEventListener("click", function(e) {
            e.stopPropagation(); // ബോഡി ക്ലിക്ക് ഇവന്റ് തടയാൻ
            if (video.muted) {
                video.muted = false;
                muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                video.muted = true;
                muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    }

    // ==========================================
    // 2. SCROLL ANIMATIONS ENGINE (Intersection Observer)
    // ==========================================
    const animationElements = document.querySelectorAll('.scroll-animate');
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                // ഒരൊറ്റ തവണ ആനിമേഷൻ മതിയെങ്കിൽ താഴെയുള്ള ലൈൻ അൺകമന്റ് ചെയ്യാം
                // observer.unobserve(entry.target); 
            } else {
                // സ്ക്രോൾ ചെയ്ത് മുകളിലേക്ക് പോകുമ്പോൾ വീണ്ടും ആനിമേഷൻ വേണമെങ്കിൽ:
                entry.target.classList.remove('animated');
            }
        });
    }, {
        threshold: 0.15 // 15% എലമെന്റ് സ്ക്രീനിൽ കാണുമ്പോൾ ആനിമേഷൻ തുടങ്ങും
    });

    animationElements.forEach(el => animationObserver.observe(el));

    // ==========================================
    // 3. STATS COUNTER ANIMATION
    // ==========================================
    const counters = document.querySelectorAll('.counter-item h3');
    
    const runCounters = (counterElement) => {
        const target = parseInt(counterElement.innerText.replace(/[^0-9]/g, ''));
        const suffix = counterElement.innerText.includes('+') ? '+' : '';
        let count = 0;
        const speed = target / 40; 

        const updateCount = () => {
            if (count < target) {
                count += Math.ceil(speed);
                if (count > target) count = target;
                counterElement.innerText = count.toLocaleString() + suffix;
                setTimeout(updateCount, 35);
            } else {
                counterElement.innerText = target.toLocaleString() + suffix;
            }
        };
        updateCount();
    };

    // കൗണ്ടർ സെക്ഷൻ സ്ക്രീനിൽ വരുമ്പോൾ മാത്രം പ്രവർത്തിക്കാൻ
    const counterSection = document.querySelector('.counter-section');
    let counted = false;

    if (counterSection) {
        const counterObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !counted) {
                counters.forEach(counter => runCounters(counter));
                counted = true;
            }
        }, { threshold: 0.3 });
        
        counterObserver.observe(counterSection);
    }

    // ==========================================
    // 4. TESTIMONIAL SLIDER
    // ==========================================
    let currentSlideIndex = 0;
    const slides = document.querySelectorAll('.testimonial-slider .slide');
    const dots = document.querySelectorAll('.slider-dots .dot');

    window.currentSlide = function(index) {
        if (slides.length === 0) return;
        
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentSlideIndex = index;
        if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
        if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;

        slides[currentSlideIndex].classList.add('active');
        dots[currentSlideIndex].classList.add('active');
    };

    // Auto Slide (Every 5 seconds)
    if (slides.length > 0) {
        setInterval(() => {
            currentSlideIndex++;
            currentSlide(currentSlideIndex);
        }, 5000);
    }
});
window.addEventListener('load', function() {
    var video = document.getElementById("bgVideo");
    if (video) {
        video.play().catch(function(error) {
            console.log("Autoplay തടസ്സപ്പെട്ടു, യൂസർ ക്ലിക്ക് ചെയ്യുമ്പോൾ പ്ലേ ആകും:", error);
        });
    }
});
