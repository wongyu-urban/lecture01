const unitData = {
  length: { title: '길이', base: 'm', units: { m: ['m', 1], km: ['km', 1000], cm: ['cm', 0.01], mm: ['mm', 0.001], in: ['in', 0.0254], ft: ['ft', 0.3048] } },
  mass: { title: '질량', base: 'kg', units: { kg: ['kg', 1], g: ['g', 0.001], mg: ['mg', 0.000001], lb: ['lb', 0.45359237], oz: ['oz', 0.028349523125] } },
  temperature: { title: '온도', base: '°C', units: { c: ['°C'], f: ['°F'], k: ['K'] } },
  pressure: { title: '압력', base: 'Pa', units: { pa: ['Pa', 1], kpa: ['kPa', 1000], mpa: ['MPa', 1000000], bar: ['bar', 100000], atm: ['atm', 101325], psi: ['psi', 6894.757293168] } }
};

const form = document.querySelector('#converter-form');
const valueInput = document.querySelector('#value-input');
const fromUnit = document.querySelector('#from-unit');
const toUnit = document.querySelector('#to-unit');
const result = document.querySelector('#result');
const categoryButtons = document.querySelectorAll('.category');
let activeCategory = 'length';

function populateUnits() {
  const units = unitData[activeCategory].units;
  fromUnit.innerHTML = '';
  toUnit.innerHTML = '';
  Object.entries(units).forEach(([key, [label]]) => {
    fromUnit.add(new Option(label, key));
    toUnit.add(new Option(label, key));
  });
  toUnit.selectedIndex = Math.min(1, toUnit.options.length - 1);
}

function convertTemperature(value, from, to) {
  let celsius = value;
  if (from === 'f') celsius = (value - 32) * 5 / 9;
  if (from === 'k') celsius = value - 273.15;
  if (to === 'f') return celsius * 9 / 5 + 32;
  if (to === 'k') return celsius + 273.15;
  return celsius;
}

function convertValue(value, from, to) {
  if (activeCategory === 'temperature') return convertTemperature(value, from, to);
  const units = unitData[activeCategory].units;
  return value * units[from][1] / units[to][1];
}

function formatNumber(number) {
  return new Intl.NumberFormat('ko-KR', { maximumSignificantDigits: 8 }).format(number);
}

function showResult(kind, value, formula) {
  result.className = `result result--${kind}`;
  result.innerHTML = `<p class="result-label">${kind === 'error' ? 'INPUT ERROR' : 'CONVERTED'}</p><p class="result-value">${value}</p><p class="result-formula">${formula}</p>`;
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeCategory = button.dataset.category;
    categoryButtons.forEach((item) => item.classList.toggle('active', item === button));
    populateUnits();
    showResult('idle', '값과 단위를 선택해 주세요.', `${unitData[activeCategory].title} 단위 변환`);
  });
});

document.querySelector('#swap-button').addEventListener('click', () => {
  const previous = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = previous;
});

document.querySelectorAll('.key[data-key]').forEach((key) => {
  key.addEventListener('click', () => {
    const action = key.dataset.key;
    if (action === 'clear') valueInput.value = '';
    else if (action === 'backspace') valueInput.value = valueInput.value.slice(0, -1);
    else if (action === '-') valueInput.value = valueInput.value.startsWith('-') ? valueInput.value.slice(1) : `-${valueInput.value}`;
    else if (action === '.' && valueInput.value.includes('.')) return;
    else valueInput.value += action;
    valueInput.focus();
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = Number(valueInput.value);
  if (valueInput.value.trim() === '' || !Number.isFinite(value)) {
    showResult('error', '숫자 값을 다시 입력해 주세요.', '정수와 소수 모두 입력할 수 있습니다.');
    valueInput.focus();
    return;
  }
  const converted = convertValue(value, fromUnit.value, toUnit.value);
  const fromLabel = fromUnit.options[fromUnit.selectedIndex].text;
  const toLabel = toUnit.options[toUnit.selectedIndex].text;
  showResult('success', `${formatNumber(converted)} ${toLabel}`, `${formatNumber(value)} ${fromLabel}  →  ${formatNumber(converted)} ${toLabel}`);
});

populateUnits();
