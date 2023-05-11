function createPieChart(data) {
    // Get the unique values of ":@computed_region_87xh_ddyp"
    const computedRegionValues = [...new Set(data.map(item => item[":@computed_region_87xh_ddyp"]))];
  
    // Create a dropdown menu with the computed region values
    const dropdown = document.createElement("select");
    dropdown.options.add(new Option("Select a computed region value", ""));
    computedRegionValues.forEach(value => {
      dropdown.options.add(new Option(value, value));
    });
    dropdown.onchange = function() {
      const filteredData = data.filter(item => item[":@computed_region_87xh_ddyp"] === this.value);
      createPieChart(filteredData);
    };
    document.body.appendChild(dropdown);
  
    // Calculate the chart data
    const chartData = {};
    data.forEach(item => {
      if (!chartData[item.clearance_code_inc_type]) {
        chartData[item.clearance_code_inc_type] = 1;
      } else {
        chartData[item.clearance_code_inc_type]++;
      }
    });
  
    // Convert the chart data to data points
    const dataPoints = Object.keys(chartData).map(label => {
      return {
        label: label,
        y: chartData[label]
      };
    });
  
    // Create the pie chart
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
  