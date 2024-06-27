exports.getRangeMap = (intime, range) => {
  const hourMap = new Map();

  // Populate hourMap with data from intime
  for (let i = 0; i < intime.length; i++) {
    const inTime = intime[i]?.attendance?.inTime ||intime[i]?.attendance?.outTime ;
    const CCNO = intime[i]?.attendance?.CCNO;
    const E_NAME = intime[i]?.name;

    if (inTime && CCNO && E_NAME) {
      const [hr, min, sec] = inTime.split(":");
      const hour = parseInt(hr, 10);

      if (hourMap.has(hour)) {
        hourMap.get(hour).info.push({ CCNO: CCNO, name: E_NAME });
        hourMap.get(hour).count++;
      } else {
        hourMap.set(hour, { info: [{ CCNO: CCNO, name: E_NAME }], count: 1 });
      }
    }
  }

  // Construct hourRangeMap based on hourMap
  const hourRangeMap = [];

  for (let i = 0; i < 24; i++) {
    const startHour = i.toString().padStart(2, "0");
    const endHour = ((i + 1) % 24).toString().padStart(2, "0");
    const rangeKey = `${startHour}-${endHour}`;

    const hourEntry = hourMap.get(i) || { info: [], count: 0 };
    const { info, count } = hourEntry;

    hourRangeMap.push({
      range: rangeKey,
      count: Math.ceil(count / range),
      info: info // Include the array of objects containing CCNO and name
    });
  }

  return hourRangeMap;
};
