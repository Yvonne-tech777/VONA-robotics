document.addEventListener('DOMContentLoaded', function() {
    // Set the current year in the footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Mobile Menu Toggle Logic
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeBtn = document.querySelector('.close-menu-btn');
    const menuLinks = mobileMenu.querySelectorAll('a');

    // Function to set the menu state
    function setMenuState(isOpen) {
        if (isOpen) {
            mobileMenu.classList.add('is-open');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
        } else {
            mobileMenu.classList.remove('is-open');
            document.body.style.overflow = 'auto';
        }
    }

    // Open Menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            setMenuState(true);
        });
    }

    // Close Menu
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            setMenuState(false);
        });
    }

    // Close Menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => setMenuState(false), 200); 
        });
    });

    // VONA PERSPECTIVE IN-LINE CONTENT REVEAL LOGIC
    const perspectiveButtons = document.querySelectorAll('.perspective-strip .read-more-btn');

    perspectiveButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the link from trying to navigate anywhere

            const strip = this.closest('.feed-strip');
            const summaryTextElement = strip.querySelector('.summary-text');
            
            // Check if the strip is already expanded
            if (strip.classList.contains('expanded')) {
                // Collapse the strip
                strip.classList.remove('expanded');
                this.textContent = 'READ MORE'; // Change button text back
                
                // Remove the full content paragraph if it exists
                const fullContentElement = strip.querySelector('.full-content');
                if (fullContentElement) {
                    fullContentElement.remove();
                }

            } else {
                // Expand the strip
                const fullText = strip.getAttribute('data-full-content');
                
                // Create the full content element
                const fullContentElement = document.createElement('p');
                fullContentElement.classList.add('full-content');
                fullContentElement.textContent = fullText;
                
                // Insert the full text after the summary text element
                summaryTextElement.after(fullContentElement);
                
                // Add class to change display via CSS
                strip.classList.add('expanded');
                this.textContent = 'READ LESS'; // Change button text
            }
        });
    });
});