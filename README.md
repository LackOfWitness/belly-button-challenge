<div align="center">
  <img src="Biodiversity Dashboard Graphic.jpg" alt="Biodiversity Dashboard Graphic" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border: 1px solid #ddd; border-radius: 4px; max-width: 100%; height: auto;">
</div>

# Belly Button Biodiversity Dashboard

## Project Overview

This project creates an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Features

1. **Dropdown Menu**: Allows users to select different test subject IDs.
2. **Demographic Information Panel**: Displays metadata about the selected individual.
3. **Bar Chart**: Shows the top 10 OTUs found in the selected individual.
4. **Bubble Chart**: Displays all samples for the selected individual.

## Visualizations

### Demographic Information Panel

This panel provides key demographic data for the selected test subject, including:

- ID: Unique identifier for the test subject
- Ethnicity: The subject's ethnic background
- Gender: The subject's gender
- Age: The subject's age
- Location: The subject's place of residence
- BBType: Belly button type (e.g., innie or outie)
- WFREQ: Washing frequency (scrubs per week)

This information helps contextualize the microbial data and allows for potential correlation analysis.

### Bar Chart: Top 10 OTUs

The horizontal bar chart displays the top 10 Operational Taxonomic Units (OTUs) found in the selected individual's navel. 

- Y-axis: OTU IDs, labeled as "OTU [ID number]"
- X-axis: Sample values, representing the amount of each OTU found
- Hover text: Provides the full scientific name of the OTU

This chart quickly shows which microbes are most abundant in the subject's navel microbiome. 

<div align="center">
  <img src="Top 10 Bacteria Culture Found Bar Chart.jpg" alt="Top 10 Bacteria Culture Found Bar Chart" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border: 1px solid #ddd; border-radius: 4px; max-width: 100%; height: auto;">
</div>

### Bubble Chart: All OTUs

The bubble chart provides a comprehensive view of all OTUs found in the selected individual's sample.

- X-axis: OTU IDs
- Y-axis: Sample values (amount of each OTU found)
- Bubble size: Corresponds to the sample value (larger bubbles indicate higher abundance)
- Bubble color: Based on the OTU ID, using a color scale from yellow to red
- Hover text: Displays the OTU ID, sample value, and full scientific name of the OTU

This visualization allows for the identification of patterns or clusters in the microbiome data, as well as outliers or unique microbial signatures.

<div align="center">
  <img src="Bacteria Cultures Per Sample Bubble Chart.jpg" alt="Bacteria Cultures Per Sample Bubble Chart" style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); border: 1px solid #ddd; border-radius: 4px; max-width: 100%; height: auto;">
</div>

## Files

- `index.html`: The main HTML file that structures the dashboard.
- `static/js/app.js`: The JavaScript file that contains the logic for fetching data and creating visualizations.

## Technical Details

### HTML (index.html)

The `index.html` file sets up the structure of the dashboard using Bootstrap for responsive design. Key components include:

- A jumbotron header with the dashboard title
- A dropdown menu for selecting test subject IDs
- Containers for the demographic info panel, bar chart, and bubble chart
- Links to D3.js and Plotly.js libraries

### JavaScript (app.js)

The `app.js` file contains several functions that work together to create the interactive dashboard:

1. `buildMetadata(sample)`: 
   - Fetches and displays demographic information for the selected sample.
   - Implements error handling and logs unexpected metadata keys.

2. `buildCharts(sample)`:
   - Creates both the bar chart and bubble chart for the selected sample.
   - The bar chart shows the top 10 OTUs found in the individual.
   - The bubble chart displays all samples for the individual.

3. `init()`:
   - Initializes the dashboard by populating the dropdown menu and loading the first sample's data.

4. `optionChanged(newSample)`:
   - Handles the event when a new sample is selected from the dropdown menu.

## Data Source

The data is fetched from the following URL:
`https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json`

## How to Use

1. Open `index.html` in a web browser.
2. Use the dropdown menu to select different test subject IDs.
3. Observe how the demographic information and charts update based on your selection.
4. Hover over chart elements to see additional details.

## Technologies Used

- HTML5
- CSS3 (Bootstrap 5.3.2)
- JavaScript
- D3.js (v7)
- Plotly.js

## Customization

The dashboard features a custom color scheme and styling to enhance readability and user experience. The charts are responsive and will resize based on the user's screen size.

## Future Improvements

- Add additional visualizations to explore correlations between demographic info and OTU prevalence.
- Implement a search functionality to quickly find specific test subjects.
- Create a heatmap to visualize the distribution of OTUs across all samples.
- Add statistical analysis features to compare samples or groups of samples.

## Contributors

Sergei N. Sergeev (sergeev.sergei.n@gmail.com)

## License

This project is open source and available under the [MIT License](LICENSE).