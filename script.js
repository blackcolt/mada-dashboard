const urlParams = new URLSearchParams(window.location.search);
const refreshRate = urlParams.get("r") ? parseInt(urlParams.get("r"), 10) : 15000;

setInterval(() => document.querySelectorAll("iframe").forEach(iframe => {
    const parent = iframe.parentNode;
    const newIframe = document.createElement("iframe");
    newIframe.width = iframe.width;
    newIframe.height = iframe.height;
    newIframe.frameBorder = iframe.frameBorder;
    newIframe.scrolling = iframe.scrolling;
    newIframe.src = iframe.src;
    parent.replaceChild(newIframe, iframe);
}), refreshRate);

function toggleSection(id) {
    const section = document.getElementById(id);
    const isVisible = section.style.display !== "none"; // Ensure it recognizes default state
    section.style.display = isVisible ? "none" : "block";
    localStorage.setItem(id, !isVisible);
}

document.addEventListener("DOMContentLoaded", () => {
    const status = urlParams.get("status");
    const sections = Array.from(document.getElementsByClassName("section-content")).map(el => el.id);

    if (status) {
        sections.forEach(id => {
            const section = document.getElementById(id);
            section.closest(".status-container").style.display = id === status ? "block" : "none";
            section.style.display = "block"; // Ensure the section is open when using URL param
        });
    }
    sections.forEach(id => {
        const storedState = localStorage.getItem(id);
        document.getElementById(id).style.display = storedState === null || storedState === "true" ? "block" : "none";
    });
});
