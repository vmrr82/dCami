import pandas as pd


dataSetVehiculos = pd.read_csv(r'calculos\data\cars-dataset.csv',
                    sep=',',              
                    quotechar='"',       
                    low_memory=False,
                    on_bad_lines='skip')

def modelo_dimensiones(modelo):
    df = dataSetVehiculos

    columnas = ['Model','Serie','Body style','Production years',
                'Length (mm)','Width (mm)','Height (mm)','Peso']

    datos = df.loc[df['Model'] == modelo, columnas]

    # ✅ Si no hay filas, devolvemos ceros
    if datos.empty:
        return {"altura": 0, "anchura": 0, "longitud": 0, "Peso": 0}

    datos_unicos = datos.drop_duplicates(subset=['Model']).iloc[0]

    return {
        "altura": datos_unicos['Height (mm)'],
        "anchura": datos_unicos['Width (mm)'],
        "longitud": datos_unicos['Length (mm)'],
        "peso": datos_unicos['Peso']
    }


def listado():
    df = dataSetVehiculos
    columnaModel = df['Model'].sort_values().unique().tolist()
    return columnaModel

def actualizar_dimensiones(modelo, altura, anchura, longitud, peso):
    df = dataSetVehiculos
    
    # Actualizar fila correspondiente
    df.loc[df["Model"] == modelo, ["Height (mm)", "Width (mm)", "Length (mm)", "Peso"]] = [altura, anchura, longitud, peso]
    
