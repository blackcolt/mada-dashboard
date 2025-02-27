setInterval(() => document.querySelectorAll("iframe").forEach(iframe => {
    const parent = iframe.parentNode;
    const newIframe = document.createElement("iframe");
    newIframe.width = iframe.width;
    newIframe.height = iframe.height;
    newIframe.frameBorder = iframe.frameBorder;
    newIframe.scrolling = iframe.scrolling;
    newIframe.src = iframe.src; // Keep the original source
    parent.replaceChild(newIframe, iframe); // Replace the old iframe
}), 20000);

function toggleSection(id) {
    const section = document.getElementById(id);
    const isVisible = section.style.display === "block";
    section.style.display = isVisible ? "none" : "block";
    localStorage.setItem(id, (!isVisible).toString());
}

document.addEventListener("DOMContentLoaded", () => {
    const status = new URLSearchParams(window.location.search).get("status");
    ["big-content", "small-content", "other-content"].forEach(id => {
        const section = document.getElementById(id);
        if (section) section.style.display = localStorage.getItem(id) !== "false" ? "block" : "none";
    });

    if (status) {
        ["big-content", "small-content", "other-content"].forEach(id => {
            document.getElementById(id).style.display = id === `${status}-content` ? "block" : "none";
            localStorage.setItem(id, (id === `${status}-content`).toString());
        });
    }
});
