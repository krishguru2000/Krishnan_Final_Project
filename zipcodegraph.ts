async function createZipCodeGraph(data) {
  // Extract a list of unique zip codes from the data
  const zipCodes = [...new Set(data.map(item => item.zip_code))];

  // Calculate the number of incidents per zip code
  const incidentCounts = zipCodes.map(zipCode => {
    const count = data.filter(item => item.zip_code === zipCode).length;
    return { zipCode, count };
  });

  // Sort the incident counts by count in descending order
  incidentCounts.sort((a, b) => b.count - a.count);

  // Create a data series for the graph
  const dataSeries = [{
    type: "column",
    dataPoints: incidentCounts.map(({ zipCode, count }) => ({ label: zipCode, y: count })),
  }];

  // Create and render the chart
  const chart = new CanvasJS.Chart("zipCodeChartContainer", {
    title: {
      text: "Incidents by Zip Code"
    },
    data: dataSeries
  });
  chart.render();
}
