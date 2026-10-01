const MONTHS_ES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
] as const;

const ARGENTINA_TZ = "America/Argentina/Buenos_Aires";

function partsInTimeZone(date: Date, timeZone: string) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });

  const values = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value]),
  );

  return {
    year: Number(values.year),
    month: Number(values.month),
    day: Number(values.day),
  };
}

function firstSundayOfMonth(year: number, month: number) {
  const firstDay = new Date(Date.UTC(year, month - 1, 1));
  const weekday = firstDay.getUTCDay();
  const offset = weekday === 0 ? 0 : 7 - weekday;
  return new Date(Date.UTC(year, month - 1, 1 + offset));
}

export function formatNextFirstSunday(now = new Date()) {
  const today = partsInTimeZone(now, ARGENTINA_TZ);
  let year = today.year;
  let month = today.month;
  let firstSunday = firstSundayOfMonth(year, month);

  if (
    today.year > firstSunday.getUTCFullYear() ||
    today.month > firstSunday.getUTCMonth() + 1 ||
    (today.month === firstSunday.getUTCMonth() + 1 &&
      today.day > firstSunday.getUTCDate())
  ) {
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
    firstSunday = firstSundayOfMonth(year, month);
  }

  const day = String(firstSunday.getUTCDate()).padStart(2, "0");
  const monthName = MONTHS_ES[firstSunday.getUTCMonth()];

  return `Domingo ${day} de ${monthName}`;
}
