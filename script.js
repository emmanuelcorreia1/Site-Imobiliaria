function alternarDropdown(id) {
    const dropdown = document.getElementById(id);
    const pai = dropdown.parentElement;
    pai.classList.toggle("ativo");
}

function adicionarFinalidade(valor) {
    const checkboxes = document.querySelectorAll(
        'input[name="finalidade"]:checked',
    );
    const valores = Array.from(checkboxes).map((item) => {
        if (
            item.nextElementSibling.nextElementSibling.textContent.trim() ===
            "Venda"
        ) {
            return "venda";
        }
        if (
            item.nextElementSibling.nextElementSibling.textContent.trim() ===
            "Locação"
        ) {
            return "locacao";
        }
        return item.value;
    });
    document.getElementById("cat1").value = valores.join(",");
    console.log("Selecionados:", document.getElementById("cat1").value);
}

document.addEventListener("click", function (e) {
    const dropdowns = document.querySelectorAll(".dropdownFiltro");
    dropdowns.forEach((drop) => {
        if (!drop.contains(e.target)) {
            drop.classList.remove("ativo");
        }
    });
});