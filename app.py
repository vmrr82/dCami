import os
from flask import Flask, render_template, request, redirect, url_for
from data.dimensiones import modelo_dimensiones, listado, actualizar_dimensiones

app = Flask(__name__)

@app.route("/")
def appPy():
    return redirect(("home"))

@app.route("/home")
def home():
    return render_template("home.html")

@app.route("/inicio")
def inicio():
    return render_template("inicio.html")

@app.route("/enlaces")
def enlaces():
    return render_template("enlaces.html")

@app.route("/for-par")
def formulasParametros():
    return render_template("for-par.html")

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


    
@app.route("/datosTecnicos", methods=["GET", "POST"])
def datosTecnicos():
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
        "datosTecnicos.html",
        listado=modelos,
        select_modelA=select_modelA,
        select_modelB=select_modelB,
        resultadoA=resultadoA,
        resultadoB=resultadoB,
        pesoPosteriorA=pesoPosteriorA
    )

BASE_DIR = os.path.dirname(__file__)
DXF_DIR = os.path.join(BASE_DIR, "static", "dxf")
SVG_DIR = os.path.join(BASE_DIR, "static", "svg")
os.makedirs(SVG_DIR, exist_ok=True)

"""def dxf_to_svg(dxf_path: str, svg_path: str) -> None:
    doc = ezdxf.readfile(dxf_path)
    msp = doc.modelspace()

    ctx = RenderContext(doc)
    ctx.set_current_layout(msp)

    backend = SVGBackend()
    Frontend(ctx, backend).draw_layout(msp, finalize=True)

    page = drw_layout.Page(0, 0, drw_layout.Units.mm,
                           margins=drw_layout.Margins.all(2))

    svg = backend.get_string(page)

    # ─────────────────────────────────────────────
    # 1) CSS GLOBAL: líneas negras
    style = """
"""<style>
      path, line, polyline, polygon, circle, ellipse {
        stroke: #000 !important;
        fill: none !important;
      }
    </style>
    """"""

    # insertar el <style> justo después de <svg ...>
    svg = svg.replace(">", ">" + style, 1)

    # ─────────────────────────────────────────────
    # 2) Fondo blanco
    # opción A: fondo del canvas
    style_bg = "<style>svg{background:#fff;}</style>"
    svg = svg.replace(">", ">" + style_bg, 1)

    # opción B (más segura si hay rect de fondo):
    svg = svg.replace('<rect ', '<rect fill="#ffffff" ', 1)

    # ─────────────────────────────────────────────
    with open(svg_path, "w", encoding="utf-8") as f:
        f.write(svg)

    def ensure_svgs():
        a_dxf = os.path.join(DXF_DIR, "veh_topA.dxf")
        b_dxf = os.path.join(DXF_DIR, "veh_topB.dxf")
        a_svg = os.path.join(SVG_DIR, "vehiculoA.svg")
        b_svg = os.path.join(SVG_DIR, "vehiculoB.svg")

        if (not os.path.exists(a_svg)) or (os.path.getmtime(a_dxf) > os.path.getmtime(a_svg)):
            dxf_to_svg(a_dxf, a_svg)

        if (not os.path.exists(b_svg)) or (os.path.getmtime(b_dxf) > os.path.getmtime(b_svg)):
            dxf_to_svg(b_dxf, b_svg)

    ensure_svgs()"""




if __name__ == "__main__":
    app.run(debug=True)
