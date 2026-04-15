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

// Функция расчёта диапазона углов первого звена ПО ВАШЕЙ ФОРМУЛЕ из магистерской
function calculateFirstLinkRange(x0, y0, x4, y4, l1, l2, l3, l4) {
  const d = l1 + l2 + l3 + l4; // сумма длин всех звеньев
  const OM = Math.hypot(x4 - x0, y4 - y0); // расстояние между O и M
  
  // Угол между прямой OM и осью OX (ваш α из рис. 3.5)
  const alpha = Math.acos((x4 - x0) / OM) * 180 / Math.PI;
  
  // Проверяем знак угла (если M ниже O, угол отрицательный)
  const finalAlpha = (y4 - y0) >= 0 ? alpha : -alpha;
  
  let phi; // угол φ из теоремы косинусов (рис. 3.4)
  let thetaMin, thetaMax;
  
  // УСЛОВИЯ ИЗ ВАШЕЙ МАГИСТЕРСКОЙ (Глава 3.2)
  if (OM > d) {
    return { exists: false, message: "Решения нет: OM > d" };
  } 
  else if (Math.abs(OM - d) < 0.001) {
    // OM = d: одно решение, манипулятор выпрямлен
    return { 
      exists: true, 
      isUnique: true, 
      theta: finalAlpha,
      range: [finalAlpha, finalAlpha] 
    };
  }
  else if (OM > d / Math.sqrt(2)) {
    // Случай 1: d > OM > d/√2
    // Используем теорему косинусов для треугольника OMA (рис. 3.4)
    const a = l2 + l3 + l4; // остальные звенья как единый отрезок
    const b = l1;
    const c = OM;
    
    const cosPhi = (b*b + c*c - a*a) / (2 * b * c);
    phi = Math.acos(Math.min(1, Math.max(-1, cosPhi))) * 180 / Math.PI;
    
    thetaMin = finalAlpha - phi;
    thetaMax = finalAlpha + phi;
  }
  else if (Math.abs(OM - d / Math.sqrt(2)) < 0.001) {
    // Случай 2: OM = d/√2 (критическое значение, φ = 90°)
    phi = 90;
    thetaMin = finalAlpha - phi;
    thetaMax = finalAlpha + phi;
  }
  else if (OM > d/2) {
    // Случай 3: d/√2 > OM > d/2
    const a = l2 + l3 + l4;
    const b = l1;
    const c = OM;
    
    const cosPhi = (b*b + c*c - a*a) / (2 * b * c);
    phi = Math.acos(Math.min(1, Math.max(-1, cosPhi))) * 180 / Math.PI;
    
    thetaMin = finalAlpha - phi;
    thetaMax = finalAlpha + phi;
  }
  else {
    // Случай 4: d/2 ≥ OM — полный разворот
    thetaMin = 0;
    thetaMax = 360;
  }
  
  return {
    exists: true,
    isUnique: false,
    alpha: finalAlpha,
    phi: phi,
    range: [thetaMin, thetaMax],
    OM: OM,
    d: d
  };
}


// Функция расчёта диапазона углов второго звена ПО ВАШЕЙ ФОРМУЛЕ
function calculateSecondLinkRange(x1, y1, x4, y4, l2, l3, l4) {
  const d2 = l3 + l4; // сумма длин третьего и четвёртого звена
  const AM = Math.hypot(x4 - x1, y4 - y1); // расстояние от A(x1,y1) до M
  
  // Угол между прямой AM и осью OX
  const alpha2 = Math.acos((x4 - x1) / AM) * 180 / Math.PI;
  const finalAlpha2 = (y4 - y1) >= 0 ? alpha2 : -alpha2;
  
  let phi2;
  let thetaMin, thetaMax;
  
  if (AM > d2) {
    return { exists: false, message: "Решения нет для второго звена" };
  }
  else if (Math.abs(AM - d2) < 0.001) {
    return { exists: true, isUnique: true, theta: finalAlpha2 };
  }
  else if (AM > d2/2) {
    // По теореме косинусов для треугольника ABM (рис. 3.7)
    const a = d2;      // BM = l3 + l4
    const b = l2;      // AB
    const c = AM;      // AM
    
    const cosPhi2 = (b*b + c*c - a*a) / (2 * b * c);
    phi2 = Math.acos(Math.min(1, Math.max(-1, cosPhi2))) * 180 / Math.PI;
    
    thetaMin = finalAlpha2 - phi2;
    thetaMax = finalAlpha2 + phi2;
  }
  else {
    // Полный разворот
    thetaMin = 0;
    thetaMax = 360;
  }
  
  return {
    exists: true,
    range: [thetaMin, thetaMax]
  };
}



//Основная функция муравьиной колонии с глобальным поиском и адаптивными секторами
//Основная функция муравьиной колонии с классическим обновлением феромона
function antColony(rawX, rawY, l, m, n, draw = true, p_u, q_u) {
  const setXPoints = [...rawX];
  const setYPoints = [...rawY];
  const l1 = l, l2 = l, l3 = l, l4 = l;
  const d = l1 + l2 + l3 + l4;
  const g = 10;
  let min_0 = 1_000_000;
  let count = 0;
  let bad = 0;
  const manipulators = [];

  // const canvas = document.getElementById('canvas');
  // const ctx = canvas.getContext('2d');
  const canvas = draw ? document.getElementById('canvas') : null;
  const ctx = draw ? canvas.getContext('2d') : null;

  if (draw) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawOM(ctx, setXPoints[0], setYPoints[0], setXPoints[4], setYPoints[4]);
  }

  const firstLinkRange = calculateFirstLinkRange(
    setXPoints[0], setYPoints[0],
    setXPoints[4], setYPoints[4],
    l1, l2, l3, l4
  );
  
  if (!firstLinkRange.exists) {
    console.log(firstLinkRange.message);
    return;
  }
  
  if (firstLinkRange.isUnique) {
    console.log('Единственное решение, угол первого звена:', firstLinkRange.theta);
  }
  
  const theta1Range = firstLinkRange.range;
  const rangeSize = theta1Range[1] - theta1Range[0];
  
  // Количество секторов
  const partitions = 100;
  let partSize = rangeSize / partitions;
  
  // === ИНИЦИАЛИЗАЦИЯ ФЕРОМОНА (начальный уровень) ===
  // В классическом алгоритме начальный феромон - маленькая положительная константа
  const TAU0 = 0.1; // начальный уровень феромона
  let pheromone = new Array(partitions).fill(TAU0);
  
  // === АПРИОРНОЕ ЗНАНИЕ (начальное распределение феромона) ===
  const OM = firstLinkRange.OM;
  const d_total = firstLinkRange.d;
  const closeness = 1 - (OM / d_total);
  
  if (closeness > 0.2) {
    const biasStrength = Math.min(0.8, closeness);
    for (let s = 0; s < partitions; s++) {
      const rightBias = Math.pow(s / partitions, 1.5) * biasStrength * 3;
      pheromone[s] = pheromone[s] * (1 + rightBias);
    }
  }
  
  // Хранилище лучших решений
  let globalBestSolutions = [];
  const globalEliteSize = 30;
  
  // Параметры
  let explorationRate = 0.5; // начальный exploration
  let minExploration = 0.05;
  
  let bestTheta1 = null;
  let bestMomentGlobal = Infinity;
  
  // === ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ: вероятность выбора сектора ===
  // В классическом алгоритме вероятность пропорциональна феромону в степени α
  // и эвристике в степени β. Упрощённо: P ~ τ^α
  function calculateProbabilities(pheromone, alpha = 1) {
    let probs = new Array(partitions);
    let total = 0;
    
    for (let s = 0; s < partitions; s++) {
      // Возводим феромон в степень α (обычно α=1)
      probs[s] = Math.pow(pheromone[s], alpha);
      total += probs[s];
    }
    
    // Нормализация
    for (let s = 0; s < partitions; s++) {
      probs[s] = probs[s] / total;
    }
    
    return probs;
  }
  
  // === ЛОКАЛЬНЫЙ ПОИСК ===
  function localSearch(baseTheta, baseMoment, step = 2) {
    let bestLocalMoment = baseMoment;
    let bestLocalTheta = baseTheta;
    
    for (let delta of [-step, step]) {
      const testTheta = baseTheta + delta;
      if (testTheta < theta1Range[0] || testTheta > theta1Range[1]) continue;
      
      const testX1 = setXPoints[0] + l1 * Math.cos(toRadians(testTheta));
      const testY1 = setYPoints[0] + l1 * Math.sin(toRadians(testTheta));
      
      const testSecondRange = calculateSecondLinkRange(testX1, testY1, setXPoints[4], setYPoints[4], l2, l3, l4);
      if (!testSecondRange.exists) continue;
      
      let testTheta2;
      if (testSecondRange.isUnique) {
        testTheta2 = testSecondRange.theta;
      } else {
        testTheta2 = (testSecondRange.range[0] + testSecondRange.range[1]) / 2;
      }
      
      const testX2 = testX1 + l2 * Math.cos(toRadians(testTheta2));
      const testY2 = testY1 + l2 * Math.sin(toRadians(testTheta2));
      
      const testDist = Math.hypot(setXPoints[4] - testX2, setYPoints[4] - testY2);
      if (testDist > l3 + l4 + 0.001) continue;
      
      const testIntersection = intersectionOfCircles(l3, l4, testX2, testY2, setXPoints[4], setYPoints[4]);
      const testMoment = minMoment(m, g, setXPoints[0], testX1, testX2, testIntersection.x, setXPoints[4]);
      
      if (testMoment < bestLocalMoment) {
        bestLocalMoment = testMoment;
        bestLocalTheta = testTheta;
      }
    }
    return { theta: bestLocalTheta, moment: bestLocalMoment };
  }
  
  for (let i = 0; i < n; i++) {
    // Адаптивный exploration
    const currentExploration = Math.max(minExploration, explorationRate * (1 - i / n));
    
    // Пересчитываем вероятности на основе текущего феромона
    let probs = calculateProbabilities(pheromone, 1);
    
    let selectedSector;
    let theta1;
    
    // === ВЫБОР СЕКТОРА ===
    if (globalBestSolutions.length > 0 && Math.random() < 0.35) {
      // Использование элитных решений
      const topK = Math.min(5, globalBestSolutions.length);
      const bestGlobal = globalBestSolutions[Math.floor(Math.random() * topK)];
      const deviation = Math.max(2, 15 * (1 - i / n));
      theta1 = bestGlobal.theta1 + (Math.random() - 0.5) * deviation;
      theta1 = Math.max(theta1Range[0], Math.min(theta1Range[1], theta1));
      selectedSector = Math.floor((theta1 - theta1Range[0]) / partSize);
      selectedSector = Math.min(partitions - 1, Math.max(0, selectedSector));
    }
    else if (Math.random() < currentExploration) {
      // Случайный выбор (exploration)
      selectedSector = Math.floor(Math.random() * partitions);
      const sectorStart = theta1Range[0] + selectedSector * partSize;
      const sectorEnd = sectorStart + partSize;
      theta1 = randomInRange(sectorStart, sectorEnd);
    } 
    else {
      // Выбор на основе вероятностей (exploitation)
      const rand = Math.random();
      let cumProb = 0;
      for (let s = 0; s < partitions; s++) {
        cumProb += probs[s];
        if (rand < cumProb) {
          selectedSector = s;
          break;
        }
      }
      const sectorStart = theta1Range[0] + selectedSector * partSize;
      const sectorEnd = sectorStart + partSize;
      theta1 = randomInRange(sectorStart, sectorEnd);
    }
    
    // Координаты конца первого звена
    setXPoints[1] = setXPoints[0] + l1 * Math.cos(toRadians(theta1));
    setYPoints[1] = setYPoints[0] + l1 * Math.sin(toRadians(theta1));
    
    // Диапазон второго звена
    const secondLinkRange = calculateSecondLinkRange(
      setXPoints[1], setYPoints[1],
      setXPoints[4], setYPoints[4],
      l2, l3, l4
    );
    
    let theta2;
    if (secondLinkRange.exists) {
      if (secondLinkRange.isUnique) {
        theta2 = secondLinkRange.theta;
      } else {
        const range2 = secondLinkRange.range;
        theta2 = randomInRange(range2[0], range2[1]);
      }
    } else {
      bad++;
      continue;
    }
    
    // Координаты конца второго звена
    setXPoints[2] = setXPoints[1] + l2 * Math.cos(toRadians(theta2));
    setYPoints[2] = setYPoints[1] + l2 * Math.sin(toRadians(theta2));
    
    const dist = Math.hypot(setXPoints[4] - setXPoints[2], setYPoints[4] - setYPoints[2]);
    
    if (dist > l3 + l4 + 0.001) {
      bad++;
      continue;
    }
    
    const intersection = intersectionOfCircles(l3, l4, setXPoints[2], setYPoints[2], setXPoints[4], setYPoints[4]);
    setXPoints[3] = intersection.x;
    setYPoints[3] = intersection.y;
    
    let mmm = minMoment(m, g, setXPoints[0], setXPoints[1], setXPoints[2], setXPoints[3], setXPoints[4]);
    
    // Локальный поиск
    if (mmm < bestMomentGlobal * 1.1 && i > 10) {
      const localResult = localSearch(theta1, mmm, 1);
      if (localResult.moment < mmm) {
        theta1 = localResult.theta;
        mmm = localResult.moment;
        setXPoints[1] = setXPoints[0] + l1 * Math.cos(toRadians(theta1));
        setYPoints[1] = setYPoints[0] + l1 * Math.sin(toRadians(theta1));
        const newSecondRange = calculateSecondLinkRange(setXPoints[1], setYPoints[1], setXPoints[4], setYPoints[4], l2, l3, l4);
        if (newSecondRange.exists) {
          let newTheta2;
          if (newSecondRange.isUnique) {
            newTheta2 = newSecondRange.theta;
          } else {
            newTheta2 = (newSecondRange.range[0] + newSecondRange.range[1]) / 2;
          }
          setXPoints[2] = setXPoints[1] + l2 * Math.cos(toRadians(newTheta2));
          setYPoints[2] = setYPoints[1] + l2 * Math.sin(toRadians(newTheta2));
          const newDist = Math.hypot(setXPoints[4] - setXPoints[2], setYPoints[4] - setYPoints[2]);
          if (newDist <= l3 + l4 + 0.001) {
            const newIntersection = intersectionOfCircles(l3, l4, setXPoints[2], setYPoints[2], setXPoints[4], setYPoints[4]);
            setXPoints[3] = newIntersection.x;
            setYPoints[3] = newIntersection.y;
          }
        }
      }
    }
    
    count += mmm;
    
    manipulators.push({
      coords: [
        { x: setXPoints[0], y: setYPoints[0] },
        { x: setXPoints[1], y: setYPoints[1] },
        { x: setXPoints[2], y: setYPoints[2] },
        { x: setXPoints[3], y: setYPoints[3] },
        { x: setXPoints[4], y: setYPoints[4] },
      ],
      moment: mmm,
      theta1: theta1,
      theta2: theta2,
      sector: selectedSector
    });
    
    // Глобальное обновление лучшего решения
    if (mmm < bestMomentGlobal) {
      bestMomentGlobal = mmm;
      bestTheta1 = theta1;
    }
    
    if (mmm < min_0) {
      min_0 = mmm;
    }
    
    // Сохраняем в элитный список
    globalBestSolutions.push({ theta1: theta1, moment: mmm });
    globalBestSolutions.sort((a, b) => a.moment - b.moment);
    if (globalBestSolutions.length > globalEliteSize) {
      globalBestSolutions = globalBestSolutions.slice(0, globalEliteSize);
    }
    
    // === КЛАССИЧЕСКОЕ ОБНОВЛЕНИЕ ФЕРОМОНА ===
    // 1. СНАЧАЛА ИСПАРЕНИЕ: умножаем весь феромон на (1 - ρ)
    for (let s = 0; s < partitions; s++) {
      pheromone[s] = pheromone[s] * (1 - q_u);
    }
    
    // 2. ЗАТЕМ ОТЛОЖЕНИЕ: добавляем феромон от каждого муравья
    // В классическом алгоритме Δτ = Q / L, где L - длина пути (момент)
    // Используем элитные решения для отложения феромона
    for (let k = 0; k < Math.min(10, globalBestSolutions.length); k++) {
      const solution = globalBestSolutions[k];
      const sector = Math.floor((solution.theta1 - theta1Range[0]) / partSize);
      const validSector = Math.min(partitions - 1, Math.max(0, sector));
      
      // Классическая формула: Δτ = p_u / (момент + 1)
      // Делим на (момент + 1), чтобы хорошие решения (с маленьким моментом) давали больше феромона
      const deltaTau = p_u / (solution.moment + 1);
      pheromone[validSector] += deltaTau;
    }
    
    // Также добавляем феромон от текущего решения (если оно достаточно хорошее)
    const currentDelta = p_u / (mmm + 1);
    pheromone[selectedSector] += currentDelta;
    
    // Защита от переполнения и нулевых значений
    for (let s = 0; s < partitions; s++) {
      if (pheromone[s] < 0.001) pheromone[s] = 0.001;
      if (pheromone[s] > 10) pheromone[s] = 10;
    }
  }
  
  // Отрисовка
  if (draw) {
    drawGrid(ctx, canvas.width, canvas.height, 30);
    
    for (let i = 0; i < manipulators.length; i++) {
      const m = manipulators[i];
      let color;
      if (m.moment === min_0) {
        color = 'limegreen';
      } else {
        const opacity = Math.max(0.05, 0.15 * (1 - m.moment / min_0 / 3));
        color = `rgba(128, 128, 128, ${opacity})`;
      }
      
      drawLink(ctx, m.coords[0].x, m.coords[0].y, m.coords[1].x, m.coords[1].y, color);
      drawLink(ctx, m.coords[1].x, m.coords[1].y, m.coords[2].x, m.coords[2].y, color);
      drawLink(ctx, m.coords[2].x, m.coords[2].y, m.coords[3].x, m.coords[3].y, color);
      drawLink(ctx, m.coords[3].x, m.coords[3].y, m.coords[4].x, m.coords[4].y, color);
    }
    
    const bestManipulator = manipulators.find(m => m.moment === min_0);
    if (bestManipulator) {
      ctx.lineWidth = 4;
      drawLink(ctx, bestManipulator.coords[0].x, bestManipulator.coords[0].y, 
               bestManipulator.coords[1].x, bestManipulator.coords[1].y, 'limegreen');
      drawLink(ctx, bestManipulator.coords[1].x, bestManipulator.coords[1].y, 
               bestManipulator.coords[2].x, bestManipulator.coords[2].y, 'limegreen');
      drawLink(ctx, bestManipulator.coords[2].x, bestManipulator.coords[2].y, 
               bestManipulator.coords[3].x, bestManipulator.coords[3].y, 'limegreen');
      drawLink(ctx, bestManipulator.coords[3].x, bestManipulator.coords[3].y, 
               bestManipulator.coords[4].x, bestManipulator.coords[4].y, 'limegreen');
      ctx.lineWidth = 2;
    }
  }
  
  // Вывод результатов
  if (draw) {
    // Находим сектор с максимальным феромоном
    let maxPheromone = 0;
    let bestSectorIdx = 0;
    for (let s = 0; s < partitions; s++) {
      if (pheromone[s] > maxPheromone) {
        maxPheromone = pheromone[s];
        bestSectorIdx = s;
      }
    }
    const bestSectorStart = theta1Range[0] + bestSectorIdx * partSize;
    const bestSectorEnd = bestSectorStart + partSize;
    
    document.getElementById('result').innerHTML = `
      <strong>Лучший момент:</strong> ${bestMomentGlobal.toFixed(2)}<br>
      <strong>Лучший угол θ1:</strong> ${bestTheta1 ? bestTheta1.toFixed(1) : 'N/A'}°<br>
      <strong>Диапазон θ1:</strong> [${theta1Range[0].toFixed(1)}°, ${theta1Range[1].toFixed(1)}°]<br>
      <strong>OM/d =</strong> ${(OM / d_total).toFixed(3)}<br>
      <strong>Построено успешно:</strong> ${manipulators.length} / ${n}<br>
      <strong>Сектор с макс. феромоном:</strong> ${bestSectorStart.toFixed(0)}° - ${bestSectorEnd.toFixed(0)}°<br>
      <strong>Топ-3 угла:</strong><br>
      ${globalBestSolutions.slice(0, 3).map(s => 
        `${s.theta1.toFixed(1)}° (${s.moment.toFixed(2)})`
      ).join(' | ')}
    `;
  }
  
  let avg = (n - bad) > 0 ? count / (n - bad) : Infinity;
  return {
    best: bestMomentGlobal,
    avg: count / (n - bad),
    bad: bad,
    bestTheta1: bestTheta1,
    eliteSolutions: globalBestSolutions
  };
}

function runParameterSearch(setXPoints, setYPoints, l, m) {

  const results = [];

  const p_u_values = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  const q_u_values = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
  const n_values = [50, 100, 200, 500, 1000];

  for (let p_u of p_u_values) {
    for (let q_u of q_u_values) {
      for (let n of n_values) {

        let best = Infinity;
        let sum = 0;
        let runs = 100; // повторяем для стабильности

        for (let i = 0; i < runs; i++) {

          // копируем массивы (ВАЖНО!)
          const xCopy = [...setXPoints];
          const yCopy = [...setYPoints];


          const result = antColony(xCopy, yCopy, l, m, n, false, p_u, q_u);

          if (!result || result.avg === Infinity) continue;

          best = Math.min(best, result.best);
          sum += result.avg;
        }

        results.push({
          p_u,
          q_u,
          n,
          bestMoment: best,
          avgMoment: sum / runs
        });
      }
    }
  }
  results.sort((a, b) => a.bestMoment - b.bestMoment);
  console.log("=== РЕЗУЛЬТАТЫ ПОДБОРА ПАРАМЕТРОВ ===");
  console.table(results);

  return results;
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


  // antColony(setXPoints, setYPoints, l, m, n);
  // сначала обычный запуск
  const p_u = parseFloat(document.getElementById('p_u').value);
  const q_u = parseFloat(document.getElementById('q_u').value);

  antColony(setXPoints, setYPoints, l, m, n, true, p_u, q_u);

  // затем подбор параметров
  runParameterSearch(setXPoints, setYPoints, l, m);

});


