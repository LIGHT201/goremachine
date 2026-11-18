document.addEventListener('DOMContentLoaded', () => {
    const monthLabel = document.getElementById('calendar-month');
    const daysContainer = document.getElementById('calendar-days');
    const previousButton = document.getElementById('calendar-prev');
    const nextButton = document.getElementById('calendar-next');

    if (!monthLabel || !daysContainer || !previousButton || !nextButton) {
        return;
    }

    const today = new Date();
    const displayedMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthFormatter = new Intl.DateTimeFormat(undefined, {
        month: 'long',
        year: 'numeric',
    });

    function renderCalendar() {
        monthLabel.textContent = monthFormatter.format(displayedMonth);
        daysContainer.replaceChildren();

        const firstWeekday = new Date(
            displayedMonth.getFullYear(),
            displayedMonth.getMonth(),
            1,
        ).getDay();
        const daysInMonth = new Date(
            displayedMonth.getFullYear(),
            displayedMonth.getMonth() + 1,
            0,
        ).getDate();
        const daysInPreviousMonth = new Date(
            displayedMonth.getFullYear(),
            displayedMonth.getMonth(),
            0,
        ).getDate();
        const cellCount = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

        for (let index = 0; index < cellCount; index += 1) {
            const day = document.createElement('span');
            const dayNumber = index - firstWeekday + 1;
            let date;

            if (dayNumber < 1) {
                day.textContent = String(daysInPreviousMonth + dayNumber);
                day.className = 'calendar-day is-outside-month';
                date = new Date(
                    displayedMonth.getFullYear(),
                    displayedMonth.getMonth() - 1,
                    daysInPreviousMonth + dayNumber,
                );
            } else if (dayNumber > daysInMonth) {
                day.textContent = String(dayNumber - daysInMonth);
                day.className = 'calendar-day is-outside-month';
                date = new Date(
                    displayedMonth.getFullYear(),
                    displayedMonth.getMonth() + 1,
                    dayNumber - daysInMonth,
                );
            } else {
                day.textContent = String(dayNumber);
                day.className = 'calendar-day';
                date = new Date(
                    displayedMonth.getFullYear(),
                    displayedMonth.getMonth(),
                    dayNumber,
                );
            }

            day.setAttribute('role', 'gridcell');
            if (
                date.getFullYear() === today.getFullYear()
                && date.getMonth() === today.getMonth()
                && date.getDate() === today.getDate()
            ) {
                day.classList.add('is-today');
                day.setAttribute('aria-current', 'date');
            }

            daysContainer.appendChild(day);
        }
    }

    previousButton.addEventListener('click', () => {
        displayedMonth.setMonth(displayedMonth.getMonth() - 1);
        renderCalendar();
    });

    nextButton.addEventListener('click', () => {
        displayedMonth.setMonth(displayedMonth.getMonth() + 1);
        renderCalendar();
    });

    renderCalendar();
});
