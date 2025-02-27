const urlParams = new URLSearchParams(window.location.search);
const refreshRate = urlParams.get("r") ? parseInt(urlParams.get("r"), 10) : 10000;

setInterval(() => document.querySelectorAll("iframe").forEach(iframe => {
    const parent = iframe.parentNode;
    const newIframe = document.createElement("iframe");
    newIframe.width = iframe.width;
    newIframe.height = iframe.height;
    newIframe.frameBorder = iframe.frameBorder;
    newIframe.scrolling = iframe.scrolling;
    newIframe.src = iframe.src; // Keep the original source
    parent.replaceChild(newIframe, iframe); // Replace the old iframe
}), refreshRate);

function toggleSection(id) {
    const section = document.getElementById(id);
    const isVisible = section.style.display === "block";
    section.style.display = isVisible ? "none" : "block";
    localStorage.setItem(id, (!isVisible).toString());
}

document.addEventListener("DOMContentLoaded", () => {
    const status = urlParams.get("status");
    const sectionContentIds = Array.from(document.getElementsByClassName('section-content'))
        .map(element => element.id);
    sectionContentIds.forEach(id => {
        const section = document.getElementById(id.replace("-content", ""));
        if (section) section.style.display = localStorage.getItem(id) !== "false" ? "block" : "none";
    });

    if (status) {
        sectionContentIds.forEach(id => {
            document.getElementById(id).style.display = id === `${status}-content` ? "block" : "none";
            localStorage.setItem(id, (id === `${status}-content`).toString());
        });
    }
});
