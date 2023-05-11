function createPieChart(data) { 
  // creates filter to be attached at the end
  const heading = document.createElement("h4");
  heading.innerText = "Choose the zipcode you want to filter by:";
  document.body.appendChild(heading);

  const computedRegionValues = [...new Set(data.map(item => item[":@computed_region_87xh_ddyp"]))];
  const dropdown = document.createElement("select");
  dropdown.options.add(new Option("None", "none")); // creates none option
  computedRegionValues.forEach(value => {
    dropdown.options.add(new Option(value, value)); //gets all other zipcodes
  });
  dropdown.onchange = function() {
    let filteredData = data;
    if (this.value !== "none") {
      filteredData = data.filter(item => item[":@computed_region_87xh_ddyp"] === this.value); //allows user to select item
    }
    createPieChart(filteredData);
  };
  document.body.appendChild(dropdown);

  
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
    };
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
