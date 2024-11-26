//Lite extra saker för jag var klar typ först.
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        sessionStorage.removeItem('scrollPosition');
    }
});
