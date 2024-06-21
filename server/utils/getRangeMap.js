exports.getRangeMap = (intime,range) => {
    const hourMap = new Map();
  
    for (let i = 0; i < intime.length; i++) {
      const inTime = intime[i]?.attendance?.inTime;
      if (inTime) {
        const [hr, min, sec] = inTime.split(":");
        const hour = parseInt(hr, 10);
  
        if (hourMap.has(hour)) {
          hourMap.set(hour, hourMap.get(hour) + 1);
        } else {
          hourMap.set(hour, 1);
        }
      }
    }
  
    const hourRangeMap = [];
  
    for (let i = 0; i < 24; i++) {
      const startHour = i.toString().padStart(2, "0");
      const endHour = ((i + 1) % 24).toString().padStart(2, "0");
      const rangeKey = `${startHour}-${endHour}`;
  
      const count = hourMap.get(i) || 0;
      hourRangeMap.push({
        range: rangeKey,
        count: Math.ceil(count/range),
      });
    }
  
    return hourRangeMap;
  };
  