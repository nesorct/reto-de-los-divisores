// Pruebas del motor del reto de los divisores (23-nov-2026).
//   node pruebas/test-divisores.js
// Saca <script id="motor-divisores"> de index.html, lo ejecuta en Node con un azar con semilla y genera miles de
// preguntas de cada tema y nivel. Cada pregunta se comprueba POR OTRO CAMINO (a fuerza bruta, sin usar el motor):
// que hay exactamente una opción buena, que es la que el juego da por buena y que las falsas son falsas.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const m = html.match(/<script id="motor-divisores">([\s\S]*?)<\/script>/);
let fallos = 0, hechas = 0;
const cuenta = {};
const mal = (q, que) => { fallos++; if (fallos <= 30) console.log('FALLA [' + q.tipo + ']: ' + que + '\n   ' + JSON.stringify({texto: q.texto, grande: q.grande, opciones: q.opciones, correcta: q.correcta})); };
if (!m) { console.log('FALLA: no está <script id="motor-divisores">'); process.exit(1); }
const ctx = {};
vm.createContext(ctx);
vm.runInContext(m[1] + '\nthis.Divis = Divis;', ctx);
const D = ctx.Divis;

function semilla(s) {
  return function () {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
D._azar(semilla(2026));

// --- a fuerza bruta, sin el motor
const divs = n => { const r = []; for (let d = 1; d <= n; d++) if (n % d === 0) r.push(d); return r; };
const primo = n => n > 1 && divs(n).length === 2;
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const lcm = (a, b) => a / gcd(a, b) * b;
const limpio = s => s.replace(/<sup>(\d+)<\/sup>/g, '^$1').replace(/<[^>]+>/g, '');
const valorFact = s => limpio(s).split(' · ').reduce((p, t) => { const [b, e] = t.split('^').map(Number); return p * Math.pow(b, e || 1); }, 1);
const todosPrimos = s => limpio(s).split(' · ').every(t => primo(Number(t.split('^')[0])));
const TOPE = [0, 50, 120, 300];

function comprueba(q, modo, nivel) {
  hechas++; cuenta[q.tipo] = (cuenta[q.tipo] || 0) + 1;
  const ops = q.opciones;
  if (new Set(ops).size !== ops.length) mal(q, 'opciones repetidas');
  if (ops.length < (q.minOps || 4)) mal(q, 'faltan opciones');
  if (ops.filter(o => o === q.correcta).length !== 1) mal(q, 'la buena no está una vez');
  const buenas = (f) => { const b = ops.filter(f); if (b.length !== 1 || b[0] !== q.correcta) mal(q, 'buenas por otro camino: ' + JSON.stringify(b)); };
  const N = Number;
  switch (q.tipo) {
    case 'esMult': buenas(o => (N(o) % q.datos.k === 0) === q.datos.si); break;
    case 'esDiv': buenas(o => (q.datos.N % N(o) === 0) === q.datos.si); break;
    case 'primerosMult': buenas(o => o === [1, 2, 3, 4, 5].map(i => i * q.datos.k).join(', ')); break;
    case 'todosDiv': buenas(o => o === divs(q.datos.N).join(', ')); break;
    case 'cuantosDiv': buenas(o => N(o) === divs(q.datos.N).length); break;
    case 'frase': buenas(o => { const x = o.match(/^(\d+) es (múltiplo|divisor) de (\d+)$/); if (!x) return false;
      const a = N(x[1]), b = N(x[3]); return x[2] === 'múltiplo' ? a % b === 0 : b % a === 0; }); break;
    case 'divPor': buenas(o => (N(o) % q.datos.d === 0) === q.datos.si);
      if (q.datos.si && ops.every(o => N(o) % 10 !== 3) && q.datos.d === 3) cuenta.sinTrampa3 = (cuenta.sinTrampa3 || 0) + 1; break;
    case 'porCual': buenas(o => q.datos.N % N(o.replace('Por ', '')) === 0); break;
    case 'cifra': buenas(o => { const d = q.datos.dig.slice(); d[q.datos.pos] = N(o); return N(d.join('')) % q.datos.d === 0; }); break;
    case 'razon': if (q.datos.N % q.datos.d !== 0) mal(q, 'el número no es divisible'); break;
    case 'esPrimo': buenas(o => q.datos.si ? primo(N(o)) : (N(o) > 1 && !primo(N(o)))); if (ops.some(o => N(o) > 20)) mal(q, 'primos por encima de 20'); break;
    case 'pc': { const n = q.datos.N; const b = n === 1 ? 'Ni primo ni compuesto' : primo(n) ? 'Primo' : 'Compuesto'; if (q.correcta !== b) mal(q, 'primo o compuesto mal'); break; }
    case 'fact': { const Nn = q.datos.N; buenas(o => valorFact(o) === Nn && todosPrimos(o)); if (Nn > TOPE[nivel]) mal(q, 'número por encima del tope'); break; }
    case 'valorFact': buenas(o => N(o) === q.datos.f.reduce((a, b) => a * b, 1)); break;
    case 'mcm': { const ns = q.datos.ns, v = ns.reduce(lcm); buenas(o => N(o) === v);
      if (v > TOPE[nivel]) mal(q, 'm.c.m. por encima del tope'); if (nivel === 3 && ns.length !== 3) mal(q, 'en el nivel 3 van tres números'); break; }
    case 'mcd': { const ns = q.datos.ns, v = ns.reduce(gcd); buenas(o => N(o) === v);
      if (nivel === 3 && ns.length !== 3) mal(q, 'en el nivel 3 van tres números'); break; }
    case 'queCalc': if (q.correcta !== (q.datos.mcm ? 'El m.c.m.' : 'El m.c.d.')) mal(q, 'qué calcular mal'); break;
    default: mal(q, 'tipo sin comprobar');
  }
  if (!q.solucion) mal(q, 'sin solución');
  if (/undefined|NaN|null/.test(q.texto + (q.grande || '') + ops.join('|') + q.solucion)) mal(q, 'undefined, NaN o null en el texto');
}

const MODOS = D.MODOS.map(x => x[0]);
for (const modo of MODOS) for (let nivel = 1; nivel <= 3; nivel++) for (let i = 0; i < 3000; i++) {
  let q;
  try { q = D.generar(modo, nivel); } catch (e) { fallos++; console.log('FALLA: ' + modo + ' ' + nivel + ': ' + e.message); break; }
  comprueba(q, modo, nivel);
}
console.log('Preguntas comprobadas: ' + hechas);
console.log('Por tipo: ' + JSON.stringify(cuenta));
console.log(fallos ? fallos + ' FALLOS' : 'Todo bien: 0 fallos');
process.exit(fallos ? 1 : 0);
