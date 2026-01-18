document.addEventListener("DOMContentLoaded", () => {
    // Detecta label "(Kg)" o "(mm)" y añade sufijo visual dentro del input
    const labels = document.querySelectorAll("label[for]");

    labels.forEach((label) => {
        const text = (label.textContent || "").toLowerCase();

        let unit = null;
        if (text.includes("(kg)")) unit = "kg";
        if (text.includes("(mm)")) unit = "mm";

        if (!unit) return;

        const id = label.getAttribute("for");
        const input = document.getElementById(id);

        if (!input || input.tagName.toLowerCase() !== "input") return;

        // Evita duplicar si recargas parcial o re-ejecutas
        if (input.closest(".field")?.classList.contains("has-unit")) return;

        // Crea wrapper
        const field = document.createElement("div");
        field.className = `field has-unit unit-${unit}`;

        // Inserta wrapper en el DOM justo donde estaba el input
        input.parentNode.insertBefore(field, input);
        field.appendChild(input);

        // Añade el sufijo
        const suffix = document.createElement("span");
        suffix.className = "unit-suffix";
        suffix.textContent = unit;
        field.appendChild(suffix);

        // Por accesibilidad (el sufijo es decorativo)
        suffix.setAttribute("aria-hidden", "true");
    });
});



// Calculo de distribución de Carga de vehículo A
document.addEventListener("DOMContentLoaded", () => {
    const pesoInput = document.getElementById("pesoA");

    const anteriorInput = document.getElementById("anteriorA");
    const posteriorInput = document.getElementById("posteriorA");

    const pesoAnteriorOut = document.getElementById("pesoAnteriorA");
    const pesoPosteriorOut = document.getElementById("pesoPosteriorA");

    const btn = document.getElementById("calcularDistribucion");

    function clamp(v) {
        return Math.min(100, Math.max(0, v));
    }

    function syncDesdeAnterior() {
        const ant = clamp(parseInt(anteriorInput.value) || 0);
        anteriorInput.value = ant.toFixed(1);
        posteriorInput.value = (100 - ant).toFixed(1);
    }

    function syncDesdePosterior() {
        const post = clamp(parseInt(posteriorInput.value) || 0);
        posteriorInput.value = post.toFixed(1);
        anteriorInput.value = (100 - post).toFixed(1);
    }

    function calcularPesos() {
        const peso = parseInt(pesoInput.value) || 0;
        const ant = parseInt(anteriorInput.value) || 0;
        const post = parseInt(posteriorInput.value) || 0;

        if (Math.abs(ant + post - 100) > 0.01) {
            alert("Anterior y Posterior deben sumar 100%");
            return;
        }

        pesoAnteriorOut.value = (peso * ant / 100).toFixed(2);
        pesoPosteriorOut.value = (peso * post / 100).toFixed(2);
    }

    anteriorInput.addEventListener("input", syncDesdeAnterior);
    posteriorInput.addEventListener("input", syncDesdePosterior);
    btn.addEventListener("click", calcularPesos);

    if (anteriorInput.value) syncDesdeAnterior();
    else if (posteriorInput.value) syncDesdePosterior();
});


// Calculo de distribución de Carga de vehículo B
document.addEventListener("DOMContentLoaded", () => {
    const pesoInput = document.getElementById("pesoB");

    const anteriorInput = document.getElementById("anteriorB");
    const posteriorInput = document.getElementById("posteriorB");

    const pesoAnteriorOut = document.getElementById("pesoAnteriorB");
    const pesoPosteriorOut = document.getElementById("pesoPosteriorB");

    const btn = document.getElementById("calcularDistribucionB");

    function clamp(v) {
        return Math.min(100, Math.max(0, v));
    }

    function syncDesdeAnterior() {
        const ant = clamp(parseFloat(anteriorInput.value) || 0);
        anteriorInput.value = ant.toFixed(1);
        posteriorInput.value = (100 - ant).toFixed(1);
    }

    function syncDesdePosterior() {
        const post = clamp(parseFloat(posteriorInput.value) || 0);
        posteriorInput.value = post.toFixed(1);
        anteriorInput.value = (100 - post).toFixed(1);
    }

    function calcularPesos() {
        const peso = parseFloat(pesoInput.value) || 0;
        const ant = parseFloat(anteriorInput.value) || 0;
        const post = parseFloat(posteriorInput.value) || 0;

        if (Math.abs(ant + post - 100) > 0.01) {
            alert("Anterior y Posterior deben sumar 100%");
            return;
        }

        pesoAnteriorOut.value = (peso * ant / 100).toFixed(2);
        pesoPosteriorOut.value = (peso * post / 100).toFixed(2);
    }

    anteriorInput.addEventListener("input", syncDesdeAnterior);
    posteriorInput.addEventListener("input", syncDesdePosterior);
    btn.addEventListener("click", calcularPesos);

    // Inicializa si ya hay valores
    if (anteriorInput.value) syncDesdeAnterior();
    else if (posteriorInput.value) syncDesdePosterior();
});

// BOTON CALCULAR CENTRO DE GRAVEDAD
function calcularCentroAnteriorA() {
    const batallaEl = document.getElementById("batallaA");
    const posteriorEl = document.getElementById("posteriorA");
    const outEl = document.getElementById("centroAnteriorA");

    if (!batallaEl || !posteriorEl || !outEl) return;

    const batallaA = parseFloat(batallaEl.value) || 0;
    const percentPA = parseFloat(posteriorEl.value) || 0;

    outEl.value = ((batallaA * percentPA) / 100);
}


function actualizarCentroFrontalA() {
    let centroAnterior = parseFloat(document.getElementById("centroAnteriorA").value) || 0;
    let volAnt = parseFloat(document.getElementById("volAntA").value) || 0;

    document.getElementById("centroFrontalA").value = centroAnterior + volAnt;
}

function calcularCentroAnteriorB() {
    let batallaB = parseFloat(document.getElementById("batallaB").value) || 0;
    let percentPB = parseFloat(document.getElementById("posteriorB").value) || 0;

    document.getElementById("centroAnteriorB").value = (batallaB * percentPB) / 100;
}

function actualizarCentroFrontalB() {
    let centroAnterior = parseFloat(document.getElementById("centroAnteriorB").value) || 0;
    let volAnt = parseFloat(document.getElementById("volAntB").value) || 0;

    document.getElementById("centroFrontalB").value = centroAnterior + volAnt;
}

const input = document.getElementById("offsetA");
const tooltip = document.getElementById("tooltipOffsetA");
const inputB = document.getElementById("offsetB");
const tooltipB = document.getElementById("tooltipOffsetB");

input.addEventListener("mouseover", () => {
    tooltip.style.display = "block";
});

input.addEventListener("mouseout", () => {
    tooltip.style.display = "none";
});

inputB.addEventListener("mouseover", () => {
    tooltipB.style.display = "block";
});

inputB.addEventListener("mouseout", () => {
    tooltipB.style.display = "none";
});
// ===================== TOOLTIP OFFSETS (con guard para no romper en otras páginas) =====================
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("offsetA");
    const tooltip = document.getElementById("tooltipOffsetA");
    const inputB = document.getElementById("offsetB");
    const tooltipB = document.getElementById("tooltipOffsetB");

    if (input && tooltip) {
        input.addEventListener("mouseenter", () => (tooltip.style.display = "block"));
        input.addEventListener("mouseleave", () => (tooltip.style.display = "none"));
    }

    if (inputB && tooltipB) {
        inputB.addEventListener("mouseenter", () => (tooltipB.style.display = "block"));
        inputB.addEventListener("mouseleave", () => (tooltipB.style.display = "none"));
    }
});

// ===================== ZW VEHÍCULO A =====================
function zw() {
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

    const zw1 = document.getElementById("zw_1");
    if (zw1) zw1.value = getNum("dc_1");

    for (let i = 2; i <= 14; i++) {
        const zwEl = document.getElementById(`zw_${i}`);
        if (!zwEl) continue;

        const dcPrev = getNum(`dc_${i - 1}`);
        const dcAct = getNum(`dc_${i}`);

        zwEl.value = (dcAct - dcPrev);
    }

    lValueASum();
}


// ===================== L (suma zw) =====================
function lValueASum() {
    let suma = 0;

    for (let i = 1; i <= 14; i++) {
        const valor = parseFloat(document.getElementById(`zw_${i}`)?.value) || 0;
        suma += valor;
    }

    const lEl = document.getElementById("lValueA");
    if (lEl) lEl.value = suma.toFixed(1);

}


// ===================== ÁREA TOTAL A =====================
function areaTotalASum() {
    const totalEl = document.getElementById("areaTotalValueA");
    if (!totalEl) return;

    let suma = 0;
    document.querySelectorAll("input[id^='area_']").forEach((input) => {
        suma += parseFloat(input.value) || 0;
    });

    totalEl.value = suma.toFixed(3);

    caverA();
}


// ===================== ÁREA VEHÍCULO A =====================
function calcularAreaA() {
  const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

  // area_1
  const zw1 = getNum("zw_1");
  const c1 = getNum("c_1");
  const area1 = (zw1 * c1) / 1000000;
  const area1El = document.getElementById("area_1");
  if (area1El) area1El.value = area1.toFixed(3);

  for (let i = 2; i <= 14; i++) {
    const zwVal = getNum(`zw_${i}`);
    const cPrev = getNum(`c_${i - 1}`);
    const cAct = getNum(`c_${i}`);

    const promedio = (cPrev + cAct) / 2;
    const area = (zwVal * promedio) / 1000000;

    const areaEl = document.getElementById(`area_${i}`);
    if (areaEl) areaEl.value = area.toFixed(3);
  }

  areaTotalASum();
}



// ===================== CAVER A =====================
function caverA() {
    const caverInput = document.getElementById("caverValue");
    const areaTotalEl = document.getElementById("areaTotalValueA");
    const lEl = document.getElementById("lValueA");

    if (!caverInput || !areaTotalEl || !lEl) return;

    const areaTotal = parseFloat(areaTotalEl.value) || 0;
    const L = parseFloat(lEl.value) || 0;

    caverInput.value = (L > 0) ? ((areaTotal / L) * 1000000).toFixed() : "0";


}

// ===================== ZW VEHÍCULO B =====================
function zwB() {
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

    const zw1 = document.getElementById("zw2_1");
    if (zw1) zw1.value = getNum("dc2_1").toFixed(2);

    for (let i = 2; i <= 14; i++) {
        const zwEl = document.getElementById(`zw2_${i}`);
        if (!zwEl) continue;

        const dcPrev = getNum(`dc2_${i - 1}`);
        const dcAct = getNum(`dc2_${i}`);

        zwEl.value = (dcAct - dcPrev);
    }

    lValueBSum(); // 
}


// ===================== L (suma zw) =====================
function lValueBSum() {
    let suma = 0;

    for (let i = 1; i <= 14; i++) {
        const valor = parseFloat(document.getElementById(`zw2_${i}`)?.value) || 0;
        suma += valor;
    }

    const lEl = document.getElementById("lValueB");
    if (lEl) lEl.value = suma.toFixed(2);


}



// ===================== ÁREA VEHÍCULO B =====================
function calcularAreaB() {
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

    {
        const zw1 = getNum("zw2_1");
        const c1 = getNum("c2_1");
        const area1 = (zw1 * c1) / 1000000;
        const area1El = document.getElementById("area2_1");
        if (area1El) area1El.value = area1;
    }

    for (let i = 2; i <= 14; i++) {
        const zwVal = getNum(`zw2_${i}`);
        const cPrev = getNum(`c2_${i - 1}`);
        const cAct = getNum(`c2_${i}`);

        const promedio = (cPrev + cAct) / 2;
        const area = (zwVal * promedio) / 1000000;

        const areaEl = document.getElementById(`area2_${i}`);
        
        if (areaEl) areaEl.value = area.toFixed(3);
    }
    areaTotalBSum()
}

// ===================== CAVER B =====================


function caverB() {
    const caverInput = document.getElementById("caverValueB");
    const areaTotalEl = document.getElementById("areaTotalValueB");
    const lEl = document.getElementById("lValueB");

    if (!caverInput || !areaTotalEl || !lEl) return;

    const areaTotal = parseFloat(areaTotalEl.value) || 0;
    const L = parseFloat(lEl.value) || 0;

    caverInput.value = (L > 0) ? ((areaTotal / L) * 1000000).toFixed() : "0";


}
// ===================== ÁREA TOTAL B =====================
function areaTotalBSum() {
    const totalEl = document.getElementById("areaTotalValueB");
    if (!totalEl) return;

    let suma = 0;
    document.querySelectorAll("input[id^='area2_']").forEach((input) => {
        suma += parseFloat(input.value) || 0;
    });

    totalEl.value = suma.toFixed(3);

    caverB();
}


// ===================== INIT: si ya hay valores cargados =====================
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("dc_1")) {
        zw();
    }
    if (document.getElementById("dc2_1")) {
        zwB();
    }
});
