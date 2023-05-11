function processChartData(data) {
  const chartData = {};
  data.forEach(item => {
    const date = new Date(item.date);
    const day = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    if (!chartData[day]) {
      chartData[day] = {};
    }
    if (!chartData[day][item.clearance_code_inc_type]) {
      chartData[day][item.clearance_code_inc_type] = 1;
    } else {
      chartData[day][item.clearance_code_inc_type]++;
    }
  });
  const series = Object.keys(chartData).map(day => {
    return {
      type: "column",
      name: day,
      dataPoints: Object.keys(chartData[day]).map(type => {
        return {
          label: type,
          y: chartData[day][type]
        }
      })
    } 
  });
  return series;
}


function createPieChart(data) {
  const chartData = {};
  data.forEach(item => {
    if (!chartData[item.clearance_code_inc_type]) {
      chartData[item.clearance_code_inc_type] = 1;
    } else {
      chartData[item.clearance_code_inc_type]++;
    }
  });
  const dataPoints = Object.keys(chartData).map(label => {
    return {
      label: label,
      y: chartData[label]
    }
  });
  const chart = new CanvasJS.Chart("pieChartContainer", {
    title: {
      text: "Crime Incidents by Type"
    },
    data: [{
      type: "pie",
      dataPoints: dataPoints
    }]
  });
  chart.render();
}
