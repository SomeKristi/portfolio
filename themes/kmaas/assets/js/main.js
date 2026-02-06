
function addMainMenuControler() {
    const mainMenuOpen = document.getElementById("main-menu-open")
    const mainMenu = document.getElementById("main-menu")
    const mainMenuClose = document.getElementById("main-menu-close")
    console.log(mainMenuOpen,mainMenu,mainMenuClose)
    if (mainMenuOpen && mainMenu && mainMenuClose) {
        mainMenuOpen.addEventListener("click", () => mainMenu.classList.add("open"))
        mainMenuClose.addEventListener("click", () => mainMenu.classList.remove("open"))
    }
}


function randomHero() {
    const heros = document.querySelectorAll(".hero");
    heros.forEach((e) => {

        e.style.setProperty("--g1-x", (Math.random()* 40 +5) + "%");
        e.style.setProperty("--g1-y", (Math.random()* 90 + 5) + "%");
        e.style.setProperty("--g2-x", (Math.random()* 40 + 55) + "%");
        e.style.setProperty("--g2-y", (Math.random()* 90 + 5) + "%");
    })
}

var baseSVG;
var lastColor = "";
async function generateSVGFav() {
    const color = getComputedStyle(document.body).color.trim();
    if (lastColor == color) {
        return;
    }
    lastColor = color;
    if (baseSVG == undefined) {
        const svgReq = await fetch(document.querySelector('meta[name="logosvg"]').content);
        baseSVG = await svgReq.text();
    }
    let svg = baseSVG;
    svg = svg.replaceAll('currentcolor',color)
    console.log(svg)

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
    }
    console.log("s")
    link.href = url;
}


addEventListener("DOMContentLoaded", () => {
    addMainMenuControler();
    randomHero();

    setInterval(() => {
        generateSVGFav()
    },100)

    
})