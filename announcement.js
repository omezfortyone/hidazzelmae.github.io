const calendarElement = document.getElementById('calendar');
let currentYear, currentMonth;

function generateCalendar(year, month) {
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    if (typeof year === 'undefined' || typeof month === 'undefined') {
        const date = new Date();
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
    } else {
        currentYear = year;
        currentMonth = month;
    }

    let calendarHtml = '<table>';
    calendarHtml += '<tr><th colspan="7">';
    calendarHtml += `<button onclick="previousMonth()">&lt;</button>`;
    calendarHtml += `<select id="monthSelect" onchange="updateCalendar()">${generateMonthOptions(currentMonth)}</select>`;
    calendarHtml += `<select id="yearSelect" onchange="updateCalendar()">${generateYearOptions(currentYear)}</select>`;
    calendarHtml += `<button onclick="nextMonth()">&gt;</button>`;
    calendarHtml += `</th></tr>`;
    calendarHtml += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = 32 - new Date(currentYear, currentMonth, 32).getDate();

    let dateNum = 1;
    for (let i = 0; i < 6; i++) {
        calendarHtml += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay) {
                calendarHtml += '<td></td>';
            } else if (dateNum > daysInMonth) {
                break;
            } else {
                calendarHtml += `<td>${dateNum}</td>`;
                dateNum++;
            }
        }
        calendarHtml += '</tr>';
    }
    calendarHtml += '</table>';

    return calendarHtml;
}

function generateYearOptions(currentYear) {
    let options = '';
    for (let year = currentYear - 5; year <= currentYear + 5; year++) {
        options += `<option value="${year}" ${year === currentYear ? 'selected' : ''}>${year}</option>`;
    }
    return options;
}

function generateMonthOptions(currentMonth) {
    let options = '';
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    for (let i = 0; i < 12; i++) {
        options += `<option value="${i}" ${i === currentMonth ? 'selected' : ''}>${monthNames[i]}</option>`;
    }
    return options;
}

function updateCalendar() {
    const yearSelect = document.getElementById('yearSelect');
    const monthSelect = document.getElementById('monthSelect');
    const year = parseInt(yearSelect.value);
    const month = parseInt(monthSelect.value);
    const scrollTop = calendarElement.scrollTop;
    calendarElement.innerHTML = generateCalendar(year, month);
    calendarElement.scrollTop = scrollTop;
}


function previousMonth() {
    if (currentMonth === 0) {
        currentYear--;
        currentMonth = 11;
    } else {
        currentMonth--;
    }
    calendarElement.innerHTML = generateCalendar(currentYear, currentMonth);
}

function nextMonth() {
    if (currentMonth === 11) {
        currentYear++;
        currentMonth = 0;
    } else {
        currentMonth++;
    }
    calendarElement.innerHTML = generateCalendar(currentYear, currentMonth);
}

calendarElement.innerHTML = generateCalendar();
