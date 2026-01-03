const SUN_SIGNS = {
  Aries:       ["03-21", "04-19"],
  Taurus:      ["04-20", "05-20"],
  Gemini:      ["05-21", "06-20"],
  Cancer:      ["06-21", "07-22"],
  Leo:         ["07-23", "08-22"],
  Virgo:       ["08-23", "09-22"],
  Libra:       ["09-23", "10-22"],
  Scorpio:     ["10-23", "11-21"],
  Sagittarius: ["11-22", "12-21"],
  Capricorn:   ["12-22", "01-19"],
  Aquarius:    ["01-20", "02-18"],
  Pisces:      ["02-19", "03-20"],
};

const ZODIAC_ANIMALS = [
  "Rat","Ox","Tiger","Rabbit","Dragon","Snake",
  "Horse","Goat","Monkey","Rooster","Dog","Pig"
];

// 2020 was Rat
function zodiacAnimal(year) {
  return ZODIAC_ANIMALS[(year - 2020 + 1200) % 12];
}

const MOON_SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

const MOON_CYCLE_DAYS = 2.5;
const MOON_REF = new Date("2001-01-01T00:00:00Z");

function moonSignOn(date) {
  const deltaDays = (date - MOON_REF) / (1000 * 60 * 60 * 24);
  const index = Math.floor((deltaDays / MOON_CYCLE_DAYS) % 12);
  return MOON_SIGNS[(index + 12) % 12];
}

function ascendantWindow(sign) {
  const index = MOON_SIGNS.indexOf(sign);
  const start = (index * 2) % 24;
  return { start, end: (start + 2) % 24 };
}

function sunDatesForYear(sign, year) {
  const [start, end] = SUN_SIGNS[sign];
  const [sm, sd] = start.split("-").map(Number);
  const [em, ed] = end.split("-").map(Number);

  const dates = [];
  let d = new Date(year, sm - 1, sd);

  const endDate = em >= sm
    ? new Date(year, em - 1, ed)
    : new Date(year + 1, em - 1, ed);

  while (d <= endDate) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function generateBirthdays({
  sun,
  moon,
  ascendant,
  animal,
  yearStart,
  yearEnd
}) {
  const results = [];

  for (let year = yearStart; year <= yearEnd; year++) {
    if (zodiacAnimal(year) !== animal) continue;

    const dates = sunDatesForYear(sun, year);
    for (const d of dates) {
      const score = scoreDate(d, moon, ascendant);
      if (score > 0) {
        results.push({
          date: d.toISOString().slice(0,10),
          year,
          score
        });
      }
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
