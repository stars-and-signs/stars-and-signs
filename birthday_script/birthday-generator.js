function generateBirthdates(zodiacAnimal, sunSign, moonSign, ascendantSign) {
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
    rat: [1972, 1984, 1996, 2008, 2020, 2032, 2044, 2056, 2068],
    ox: [1973, 1985, 1997, 2009, 2021, 2033, 2045, 2057, 2069],
    tiger: [1974, 1986, 1998, 2010, 2022, 2034, 2046, 2058, 2070],
    rabbit: [1975, 1987, 1999, 2011, 2023, 2035, 2047, 2059],
    dragon: [1976, 1988, 2000, 2012, 2024, 2036, 2048, 2060],
    snake: [1977, 1989, 2001, 2013, 2025, 2037, 2049, 2061],
    horse: [1978, 1990, 2002, 2014, 2026, 2038, 2050, 2062],
    goat: [1979, 1991, 2003, 2015, 2027, 2039, 2051, 2063],
    monkey: [1980, 1992, 2004, 2016, 2028, 2040, 2052, 2064],
    rooster: [1981, 1993, 2005, 2017, 2029, 2041, 2053, 2065],
    dog: [1982, 1994, 2006, 2018, 2030, 2042, 2054, 2066],
    pig: [1983, 1995, 2007, 2019, 2031, 2043, 2055, 2067]
  };

  const results = [];
  const animal = zodiacAnimal.toLowerCase();
  const sun = sunSign.toLowerCase();

  if (!zodiacDates[animal] || !sunSignDates[sun]) {
    return "Invalid zodiac animal or sun sign";
  }

  const validYears = zodiacYears[animal];
  const [sunMonth, sunDay] = sunSignDates[sun].start;

  validYears.forEach(year => {
    results.push(new Date(year, sunMonth - 1, sunDay).toDateString());
  });

  return results;
}

// Example usage:
console.log(generateBirthdates("dragon", "leo", "virgo", "libra"));