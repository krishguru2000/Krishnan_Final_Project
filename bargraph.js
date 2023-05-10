function processBarData(data) {
    const processedData = data.map((item) => {
      return {
        label: item.name,
        value: item.quantity
      }
    }).filter((item) => {
      return item.value > 0;
    }).sort((a, b) => {
      return b.value - a.value;
    });
    return processedData;
  }