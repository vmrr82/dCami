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

    // Inicializa si ya hay valores
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
    let batallaA = parseFloat(document.getElementById("batallaA").value) || 0;
    let percentPA = parseFloat(document.getElementById("posteriorA").value) || 0;

    document.getElementById("centroAnteriorA").value = (batallaA * percentPA) / 100;
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

// CAMPO ZW TABLA DE DEFORMACIONES-------------------------------
function zw() {
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

    // Leer dc_1 ... dc_14 en un array (índice 1..14)
    const dc = Array.from({ length: 15 }, (_, i) => (i === 0 ? 0 : getNum(`dc_${i}`)));

    // Calcular zw_2 ... zw_14 = dc_i - dc_(i-1)
    for (let i = 2; i <= 14; i++) {
        const zwEl = document.getElementById(`zw_${i}`);
        if (zwEl) zwEl.value = dc[i] - dc[i - 1];
    }
}


// CAMPO ZW TABLA DE DEFORMACIONES-------------------------------
function zwB() {
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

    const dc = Array.from({ length: 15 }, (_, i) => (i === 0 ? 0 : getNum(`dc2_${i}`)));

    for (let i = 2; i <= 14; i++) {
        const zwEl = document.getElementById(`zw2_${i}`);
        if (zwEl) zwEl.value = dc[i] - dc[i - 1];
    }
}


// AREA VEHÍCULO A

function calcularAreaA() {
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

    for (let i = 2; i <= 14; i++) {
        const zw = getNum(`zw_${i}`);
        const cPrev = getNum(`c_${i - 1}`);
        const cAct = getNum(`c_${i}`);

        const promedio = (cPrev + cAct) / 2;
        const area = (zw * promedio) / 1000000;

        const areaEl = document.getElementById(`area_${i}`);
        if (areaEl) areaEl.value = area;
    }
}

// AREA VEHÍCULO 2

function calcularAreaB() {
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

    for (let i = 2; i <= 14; i++) {
        const zw = getNum(`zw2_${i}`);
        const cPrev = getNum(`c2_${i - 1}`);
        const cAct = getNum(`c2_${i}`);

        const promedio = (cPrev + cAct) / 2;
        const area = (zw * promedio) / 1000000;

        const areaEl = document.getElementById(`area2_${i}`);
        if (areaEl) areaEl.value = area;
    }
}