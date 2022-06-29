// // constant variable of the url to the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


d3.json(url).then(function (data) {

  // console.log(data.metadata)

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
  bubbleChart(samples[0])
  gaugeChart(metadata[0])

  

  function buildTable(metadata) {
    // Display each key-value pair from the metadata JSON object
    Object.entries(metadata).forEach(
    ([key, value]) => d3.select("#sample-metadata").append("p").text(`${key.toUpperCase()}: ${value}`));
  }

  // CREATE THE BAR CHART
  function barChart(samples) {

    // getting the data ready to load into the bar chart
    IDs = samples.otu_ids
    topIDs = IDs.slice(0,10).reverse()
    topIDsText = topIDs.map(i => 'OTU ' + i)
    // console.log(topIDs)
    Values = samples.sample_values
    topValues = Values.slice(0,10).reverse()
    // console.log(topValues)
    Labels = samples.otu_labels
    topLabels = Labels.slice(0,10).reverse()

    // Creates trace for default data
    var trace1 = {
      type: 'bar',
      x: topValues,
      y: topIDsText,
      text: topLabels,
      orientation: 'h',
    };

    var barData = [trace1]

    var barLayout = {
      title: `<b> Top 10 Bacteria Found In Subject Navel</b>`,
      xaxis: { title: "Sample Value"},
      yaxis: { title: "OTU ID"},
      autosize: false
    }

    Plotly.newPlot('bar', barData, barLayout);
      
  }

  // CREATE THE BUBBLE CHART
  function bubbleChart(samples) {
    IDs = samples.otu_ids
    Values = samples.sample_values
    Labels = samples.otu_labels
    var trace2 = {
      x: IDs,
      y: Values,
      text: Labels,
      mode: 'markers',
      marker: {
        color: IDs,
        size: Values
      }
    }

    var bubbleData = [trace2]

    var bubbleLayout = {
      title: `<b>Chart of OTU ID Sample Values for Selected Subject`,
      xaxis: { title: "OTU ID"},
      yaxis: { title: "Sample Value"},
      showlegend: false
    }

    Plotly.newPlot('bubble', bubbleData, bubbleLayout)

  }

  // GAUGE CHART
  // console.log(metadata[0].wfreq)
  function gaugeChart(metadata) {

    var wfreqDefault = metadata.wfreq

    var gaugeData = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: wfreqDefault,
        title: {text: '<b>Frequency of Navel Wash per Subject</b> <br> Scrubs per week'},
        type: "indicator",
        mode: "gauge+number",
        gauge: {
          axis: { range: [null, 9] },
          steps: [
            { range: [0, 1], color: 'rgb(248, 243, 236)' },
            { range: [1, 2], color: 'rgb(244, 241, 229)' },
            { range: [2, 3], color: 'rgb(233, 230, 202)' },
            { range: [3, 4], color: 'rgb(229, 231, 179)' },
            { range: [4, 5], color: 'rgb(213, 228, 157)' },
            { range: [5, 6], color: 'rgb(183, 204, 146)' },
            { range: [6, 7], color: 'rgb(140, 191, 136)' },
            { range: [7, 8], color: 'rgb(138, 187, 143)' },
            { range: [8, 9], color: 'rgb(133, 180, 138)' },
          ],
        }
      }
    ];

  var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
  
  Plotly.newPlot('gauge', gaugeData, gaugeLayout);

  }
    


  // function for when dataset is changed on selector
  d3.selectAll('#selDataset').on('change', () => { 
    
    console.log('Dropdown was changed')
    let id = d3.select('#selDataset').node().value
    // console.log(id)

    // json call to re-access data
    d3.json(url).then(function(data) {
      // look for sample that has the id we selected from drop down
      let newSample = data.samples.filter((sample) => {return sample.id == id;})
      // console.log(newSample)
      barChart(newSample[0])
      bubbleChart(newSample[0])
      
      // look for metadata that has the id we selected from drop down
      let newMeta = data.metadata.filter((metadata) => {return metadata.id == id;})
      // console.log(newMeta)
      d3.select("#sample-metadata").html("")
      buildTable(newMeta[0])
      gaugeChart(newMeta[0])
    })
  })


})

