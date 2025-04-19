//Отрисовка сетки внутри поля канвас
function drawGrid(ctx, width, height, gridSpacing) {
  const scale = 1;  // Масштабирование для более удобной работы
  // const offsetX = 50;  // Смещение по оси X (по умолчанию)
  // const offsetY = 300;  // Смещение по оси Y (по умолчанию)

  const offsetX = canvas.width / 2 - 200;
  const offsetY = canvas.height / 2 + 100;

  // Отрисовка горизонтальных и вертикальных линий
  ctx.beginPath();
  ctx.strokeStyle = '#d3d3d3';  // Цвет сетки
  ctx.lineWidth = 1;

  // Вертикальные линии
  for (let x = offsetX; x < width; x += gridSpacing) {
    ctx.moveTo(x, offsetY);
    ctx.lineTo(x, offsetY - height);
  }

  // Горизонтальные линии
  for (let y = offsetY; y > 0; y -= gridSpacing) {
    ctx.moveTo(offsetX, y);
    ctx.lineTo(width, y);
  }

  // Рисуем сетку
  ctx.stroke();

  // Отображаем оси
  ctx.beginPath();
  ctx.moveTo(offsetX, offsetY); // Начало оси X
  ctx.lineTo(width, offsetY);  // Конец оси X
  ctx.moveTo(offsetX, offsetY); // Начало оси Y
  ctx.lineTo(offsetX, 0);  // Конец оси Y
  ctx.strokeStyle = '#000000';  // Цвет осей
  ctx.lineWidth = 2;
  ctx.stroke();

  // Отображение координат (0, 0) на пересечении осей
  ctx.fillStyle = '#000';  // Цвет текста
  ctx.font = '12px Arial';
  ctx.fillText('0, 0', offsetX + 5, offsetY - 5); // Подпись "0, 0"

  // Подписи осей X и Y
  ctx.fillText('X', width - 20, offsetY - 5);  // Подпись для оси X
  ctx.fillText('Y', offsetX + 5, 20);  // Подпись для оси Y
}

//Функция проверки на число 
function turnIntoNumber(str) {
  return !isNaN(parseFloat(str)) && isFinite(str);
}

//Функция вычисления минимального суммарного момента в вершинах звеньев манипулятора
function minMoment(m, g, x0, x1, x2, x3, x4) {
  const term1 = Math.abs((-7) * x0 / 2 + x1 + x2 + x3 + x4 / 2);
  const term2 = Math.abs((-5) * x1 / 2 + x2 + x3 + x4 / 2);
  const term3 = Math.abs((-3) * x2 / 2 + x3 + x4 / 2);
  const term4 = Math.abs((-1) * x3 / 2 + x4 / 2);

  const min = m * g * (term1 + term2 + term3 + term4);
  return min;
}

//Функция поиска угла
function findPhi(x1, y1, x2, y2) {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const phi = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
  return phi;
}

//Функция решения пересечения окружностей
function intersectionOfCircles(l1, l2, x0, y0, x2, y2) {
  const dist = Math.sqrt((x2 - x0) ** 2 + (y2 - y0) ** 2);
  const a = (l1 ** 2 - l2 ** 2 + dist ** 2) / (2 * dist);
  const h = Math.sqrt(l1 ** 2 - a ** 2);

  const delx = x0 + a * (x2 - x0) / dist;
  const dely = y0 + a * (y2 - y0) / dist;

  const x1 = delx - h * (y2 - y0) / dist;
  const y1 = dely + h * (x2 - x0) / dist;

  return { x: x1, y: y1 };
}

//Функция проверки на число взаимодействующая с пользователем
function checkNumber(value, message) {
  while (!turnIntoNumber(value)) {
    alert('Введено не число, попробуйте еще раз.');
    value = prompt(message);
  }
  return parseFloat(value);
}

//Функция отрисовки отрезка ОМ
function drawOM(ctx, x0, y0, x4, y4) {
  // Масштаб координат (по желанию)
  const scale = 1;

  // Смещение, чтобы видеть всё в центре
  // const offsetX = 50;
  // const offsetY = 300;
  const offsetX = canvas.width / 2 - 200;
  const offsetY = canvas.height / 2 + 100;


  const canvasX = x => x * scale + offsetX;
  const canvasY = y => offsetY - y * scale; // инверсия Y для привычной системы координат

  // Рисуем линию (plot)
  ctx.beginPath();
  ctx.moveTo(canvasX(x0), canvasY(y0));
  ctx.lineTo(canvasX(x4), canvasY(y4));
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Точки (scatter)
  ctx.fillStyle = 'magenta'; // 'm' для точки O
  ctx.beginPath();
  ctx.arc(canvasX(x0), canvasY(y0), 5, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = 'green'; // 'g' для точки M
  ctx.beginPath();
  ctx.arc(canvasX(x4), canvasY(y4), 5, 0, 2 * Math.PI);
  ctx.fill();

  // Подписи (annotate)
  ctx.fillStyle = 'black';
  ctx.font = '16px Arial';
  ctx.fillText('O', canvasX(x0) - 15, canvasY(y0) - 10);
  ctx.fillText('M', canvasX(x4) + 10, canvasY(y4) + 5);
}

//Функция отрисовки звеньев
function drawLink(ctx, x1, y1, x2, y2, color) {
  const scale = 1;
  // const offsetX = 50;
  // const offsetY = 300;

  const offsetX = canvas.width / 2 - 200;
  const offsetY = canvas.height / 2 + 100;

  const canvasX = x => x * scale + offsetX;
  const canvasY = y => offsetY - y * scale;

  ctx.beginPath();
  ctx.moveTo(canvasX(x1), canvasY(y1));
  ctx.lineTo(canvasX(x2), canvasY(y2));
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
}

//Функция перевода в радианы
function toRadians(degrees) {
  return degrees * Math.PI / 180;
}
//Функция рандома
function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

//Основная функция муравьиной колонии
function antColony(setXPoints, setYPoints, l, m, n) {
  const l1 = l2 = l3 = l4 = l; //длина звеньев
  const d = l1 + l2 + l3 + l4; //сумма длин всех звеньев
  const g = 10; //ускорения свободного падения
  let min_0 = 1_000_000; //минимум для вычисления минимального суммарного момента в вершинах манипулятора
  let count = 0; //счетчик для вычисления среднего минимального суммарного момента
  let bad = 0; //количество не простроенных манипуляторов
  let bestManipulator = null;
  const manipulators = []; // массив для хранения координат и значений момента



  console.log('\nСумма длин всех звеньев = ', d);


  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  // Очищаем предыдущую отрисовку
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // // Параметры: контекст, ширина, высота канваса, расстояние между линиями сетки
  // drawGrid(ctx, canvas.width, canvas.height, 30); // 30 - расстояние между линиями сетки
  drawOM(ctx, setXPoints[0], setYPoints[0], setXPoints[4], setYPoints[4]);

  const OM = Math.hypot(setXPoints[4] - setXPoints[0], setYPoints[4] - setYPoints[0]);
  console.log('Расстояние от точки О до точки М = ', OM, '\n');

  if (OM > d) {
    console.log('Решения ОЗК нет');
    return;
  } else if (OM === d) {
    console.log('Одно решение');
    return;
  } else {
    console.log('---- OM/d = ', OM / d, ' ----');

    const phi = findPhi(setXPoints[0], setYPoints[0], setXPoints[4], setYPoints[4]);
    console.log('Угол между ОМ и х0,у0 = ', phi);

    const alpha = phi + (90 - (90 * OM / d));
    const betta = phi + (180 - (180 * OM / d));
    const diapason = betta - alpha;

    const partitions = 3;
    let p1 = 0.3, p2 = 0.6, p3 = 0.1;
    const p_u = 0.8;
    const q_u = 0.2;

    for (let i = 0; i < n; i++) {
      console.log(' -----------------------------');
      console.log('i = ', i, '\n');

      const p = Math.random();
      let alpha1;

      if (p < p1) {
        alpha1 = randomInRange(alpha, alpha + diapason / partitions);
        p1 = q_u * p1 + p_u;
        p2 = q_u * p2;
        p3 = q_u * p3;
        console.log('I');
      } else if (p < p1 + p2) {
        alpha1 = randomInRange(alpha + diapason / partitions, alpha + 2 * diapason / partitions);
        p1 = q_u * p1;
        p2 = q_u * p2 + p_u;
        p3 = q_u * p3;
        console.log('II');
      } else {
        alpha1 = randomInRange(alpha + 2 * diapason / partitions, betta);
        p1 = q_u * p1;
        p2 = q_u * p2;
        p3 = q_u * p3 + p_u;
        console.log('III');
      }

      console.log('alpha1 = ', alpha1);

      setXPoints[1] = setXPoints[0] + l1 * Math.cos(toRadians(alpha1));
      setYPoints[1] = setYPoints[0] + l1 * Math.sin(toRadians(alpha1));

      //Построение первого звена
      // drawLink(ctx, setXPoints[0], setYPoints[0], setXPoints[1], setYPoints[1], 'orange');


      const phi1 = findPhi(setXPoints[1], setYPoints[1], setXPoints[4], setYPoints[4]);
      console.log('\nУгол между О1М и х1, у1 = ', phi1);

      const betta1 = randomInRange(phi1, phi1 + (90 - (90 * OM / d)));
      console.log('betta1 = ', betta1);

      setXPoints[2] = setXPoints[1] + l2 * Math.cos(toRadians(betta1));
      setYPoints[2] = setYPoints[1] + l2 * Math.sin(toRadians(betta1));

      //Построение второго звена
      // drawLink(ctx, setXPoints[1], setYPoints[1], setXPoints[2], setYPoints[2], 'red');

      const dist = Math.sqrt(
        (setXPoints[4] - setXPoints[2]) ** 2 +
        (setYPoints[4] - setYPoints[2]) ** 2
      );

      let mmm = 0;
      if (dist > l3 + l4) {
        bad++;
      } else {
        const intersection = intersectionOfCircles(l3, l4, setXPoints[2], setYPoints[2], setXPoints[4], setYPoints[4]);
        setXPoints[3] = intersection.x;
        setYPoints[3] = intersection.y;
        //Построение третьего звена
        // drawLink(ctx, setXPoints[2], setYPoints[2], setXPoints[3], setYPoints[3], 'blue');
        // //Построение четвертого звена
        // drawLink(ctx, setXPoints[3], setYPoints[3], setXPoints[4], setYPoints[4], 'purple');
        mmm = minMoment(m, g, setXPoints[0], setXPoints[1], setXPoints[2], setXPoints[3], setXPoints[4]);
        count += mmm;

        //Записываем все положения манипулятора
        manipulators.push({
          coords: [
            { x: setXPoints[0], y: setYPoints[0] },
            { x: setXPoints[1], y: setYPoints[1] },
            { x: setXPoints[2], y: setYPoints[2] },
            { x: setXPoints[3], y: setYPoints[3] },
            { x: setXPoints[4], y: setYPoints[4] },
          ],
          moment: mmm,
        });

        if (mmm < min_0) {
          min_0 = mmm;
          console.log('\nМинимальный критерий = ', min_0);


          // // Сохраняем координаты лучшего манипулятора
          // bestManipulator = {
          //   x: [...setXPoints],
          //   y: [...setYPoints]
          // };
        }
      }
    }

    // Параметры: контекст, ширина, высота канваса, расстояние между линиями сетки
    drawGrid(ctx, canvas.width, canvas.height, 30); // 30 - расстояние между линиями сетки

    for (let i = 0; i < manipulators.length; i++) {
      const m = manipulators[i];
      const color = m.moment === min_0 ? 'limegreen' : 'rgba(128, 128, 128, 0.2)';

      drawLink(ctx, m.coords[0].x, m.coords[0].y, m.coords[1].x, m.coords[1].y, color);
      drawLink(ctx, m.coords[1].x, m.coords[1].y, m.coords[2].x, m.coords[2].y, color);
      drawLink(ctx, m.coords[2].x, m.coords[2].y, m.coords[3].x, m.coords[3].y, color);
      drawLink(ctx, m.coords[3].x, m.coords[3].y, m.coords[4].x, m.coords[4].y, color);
    }


    // if (bestManipulator) {
    //   drawLink(ctx, bestManipulator.x[0], bestManipulator.y[0], bestManipulator.x[1], bestManipulator.y[1], 'green');
    //   drawLink(ctx, bestManipulator.x[1], bestManipulator.y[1], bestManipulator.x[2], bestManipulator.y[2], 'green');
    //   drawLink(ctx, bestManipulator.x[2], bestManipulator.y[2], bestManipulator.x[3], bestManipulator.y[3], 'green');
    //   drawLink(ctx, bestManipulator.x[3], bestManipulator.y[3], bestManipulator.x[4], bestManipulator.y[4], 'green');
    // }
    console.log('\np1 = ', p1, ' p2 = ', p2, ' p3 = ', p3);
    console.log('\nСредний суммарный момент в вершинах звеньев манипулятора = ', count / (n - bad));
    console.log('Количество непостроенных манипуляторов = ', bad);
  }
}





//Взаимодействие с формой
document.getElementById('coordinates-form').addEventListener('submit', function (event) {
  event.preventDefault(); // предотвращаем отправку формы, чтобы обработать данные вручную

  // Получаем значения из инпутов
  let x0 = parseFloat(document.getElementById('x0').value);
  let y0 = parseFloat(document.getElementById('y0').value);
  let x4 = parseFloat(document.getElementById('x4').value);
  let y4 = parseFloat(document.getElementById('y4').value);
  let l = parseFloat(document.getElementById('l').value);
  let m = parseFloat(document.getElementById('m').value);
  let n = parseInt(document.getElementById('n').value);

  // Проверяем, что все значения введены правильно
  if (isNaN(x0) || isNaN(y0) || isNaN(x4) || isNaN(y4) || isNaN(l) || isNaN(m) || isNaN(n)) {
    alert("Пожалуйста, введите корректные значения.");
    return;
  }
  // Массивы координат
  const setXPoints = [0, 0, 0, 0, 0];
  const setYPoints = [0, 0, 0, 0, 0];
  // Записываем значения в массивы (или куда нужно)
  setXPoints[0] = x0;
  setYPoints[0] = y0;
  setXPoints[4] = x4;
  setYPoints[4] = y4;

  // Дальше можно продолжить с этими значениями
  console.log(`Координаты начальной точки: (${x0}, ${y0})`);
  console.log(`Координаты конечной точки: (${x4}, ${y4})`);
  console.log(`Длина звена: ${l}`);
  console.log(`Масса звена: ${m}`);
  console.log(`Количество манипуляторов: ${n}`);


  antColony(setXPoints, setYPoints, l, m, n);
});


