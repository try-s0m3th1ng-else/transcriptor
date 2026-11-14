// ===== DICCIONARIO =====
// Grupos en el orden en que salen en la HC.
// header: título del bloque (null = bloque sin título, nombres en MAYÚSCULAS).
// summary: si hay pruebas del bloque pero ninguna sale (todas normales), se escribe "Sin alteraciones".
var GROUPS = [
  { id: 'hemo',  header: 'HEMOGRAMA' },
  { id: 'coag',  header: 'COAGULACIÓN' },
  { id: 'renal', header: null },
  { id: 'iones', header: null },
  { id: 'hep',   header: null },
  { id: 'panc',  header: null },
  { id: 'infl',  header: null },
  { id: 'card',  header: null },
  { id: 'lip',   header: null },
  { id: 'otrosB', header: null },
  { id: 'pgr',   header: 'PROTEINOGRAMA' },
  { id: 'gaso',  header: 'GASOMETRÍA' },
  { id: 'orina', header: 'ORINA', summary: true },
  { id: 'sed',   header: 'SEDIMENTO', summary: true },
  { id: 'heces', header: 'HECES' },
  { id: 'otros', header: 'OTROS' }
];

// nivel 1 = siempre; 2 = solo si alterado; 3 = solo con "mostrar todo".
// Alias: nombres tal como pueden venir en el informe (catalán/castellano). Se comparan
// sin acentos, sin prefijos de muestra (Srm-, Pac-, Uri-...) y sin paréntesis.
// pctOf: la prueba es el % de otra y se fusiona en su línea.
// dependsOn: si la prueba indicada no está alterada, esta cuenta como nivel 2 (solo se ve si está alterada).
// text: el resultado es texto libre ("Claro", "Células epiteliales: Moderadas") y se copia tal cual.
var TESTS = [
  // Hemograma
  { key: 'hties', label: 'Hematíes', group: 'hemo', level: 2, alias: ['recuento de hematies', 'recompte d hematies', 'hematies', 'hematíes', 'eritrocitos', 'globulos rojos', 'rbc'] },
  { key: 'hb', label: 'Hemoglobina', group: 'hemo', level: 1, alias: ['hemoglobina', 'hb', 'hgb'] },
  { key: 'hto', label: 'Hematocrito', group: 'hemo', level: 1, alias: ['hematocrit', 'hematocrito', 'hto', 'hct'] },
  { key: 'vcm', label: 'VCM', group: 'hemo', level: 1, dependsOn: 'hb', alias: ['volum corpuscular mig', 'volumen corpuscular medio', 'vcm', 'mcv'] },
  { key: 'hcm', label: 'HCM', group: 'hemo', level: 1, dependsOn: 'hb', alias: ['hemoglobina corpuscular mitja', 'hemoglobina corpuscular media', 'hb corpuscular media', 'hcm', 'mch'] },
  { key: 'chcm', label: 'CHCM', group: 'hemo', level: 1, dependsOn: 'hb', alias: ['concentracio hgb corpuscular mitja', 'concentracion hgb corpuscular media', 'concentracion de hemoglobina corpuscular media', 'conc hb corpuscular media', 'chcm', 'mchc'] },
  { key: 'ade', label: 'ADE', group: 'hemo', level: 3, alias: ['ample distribucio eritrocits', 'amplitud distribucion eritrocitaria', 'ind distribucion hematies', 'ade', 'rdw'] },
  { key: 'eritrob', label: 'Eritroblastos', group: 'hemo', level: 3, alias: ['eritroblastes f', 'eritroblastes c', 'eritroblastos'] },
  { key: 'leu', label: 'Leucocitos', group: 'hemo', level: 1, alias: ['leucocitos totales', 'recuento leucocitario', 'recompte de leucocits', 'leucocits', 'leucocitos', 'wbc'] },
  { key: 'neu', label: 'Neutrófilos', group: 'hemo', level: 1, alias: ['neutrofils', 'neutrofilos', 'neutrofils segmentats', 'neutrofilos segmentados', 'neu'] },
  { key: 'neu%', pctOf: 'neu', alias: ['neutrofils %', 'neutrofilos %', '% neutrofilos', 'neu %', 'neutrofils segmentats %', 'neutrofilos segmentados %'] },
  { key: 'cay', label: 'Cayados', group: 'hemo', level: 2, alias: ['neutrofilos cayados', 'neutrofils en banda', 'cayados'] },
  { key: 'cay%', pctOf: 'cay', alias: ['neutrofilos cayados %', 'cayados %'] },
  { key: 'lin', label: 'Linfocitos', group: 'hemo', level: 1, alias: ['limfocits', 'linfocitos', 'lin', 'lym'] },
  { key: 'lin%', pctOf: 'lin', alias: ['limfocits %', 'linfocitos %', '% linfocitos', 'lin %', 'lym %'] },
  { key: 'mon', label: 'Monocitos', group: 'hemo', level: 2, alias: ['monocits', 'monocitos', 'mon', 'mono'] },
  { key: 'mon%', pctOf: 'mon', alias: ['monocits %', 'monocitos %', '% monocitos', 'mon %'] },
  { key: 'eos', label: 'Eosinófilos', group: 'hemo', level: 2, alias: ['eosinofils', 'eosinofilos', 'eos'] },
  { key: 'eos%', pctOf: 'eos', alias: ['eosinofils %', 'eosinofilos %', '% eosinofilos', 'eos %'] },
  { key: 'bas', label: 'Basófilos', group: 'hemo', level: 2, alias: ['basofils', 'basofilos', 'bas', 'baso'] },
  { key: 'bas%', pctOf: 'bas', alias: ['basofils %', 'basofilos %', '% basofilos', 'bas %'] },
  { key: 'plq', label: 'Plaquetas', group: 'hemo', level: 1, alias: ['recuento de plaquetas', 'recompte de plaquetes', 'plaquetes', 'plaquetas', 'plt'] },
  { key: 'vpm', label: 'VPM', group: 'hemo', level: 3, alias: ['volum plaquetari mig', 'volumen plaquetar medio', 'volumen plaquetario medio', 'vpm', 'mpv'] },
  { key: 'pctc', label: 'Plaquetocrito', group: 'hemo', level: 3, alias: ['plaquetocrito', 'plaquetocrit', 'pct plaquetas'] },
  { key: 'idp', label: 'IDP', group: 'hemo', level: 3, alias: ['ind distribucion plaquetas', 'indice distribucion plaquetas', 'pdw'] },
  // Coagulación
  { key: 'tp', label: 'TP', group: 'coag', level: 1, alias: ['temps de protrombina', 'tiempo de protrombina', 'tp', 'quick', 'activitat de protrombina', 'actividad de protrombina', 'actividad tromboplastinica tp'] },
  { key: 'tp_s', label: 'TP (s)', group: 'coag', level: 3, alias: ['tiempo paciente tp'] },
  { key: 'tp_r', label: 'TP ratio', group: 'coag', level: 3, alias: ['ratio tp'] },
  { key: 'inr', label: 'INR', group: 'coag', level: 1, alias: ['inr', 'temps de protrombina inr', 'tiempo de protrombina inr', 'inr tp'] },
  { key: 'ttpa', label: 'TTPa', group: 'coag', level: 1, alias: ['ttpa', 'aptt', 'temps de tromboplastina parcial activada', 'tiempo de tromboplastina parcial activada', 'ttpa ratio', 'ratio ttpa'] },
  { key: 'ttpa_s', label: 'TTPa (s)', group: 'coag', level: 3, alias: ['tiempo paciente ttpa'] },
  { key: 'fib', label: 'Fibrinógeno', group: 'coag', level: 1, alias: ['fibrinogen', 'fibrinogeno'] },
  { key: 'dd', label: 'Dímero D', group: 'coag', level: 1, alias: ['dimer d', 'dimero d', 'd dimer', 'd dimero'] },
  // Renal / glucosa
  { key: 'glu', label: 'Glucosa', group: 'renal', level: 1, alias: ['glucosa basal', 'glucosa en ayunas', 'glucosa', 'glucose', 'glicemia', 'glucemia'] },
  { key: 'urea', label: 'Urea', group: 'renal', level: 1, alias: ['urea'] },
  { key: 'cr', label: 'Creatinina', group: 'renal', level: 1, alias: ['creatinini', 'creatinina', 'creatinine'] },
  { key: 'fg', label: 'TFG (CKD-EPI)', group: 'renal', level: 1, alias: ['filtrado glomerular estimado', 'filtrat glomerular estimat', 'tfg ckd epi', 'filtrado glomerular ckd epi', 'filtrat glomerular', 'filtrado glomerular', 'tfg', 'fge', 'egfr', 'fg'] },
  { key: 'urico', label: 'Ácido úrico', group: 'renal', level: 1, alias: ['urat', 'urato', 'acid uric', 'acido urico'] },
  // Iones
  { key: 'na', label: 'Sodio', group: 'iones', level: 1, alias: ['sodi', 'sodio', 'sodio ion', 'na'] },
  { key: 'k', label: 'Potasio', group: 'iones', level: 1, alias: ['potassi', 'potasio', 'potasio ion', 'k'] },
  { key: 'cl', label: 'Cloro', group: 'iones', level: 1, alias: ['clorur', 'cloruro', 'cloro', 'cloro ion', 'cloruro ion', 'cl'] },
  { key: 'ca', label: 'Calcio', group: 'iones', level: 1, alias: ['calci', 'calcio', 'ca'] },
  { key: 'ca_ion', label: 'Calcio iónico', group: 'iones', level: 1, alias: ['calcio ionico', 'calcio ionizado', 'calci ionic', 'ca ionico'] },
  { key: 'ag', label: 'Anión gap', group: 'iones', level: 1, alias: ['anion gap', 'hiato anionico', 'brecha anionica', 'anio gap'] },
  { key: 'mg', label: 'Magnesio', group: 'iones', level: 1, alias: ['magnesi', 'magnesio', 'mg'] },
  { key: 'p', label: 'Fósforo', group: 'iones', level: 1, alias: ['fosfat', 'fosfato', 'fosfor', 'fosforo'] },
  // Hepático
  { key: 'ast', label: 'AST (GOT)', group: 'hep', level: 1, alias: ['transaminasa got', 'transaminasa ast', 'got ast', 'aspartat aminotransferasa', 'aspartato aminotransferasa', 'ast', 'got', 'ast got'] },
  { key: 'alt', label: 'ALT (GPT)', group: 'hep', level: 1, alias: ['transaminasa gpt', 'transaminasa alt', 'gpt alt', 'alanina aminotransferasa', 'alt', 'gpt', 'alt gpt'] },
  { key: 'ggt', label: 'GGT', group: 'hep', level: 1, alias: ['gamma gt', 'gamma glutamiltransferasa', 'gamma glutamil transferasa', 'ggt'] },
  { key: 'fa', label: 'FA', group: 'hep', level: 1, alias: ['fosfatasa alcalina', 'fa', 'alp'] },
  { key: 'bt', label: 'Bilirrubina total', group: 'hep', level: 1, alias: ['bilirubina', 'bilirubina total', 'bilirrubina', 'bilirrubina total'] },
  { key: 'bd', label: 'Bilirrubina directa', group: 'hep', level: 1, alias: ['bilirubina conjugada', 'bilirubina directa', 'bilirrubina directa', 'bilirrubina conjugada'] },
  { key: 'alb', label: 'Albúmina', group: 'hep', level: 1, alias: ['albumina'] },
  { key: 'prot', label: 'Proteínas totales', group: 'hep', level: 1, alias: ['proteina', 'proteines totals', 'proteinas totales', 'proteina total'] },
  // Páncreas
  { key: 'amil', label: 'Amilasa', group: 'panc', level: 1, alias: ['amilasa', 'alfa amilasa'] },
  { key: 'lip', label: 'Lipasa', group: 'panc', level: 1, alias: ['lipasa'] },
  // Inflamación
  { key: 'pcr', label: 'PCR', group: 'infl', level: 1, alias: ['proteina c reactiva', 'pcr', 'crp'] },
  { key: 'pct', label: 'PCT', group: 'infl', level: 1, alias: ['procalcitonina', 'pct'] },
  { key: 'vsg', label: 'VSG', group: 'infl', level: 1, alias: ['vsg', 'velocitat de sedimentacio globular', 'velocidad de sedimentacion globular'] },
  { key: 'pbd', label: 'Paul-Bunnell', group: 'infl', level: 1, alias: ['reaccion de paul bunell davison', 'reaccion de paul bunnell davidsohn', 'reaccion de paul bunnell', 'paul bunnell davidsohn', 'paul bunell davison', 'paul bunnell', 'paul bunell', 'monotest', 'anticuerpos heterofilos', 'ac heterofilos'] },
  // Cardíaco / muscular
  { key: 'ck', label: 'CK', group: 'card', level: 1, alias: ['creatina cinasa', 'creatina quinasa', 'creatincinasa', 'creatinin kinasa', 'creatinina kinasa', 'creatin kinasa', 'creatina kinasa', 'creatin quinasa', 'creatinin quinasa', 'creatina fosfoquinasa', 'creatinfosfoquinasa', 'ck total', 'ck', 'cpk'] },
  { key: 'ldh', label: 'LDH', group: 'card', level: 1, alias: ['lactat deshidrogenasa', 'lactato deshidrogenasa', 'ldh'] },
  { key: 'tnt', label: 'Troponina T us', group: 'card', level: 1, alias: ['troponina t', 'troponina t ultrasensible', 'troponina t de alta sensibilidad', 'tnt', 'hs tnt', 'tnths'] },
  { key: 'tni', label: 'Troponina I us', group: 'card', level: 1, alias: ['troponina i', 'troponina i ultrasensible', 'tni', 'hs tni'] },
  { key: 'bnp', label: 'NT-proBNP', group: 'card', level: 1, alias: ['nt probnp', 'propeptid natriuretic cerebral n terminal', 'propeptido natriuretico cerebral n terminal', 'precursor del peptido natriuretico cerebral', 'nt pro bnp', 'bnp'] },
  // Lípidos
  { key: 'ct', label: 'Colesterol total', group: 'lip', level: 1, alias: ['colesterol', 'colesterol total'] },
  { key: 'hdl', label: 'HDL', group: 'lip', level: 1, alias: ['colesterol d hdl', 'colesterol hdl', 'hdl colesterol', 'hdl'] },
  { key: 'ldl', label: 'LDL', group: 'lip', level: 1, alias: ['colesterol ldl calculado', 'ldl calculado', 'colesterol ldl calcul', 'colesterol d ldl', 'colesterol ldl', 'ldl colesterol', 'ldl'] },
  { key: 'tg', label: 'Triglicéridos', group: 'lip', level: 1, alias: ['triglicerid', 'triglicerids', 'trigliceridos'] },
  // Otros bioquímica
  { key: 'hba1c', label: 'HbA1c', group: 'otrosB', level: 1, alias: ['hemoglobina a1c', 'hemoglobina glicada', 'hemoglobina glicosilada', 'hba1c'] },
  { key: 'hba1c%', pctOf: 'hba1c', alias: ['hemoglobina a1c %', 'hba1c %'] },
  { key: 'tsh', label: 'TSH', group: 'otrosB', level: 1, alias: ['tirotropina', 'tsh'] },
  { key: 't4l', label: 'T4 libre', group: 'otrosB', level: 1, alias: ['tiroxina lliure', 'tiroxina libre', 't4 lliure', 't4 libre', 't 4 libre', 't4l'] },
  { key: 't3', label: 'T3 total', group: 'otrosB', level: 1, alias: ['t 3 total', 't3 total', 'triiodotironina total'] },
  { key: 'atg', label: 'Ac anti-TG', group: 'otrosB', level: 1, alias: ['tiroglobulina anticuerpos', 'anticuerpos antitiroglobulina', 'anti tg'] },
  { key: 'atpo', label: 'Ac anti-TPO', group: 'otrosB', level: 1, alias: ['microsomales anticuerpos', 'anticuerpos antiperoxidasa', 'anti tpo'] },
  { key: 'fe', label: 'Hierro', group: 'otrosB', level: 1, alias: ['hierro', 'ferro', 'sideremia'] },
  { key: 'trf', label: 'Transferrina', group: 'otrosB', level: 1, alias: ['transferrina'] },
  { key: 'ferr', label: 'Ferritina', group: 'otrosB', level: 1, alias: ['ferritina'] },
  { key: 'b12', label: 'Vitamina B12', group: 'otrosB', level: 1, alias: ['vitamina b12', 'cobalamina'] },
  { key: 'fol', label: 'Ácido fólico', group: 'otrosB', level: 1, alias: ['acido folico', 'folato'] },
  { key: 'vitd', label: 'Vitamina D', group: 'otrosB', level: 1, alias: ['vitamina d', '25 oh vitamina d'] },
  { key: 'cea', label: 'CEA', group: 'otrosB', level: 1, alias: ['cea', 'antigeno carcinoembrionario'] },
  { key: 'bhcg', label: 'β-hCG', group: 'otrosB', level: 1, alias: ['gonadotropina corionica', 'gonadotropina corionica beta', 'bhcg', 'hcg', 'beta hcg'] },
  { key: 'etanol', label: 'Etanol', group: 'otrosB', level: 1, alias: ['etanol', 'alcohol'] },
  // Proteinograma (sección "PROTEINOGRAMA, SUERO": prefijo interno "Pgr-")
  { key: 'pg_ag', label: 'Cociente A/G', group: 'pgr', level: 1, alias: ['pgr cociente a/g', 'pgr cociente albumina globulina'] },
  { key: 'pg_alb', label: 'Albúmina', group: 'pgr', level: 1, alias: ['pgr albumina'] },
  { key: 'pg_alb%', pctOf: 'pg_alb', alias: ['pgr albumina %'] },
  { key: 'pg_a1', label: 'Alfa1', group: 'pgr', level: 1, alias: ['pgr alfa1 globulina', 'pgr alfa 1 globulina'] },
  { key: 'pg_a1%', pctOf: 'pg_a1', alias: ['pgr alfa1 globulina %', 'pgr alfa 1 globulina %'] },
  { key: 'pg_a2', label: 'Alfa2', group: 'pgr', level: 1, alias: ['pgr alfa2 globulina', 'pgr alfa 2 globulina'] },
  { key: 'pg_a2%', pctOf: 'pg_a2', alias: ['pgr alfa2 globulina %', 'pgr alfa 2 globulina %'] },
  { key: 'pg_b', label: 'Beta', group: 'pgr', level: 1, alias: ['pgr beta globulina'] },
  { key: 'pg_b%', pctOf: 'pg_b', alias: ['pgr beta globulina %'] },
  { key: 'pg_g', label: 'Gamma', group: 'pgr', level: 1, alias: ['pgr gamma globulina'] },
  { key: 'pg_g%', pctOf: 'pg_g', alias: ['pgr gamma globulina %'] },
  // Gasometría
  { key: 'ph', label: 'pH', group: 'gaso', level: 1, alias: ['ph'] },
  { key: 'pco2', label: 'pCO2', group: 'gaso', level: 1, alias: ['pco2', 'pvco2', 'paco2', 'presion parcial de co2', 'presion parcial co2'] },
  { key: 'po2', label: 'pO2', group: 'gaso', level: 1, alias: ['po2', 'pvo2', 'pao2', 'presion parcial de o2', 'presion parcial o2', 'presion parcial de oxigeno'] },
  { key: 'hco3', label: 'HCO3', group: 'gaso', level: 1, alias: ['hco3', 'bicarbonat', 'bicarbonato', 'bicarbonat actual', 'bicarbonato actual'] },
  { key: 'eb', label: 'EB', group: 'gaso', level: 1, alias: ['exces de base', 'exceso de base', 'exces de bases', 'exceso de bases', 'eb', 'be'] },
  { key: 'co2t', label: 'CO2 total', group: 'gaso', level: 2, alias: ['co2 total', 'co2t', 'tco2'] },
  { key: 'so2', label: 'SatO2', group: 'gaso', level: 1, alias: ['saturacion de oxigeno', 'saturacio d oxigen', 'saturacion de o2', 'saturacion o2', 'so2', 'sato2', 'sat o2'] },
  { key: 'o2hb', label: 'OxiHb', group: 'gaso', level: 2, alias: ['oxihemoglobina', 'o2hb', 'fo2hb'] },
  { key: 'cohb', label: 'COHb', group: 'gaso', level: 1, alias: ['carboxihemoglobina', 'cohb', 'fcohb'] },
  { key: 'methb', label: 'MetaHb', group: 'gaso', level: 1, alias: ['metahemoglobina', 'methb', 'fmethb'] },
  { key: 'lact', label: 'Lactato', group: 'gaso', level: 1, alias: ['lactat', 'lactato', 'acido lactico', 'acido lactico poc'] },
  // Orina
  // Tira y sedimento: todos los campos salen siempre, con su resultado (petición de Alejandro). Orden del informe.
  { key: 'u_asp', label: 'Aspecto', group: 'orina', level: 1, text: true, alias: ['u aspecto', 'u aspecte'] },
  { key: 'u_color', label: 'Color', group: 'orina', level: 1, text: true, alias: ['u color'] },
  { key: 'u_dens', label: 'Densidad', group: 'orina', level: 1, alias: ['u densitat', 'u densidad', 'densitat', 'densidad'] },
  { key: 'u_ph', label: 'pH', group: 'orina', level: 1, alias: ['u ph'] },
  { key: 'u_prot', label: 'Proteínas', group: 'orina', level: 1, alias: ['u proteines', 'u proteinas'] },
  { key: 'u_glu', label: 'Glucosa', group: 'orina', level: 1, alias: ['u glucosa'] },
  { key: 'u_cet', label: 'Cuerpos cetónicos', group: 'orina', level: 1, alias: ['u cossos cetonics', 'u cuerpos cetonicos', 'cossos cetonics', 'cuerpos cetonicos'] },
  { key: 'u_bil', label: 'Bilirrubina', group: 'orina', level: 1, alias: ['u bilirrubina', 'u bilirubina'] },
  { key: 'u_hem', label: 'Sangre', group: 'orina', level: 1, alias: ['u hematies', 'u hemoglobina', 'u sang', 'u sangre'] },
  { key: 'u_nit', label: 'Nitritos', group: 'orina', level: 1, alias: ['u nitrits', 'u nitritos', 'nitrits', 'nitritos'] },
  { key: 'u_urob', label: 'Urobilinógeno', group: 'orina', level: 1, alias: ['u urobilinogeno', 'u urobilinogen'] },
  { key: 'u_leu', label: 'Leucocitos', group: 'orina', level: 1, alias: ['u leucocits', 'u leucocitos', 'leucocit esterasa', 'leucocito esterasa'] },
  { key: 'u_thc', label: 'Cannabinoides', group: 'orina', level: 1, alias: ['u cannabinoides', 'cannabinoides', 'thc'] },
  { key: 'u_coc', label: 'Cocaína', group: 'orina', level: 1, alias: ['u cocaina', 'cocaina'] },
  { key: 'u_anf', label: 'Anfetaminas', group: 'orina', level: 1, alias: ['u amfetamines', 'u anfetaminas', 'amfetamines', 'anfetaminas'] },
  { key: 'u_opi', label: 'Opiáceos', group: 'orina', level: 1, alias: ['u opiacis', 'u opiaceos', 'opiacis', 'opiaceos'] },
  { key: 'u_cult', label: 'Urocultivo', group: 'orina', level: 1, text: true, alias: ['u cultivo orina', 'u urocultivo'] },
  { key: 'u_germ', label: 'Germen', group: 'orina', level: 2, text: true, alias: ['u identificacion orina', 'u identificacion'] },
  { key: 'u_bzd', label: 'Benzodiacepinas', group: 'orina', level: 1, alias: ['u benzodiazepines', 'u benzodiacepinas', 'benzodiazepines', 'benzodiacepinas'] },
  // Sedimento de orina (sección "SEDIMENTO, ORINA": las líneas llevan el prefijo interno "Sed-")
  { key: 's_res', label: 'Sedimento', group: 'sed', level: 1, text: true, alias: ['sed sedimento orina', 'sed sedimento'] },
  { key: 's_leu', label: 'Leucocitos', group: 'sed', level: 1, text: true, alias: ['sed leucocitos'] },
  { key: 's_hties', label: 'Hematíes', group: 'sed', level: 1, text: true, alias: ['sed hematies'] },
  { key: 's_tric', label: 'Trichomonas', group: 'sed', level: 1, text: true, alias: ['sed trichomonas'] },
  { key: 's_flora', label: 'Flora', group: 'sed', level: 1, text: true, alias: ['sed flora polimorfa', 'sed flora', 'sed bacterias'] },
  { key: 's_lev', label: 'Levaduras', group: 'sed', level: 1, text: true, alias: ['sed levaduras'] },
  { key: 's_cel', label: 'Células', group: 'sed', level: 1, text: true, alias: ['sed celulas'] },
  { key: 's_cil', label: 'Cilindros', group: 'sed', level: 1, text: true, alias: ['sed cilindros'] },
  { key: 's_cri', label: 'Cristales', group: 'sed', level: 1, text: true, alias: ['sed cristales'] },
  // Heces
  { key: 'rota', label: 'Ag rotavirus', group: 'heces', level: 1, alias: ['rotavirus antigeno', 'antigeno rotavirus', 'rotavirus'] },
  { key: 'adeno', label: 'Ag adenovirus', group: 'heces', level: 1, alias: ['adenovirus antigeno', 'antigeno adenovirus', 'adenovirus'] }
];

// Prefijos de tipo de muestra que pone el laboratorio delante del nombre.
// "Uri-" se conserva en la clave ("u ...") para distinguir, por ejemplo, el pH de orina del de gasometría.
var SAMPLE_PREFIX = /^(srm|ser|pac|san|sang|pla|plasma|sgv|sga|sgvm|sgart|ort|hec|lcr)\s*[-:.]\s*/i;
var URINE_PREFIX = /^(uri|ori|orina|u)\s*[-:.]\s*/i;
// Prefijos internos de sección para pruebas con nombres repetidos (leucocitos del sedimento, albúmina del proteinograma).
var SED_PREFIX = /^(sed|pgr)\s*[-:.]\s*/i;

// Coletillas que no cambian la prueba ("Lipasa sérica", "Calcio en suero").
var QUALIFIER = /\s+(serica|serico|serics|en suero|en serum|suero|serum|en sang|en sangre|sangre|sang|plasmatica|plasmatico|en plasma|plasma|total en suero|en sangre venosa|en sangre arterial|sangre venosa|sangre arterial|venosa|venoso|arterial|capilar)$/;

var QUALI = {
  negatiu: 'Negativo', negativo: 'Negativo', negativa: 'Negativo', neg: 'Negativo',
  positiu: 'Positivo', positivo: 'Positivo', positiva: 'Positivo', pos: 'Positivo',
  normal: 'Normal', indetectable: 'Indetectable', 'no': 'No detectado',
  'no procede': 'No procede',
  presencia: 'Presencia', ausencia: 'Ausencia'
};
// Semicuantitativos: "3+", "++", "3-5" (por campo).
var SEMI = /^(\d+-\d+|\d?\++|\+-|±)$/;
var SEMI_NEG = /^0(-[0-2])?$/;
// Marcas de alterado. Las flechas del PDF a veces se copian con la fuente Symbol: ¯ = ↓, ­ (guion blando) = ↑.
var FLAG = /^[(\[]?(↑|↓|¯|­|\*+|H{1,2}|L{1,2}|\+|>>|<<)[)\]]?$/;
var NUM = /^[<>≤≥]?=?-?\d+(?:[.,]\d+)?$/;
var RANGE = /[(\[]?\s*(-?\d+(?:[.,]\d+)?)\s*-\s*(\d+(?:[.,]\d+)?)\s*[)\]]?\s*$/;
var LIMIT = /[(\[]?\s*([<>≤≥]=?)\s*(\d+(?:[.,]\d+)?)\s*[)\]]?\s*$/;
// Rango antes de la unidad: "11.2 13.0-17.0 g/dL".
var RANGE_MID = /(^|\s)[(\[]?(-?\d+(?:[.,]\d+)?)\s*-\s*(\d+(?:[.,]\d+)?)[)\]]?(?=\s|$)/;
var LIMIT_MID = /(^|\s)[(\[]?([<>≤≥]=?)\s*(\d+(?:[.,]\d+)?)[)\]]?(?=\s|$)/;
// Tramo de edad con su rango: "< 18 Años 59.4 - 101", "3 - 18 Años 6.00 - 8.00", "4 días - 14 años: 38.0 - 54.0".
var AGE_U = '(a[ñn]os|anys|meses|mesos|d[ií]as|dies)';
var STRATUM = new RegExp('(?:([<>≤≥]=?)\\s*(\\d+)|(\\d+)\\s*' + AGE_U + '?\\s*-\\s*(\\d+))\\s*' + AGE_U + '\\s*:?\\s+(\\d+(?:[.,]\\d+)?)\\s*-\\s*(\\d+(?:[.,]\\d+)?)', 'i');
var RANGE_FIRST = /^\s*[(\[]?\s*(-?\d+(?:[.,]\d+)?)\s*-\s*(\d+(?:[.,]\d+)?)\s*[)\]]?\s+(.+)$/;
// 7.500 /µL son 7500 (punto de miles); 7.500 x10E9/L son 7,5 (punto decimal).
var THOUSANDS = /^\d{1,3}(?:\.\d{3})+$/;
var PER_MICROLITRE = /\/\s*(?:µ|μ|u)l\b|\/\s*mm3|\/\s*mm³/i;

function norm(s) {
  var t = s.toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/l·l/g, 'll')
    .replace(/[^a-z0-9%]+/g, ' ')
    .replace(/\s+/g, ' ').trim();
  // "V.C.M." -> "v c m" -> "vcm"
  var out = [], run = '';
  t.split(' ').forEach(function (w) {
    if (w.length === 1 && /[a-z]/.test(w)) { run += w; return; }
    if (run) { out.push(run); run = ''; }
    out.push(w);
  });
  if (run) out.push(run);
  return out.join(' ');
}

function cleanName(s) { return s.replace(/\s*:\s*$/, '').trim(); }

// Claves de búsqueda de un nombre, de más a menos específica. Las 3 primeras llevan el prefijo "u " si es de orina;
// el resto (sin prefijo) solo vale para pruebas de orina.
function nameKeys(raw) {
  var s = raw.trim(), urine = false, pre = '';
  s = s.replace(SAMPLE_PREFIX, '');
  var sm = s.match(SED_PREFIX);
  if (sm) { pre = sm[1].toLowerCase() + ' '; s = s.replace(SED_PREFIX, ''); }
  else if (URINE_PREFIX.test(s)) { urine = true; pre = 'u '; s = s.replace(URINE_PREFIX, ''); }
  // El paréntesis se descarta, salvo que indique porcentaje: "Neutròfils (%)".
  var withPct = s.replace(/\(([^)]*)\)/g, function (m, inner) { return /%/.test(inner) ? ' % ' : ' '; });
  var plain = s.replace(/\([^)]*\)/g, ' ');
  var base = [norm(s), norm(withPct), norm(plain)].map(function (k) { return k.replace(QUALIFIER, ''); });
  var keys = base.map(function (k) { return pre + k; });
  if (urine) keys = keys.concat(base);
  return { keys: keys, urine: urine };
}

var ALIAS = {};
TESTS.forEach(function (t) {
  t.alias.forEach(function (a) { ALIAS[norm(a)] = t; });
});

var HAS_PCT = {};
TESTS.forEach(function (t) { if (t.pctOf) HAS_PCT[t.pctOf] = true; });

function lookup(raw) {
  raw = cleanName(raw);
  if (!/[a-zA-Zà-úÀ-Ú]/.test(raw) || /:/.test(raw)) return null;
  var nk = nameKeys(raw);
  for (var i = 0; i < nk.keys.length; i++) {
    var t = ALIAS[nk.keys[i]];
    if (!t) continue;
    // "Uri-Creatinina" no es la creatinina sérica: sin alias propio de orina, no se acepta la de sangre.
    if (nk.urine && i >= 3 && t.group !== 'orina') continue;
    return t;
  }
  return null;
}

function isValueTok(t) { return NUM.test(t) || SEMI.test(t) || QUALI.hasOwnProperty(norm(t)); }

function num(s) { return parseFloat(String(s).replace(',', '.').replace(/^[<>≤≥]=?/, '')); }

// Separa el resto de la línea (tras el nombre) en valor, marca, unidades y rango.
function parseRest(toks) {
  var flag = false, i = 0;
  while (i < toks.length && (FLAG.test(toks[i]) || (!/[\p{L}\p{N}]/u.test(toks[i]) && !SEMI.test(toks[i])))) {
    if (FLAG.test(toks[i])) flag = true;
    i++;
  }
  if (i >= toks.length || !isValueTok(toks[i])) return null;
  var value = toks[i++];
  if (QUALI.hasOwnProperty(norm(value)) || SEMI.test(value)) {
    for (var q = i; q < toks.length; q++) if (FLAG.test(toks[q])) flag = true;
    return { value: value, flag: flag, unit: '', range: null, quali: true, semi: SEMI.test(value) };
  }
  while (i < toks.length && FLAG.test(toks[i])) { flag = true; i++; }
  var tail = toks.slice(i).join(' ');
  var unit = tail, kind = null, cmp = null, a = null, b = null, m, strata = null;
  if ((m = tail.match(STRATUM))) {
    // Rango según la edad ("< 18 Años 59.4 - 101"): se elige al final, cuando se conoce la edad del paciente.
    strata = [stratum(m)]; unit = tail.slice(0, m.index);
  }
  else if ((m = tail.match(RANGE))) { kind = 'range'; a = m[1]; b = m[2]; unit = tail.slice(0, m.index); }
  else if ((m = tail.match(LIMIT))) { kind = 'limit'; cmp = m[1]; a = m[2]; unit = tail.slice(0, m.index); }
  else if ((m = tail.match(RANGE_FIRST))) { kind = 'range'; a = m[1]; b = m[2]; unit = m[3]; }
  // Unidad repetida detrás del rango: "12.3 g/dL 12.0 - 16.0 g/dL", "0 % < 4.00 %".
  // Solo si lo que sigue al rango es la misma unidad que lo precede: así no se toma por rango
  // un texto cualquiera con números ("Població adulta <200 mg/dL Homes").
  else if ((m = midRange(tail))) {
    if (/^[<>≤≥]/.test(m[2])) { kind = 'limit'; cmp = m[2]; a = m[3]; } else { kind = 'range'; a = m[2]; b = m[3]; }
    unit = m.unit;
  }
  // Una marca puede ir entre la unidad y el rango ("mg/dL H 70 - 110").
  var u = unit.split(/\s+/).filter(Boolean);
  while (u.length && FLAG.test(u[u.length - 1])) { flag = true; u.pop(); }
  while (u.length && FLAG.test(u[0])) { flag = true; u.shift(); }
  unit = u.join(' ').replace(/[.\s]+$/, '').trim();
  // Comentario del laboratorio detrás de la unidad ("678 pg/mL Población general:"): se queda la unidad, sin rango.
  if (!isUnit(unit) && !kind && !strata && /[\/%]/.test(u[0] || '')) unit = u[0];
  if (!isUnit(unit)) return null;
  var thou = THOUSANDS.test(value) && PER_MICROLITRE.test(unit) && !/10\s*[\^eE*]/.test(unit);
  function n(s) { return thou && THOUSANDS.test(s) ? s.replace(/\./g, '') : s; }
  value = n(value);
  var range = null;
  if (kind === 'range') {
    var lo = n(a), hi = n(b);
    range = { lo: num(lo), hi: num(hi), text: (num(lo) < 0 ? lo + ' a ' + hi : lo + '-' + hi).replace(/,/g, '.') };
  } else if (kind === 'limit') {
    var lim = n(a), isMax = cmp[0] === '<' || cmp[0] === '≤';
    range = isMax ? { hi: num(lim), text: cmp + fmtValue(lim) } : { lo: num(lim), text: cmp + fmtValue(lim) };
  }
  return { value: value, flag: flag, unit: unit, range: range, strata: strata };
}

// Una unidad es corta: "mg/dL", "10^Exp12^/L", "mL/min/1.73 m2", "seg". Así un número seguido de texto
// (un número de petición y un nombre, "1 de 3") no se toma por resultado.
var UNIT_WORDS = /^(seg|segundos|sec|mmhg|anys|años|copias|ufc|campo|cpo|ratio)$/i;
function isUnit(u) {
  if (!u) return true;
  var w = u.split(/\s+/);
  if (w.length > 2) return false;
  return w.every(function (x) { return /[\/%^\d³µμ]/.test(x) || x.length <= 4 || UNIT_WORDS.test(x.replace(/\.$/, '')); });
}

function midRange(tail) {
  var m = tail.match(RANGE_MID) || tail.match(LIMIT_MID);
  if (!m) return null;
  var before = tail.slice(0, m.index).trim(), after = tail.slice(m.index + m[0].length).trim();
  if (!before || (after && before !== after)) return null;
  m.unit = before;
  return m;
}

// Resultado de texto libre ("Claro", "Células epiteliales: Moderadas.").
function parseText(toks) {
  var flag = false, i = 0;
  while (i < toks.length && FLAG.test(toks[i])) { flag = true; i++; }
  var value = toks.slice(i).join(' ').replace(/\.+$/, '').trim();
  if (!value) return null;
  if (QUALI.hasOwnProperty(norm(value)) || SEMI.test(value)) return { value: value, flag: flag, unit: '', range: null, quali: true, semi: SEMI.test(value) };
  return { value: value, flag: flag, unit: '', range: null, text: true };
}

// Edad en años según la unidad del informe.
function years(n, unit) {
  unit = norm(unit || 'a');
  return /^mes/.test(unit) ? n / 12 : /^d/.test(unit) ? n / 365 : n;
}
function stratum(m) {
  var s = { lo: m[7], hi: m[8] }, u = m[6];
  if (m[1]) {
    var age = years(num(m[2]), u);
    if (m[1][0] === '<' || m[1][0] === '≤') { s.min = 0; s.max = age; } else { s.min = age; s.max = Infinity; }
  } else {
    // "3 - 18 Años" incluye hasta los 18 años y 364 días.
    s.min = years(num(m[3]), m[4] || u);
    s.max = years(num(m[5]) + 1, u);
  }
  return s;
}

// Intenta reconocer una prueba al inicio de la línea, probando del nombre más largo al más corto.
function matchLine(toks) {
  for (var k = toks.length; k >= 1; k--) {
    var t = lookup(toks.slice(0, k).join(' '));
    if (!t) continue;
    var name = cleanName(toks.slice(0, k).join(' '));
    var restToks = toks.slice(k);
    if (!restToks.length) return { test: t, name: name, pending: true };
    var r = t.text ? parseText(restToks) : parseRest(restToks);
    if (r) return { test: t, name: name, res: r };
  }
  return null;
}

// Pruebas que no están en el diccionario. Se aceptan con "nombre valor unidad a - b" o, si el nombre lleva
// prefijo de muestra (Srm-, Uri-...), con valor y unidad (o resultado cualitativo) aunque no haya rango.
function matchUnknown(toks) {
  var prefixed = SAMPLE_PREFIX.test(toks[0]) || URINE_PREFIX.test(toks[0]) || SED_PREFIX.test(toks[0]);
  for (var k = 1; k < toks.length; k++) {
    if (!NUM.test(toks[k]) && !FLAG.test(toks[k]) && !(prefixed && QUALI.hasOwnProperty(norm(toks[k])))) continue;
    var name = cleanName(toks.slice(0, k).join(' '));
    if (!/^[A-Za-zÀ-ú]/.test(name) || /[:\/]/.test(name) || name.length < 3) return null;
    var r = parseRest(toks.slice(k));
    if (!r) return null;
    var full = r.range && r.range.lo !== undefined && r.range.hi !== undefined;
    if ((full && r.unit) || (prefixed && (r.unit || r.quali))) {
      return { test: null, name: name.replace(SAMPLE_PREFIX, '').replace(SED_PREFIX, ''), res: r };
    }
    return null;
  }
  return null;
}

function isAltered(res) {
  if (res.flag) return true;
  var q = QUALI[norm(res.value)];
  if (q) return q === 'Positivo';
  if (res.semi) return /^\d?\++$/.test(res.value);
  if (res.text) return false;
  if (res.range && res.range.neg) return !/^[<≤]/.test(res.value) && num(res.value) > 0;
  if (/^[<>≤≥]/.test(res.value) || !res.range) return false;
  var v = num(res.value);
  if (res.range.lo !== undefined && v < res.range.lo) return true;
  if (res.range.hi !== undefined && v > res.range.hi) return true;
  return false;
}

var GLUED_UNIT = /^(fL|pg|seg\.?|mm|mmHg|g|mg|ng|ug|µg|UI|U|mEq|mmol|años|anys)$/i;

function tokenize(line) {
  line = line.replace(/[‒-―−]/g, '-').replace(/([↑↓¯­])(?=\d)/g, '$1 ');
  var toks = [];
  line.trim().split(/\s+/).forEach(function (t) {
    if (!t || /^[.b]$/.test(t)) return;
    // "43.3%" -> "43.3" "%";  "132*" -> "132" "*"
    var m = t.match(/^([<>≤≥]?=?-?\d+(?:[.,]\d+)?)(%|\*+|[↑↓])$/);
    if (m) { toks.push(m[1], m[2]); return; }
    // Valor pegado a la unidad: "90.9mg/dL", "139mEq/L", "10.7fL". No se separa "10Exp9/L", que es la unidad entera.
    m = t.match(/^([<>≤≥]?=?-?\d+(?:[.,]\d+)?)([a-zA-Zµμ][^\s]*)$/);
    if (m && !/^E(xp)?\^?\d/i.test(m[2]) && (/\//.test(m[2]) || GLUED_UNIT.test(m[2]))) { toks.push(m[1], m[2]); return; }
    toks.push(t);
  });
  // "< 0.5" -> "<0.5"
  var out = [];
  for (var i = 0; i < toks.length; i++) {
    if (/^[<>≤≥]=?$/.test(toks[i]) && i + 1 < toks.length && NUM.test(toks[i + 1])) { out.push(toks[i] + toks[i + 1]); i++; }
    else out.push(toks[i]);
  }
  return out;
}

// Cabecera de sección del informe de la clínica: "GLUCOSA, SUERO", "SEDIMENTO, ORINA".
var SECTION = /^([^:]*[A-Za-zÀ-ú0-9)])\s*,\s*(suero|sangre|sangre total|sangre venosa|sangre arterial|sangre capilar|plasma|orina|heces|lcr)$/i;
var SECTION_PREFIX = { suero: 'Srm-', sangre: 'San-', 'sangre total': 'San-', 'sangre venosa': 'San-', 'sangre arterial': 'San-', 'sangre capilar': 'San-', plasma: 'Pla-', orina: 'Uri-', heces: 'Hec-', lcr: 'Lcr-' };
// Líneas que no son resultados.
var NOISE = /^(m[eé]todo|valores de referencia|interpretaci[oó]n|nota|v\.? discriminante|muestra|observaciones|p[aá]g\.?\s*\d)\b|cerba internacional/i;
// Cabecera sin muestra, en mayúsculas ("UROCULTIVO"). Solo cuenta si el informe ya tiene cabeceras "PRUEBA, MUESTRA".
var CAPS_SECTION = /^[A-ZÁÉÍÓÚÑÜ][A-ZÁÉÍÓÚÑÜ0-9 ()\/.-]{3,}$/;
// Líneas que cierran el cuerpo del informe (firma, informe preliminar).
var END = /^(validado por|informe preliminar|pruebas en curso)\b|director t[eé]cnico/i;

function parse(text) {
  var lines = text.split(/\r?\n/);
  var found = {}, unknown = [], pending = null, carry = null, orphans = 0, section = null, last = null, missing = [];
  var nameOnly = 0, inline = 0, clinic = false, gasoType = '', crossed = false, block = null, gasos = [];
  // Edad del paciente (cabecera "edad: 46 años"), solo para elegir rangos que dependen de la edad.
  var am = text.match(/edad:\s*(\d+)\s*(a[ñn]os|meses|d[ií]as)/i), age = null;
  if (am) age = /^a/i.test(am[2]) ? +am[1] : /^m/i.test(am[2]) ? am[1] / 12 : am[1] / 365;
  function store(t, name, res) {
    // Dentro de una gasometría todo va a su bloque: así una gasometría venosa y otra arterial no se pisan,
    // y el sodio o la glucosa de la gasometría no ocupan el sitio de los del suero.
    var gb = section && section.gaso;
    if (gb) {
      if (gb.found[t.key]) return;
      gb.found[t.key] = { test: t, srcName: name, res: res };
      if (t.group !== 'gaso') gb.extras.push(t.key);
      last = res; crossed = false;
      return;
    }
    if (found[t.key]) return;
    found[t.key] = { test: t, srcName: name, res: res };
    last = res; crossed = false;
  }
  function orphan(p) { orphans++; missing.push(p.test); }
  // Copia por columnas (tira y sedimento de orina): primero todos los nombres, luego los valores en el mismo
  // orden y, tras "Valores de referencia:", los rangos. Solo se reconstruye si cuadran las cuentas.
  function waitEnd() {
    if (section && section.waitUnknown) { missing.push({ key: '?' + section.waitUnknown.name, label: section.waitUnknown.name }); section.waitUnknown = null; }
  }
  function blockFail() { block.items.forEach(orphan); block = null; }
  function blockAssign() {
    var res = block.items.map(function (it, i) {
      var tk = tokenize(block.values[i]);
      return it.test.text ? parseText(tk) : parseRest(tk);
    });
    if (res.some(function (r) { return !r; })) return blockFail();
    block.items.forEach(function (it, i) { store(it.test, it.name, res[i]); it.res = found[it.test.key].res === res[i] ? res[i] : null; });
    nameOnly -= block.items.length; inline += block.items.length;
    last = null; block.phase = 'assigned';
  }
  function blockEnd() {
    if (!block) return;
    if (block.phase !== 'assigned' && block.phase !== 'refs') return blockFail();
    var refs = block.refs || [], items = block.items;
    if (refs.length !== items.length) items = items.filter(function (it) { return !it.test.text; });
    if (refs.length && refs.length === items.length) items.forEach(function (it, i) {
      var r = it.res, f = refs[i];
      if (!r || r.quali || r.text || r.range) return;
      if (f.neg) { r.range = { neg: true, text: 'Negativo' }; return; }
      if (f.unit && r.unit && f.unit !== r.unit) return;
      r.range = f.range;
    });
    block = null;
  }
  function refLine(line) {
    var m;
    if ((m = line.match(/^(-?\d+(?:[.,]\d+)?)\s*-\s*(\d+(?:[.,]\d+)?)(?:\s+(\S+))?$/)))
      return { range: { lo: num(m[1]), hi: num(m[2]), text: (m[1] + '-' + m[2]).replace(/,/g, '.') }, unit: m[3] };
    if ((m = line.match(/^([<>≤≥]=?)\s*(\d+(?:[.,]\d+)?)(?:\s+(\S+))?$/)))
      return { range: m[1][0] === '<' || m[1][0] === '≤' ? { hi: num(m[2]), text: m[1] + fmtValue(m[2]) } : { lo: num(m[2]), text: m[1] + fmtValue(m[2]) }, unit: m[3] };
    var q = QUALI[norm(line.replace(/\.$/, ''))];
    if (q) return { neg: q === 'Negativo' || q === 'Ausencia', quali: q };
    // Unidad sola en su línea ("eri/uL"): es la del rango anterior.
    if (/^[A-Za-zµμ%][^\s\d]*\/[^\s]+$/.test(line)) return { unitOnly: line };
    return null;
  }
  // Devuelve true si la línea pertenece al bloque en columnas.
  function blockLine(line, prefixed) {
    if (block.phase === 'names') {
      var mm = matchLine(tokenize(prefixed));
      if (mm && mm.pending) { block.items.push({ test: mm.test, name: mm.name }); nameOnly++; return true; }
      block.phase = 'values'; block.values = [];
    }
    if (block.phase === 'values') {
      block.values.push(line);
      if (block.values.length === block.items.length) blockAssign();
      return true;
    }
    if (block.phase === 'refs') {
      var f = refLine(line);
      if (f && f.unitOnly) { var p = block.refs[block.refs.length - 1]; if (p && !p.unit) p.unit = f.unitOnly; return true; }
      if (f) { block.refs.push(f); return true; }
    }
    blockEnd();
    return false;
  }
  lines.forEach(function (raw) {
    var line = raw.replace(/[‒-―−]/g, '-').trim().replace(/\s+:/g, ':');
    if (!line) return;
    var sm = line.match(SECTION);
    if (!sm && clinic && !(block && block.phase === 'values') && !QUALI.hasOwnProperty(norm(line)) && CAPS_SECTION.test(line) && /[A-ZÁÉÍÓÚÑ]{4}/.test(line)) sm = [line, line, /ORINA|URO/.test(line) ? 'orina' : /HECES|COPRO/.test(line) ? 'heces' : ''];
    if (sm) {
      clinic = true;
      blockEnd(); waitEnd();
      if (pending) orphan(pending);
      var spec = sm[2].toLowerCase();
      var pre = /sedimento/i.test(sm[1]) && spec === 'orina' ? 'Sed-' : /proteinograma/i.test(sm[1]) ? 'Pgr-' : (SECTION_PREFIX[spec] || '');
      if (/gasometr/i.test(sm[1])) gasoType = /venos/i.test(sm[1] + ' ' + spec) ? 'VENOSA' : /arterial/i.test(sm[1] + ' ' + spec) ? 'ARTERIAL' : '';
      section = { name: sm[1].trim(), prefix: pre, closed: false };
      if (/gasometr/i.test(sm[1])) {
        var gt = /venos/i.test(sm[1] + ' ' + spec) ? 'VENOSA' : /arterial/i.test(sm[1] + ' ' + spec) ? 'ARTERIAL' : /capilar/i.test(sm[1] + ' ' + spec) ? 'CAPILAR' : '';
        section.gaso = { type: gt, found: {}, extras: [] };
        gasos.push(section.gaso);
      }
      pending = null; carry = null; last = null;
      return;
    }
    // Título "Gasometría venosa" de otros formatos: solo da el tipo.
    if (!sm && !gasoType && /^gasometr[ií]a\b/i.test(line)) { var gtm = line.match(/venos|arterial/i); if (gtm) gasoType = /venos/i.test(gtm[0]) ? 'VENOSA' : 'ARTERIAL'; }
    if (END.test(line)) { blockEnd(); waitEnd(); if (pending) orphan(pending); section = null; pending = null; carry = null; last = null; return; }
    // Una línea de ruido ("Valores de referencia:") no corta el resultado anterior, pero lo marca:
    // un rango suelto debajo solo se le une si trae la misma unidad.
    if (NOISE.test(line)) {
      if (block) {
        if (block.phase === 'assigned' && /^valores de referencia/i.test(line)) { block.phase = 'refs'; block.refs = []; }
        else if (block.phase !== 'refs') blockEnd();
      }
      if (last) crossed = true;
      return;
    }
    // Tramos de edad debajo del resultado: "> 18 Años 73.8 - 106 mg/dL", "4 días - 14 años: 38.0 - 54.0 g/L".
    var st = line.match(STRATUM);
    if (st && st.index === 0 && last && !crossed && (last.strata || (!last.range && !last.quali && !last.text))) {
      (last.strata = last.strata || []).push(stratum(st));
      return;
    }
    // Rango suelto debajo de un resultado sin rango ("7.18 ng/L" / "Valores de referencia:" / "< 14.0 ng/L").
    if (last && !last.range && !last.quali && !last.strata && !last.text) {
      var rm = line.match(/^[(\[]?\s*(-?\d+(?:[.,]\d+)?)\s*-\s*(\d+(?:[.,]\d+)?)\s*[)\]]?(?:\s+(\S+))?$/) || line.match(/^([<>≤≥]=?)\s*(\d+(?:[.,]\d+)?)(?:\s+(\S+))?$/);
      var unitOk = rm && (rm[3] ? rm[3].replace(/\.$/, '') === last.unit : !crossed);
      if (rm && unitOk) {
        last.range = /^[<>≤≥]/.test(rm[1])
          ? (rm[1][0] === '<' || rm[1][0] === '≤' ? { hi: num(rm[2]), text: rm[1] + fmtValue(rm[2]) } : { lo: num(rm[2]), text: rm[1] + fmtValue(rm[2]) })
          : { lo: num(rm[1]), hi: num(rm[2]), text: (num(rm[1]) < 0 ? rm[1] + ' a ' + rm[2] : rm[1] + '-' + rm[2]).replace(/,/g, '.') };
        last = null;
        return;
      }
    }
    // Tras "Resultado:" el resto de la sección son tablas de interpretación ("Deseable: < 201 mg/dL").
    if (section && section.closed) { last = null; return; }
    if (block && blockLine(line, /^[A-Za-zÀ-ú]/.test(line) && section && !SAMPLE_PREFIX.test(line) && !URINE_PREFIX.test(line) ? section.prefix + line : line)) return;
    // Dentro de una sección, "Resultado:" es la prueba que nombra la cabecera.
    var colonRow = /^[^:]+:\s*\S/.test(line);
    if (section) {
      // "Resultado:" sin valor: el valor viene unas líneas más abajo (copia desordenada); la sección se cierra al encontrarlo.
      if (/^resultado:/i.test(line)) {
        var rest = line.replace(/^resultado:\s*/i, '');
        line = section.name + ': ' + rest;
        if (rest) section.closed = true;
        else {
          section.waiting = true;
          // Prueba fuera del diccionario con el valor más abajo: se espera igual, con el nombre de la cabecera.
          if (!lookup(section.prefix + section.name)) { section.waitUnknown = { name: section.name, flag: false }; return; }
        }
      }
      // Valor de una prueba fuera del diccionario que esperaba bajo "Resultado:" vacío.
      if (section.waitUnknown) {
        var wu = section.waitUnknown, wt = tokenize(line);
        if (wt.every(function (t) { return FLAG.test(t); })) { wu.flag = true; return; }
        var wr = parseRest(wt);
        if (wr && (wr.unit || wr.range || wr.quali)) {
          if (wu.flag) wr.flag = true;
          unknown.push({ test: null, name: wu.name, res: wr });
          section.waitUnknown = null; section.waiting = false; section.closed = true;
          return;
        }
      }
      // Un resultado cualitativo suelto ("NEGATIVO") no lleva el prefijo de la muestra.
      if (/^[A-Za-zÀ-ú]/.test(line) && !SAMPLE_PREFIX.test(line) && !URINE_PREFIX.test(line) && !QUALI.hasOwnProperty(norm(line.replace(/\.$/, '')))) line = section.prefix + line;
    }
    var toks = tokenize(line);
    if (!toks.length) return;
    // Un nombre sin valor espera el resultado en la línea siguiente (hasta 2 líneas), y solo si trae unidad o rango.
    if (pending) {
      pending.age++;
      if (toks.every(function (t) { return FLAG.test(t); })) { pending.flag = true; return; }
      var r0 = pending.test.text ? null : parseRest(toks);
      // Un % solo vale para la prueba en %, y al revés ("Eosinófilos %" no se queda con "160 cel/mm³").
      var pctOk = r0 && (pending.test.pctOf ? r0.unit === '%' : !(HAS_PCT[pending.test.key] && r0.unit === '%'));
      if (r0 && pctOk && (r0.unit || r0.range || r0.quali)) {
        if (pending.flag) r0.flag = true;
        store(pending.test, pending.name, r0); pending = null; carry = null;
        if (section && section.waiting) { section.waiting = false; section.closed = true; }
        return;
      }
      if (pending.age >= 2) { orphan(pending); pending = null; }
    }
    last = null;
    // Un nombre largo puede venir partido en dos líneas: se reintenta con la línea anterior.
    var m = matchLine(toks);
    if (!m && carry) m = matchLine(carry.concat(toks));
    if (m && m.pending) {
      nameOnly++;
      // Dos nombres seguidos sin valor en una sección de la clínica: empieza una copia por columnas.
      if (pending && pending.age === 1 && clinic && section && !section.waiting) {
        block = { phase: 'names', items: [{ test: pending.test, name: pending.name }, { test: m.test, name: m.name }] };
        pending = null; carry = null;
        return;
      }
      if (pending) orphan(pending);
      pending = { test: m.test, name: m.name, age: 0 };
      carry = null;
      return;
    }
    if (m) { inline++; store(m.test, m.name, m.res); carry = null; return; }
    // En el informe de la clínica, una prueba fuera del diccionario siempre va como "Nombre: valor".
    var u = clinic && section && !colonRow ? null : matchUnknown(toks) || (carry && matchUnknown(carry.concat(toks)));
    if (u) { unknown.push(u); carry = null; return; }
    // Red de seguridad: "Nombre: …" de una prueba conocida cuyo resultado no se ha podido leer se avisa, no se pierde en silencio.
    if (colonRow) {
      var kt = lookup(line.slice(0, line.indexOf(':')));
      if (kt && !found[kt.key]) missing.push(kt);
    }
    carry = toks.length <= 8 ? toks : null;
  });
  blockEnd(); waitEnd();
  if (pending) orphan(pending);
  // Copia "en fragmentos": casi todos los nombres van solos en su línea y el valor, el rango y la marca
  // vienen en otras líneas, a veces antes que el nombre. No se puede reconstruir sin riesgo de cruzar valores.
  if (nameOnly >= 5 && nameOnly > inline) {
    return { found: {}, unknown: [], missing: [], warnScrambled: true, fragments: true, gasoType: '' };
  }
  function finish(res) {
    if (res.strata) {
      var s = null;
      if (age !== null) res.strata.forEach(function (x) {
        if (!s && age >= x.min && age < x.max) s = x;
      });
      if (s) res.range = { lo: num(s.lo), hi: num(s.hi), text: (s.lo + '-' + s.hi).replace(/,/g, '.') };
    }
    res.altered = isAltered(res);
  }
  Object.keys(found).forEach(function (k) { finish(found[k].res); });
  // Sin bloques vacíos ni repetidos (el mismo informe pegado dos veces).
  var gasSeen = {};
  gasos = gasos.filter(function (g) {
    var sig = g.type + '|' + Object.keys(g.found).map(function (k) { return k + '=' + g.found[k].res.value; }).join(',');
    if (!Object.keys(g.found).length || gasSeen[sig]) return false;
    return (gasSeen[sig] = true);
  });
  // Lactato u otra prueba de gasometría pedida en su propia sección: va con la última gasometría.
  if (gasos.length) Object.keys(found).forEach(function (k) {
    var g = gasos[gasos.length - 1];
    if (found[k].test.group === 'gaso' && !g.found[k]) { g.found[k] = found[k]; delete found[k]; }
  });
  gasos.forEach(function (g) { Object.keys(g.found).forEach(function (k) { finish(g.found[k].res); }); });
  function isFound(key) { return !!found[key] || gasos.some(function (g) { return !!g.found[key]; }); }
  unknown.forEach(function (u) { finish(u.res); });
  // Pruebas cuyo nombre apareció pero no su resultado (si luego apareció, no cuentan).
  var seen = {}, notFound = [];
  missing.forEach(function (t) {
    var key = t.pctOf || t.key;
    if (isFound(t.key) || seen[key]) return;
    seen[key] = true;
    var base = t.pctOf ? TESTS.filter(function (x) { return x.key === t.pctOf; })[0] : t;
    notFound.push(base.label + (t.pctOf ? ' %' : ''));
  });
  // Nombres sin resultado en bloque = el visor ha copiado por columnas.
  // Hay rangos que dependen de la edad pero la edad no venía en el texto copiado.
  var ageMissing = age === null && Object.keys(found).some(function (k) { return found[k].res.strata && !found[k].res.range; });
  var nFound = Object.keys(found).length + gasos.reduce(function (n, g) { return n + Object.keys(g.found).length; }, 0);
  return { found: found, gasos: gasos, unknown: unknown, missing: notFound, gasoType: gasoType, ageMissing: ageMissing, warnScrambled: orphans >= 5 && nFound < orphans / 2 };
}

// ===== FORMATO =====
// Hallazgo que merece salir aunque no esté marcado como alterado ("3-5" leucocitos por campo, flora "Presencia").
function isNotable(res) {
  if (res.semi) return !SEMI_NEG.test(res.value);
  var q = QUALI[norm(res.value)];
  if (q) return q === 'Positivo' || q === 'Presencia';
  return !!res.text;
}


function fmtValue(v) {
  var q = QUALI[norm(v)];
  if (q) return q;
  if (/[a-zà-ú]/i.test(v)) return v;
  v = v.replace(/,/g, '.');
  if (/\.\d*0+$/.test(v)) v = v.replace(/0+$/, '').replace(/\.$/, '');
  return v;
}
// "AMARILLOCLARO" -> "Amarillo claro".
function fmtColor(v) {
  if (v !== v.toUpperCase()) return v;
  v = v.toLowerCase().replace(/^(amarillo|ambar|ámbar|rojo|marron|marrón|naranja)\s*(claro|oscuro|intenso|palido|pálido)$/, '$1 $2');
  return v.charAt(0).toUpperCase() + v.slice(1);
}
function fmtUnit(u) {
  return u.replace(/^x?10\^?E(?:xp)?\^?(\d+)\^?\/L$/i, 'x10e$1/L').replace(/^x?10E(\d+)\/L$/i, 'x10e$1/L').replace(/^x10E/i, 'x10e');
}

// opts.all: incluir normales de nivel 2 y nivel 3. opts.ranges: 'none' | 'altered' | 'all'.
function render(parsed, opts) {
  opts = opts || {};
  var ranges = opts.ranges || 'altered';
  var out = [];
  function testLine(t, found, upper) {
    var f = found[t.key];
    var pf = found[t.key + '%'];
    if (!f && !pf) return null;
    var altered = (f && f.res.altered) || (pf && pf.res.altered);
    var level = t.level;
    if (t.dependsOn && !(found[t.dependsOn] && found[t.dependsOn].res.altered)) level = 2;
    var notable = altered || (f && isNotable(f.res));
    if (!opts.all && (level === 3 || (level === 2 && !notable))) return null;
    var label = upper ? t.label.toUpperCase() : t.label;
    var parts = [];
    // "Células: Células epiteliales: Moderadas" -> "Células epiteliales: Moderadas".
    if (f && f.res.text && norm(f.res.value).indexOf(norm(t.label)) === 0) label = '';
    if (f) parts.push((t.key === 'u_color' || t.key === 'u_asp' ? fmtColor(f.res.value) : fmtValue(f.res.value)) + (f.res.unit ? ' ' + fmtUnit(f.res.unit) : ''));
    if (pf) parts.push(fmtValue(pf.res.value) + '%');
    var line = (label ? label + ' ' : '') + parts.join(' - ') + (altered ? ' *' : '');
    var showRange = ranges === 'all' || (ranges === 'altered' && altered);
    // Si solo está alterado el %, se muestra el rango del %.
    var src = (f && f.res.altered) || !pf ? f : (pf.res.altered || !f ? pf : f);
    var rng = src && src.res.range ? src.res.range.text + (src === pf ? '%' : '') : null;
    if (showRange && rng) line += ' (' + rng + ')';
    return line;
  }
  function groupLines(g, found) {
    var lines = [];
    TESTS.forEach(function (t) {
      if (t.group !== g.id || t.pctOf) return;
      var line = testLine(t, found, !g.header);
      if (line) lines.push(line);
    });
    return lines;
  }
  GROUPS.forEach(function (g) {
    if (g.id === 'gaso') {
      // Cada gasometría del informe (venosa, arterial) en su bloque, con lo que traiga además (iones, glucosa, Hb).
      (parsed.gasos || []).forEach(function (gb) {
        var lines = groupLines(g, gb.found);
        gb.extras.forEach(function (k) {
          var line = testLine(gb.found[k].test, gb.found, false);
          if (line) lines.push(line);
        });
        if (!lines.length) return;
        lines.unshift(g.header + (gb.type ? ' ' + gb.type : ''));
        out.push(lines.join('\n'));
      });
    }
    var lines = groupLines(g, parsed.found);
    if (g.id === 'otros') {
      parsed.unknown.forEach(function (u) {
        var line = u.name + ' ' + fmtValue(u.res.value) + (u.res.unit ? ' ' + fmtUnit(u.res.unit) : '') + (u.res.altered ? ' *' : '');
        if (u.res.range && (ranges === 'all' || (ranges === 'altered' && u.res.altered))) line += ' (' + u.res.range.text + ')';
        lines.push(line);
      });
    }
    if (!lines.length && g.summary && TESTS.some(function (t) { return t.group === g.id && parsed.found[t.key]; })) lines.push('Sin alteraciones');
    if (!lines.length) return;
    if (g.header) lines.unshift(g.id === 'gaso' && parsed.gasoType ? g.header + ' ' + parsed.gasoType : g.header);
    out.push(lines.join('\n'));
  });
  return out.join('\n\n');
}

if (typeof module !== 'undefined') module.exports = { parse: parse, fmtUnit: fmtUnit, render: render, TESTS: TESTS, GROUPS: GROUPS };
