/* eslint-disable no-multiple-empty-lines */
// TODO: write code here
const response = [
  {
    id: 26,
    title: 'Побег из Шоушенка',
    imdb: 9.30,
    year: 1994,
  },
  {
    id: 25,
    title: 'Крёстный отец',
    imdb: 9.20,
    year: 1972,
  },
  {
    id: 27,
    title: 'Крёстный отец 2',
    imdb: 9.00,
    year: 1974,
  },
  {
    id: 1047,
    title: 'Тёмный рыцарь',
    imdb: 9.00,
    year: 2008,
  },
  {
    id: 223,
    title: 'Криминальное чтиво',
    imdb: 8.90,
    year: 1994,
  },
];

const container = document.querySelector('#table');
const table = document.createElement('table');

container.append(table);
table.setAttribute('border', '1px solid');

/**
 * Создает заголовок таблицы
 */
const createHeader = () => {
  const headers = Object.keys(response[0]);
  const tr = document.createElement('tr');
  headers.forEach((elem) => {
    const th = document.createElement('th');
    th.textContent = elem;
    tr.append(th);
  });
  table.append(tr);
};

/**
 * Создает строку таблицы
 * @param {object} data - объект данных
 * @returns - html элемент
 */
const createRow = (data) => {
  const tr = document.createElement('tr');
  Object.keys(data).forEach((key) => {
    const td = document.createElement('td');
    switch (key) {
      case 'year':
        td.textContent = `(${data[key]})`;
        break;
      case 'imdb':
        td.textContent = `imdb: ${data[key].toFixed(2)}`;
        break;
      default:
        td.textContent = data[key];
    }
    tr.append(td);
  });
  return tr;
};


/**
 * Выделяет активную ячейку и добавляет стрелку
 * @param {string} key - Название ячейки
 * @param {boolean} ascending - Порядок сортировки. true - по возрастанию, false - по убыванию.
 */
function selectActiveCell(key, ascending) {
  const th = table.querySelectorAll('th');
  for (const item of th) {
    item.classList = '';
  }
  th.forEach((elem) => {
    if (elem.textContent === key) {
      const arrow = ascending ? 'sort-up' : 'sort-down';
      elem.classList.add('sort');
      elem.classList.add(arrow);
    }
  });
}


/**
 * Сортирует элементы
 * @param {string} key - id по которому происходит сортировка
 * @param {boolean} ascending - Порядок сортировки. true - по возрастанию, false - по убыванию.
 * @returns - Отсортированный массив
 */
function sortData(key, ascending = true) {
  console.warn(`Сортировка по ${key}. По ${ascending ? 'возрастанию' : 'убыванию'}`);
  selectActiveCell(key, ascending);

  const sort = response.sort((a, b) => {
    const parseA = Number.parseFloat(a[key]) || a[key];
    const parseB = Number.parseFloat(b[key]) || b[key];
    if (parseA > parseB) {
      return ascending ? 1 : -1;
    }
    if (parseA < parseB) {
      return ascending ? -1 : 1;
    }
    return 0;
  });
  return sort;
}


/**
* Генератор вариантов сортировки
* @returns - Отсортированный массив
*/
function* sortGenerator() {
  yield sortData('id', true); // id по возрастанию
  yield sortData('id', false); // id по убыванию
  yield sortData('title', true); // title по возрастанию
  yield sortData('title', false); // title по убыванию
  yield sortData('imdb', true); // imdb по возрастанию
  yield sortData('imdb', false); // imdb по убыванию
  yield sortData('year', true); // year по возрастанию
  yield sortData('year', false); // year по убыванию
  return false;
}


// Таблица как есть в данных
createHeader();
for (const item of response) {
  table.append(createRow(item));
}


// Сортировка по очереди с интервалом
const dataGen = sortGenerator();
const intervalId = setInterval(() => {
  const data = dataGen.next();
  if (!data.value) {
    clearInterval(intervalId);
    alert('Done');
    return;
  }
  // Очищаем строки
  const clear = table.firstElementChild;
  table.innerHTML = '';
  table.append(clear);
  for (const item of data.value) {
    table.append(createRow(item));
  }
}, 2000);
