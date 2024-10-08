// Function to build the metadata panel
function buildMetadata(sample) {
  // Fetch the JSON data from the provided URL
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Extract the metadata from the fetched data
    const metadata = data.metadata;
    // Find the metadata for the selected sample by matching the sample ID
    const filteredMetadata = metadata.find(meta => meta.id == sample);

    // Check if metadata for the sample exists, if not, log an error and exit the function
    if (!filteredMetadata) {
      console.error(`No metadata found for sample ${sample}`);
      return;
    }

    // Select the HTML element with id "sample-metadata" to display the metadata
    const panel = d3.select("#sample-metadata");
    // Clear any existing content in the panel to prepare for new data
    panel.html("");

    // Define the order and formatting of metadata keys for consistent display
    const orderedKeys = ['<b>ID</b>', '<b>ETHNICITY</b>', '<b>GENDER</b>', '<b>AGE</b>', '<b>LOCATION</b>', '<b>BBTYPE</b>', '<b>WFREQ</b>'];
    
    // Iterate through the ordered keys and append metadata to the panel
    orderedKeys.forEach(key => {
      // Remove HTML tags and convert to lowercase for case-insensitive comparison
      const originalKey = key.replace(/<\/?b>/g, '').toLowerCase();
      if (originalKey in filteredMetadata) {
        const value = filteredMetadata[originalKey];
        // Append the key-value pair to the panel as an h6 element with HTML formatting
        panel.append("h6").html(`${key}: ${value}`);
      }
    });

    // Check for any unexpected keys in the metadata that aren't in our predefined list
    Object.keys(filteredMetadata).forEach(key => {
      if (!orderedKeys.map(k => k.replace(/<\/?b>/g, '').toLowerCase()).includes(key)) {
        console.warn(`Unexpected metadata key: ${key}`);
      }
    });
  }).catch(error => {
    // Log any errors that occur during data fetching to assist with debugging
    console.error("Error fetching metadata:", error);
  });
}

// Function to build both the bar chart and bubble chart
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Extract the samples data from the fetched JSON
    const samples = data.samples;

    // Find the sample object that matches the provided sample ID
    const filteredSample = samples.find(s => s.id === sample);

    // Extract the necessary data for charting
    const otuIds = filteredSample.otu_ids;
    const otuLabels = filteredSample.otu_labels;
    const sampleValues = filteredSample.sample_values;

    // Build the Bubble Chart
    const bubbleData = {
      x: otuIds,
      y: sampleValues,
      text: otuLabels,
      mode: "markers",
      marker: {
        size: sampleValues,
        color: otuIds,
        colorscale: "YlOrRd"  // Yellow to Red color scale
      }
    };

    const bubbleLayout = {
      title: {
        text: "Bacteria Cultures Per Sample",
        font: { size: 24, color: "#333", family: "Roboto, sans-serif" }
      },
      xaxis: { title: "OTU ID", gridcolor: "#EEEEEE" },
      yaxis: { title: "Number of Bacteria", gridcolor: "#EEEEEE" },
      hovermode: "closest",
      margin: { t: 50, b: 50, l: 50, r: 50 },
      height: 550,
      width: 1250,
      paper_bgcolor: 'rgba(0,0,0,0)',  // Transparent background
      plot_bgcolor: 'rgba(0,0,0,0)',   // Transparent plot area
      showlegend: false,
    };

    // Render the Bubble Chart using Plotly
    Plotly.newPlot("bubble", [bubbleData], bubbleLayout, {responsive: true, displayModeBar: false});

    // Prepare data for the Bar Chart
    const yTicks = otuIds.slice(0, 10).map(id => `OTU ${id}`).reverse();

    // Build the Bar Chart
    const barData = {
      y: yTicks,
      x: sampleValues.slice(0, 10).reverse(),
      text: otuLabels.slice(0, 10).reverse(),
      type: "bar",
      orientation: "h",
      marker: {
        color: 'rgba(55,128,191,0.7)',
        line: {
          color: 'rgba(55,128,191,1.0)',
          width: 1
        }
      }
    };

    const barLayout = {
      title: {
        text: "Top 10 Bacteria Cultures Found",
        font: { size: 24, color: "#333", family: "Roboto, sans-serif" }
      },
      margin: { t: 50, l: 150, r: 30, b: 50 },
      yaxis: {
        tickfont: { size: 12 },
        ticksuffix: "  ",
        separatethousands: true,
        automargin: true
      },
      xaxis: { title: "Number of Bacteria" },
      height: 400,
      width: '120%',
      paper_bgcolor: 'rgba(0,0,0,0)',  // Transparent background
      plot_bgcolor: 'rgba(0,0,0,0)',   // Transparent plot area
    };

    // Render the Bar Chart using Plotly
    Plotly.newPlot("bar", [barData], barLayout, {responsive: true, displayModeBar: false});
  });
}

// Function to initialize the dashboard
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
    // Extract the list of sample names
    const names = data.names;

    // Select the dropdown element in the HTML
    const dropdown = d3.select("#selDataset");

    // Populate the dropdown with sample names
    names.forEach(name => {
      dropdown.append("option").text(name).property("value", name);
    });

    // Use the first sample to build the initial plots
    const firstSample = names[0];

    // Build charts and metadata panel with the first sample
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Function to handle changes in the dropdown selection
function optionChanged(newSample) {
  // Rebuild charts and metadata panel when a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard when the page loads
init();