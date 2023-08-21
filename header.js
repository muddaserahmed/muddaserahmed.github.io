document.addEventListener("DOMContentLoaded", function () {
    const queryParams = new URLSearchParams(window.location.search);
    const headerLinks = document.querySelectorAll(".nav a");

    const currentPage = queryParams.get("page");

    headerLinks.forEach(link => {
        const linkParams = new URLSearchParams(link.href.split("?")[1]);
        const linkPage = linkParams.get("page");

        if (currentPage === linkPage) {
            link.classList.add("active");
        }
    });
});