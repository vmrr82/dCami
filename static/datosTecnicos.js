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

function calcularCentroGravedadA() {
    actualizarCentroFrontalA();
    calcularCentroAnteriorA();
}

document.getElementById("calcularGravedadA").addEventListener("click", calcularCentroGravedadA);

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

function calcularCentroGravedadB() {
    actualizarCentroFrontalB();
    calcularCentroAnteriorB();
}

document.getElementById("calcularGravedadB").addEventListener("click", calcularCentroGravedadB);

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

// ===================== ZW VEHÍCULO A =====================
function zw() {
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

    const zw1 = document.getElementById("zw_2");
    if (zw1) zw1.value = getNum("dc_1");

    for (let i = 2; i <= 14; i++) {
        const zwEl = document.getElementById(`zw_${i}`);
        if (!zwEl) continue;

        const dcPrev = getNum(`dc_${i - 1}`);
        const dcAct = getNum(`dc_${i}`);

        zwEl.value = (dcAct - dcPrev);
    }

    //lValueASum();
}


// ===================== L (suma zw) =====================
function lValueASum() {
    let suma = 0;

    for (let i = 2; i <= 14; i++) {
        const valor = parseFloat(document.getElementById(`zw_${i}`)?.value) || 0;
        suma += valor;
    }

    const lEl = document.getElementById("lValueA");
    if (lEl) lEl.value = suma.toFixed(1);
}


// ===================== ÁREA VEHÍCULO A =====================
function calcularAreaA() {
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

    // area_1
    const zw2 = getNum("zw_2");
    const c1 = getNum("c_1");
    const area2 = (zw2 * c1) / 1000000;
    const area2El = document.getElementById("area_2");
    if (area2El) area2El.value = area2.toFixed(2);

    for (let i = 2; i <= 14; i++) {
        const zwVal = getNum(`zw_${i}`);
        const cPrev = getNum(`c_${i - 1}`);
        const cAct = getNum(`c_${i}`);

        const promedio = (cPrev + cAct) / 2;
        const area = (zwVal * promedio) / 1000000;

        const areaEl = document.getElementById(`area_${i}`);
        if (areaEl) areaEl.value = area.toFixed(2);
    }

    areaTtalASum();
}



// ===================== ÁREA TOTAL A =====================
function areaTotalASum() {
    const totalEl = document.getElementById("areaTotalValueA");
    if (!totalEl) return;

    let suma = 0;
    document.querySelectorAll("input[id^='area_']").forEach((input) => {
        suma += parseFloat(input.value) || 0;
    });

    totalEl.value = suma.toFixed(2);

    caverA();
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
// ===================== ZW VEHÍCULO B =====================
function zwB() {
    const getNum = (id) => parseFloat(document.getElementById(id)?.value) || 0;

    const zw1 = document.getElementById("zw2_1");
    if (zw1) zw1.value = getNum("dc2_1");

    for (let i = 2; i <= 14; i++) {
        const zwEl = document.getElementById(`zw2_${i}`);
        if (!zwEl) continue;

        const dcPrev = getNum(`dc2_${i - 1}`);
        const dcAct = getNum(`dc2_${i}`);

        zwEl.value = (dcAct - dcPrev);
    }

    //lValueBSum();
}



// ===================== L (suma zw) =====================
function lValueBSum() {
    let suma = 0;

    for (let i = 2; i <= 14; i++) {
        const valor = parseFloat(document.getElementById(`zw2_${i}`)?.value) || 0;
        suma += valor;
    }

    const lEl = document.getElementById("lValueB");
    if (lEl) lEl.value = suma.toFixed(1);


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

        if (areaEl) areaEl.value = area.toFixed(2);
    }
    areaTotalBSum()
}


// ===================== ÁREA TOTAL B =====================
function areaTotalBSum() {
    const totalEl = document.getElementById("areaTotalValueB");
    if (!totalEl) return;

    let suma = 0;
    document.querySelectorAll("input[id^='area2_']").forEach((input) => {
        suma += parseFloat(input.value) || 0;
    });

    totalEl.value = suma.toFixed(2);

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

//=============================== CENTROIDE VEHÍCULO A ==================================

function centroideAX() {
    const numOrNull = (id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const s = (el.value ?? "").trim();
        if (s === "") return null;
        const n = Number(s);
        return Number.isFinite(n) ? n : null;
    };

    for (let i = 1; i <= 13; i++) {
        const out = document.getElementById(`centAX_${i}`); // xz1 = centAX_1
        if (!out) continue;

        const a = numOrNull(`c_${i}`);
        const b = numOrNull(`c_${i + 1}`);

        if (a == null || b == null) {
            out.value = "";
            continue;
        }

        const denom = 3 * (a + b);
        if (denom === 0) {
            out.value = "";
            continue;
        }

        const val = (a * a + a * b + b * b) / denom;
        out.value = val.toFixed(2);
    }
}


function centroideXArea() {
    for (let i = 1; i <= 13; i++) {
        const xEl = document.getElementById(`centAX_${i}`);
        const aEl = document.getElementById(`area_${i + 1}`);
        const oEl = document.getElementById(`mmxArea_${i}`);

        if (!xEl || !aEl || !oEl) {
            console.warn("Falta ID:", {
                i,
                centAX: `centAX_${i}`,
                area: `area_${i + 1}`,
                out: `mmxArea_${i}`,
                existeCentAX: !!xEl,
                existeArea: !!aEl,
                existeOut: !!oEl
            });
            continue;
        }

        // Bloquea edición del área (pero se sigue leyendo)
        aEl.readOnly = true;

        const x = Number(xEl.value) || 0;
        const area = Number(aEl.value) || 0;

        const resultado = x * area;

        // toFixed devuelve string; si quieres 2 decimales:
        oEl.value = resultado.toFixed(2);
    }
}



function centroideAY() {
    const numOrNull = (id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const s = (el.value ?? "").trim();
        if (s === "") return null;
        const n = Number(s);
        return Number.isFinite(n) ? n : null;
    };

    for (let i = 1; i <= 13; i++) {
        const out = document.getElementById(`centAY_${i}`); // yz1 = centAY_1
        if (!out) continue;

        const c1Val = numOrNull(`c_${i}`); // medida c2
        const c2Val = numOrNull(`c_${i + 1}`); // medida c2
        const zwVal = numOrNull(`zw_${i+1}`); // valor zw

        if (c1Val == null || c2Val == null) {
            out.value = "";
            continue;
        }

        const denom = 3 * (c1Val + c2Val);
        if (denom === 0) {
            out.value = "";
            continue;
        }

        const val = zwVal * (2*c1Val+c2Val) / denom;
        out.value = val.toFixed(2);
    }
}

function centroideYArea() {
    for (let i = 1; i <= 13; i++) {
        const xEl = document.getElementById(`centAY_${i}`);
        const aEl = document.getElementById(`area_${i + 1}`);
        const oEl = document.getElementById(`mmxAreaY_${i}`);

        if (!xEl || !aEl || !oEl) {
            console.warn("Falta ID:", {
                i,
                centAX: `centAY_${i}`,
                area: `area_${i + 1}`,
                out: `mmxAreaY_${i}`,
                existeCentAX: !!xEl,
                existeArea: !!aEl,
                existeOut: !!oEl
            });
            continue;
        }

        // Bloquea edición del área (pero se sigue leyendo)
        aEl.readOnly = true;

        const x = Number(xEl.value) || 0;
        const area = Number(aEl.value) || 0;

        const resultado = x * area;

        // toFixed devuelve string; si quieres 2 decimales:
        oEl.value = resultado.toFixed(2);
    }
}

//===============================CENTROIDE VEHÍCULO B================================
function centroideBX() {
    const numOrNull = (id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const s = (el.value ?? "").trim();
        if (s === "") return null;
        const n = Number(s);
        return Number.isFinite(n) ? n : null;
    };


    const out1 = document.getElementById("centBX_1");
    const c2 = numOrNull("c2_2");
    if (out1) out1.value = (c2 == null ? "" : c2);

    for (let i = 2; i <= 13; i++) {
        const out = document.getElementById(`centBX_${i}`);
        if (!out) continue;

        const a = numOrNull(`c2_${i - 1}`);
        const b = numOrNull(`c2_${i}`);

        if (a == null || b == null) {
            out.value = "";
            continue;
        }

        const denom = 3 * (a + b);
        if (denom === 0) {
            out.value = "";
            continue;
        }

        const val = (a * a + a * b + b * b) / denom;
        out.value = val.toFixed(2);
    }
}


function centroideXAreaB() {
    for (let i = 1; i <= 13; i++) {
        const xEl = document.getElementById(`centBX_${i}`);
        const aEl = document.getElementById(`area2_${i + 1}`);
        const oEl = document.getElementById(`mmxAreaB_${i}`);

        if (!xEl || !aEl || !oEl) {
            console.warn("Falta ID:", {
                i,
                centAX: `centBX_${i}`,
                area: `area2_${i + 1}`,
                out: `mmxAreaB_${i}`,
                existeCentAX: !!xEl,
                existeArea: !!aEl,
                existeOut: !!oEl
            });
            continue;
        }

        // Bloquea edición del área (pero se sigue leyendo)
        aEl.readOnly = true;

        const x = Number(xEl.value) || 0;
        const area = Number(aEl.value) || 0;

        const resultado = x * area;

        // toFixed devuelve string; si quieres 2 decimales:
        oEl.value = resultado.toFixed(2);
    }
}

function centroideBY() {
    const numOrNull = (id) => {
        const el = document.getElementById(id);
        if (!el) return null;
        const s = (el.value ?? "").trim();
        if (s === "") return null;
        const n = Number(s);
        return Number.isFinite(n) ? n : null;
    };

    for (let i = 1; i <= 13; i++) {
        const out = document.getElementById(`centBY_${i}`); // yz1 = centBY_1
        if (!out) continue;

        const c1Val = numOrNull(`c2_${i}`); // medida c2_2
        const c2Val = numOrNull(`c2_${i + 1}`); // medida c2_
        const zwVal = numOrNull(`zw2_${i+1}`); // valor zw2

        if (c1Val == null || c2Val == null) {
            out.value = "";
            continue;
        }

        const denom = 3 * (c1Val + c2Val);
        if (denom === 0) {
            out.value = "";
            continue;
        }

        const val = zwVal * (2*c1Val+c2Val) / denom;
        out.value = val.toFixed(2);
    }
}

function centroideYAreaB() {
    for (let i = 1; i <= 13; i++) {
        const xEl = document.getElementById(`centBY_${i}`);
        const aEl = document.getElementById(`area2_${i + 1}`);
        const oEl = document.getElementById(`mmxAreaYB_${i}`);

        if (!xEl || !aEl || !oEl) {
            console.warn("Falta ID:", {
                i,
                centAX: `centBY_${i}`,
                area: `area2_${i + 1}`,
                out: `mmxAreaYB_${i}`,
                existeCentAX: !!xEl,
                existeArea: !!aEl,
                existeOut: !!oEl
            });
            continue;
        }

        // Bloquea edición del área (pero se sigue leyendo)
        aEl.readOnly = true;

        const x = Number(xEl.value) || 0;
        const area = Number(aEl.value) || 0;

        const resultado = x * area;

        // toFixed devuelve string; si quieres 2 decimales:
        oEl.value = resultado.toFixed(2);
    }
}
//=========================Botón totales Centroide=============================
function calcularATotales() {
    lValueASum();
    areaTotalASum();
    centroideAX();
    centroideXArea();
    centroideAY();
    centroideYArea();
}

document.getElementById("calcularZW").addEventListener("click", calcularATotales);

function calcularBTotales() {
    lValueBSum();
    areaTotalBSum();
    centroideBX();
    centroideXAreaB();
    centroideBY();
    centroideYAreaB();
}

document.getElementById("calcularZW").addEventListener("click", calcularBTotales);