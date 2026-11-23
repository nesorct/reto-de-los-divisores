# El reto de los divisores

Juego por equipos, o en solitario, de **divisibilidad** (múltiplos, divisores, criterios, números primos, m.c.m. y m.c.d.) para el
Ámbito Científico de 2.º de ESO. Es el hermano de [El reto de los números](https://nesorct.github.io/reto-de-los-numeros/):
la misma mecánica, para el tema siguiente. Se proyecta en la pizarra y juega la clase entera.

Un fichero HTML suelto: se abre de un doble clic y no hay que instalar nada. Con internet carga la fuente Lexend;
sin él, usa la del sistema.

```
index.html      el juego
pruebas/        la prueba del motor de preguntas (no hace falta para jugar)
```

## Cómo se juega

De 2 a 6 equipos. A cada equipo le toca una pregunta con cuatro opciones y, si acierta, suma puntos. **Si falla, la
pregunta rebota al equipo siguiente**, que puede llevarse la mitad. Al cerrar cada pregunta sale **la solución**
(la columna de los factores, las filas de múltiplos o de divisores con el común marcado, el criterio aplicado a cada
número…) para corregirla con toda la clase.

| Qué trabajamos | |
|---|---|
| Múltiplos y divisores | ¿cuál es múltiplo / divisor?, ¿cuál NO lo es?, los cinco primeros múltiplos, todos los divisores, cuántos tiene, repartos y cajas enteras, «¿qué frase es cierta?» |
| Criterios de divisibilidad | por 2, 3, 5 y 10: ¿cuál es divisible?, ¿cuál no?, ¿por cuál de los cuatro?, la cifra que falta y ¿por qué? |
| Números primos y factores | primo, compuesto o ninguno (**solo hasta el 20**), la descomposición en factores primos y «¿qué número es 2² · 3 · 5?» |
| Mínimo común múltiplo | la cuenta y problemas (autobuses, piscina, luces, alarmas) |
| Máximo común divisor | la cuenta y problemas (bolsas de caramelos, cuerdas, ramos) |
| Mezcla de todo | |

En el m.c.m. y el m.c.d. también sale **«¿qué hay que calcular?»**: un problema y elegir entre el m.c.m., el m.c.d.,
la suma o la multiplicación.

## En solitario

En «¿Quién juega?», **«Solo yo»**: para repasar en casa o en el ordenador del aula. Se elige una tanda de **10 o 20
preguntas, o sin límite**; arriba se ve «Pregunta 3 de 10» y los aciertos, y al final, cuántas se han acertado, los
puntos y **la mejor marca** de ese tema y esa tanda. La marca se guarda solo en ese navegador (`localStorage`), sin
nombre ni cuenta. Sin rebote: si se falla, la buena se queda marcada y sale la solución.

## Los niveles

Los tres escalones de las fichas de divisibilidad: **números pequeños** (hasta 50, las tablas hasta el 9),
**medianos** (hasta 120) y **grandes** (hasta 300, con el m.c.m. y el m.c.d. de **tres números**). El nivel puede
subir y bajar solo (sube al segundo acierto seguido y baja a cada fallo; acertar arriba vale más) o quedarse fijo
para todos.

## Las opciones falsas son errores de verdad

- **Criterios:** «acaba en 3, luego es divisible por 3», «empieza por par, luego es par», «tiene un 5» y, para el 10,
  números que acaban en 5.
- **Divisores:** olvidarse del 1 y del propio número, saltarse una pareja, colar uno que no divide y dar un múltiplo
  (el doble) cuando piden un divisor.
- **Primos:** el 1, el 9 y el 15.
- **Factores:** quedarse con un 4 o un 6, perder un factor (el exponente) o poner uno de más.
- **m.c.m.:** multiplicar los números, dar el m.c.d., un múltiplo común que no es el menor o el mayor de los números.
- **m.c.d.:** el 1, un divisor común que no es el mayor, el número pequeño o el m.c.m.

## Pistas

En los criterios, «Ver los criterios» (los cuatro en una línea); en el m.c.m. y el m.c.d., «Ver los múltiplos» o
«Ver los divisores» (las filas, sin marcar). Si un equipo falla, la pista se queda para el rebote.

## Modo pizarra

Un número al azar (hasta 50, 120 o 300) para trabajarlo con toda la clase: sus divisores por parejas, sus diez primeros
múltiplos, si es primo o compuesto, los criterios del 2, 3, 5 y 10 aplicados a él y su descomposición en factores
primos en columna.

## Teclado

A-D o 1-4 para responder y Enter para la pregunta siguiente. En el modo pizarra, la flecha derecha saca otro número.

## Pruebas

```
node pruebas/test-divisores.js
```

Saca el motor de `index.html` y genera **54.000 preguntas** (3.000 por tema y nivel). Cada una se comprueba por otro
camino, a fuerza bruta: que hay exactamente una opción buena, que es la que el juego da por buena y que las falsas
son falsas. El 23-nov también se jugaron 900 rondas en Chrome a 1366 × 768 (un proyector), con la pista abierta: los
botones «Siguiente pregunta» y «Terminar partida» quedan siempre a la vista. A 375 px no se sale nada.

## Sin datos del alumnado

Los equipos se llaman «Equipo 1», «Equipo 2»… No se escribe ningún nombre y no hay servidor ni cuenta. Lo único que se
guarda es la mejor marca en solitario (un número por tema y tanda), y solo en el navegador de quien juega.
