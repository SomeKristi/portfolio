const fuseOptions = {
	keys: [
        {
            name: 'title',
            weight: 1
        },
        {
            name: 'description',
            weight: 1
        },

        {
            name: 'tags',
            weight: 3
        },
        {
            name: 'kinds',
            weight: 2
        }
	]
};

const resultsStore = document.getElementById("search-results");
const searchElement = document.getElementById("search-input");
resultsStore.innerHTML = `<div class="loading"></div>`;

function resultElement(data) {
    if (!data.title) return;
    const el = document.createElement("a");

    const title = document.createElement("span");
    title.classList.add("title");
    title.innerText = data.title;

    const description = document.createElement("span");
    description.classList.add("description");
    description.innerText = data.description;


    const footer = document.createElement("div");
    footer.classList.add("item-footer");

    const tags = document.createElement("div");
    tags.classList.add("search-tags");
    tags.append(...(data.tags??[]).map(text => {
        const t = document.createElement("span");
        t.innerText = text
        return t;
    }))
    
    const kind = document.createElement("span");
    kind.classList.add("search-kind");
    kind.innerText = data.kind;
    
    footer.append(tags,kind)
    el.href = data.permalink;
    el.classList.add("result-item");
    el.append(title,description,footer);
    return el
} 

function renderResults(results) {
    if (results.length > 0) {
        resultsStore.innerHTML = "";
        resultsStore.append(...results.map(e => resultElement(e.item)).filter(e => e != undefined))
    } else {
        resultsStore.innerHTML = "<span>Nothing Found</span>";
    }
}
    
async function initSearch() {
    const searchData = await (await fetch("./index.json")).json();


    
    const fuse = new Fuse(searchData,fuseOptions);

    const emptyData = searchData.map(d => {return {item: d}});
    searchElement.addEventListener("input",() => {
        if (searchElement.value.trim().length > 0) {
            const r =fuse.search(searchElement.value);
            renderResults(r);
        } else {
            renderResults(emptyData);
        }
    })
    renderResults(emptyData);
    //resultsStore.innerHTML = "";
}




initSearch();