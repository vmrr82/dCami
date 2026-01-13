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