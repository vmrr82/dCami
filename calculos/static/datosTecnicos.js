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


function actualizarCentroFrontalA() {
    let centroAnterior = parseFloat(document.getElementById("centroAnteriorA").value) || 0;
    let volAnt = parseFloat(document.getElementById("volAntA").value) || 0;

    document.getElementById("centroFrontalA").value = centroAnterior + volAnt;
}

function actualizarCentroFrontalB() {
    let centroAnterior = parseFloat(document.getElementById("centroAnteriorB").value) || 0;
    let volAnt = parseFloat(document.getElementById("volAntB").value) || 0;

    document.getElementById("centroFrontalB").value = centroAnterior + volAnt;
}

function zw() {
    let dc1 = parseFloat(document.getElementById("dc_1").value) || 0;
    let dc2 = parseFloat(document.getElementById("dc_2").value) || 0;
    let dc3 = parseFloat(document.getElementById("dc_3").value) || 0;
    let dc4 = parseFloat(document.getElementById("dc_4").value) || 0;
    let dc5 = parseFloat(document.getElementById("dc_5").value) || 0;
    let dc6 = parseFloat(document.getElementById("dc_6").value) || 0;
    let dc7 = parseFloat(document.getElementById("dc_7").value) || 0;
    let dc8 = parseFloat(document.getElementById("dc_8").value) || 0;
    let dc9 = parseFloat(document.getElementById("dc_9").value) || 0;
    let dc10 = parseFloat(document.getElementById("dc_10").value) || 0;
    let dc11 = parseFloat(document.getElementById("dc_10").value) || 0;
    let dc12 = parseFloat(document.getElementById("dc_12").value) || 0;
    let dc13 = parseFloat(document.getElementById("dc_13").value) || 0;
    let dc14 = parseFloat(document.getElementById("dc_14").value) || 0;


    document.getElementById("zw_2").value = dc2 - dc1;
    document.getElementById("zw_3").value = dc3 - dc2;
    document.getElementById("zw_4").value = dc4 - dc3;
    document.getElementById("zw_5").value = dc5 - dc4;
    document.getElementById("zw_6").value = dc6 - dc5;
    document.getElementById("zw_7").value = dc7 - dc6;
    document.getElementById("zw_8").value = dc8 - dc7;
    document.getElementById("zw_9").value = dc9 - dc8;
    document.getElementById("zw_10").value = dc10 - dc9;
    document.getElementById("zw_11").value = dc11 - dc10;
    document.getElementById("zw_12").value = dc12 - dc11;
    document.getElementById("zw_13").value = dc13 - dc12;
    document.getElementById("zw_14").value = dc14 - dc13;
}
