from flask import Flask, render_template, request
from data.dimensiones import modelo_dimensiones, listado, actualizar_dimensiones

app = Flask(__name__)
@app.route("/index", methods=["GET", "POST"])
def index():
    modelos = listado()

    select_modelA = None
    select_modelB = None

    resultadoA = {"altura": 0, "anchura": 0, "longitud": 0, "peso": 0}
    resultadoB = {"altura": 0, "anchura": 0, "longitud": 0, "peso": 0}

    if request.method == "POST":
        select_modelA = request.form.get("modelo_vehiculoA") or None
        select_modelB = request.form.get("modelo_vehiculoB") or None

        if select_modelA:
            resultadoA = modelo_dimensiones(select_modelA) or {}
            # Garantiza claves aunque la función no las traiga
            resultadoA.setdefault("peso", 0)
            posterior_form = request.form.get('posteriorA')
            if posterior_form is not None and posterior_form != "":
                resultadoA["posteriorA"] = float(posterior_form)
            else:
                resultadoA.setdefault("posteriorA",0)

        if select_modelB:
            resultadoB = modelo_dimensiones(select_modelB) or {}
            resultadoB.setdefault("peso", 0)

    pesoPosteriorA = (resultadoA["peso"] * resultadoA["posteriorA"] / 100) if (resultadoA["peso"] and resultadoA["posteriorA"]) else 0
    print(resultadoA)
    return render_template(
        "index.html",
        listado=modelos,
        select_modelA=select_modelA,
        select_modelB=select_modelB,
        resultadoA=resultadoA,
        resultadoB=resultadoB,
        pesoPosteriorA=pesoPosteriorA
    )



@app.route("/guardar", methods=["POST"])
def guardar():

    # ¿A o B?
    tipo = request.form.get("tipo")  # "A" o "B"

    if tipo == "A":
        modelo = request.form.get("modelo_vehiculoA")
    else:
        modelo = request.form.get("modelo_vehiculoB")

    altura = request.form.get("altura")
    anchura = request.form.get("anchura")
    longitud = request.form.get("longitud")
    peso = request.form.get("peso")

    if modelo:
        actualizar_dimensiones(modelo, altura, anchura, longitud, peso)

    return f"Dimensiones del vehículo {tipo} ({modelo}) actualizadas con éxito."



if __name__ == "__main__":
    app.run(debug=True)
