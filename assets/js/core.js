function updateFavicon() {
    const favicon = document.getElementsByTagName("favicon");
    const darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    favicon.href = darkMode ? "/assets/svg/favicon-light.svg" : "/assets/svg/favicon-dark.svg";

}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateFavicon);

var date = new Date();
document.querySelector("footer>p>b").innerHTML = date.getFullYear();