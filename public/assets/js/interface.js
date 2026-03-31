const menusSuspensos = document.querySelectorAll("[data-dropdown]");

function atualizarTextoDropdown(menuSuspenso) {
  const rotuloBase = menuSuspenso.dataset.dropdownLabel || "Selecionar";
  const campoTexto = menuSuspenso.querySelector("[data-dropdown-text]");
  const marcados = menuSuspenso.querySelectorAll("[data-dropdown-input]:checked");

  if (!campoTexto) {
    return;
  }

  campoTexto.textContent = marcados.length
    ? `(${marcados.length}) Selecionados`
    : rotuloBase;
}

menusSuspensos.forEach((menuSuspenso) => {
  const botaoAlternar = menuSuspenso.querySelector("[data-dropdown-toggle]");
  const opcoes = menuSuspenso.querySelectorAll("[data-dropdown-input]");

  botaoAlternar?.addEventListener("click", () => {
    menuSuspenso.classList.toggle("ativo");
  });

  opcoes.forEach((opcao) => {
    opcao.addEventListener("change", () => {
      atualizarTextoDropdown(menuSuspenso);
    });
  });

  atualizarTextoDropdown(menuSuspenso);
});

document.addEventListener("click", (event) => {
  menusSuspensos.forEach((menuSuspenso) => {
    if (!menuSuspenso.contains(event.target)) {
      menuSuspenso.classList.remove("ativo");
    }
  });
});

const faixaMinima = document.querySelector("[data-range-min]");
const faixaMaxima = document.querySelector("[data-range-max]");
const rotuloMinimo = document.querySelector("[data-price-min-label]");
const rotuloMaximo = document.querySelector("[data-price-max-label]");
const faixaVisual = document.querySelector("[data-slider-range]");
const campoMinimoOculto = document.querySelector("[data-range-min-hidden]");
const campoMaximoOculto = document.querySelector("[data-range-max-hidden]");

function formatarMoeda(valor) {
  return `R$ ${Number(valor).toLocaleString("pt-BR")}`;
}

function atualizarControleFaixa() {
  if (!faixaMinima || !faixaMaxima || !faixaVisual) {
    return;
  }

  let minimo = Number(faixaMinima.value);
  let maximo = Number(faixaMaxima.value);

  if (minimo > maximo) {
    [minimo, maximo] = [maximo, minimo];
  }

  const minimoAbsoluto = Number(faixaMinima.min);
  const maximoAbsoluto = Number(faixaMinima.max);
  const esquerda = ((minimo - minimoAbsoluto) / (maximoAbsoluto - minimoAbsoluto)) * 100;
  const direita = ((maximo - minimoAbsoluto) / (maximoAbsoluto - minimoAbsoluto)) * 100;

  faixaVisual.style.left = `${esquerda}%`;
  faixaVisual.style.width = `${direita - esquerda}%`;

  if (rotuloMinimo) {
    rotuloMinimo.textContent = formatarMoeda(minimo);
  }

  if (rotuloMaximo) {
    rotuloMaximo.textContent =
      maximo >= maximoAbsoluto
        ? `${formatarMoeda(maximo)} +`
        : formatarMoeda(maximo);
  }

  if (campoMinimoOculto) {
    campoMinimoOculto.value = minimo;
  }

  if (campoMaximoOculto) {
    campoMaximoOculto.value = maximo;
  }
}

faixaMinima?.addEventListener("input", atualizarControleFaixa);
faixaMaxima?.addEventListener("input", atualizarControleFaixa);
atualizarControleFaixa();
