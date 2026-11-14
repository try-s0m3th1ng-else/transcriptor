# Transcriptor de analíticas

Convierte el texto copiado de un informe del laboratorio en una lista lista para pegar en la historia clínica.
Todo se procesa en el navegador: el informe pegado nunca sale del ordenador.

**Web:** la publica GitHub Pages desde la rama `main` (carpeta raíz).

## Qué hay aquí
- `index.html` y `version.json`: lo que se publica. Se generan, no se editan a mano.
- `src/`: el código fuente (`parser.js` con las reglas y el diccionario, `page.html` con la interfaz, `VERSION`, `build.py`).
- `apps-script/Codigo.gs`: recibe los reportes del botón «Reportar error» y los guarda en una hoja de Google.

Este repositorio es público. **No subir nunca** informes, PDF ni pruebas con datos de pacientes (ver `.gitignore`).

## Publicar un cambio
1. Editar `src/parser.js` o `src/page.html`.
2. Subir la versión en `src/VERSION` (2.0.0 → 2.0.1 para correcciones, 2.1.0 para novedades).
3. `python3 src/build.py .` regenera `index.html` y `version.json`.
4. Pasar las pruebas (están fuera del repositorio, en la carpeta privada del proyecto).
5. Commit y push a `main`. En 1–2 minutos la web está actualizada. Los PCs que tengan la página abierta muestran «Hay una versión nueva» y se actualizan al recargar.

## Revisar reportes
Los reportes caen en la hoja «Reportes transcriptor» (columna Estado = pendiente).
Pedir a Claude: «revisa los reportes pendientes del transcriptor». Claude reproduce cada caso, corrige, publica y marca el estado como `corregido vX.Y.Z`.
