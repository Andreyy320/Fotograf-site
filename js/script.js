window.onload = function() {
    const hamburger = document.getElementById('hamburger');
    const topNav = document.getElementById('myTopnav');

    hamburger.onclick = function() {
        topNav.classList.toggle('responsive');
    };
};
