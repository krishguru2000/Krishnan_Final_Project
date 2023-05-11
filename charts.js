function processChartData(data) {
    const chartData = {};
    const incidentTypes = new Set();
    data.forEach(item => {
      const date = new Date(item.date);
      const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`; // seperates data by day
      if (!chartData[day]) {
        chartData[day] = {};
      }
      // gets incidents from that day
      if (!chartData[day][item.clearance_code_inc_type]) {
        chartData[day][item.clearance_code_inc_type] = 1;
        incidentTypes.add(item.clearance_code_inc_type);
      } else {
        chartData[day][item.clearance_code_inc_type]++;
      }
    });
    const series = Array.from(incidentTypes).map(incident => {
      return {
        type: "column",
        name: incident,
        dataPoints: Object.keys(chartData).map(day => {
          return {
            label: day,
            y: chartData[day][incident] || 0, //labels under chart
            toolTipContent: `${incident}: {y}` // allows user ot hover and find the type of incident
          }
        })
      } 
    });
    return series;
  }
  