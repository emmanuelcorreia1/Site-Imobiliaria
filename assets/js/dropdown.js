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