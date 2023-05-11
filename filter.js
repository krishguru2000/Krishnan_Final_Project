function createFilterButton(chart, chartData) {
    const dates = Object.keys(chartData).sort((a, b) => new Date(a) - new Date(b));
    const filterButton = document.createElement("div");
    const label = document.createElement("label");
    label.innerText = "Filter by date: ";
    const select = document.createElement("select");
    const allOption = document.createElement("option");
    allOption.value = "all";
    allOption.text = "All";
    select.appendChild(allOption);
    dates.forEach(date => {
      const option = document.createElement("option");
      option.value = date;
      option.text = date;
      select.appendChild(option);
    });
    filterButton.appendChild(label);
    filterButton.appendChild(select);
    select.addEventListener("change", e => {
      const selectedDate = e.target.value;
      const filteredData = selectedDate === "all" ? chartData : {[selectedDate]: chartData[selectedDate]};
      const series = processChartData(Object.values(filteredData).flat());
      chart.options.data = series;
      chart.render();
    });
    return filterButton;
  }
  