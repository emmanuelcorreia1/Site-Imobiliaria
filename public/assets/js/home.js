function alternarDropdown(id) {
    const dropdown = document.getElementById(id);
    const pai = dropdown.parentElement;
    pai.classList.toggle("ativo");
}

function atualizarFiltro(targetId) {
    const checkboxes = document.querySelectorAll(
        `input[data-target="${targetId}"]:checked`
    );

    const valores = Array.from(checkboxes).map(cb => cb.value);

    document.getElementById(targetId).value = valores.join(",");

    console.log(targetId + ":", valores);
}

document.addEventListener("click", function (e) {
    const dropdowns = document.querySelectorAll(".dropdownFiltro");
    dropdowns.forEach((drop) => {
        if (!drop.contains(e.target)) {
            drop.classList.remove("ativo");
        }
    });
});

const rangeMin = document.getElementById("rangeMin");
const rangeMax = document.getElementById("rangeMax");
const valorMin = document.getElementById("valorMin");
const valorMax = document.getElementById("valorMax");
const sliderRange = document.getElementById("sliderRange");

const min = parseInt(rangeMin.min);
const max = parseInt(rangeMin.max);

function formatarMoeda(valor) {
    return "R$ " + Number(valor).toLocaleString("pt-BR");
}

function atualizarSlider() {
    let minVal = parseInt(rangeMin.value);
    let maxVal = parseInt(rangeMax.value);

    if (minVal > maxVal) {
        [minVal, maxVal] = [maxVal, minVal];
    }

    rangeMin.value = minVal;
    rangeMax.value = maxVal;

    valorMin.textContent = formatarMoeda(minVal);
    valorMax.textContent = maxVal >= max ? formatarMoeda(maxVal) + " +" : formatarMoeda(maxVal);

    const left = ((minVal - min) / (max - min)) * 100;
    const right = ((maxVal - min) / (max - min)) * 100;

    sliderRange.style.left = left + "%";
    sliderRange.style.width = (right - left) + "%";
}

rangeMin.addEventListener("input", atualizarSlider);
rangeMax.addEventListener("input", atualizarSlider);

atualizarSlider();