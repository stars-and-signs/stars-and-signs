function generateBirthdates(zodiacAnimal, sunSign, moonSign, ascendantSign) {
  const MS_PER_DAY = 86400000;

  const moonSigns = [
    "aries", "taurus", "gemini", "cancer",
    "leo", "virgo", "libra", "scorpio",
    "sagittarius", "capricorn", "aquarius", "pisces"
  ];

  const zodiacDates = {
    rat: { start: [12, 19], end: [1, 18] },
    ox: { start: [1, 19], end: [2, 18] },
    tiger: { start: [2, 19], end: [3, 20] },
    rabbit: { start: [3, 21], end: [4, 19] },
    dragon: { start: [4, 20], end: [5, 20] },
    snake: { start: [5, 21], end: [6, 20] },
    horse: { start: [6, 21], end: [7, 22] },
    goat: { start: [7, 23], end: [8, 22] },
    monkey: { start: [8, 23], end: [9, 22] },
    rooster: { start: [9, 23], end: [10, 22] },
    dog: { start: [10, 23], end: [11, 21] },
    pig: { start: [11, 22], end: [12, 18] }
  };

  const sunSignDates = {
    aries: { start: [3, 21], end: [4, 19] },
    taurus: { start: [4, 20], end: [5, 20] },
    gemini: { start: [5, 21], end: [6, 20] },
    cancer: { start: [6, 21], end: [7, 22] },
    leo: { start: [7, 23], end: [8, 22] },
    virgo: { start: [8, 23], end: [9, 22] },
    libra: { start: [9, 23], end: [10, 22] },
    scorpio: { start: [10, 23], end: [11, 21] },
    sagittarius: { start: [11, 22], end: [12, 21] },
    capricorn: { start: [12, 22], end: [1, 19] },
    aquarius: { start: [1, 20], end: [2, 18] },
    pisces: { start: [2, 19], end: [3, 20] }
  };

  const zodiacYears = {
    rat: [1972, 1984, 1996, 2008, 2020, 2032],
    ox: [1973, 1985, 1997, 2009, 2021, 2033],
    tiger: [1974, 1986, 1998, 2010, 2022, 2034],
    rabbit: [1975, 1987, 1999, 2011, 2023, 2035],
    dragon: [1976, 1988, 2000, 2012, 2024, 2036]
  };

  const referenceDate = new Date(Date.UTC(1972, 0, 1, 0, 0, 0));
  const referenceMoonIndex = moonSigns.indexOf("cancer");
  const moonSignLength = 29.530588 / 12;

  function getMoonSign(date) {
    const daysSinceRef = (date - referenceDate) / MS_PER_DAY;
    const signOffset = Math.floor(daysSinceRef / moonSignLength);
    return moonSigns[(referenceMoonIndex + signOffset) % 12];
  }

  const animal = zodiacAnimal.toLowerCase();
  const sun = sunSign.toLowerCase();
  const moon = moonSign.toLowerCase();

  if (!zodiacYears[animal] || !sunSignDates[sun]) {
    return "Invalid zodiac animal or sun sign";
  }

  const results = [];

  zodiacYears[animal].forEach(year => {
    const [startMonth, startDay] = sunSignDates[sun].start;
    const [endMonth, endDay] = sunSignDates[sun].end;

    const start = new Date(year, startMonth - 1, startDay);
    const end = new Date(year, endMonth - 1, endDay);

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (getMoonSign(d) === moon) {
        results.push(new Date(d).toDateString());
      }
    }
  });

  return results;
}

// Example usage:
console.log(generateBirthdates("dragon", "leo", "virgo", "libra"));