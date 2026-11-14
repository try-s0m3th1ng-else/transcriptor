/** @OnlyCurrentDoc */
/**
 * Recibe los reportes de error del transcriptor y los guarda en esta hoja.
 * Se pega en Extensiones > Apps Script de la hoja "Reportes transcriptor"
 * @OnlyCurrentDoc limita el permiso a esta hoja: el script no puede leer ni tocar el resto de tu Drive.
 * y se implementa como Aplicación web (Ejecutar como: yo; Acceso: cualquier usuario).
 */
var AVISAR_POR_CORREO = true;   // te manda un correo con cada reporte
var MAX = { prueba: 80, obtenido: 300, esperado: 300, comentario: 500, autor: 40, version: 20 };
var CABECERA = ['Fecha', 'Versión', 'Prueba', 'Qué salió', 'Qué esperaba', 'Comentario', 'Autor', 'Estado'];

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var d = JSON.parse(e.postData.contents || '{}');
    if (d.hp) return respuesta('ok');                 // casilla trampa: lo rellenan bots, no personas
    var f = {};
    Object.keys(MAX).forEach(function (k) { f[k] = limpiar(d[k], MAX[k]); });
    if (!f.prueba) return respuesta('falta prueba');
    // Segunda barrera: si parece un identificador de paciente, no se guarda el texto.
    ['prueba', 'obtenido', 'esperado', 'comentario'].forEach(function (k) {
      if (/\d{6,}|\b\d{8}[A-Za-z]\b|\b\d{1,2}[\/.-]\d{1,2}[\/.-]\d{2,4}\b/.test(f[k])) f[k] = '[borrado: parecía un dato de paciente]';
    });
    var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (hoja.getLastRow() === 0) hoja.appendRow(CABECERA);
    hoja.appendRow([new Date(), f.version, f.prueba, f.obtenido, f.esperado, f.comentario, f.autor, 'pendiente']);
    if (AVISAR_POR_CORREO) {
      MailApp.sendEmail(Session.getEffectiveUser().getEmail(), 'Transcriptor: error en ' + f.prueba,
        'Versión ' + f.version + '\nSalió: ' + f.obtenido + '\nEsperaba: ' + f.esperado + '\nComentario: ' + f.comentario +
        '\nAutor: ' + (f.autor || '-') + '\n\n' + SpreadsheetApp.getActiveSpreadsheet().getUrl());
    }
    return respuesta('ok');
  } catch (err) {
    return respuesta('error');
  } finally {
    lock.releaseLock();
  }
}

// Abrir la URL en el navegador debe mostrar "ok": sirve para comprobar que está publicada.
function doGet() { return respuesta('ok'); }

function limpiar(v, n) {
  v = String(v == null ? '' : v).replace(/[\u0000-\u0008\u000b-\u001f]/g, '').trim().slice(0, n);
  return /^[=+\-@]/.test(v) ? "'" + v : v;          // evita que la hoja lo interprete como fórmula
}
function respuesta(t) { return ContentService.createTextOutput(t); }
