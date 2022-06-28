// // constant variable of the url to the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


d3.json(url).then(function (data) {

  console.log(data.metadata)

  for (i = 0; i < data.names.length; i++) {

    let userList = d3.select("#selDataset");
    otherOption = userList.append("option");
    otherOption.text(data.names[i]);
    otherOption.attr("value", data.names[i])

  }

    // declare variables for samples and metadatas from json file
    const samples = data.samples
    const metadata = data.metadata

    buildTable(metadata[0])
    barChart(samples[0])
    // bubbleChart(samples[0])

    // console.log(data.samples)


  function buildTable(metadata) {
    let demoTable = d3.select("#sample-metadata");
    let fillTable = demoTable.append("table");
    row = fillTable.append("tr");
    tableData = row.append("td");
    let ID = tableData.text('ID: ' + metadata.id)
    row = fillTable.append("tr")
    tableData = row.append("td")
    let ethn = tableData.text('Ethnicity: ' + metadata.ethnicity)
    row = fillTable.append("tr")
    tableData = row.append("td")
    let gender = tableData.text('Gender: ' + metadata.gender)
    row = fillTable.append("tr")
    tableData = row.append("td")
    let age = tableData.text('Age: ' + metadata.age)
    row = fillTable.append("tr")
    tableData = row.append("td")
    let location = tableData.text('Location: ' + metadata.location)
    row = fillTable.append("tr")
    tableData = row.append("td")
    bbtype = tableData.text('bbtype: ' + metadata.bbtype)
    row = fillTable.append("tr")
    tableData = row.append("td")
    wfreq = tableData.text('Wash frequency: ' + metadata.wfreq)
  
  }

  function barChart(samples) {
    topIDs = samples.otu_ids
    topIDsSliced = topIDs.slice(0,9)
    topIDsSliced = topIDsSliced.map(i => 'OTU ' + i)
    console.log(topIDsSliced)
    topValues = samples.sample_values
    topValuesSliced = topValues.slice(0,9)
    console.log(topValuesSliced)

    var data = [{
      type: 'bar',
      x: topValuesSliced.reverse(),
      y: topIDsSliced.reverse(),
      orientation: 'h'

    }];

    Plotly.newPlot('bar', data);
       
  }
  
})


// for (i=0, i<data.metadata.length, i++) {
//   function optionChanged()


// }


//  // optionChanged function is called in the index.html
// function optionChanged(data.metadata) {
//     // Print the Test Subject ID No. that prompted the change to the console
//   console.log(data.metadata);
//   // Call the Metadata function to change the display of the new demographic
//   // data for the selected ID No. 
//   Metadata(data.metadata);
//   // Call the new Charts function to update the charts the relavant data for the
//   // selected ID No. 
//   newCharts(data.metadata);
// }
// // barChart(data.samples[0])