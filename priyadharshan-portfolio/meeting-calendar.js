(() => {
  const root = document.getElementById('meeting-calendar');
  if (!root) return;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let month = new Date(today.getFullYear(), today.getMonth(), 1);
  let selected = null;
  const days = root.querySelector('#calendar-days');
  const previous = root.querySelector('#calendar-prev');
  const format = date => date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
  function render(focusDay) {
    root.querySelector('#calendar-month').textContent = month.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    previous.disabled = month.getFullYear() === today.getFullYear() && month.getMonth() === today.getMonth();
    days.replaceChildren();
    const offset = (month.getDay() + 6) % 7;
    const count = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const cells = Math.ceil((offset + count) / 7) * 7;
    for (let i = 0; i < cells; i++) {
      const day = i - offset + 1;
      if (day < 1 || day > count) {
        const blank = document.createElement('span');
        blank.className = 'calendar-blank';
        blank.setAttribute('aria-hidden', 'true');
        days.append(blank);
        continue;
      }
      const date = new Date(month.getFullYear(), month.getMonth(), day);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'calendar-day';
      button.textContent = day;
      button.dataset.day = day;
      button.disabled = date < today;
      button.setAttribute('aria-label', format(date));
      button.setAttribute('aria-pressed', String(selected?.getTime() === date.getTime()));
      if (date.getTime() === today.getTime()) {
        button.classList.add('is-today');
        button.setAttribute('aria-current', 'date');
      }
      button.addEventListener('click', () => {
        selected = date;
        root.querySelector('#calendar-selection').textContent = format(date);
        render(day);
      });
      button.addEventListener('keydown', event => {
        const delta = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[event.key];
        if (!delta) return;
        event.preventDefault();
        const target = new Date(date.getFullYear(), date.getMonth(), day + delta);
        if (target < today) return;
        month = new Date(target.getFullYear(), target.getMonth(), 1);
        render(target.getDate());
      });
      days.append(button);
    }
    if (focusDay) days.querySelector(`[data-day="${focusDay}"]`)?.focus();
  }
  previous.addEventListener('click', () => { month.setMonth(month.getMonth() - 1); render(); });
  root.querySelector('#calendar-next').addEventListener('click', () => { month.setMonth(month.getMonth() + 1); render(); });
  root.querySelector('#calendar-today').addEventListener('click', () => {
    month = new Date(today.getFullYear(), today.getMonth(), 1);
    render(today.getDate());
  });
  render();
})();
