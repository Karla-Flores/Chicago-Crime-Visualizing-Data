// JS promise
d3.json('http://127.0.0.1:5000/api/v1.0/dropdown')
    .then(function (data) {

        // Declare variables without var keyword to make them global
        year = data.Year[0];
        primary = data.Primary_Type[0];
        console.log(data);
        console.log(`Primary type row 8 + ${year} + ${primary}`)
        init(data);
        });
// Refactor so primary and year variables are in scope

// Json organization
function init(data) {
    console.log(data.year);
    load_dropdown_list(data.Year);
    load_dropdown_list_too(data.Primary_Type);
    build_chart(year, primary);
};

// Dropdown menu with Ids
function load_dropdown_list(years) {
    console.log(years);
    let dropdown = document.getElementById('selDataset_1');
    years.forEach(function (year) {
        let opt = document.createElement('option');
        let att = document.createAttribute('value');
        att.value = year;
        opt.setAttributeNode(att);
        opt.text = year;
        dropdown.appendChild(opt);
    })
};

function load_dropdown_list_too(primaries) {
    console.log(primaries);
    let dropdown = document.getElementById('selDataset');
    primaries.forEach(function (primary) {
        let opt = document.createElement('option');
        let att = document.createAttribute('value');
        att.value = primary;
        opt.setAttributeNode(att);
        opt.text = primary;
        dropdown.appendChild(opt);
    })
};

// // Linking id selected on dropdown with function
d3.selectAll("select").on("change", function(){
    console.log(`row 53 ${year} + ${primary}`);
    console.log(this.id);
    // ## if dropdown = selDataset_1, update value of year
    if (this.id === 'selDataset_1'){
        year = this.value;
    } else {
        primary = this.value;
    }
    console.log(this.value);

    build_chart(year, primary)
});

// Creating the map object
myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 10,
});
// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

function build_chart(year, primary) {
    console.log('build_chart for' + year + ' and ' + primary);
    // d3.json('/api/v1.0/year/<year>')
    d3.json('/api/v1.0/year/'+ year)
    // d3.json('/api/v1.0/year/'+ console.log(year))
        .then(function (data) {
            let primary_month = data.primary_type_bymonth;
            console.log(primary_month)
            console.log(`month row 77 ${data.primary_type_bymonth}`)
            let arrest_count = data.arrest_count;
            let location = data.location;
            let description_count = data.description_count;
            // Creating a trace for bar chart - Month / Primary type
            let x = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'June',
                'July',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]
            let y = []
            primary_month.forEach(function (month) {
                if (month[0]===primary){
                    // x.push(month[1])
                    y.push(month[2])
                }
            });

            var traceBar = {
                x: x,
                y: y,
                type: 'bar',
                marker: {
                    color: 'tomato'
                }
            }
            // Setting layout for title and bar size
            let layout = {
                title: {
                    text: `<b> Monthly count of crime: ${(primary)}</b>`,
                    // text: `<b> Monthly count of ${(primary)} crime</b>`,
                    font: {
                        size: 16,
                    },
                    height: 200,
                    width: 400
                }};
            // Defining traceBar
            var traceBar = [traceBar];
            Plotly.newPlot('bar_1', traceBar, layout);


            // Creating a trace for bar chart - Arrest
            // let x_1 = []
            // let y_1 = []
            // let y_2 = []
            // primary_month.forEach(function (month) {
            //     if (month[0]===primary){
            //         if (month[4]=='true') {
            //             y_1.push(month[1])
            //         }
            //         if (month[4]=='false'){
            //             y_2.push(month[2])
            //         }
            //     }
            // });
            // var traceBar_1 = {
            //     x: x_1,
            //     y: y_1,
            //     type: 'bar',
            //     marker: {
            //         color: 'tomato'
            //     }
            // }
    


            let x_1 = []
            let y_1 = []
            arrest_count.forEach(function (arrest) {
                if (arrest[0]===primary){
                    x_1.push(arrest[1]),
                    y_1.push(arrest[2])
                }
            });
            var traceBar_1 = {
                x: x_1,
                y: y_1,
                type: 'bar',
                marker: {
                    color: 'tomato'
                }
            }
            // Setting layout for title and bar size
            let layout_1= {
                title: {
                    text: `<b> Arrest count for: ${(primary)}</b>`,
                    // text: `<b> Monthly count of ${(primary)} crime</b>`,
                    font: {
                        size: 16,
                    },
                    height: 200,
                    width: 400
                }};
            var traceBar_1 = [traceBar_1];
            Plotly.newPlot('bar_2', traceBar_1,layout_1);

            //taking the code from chart.js to create a multiline chart for true and false cases of crime by month for each year
            d3.json(`http://127.0.0.1:5000/api/v1.0/monthly/${year}/${primary}`).then(function(arrest_data){

                console.log(arrest_data);
                const labels = [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'June',
                    'July',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ];
                // var chart_1 = {
                //     labels: labels,
                //     datasets: [
                //     {
                //         label: 'True',
                //         backgroundColor: 'rgb(255, 99, 132)',
                //         borderColor: 'rgb(255, 99, 132)',
                //         data: arrest_data.results.map(d=>d.True)
                //         },
                //     {
                //         label: 'False',
                //         backgroundColor: 'rgb(255, 99, 132)',
                //         borderColor: 'rgb(255, 99, 132)',
                //         data: arrest_data.results.map(d=>d.False)
                //         }
                // ]
                // };
    
                var config = {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                        {
                            label: 'True',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: arrest_data.results.map(d=>d.True)
                            },
                        {
                            label: 'False',
                            backgroundColor: 'rgb(255, 99, 132)',
                            borderColor: 'rgb(255, 99, 132)',
                            data: arrest_data.results.map(d=>d.False)
                            }
                    ]
                    },
                    options: {}
                };
    
                var myChart = new Chart(
                    document.getElementById('myChart').getContext('2d'),
                    config
                );
            });            
            

            // Setting layout for title and bar size   
            // Leaflet
            // Get Data
            d3.json('/api/v1.0/' + year + '/' + primary)
                .then(function (data) {
                    console.log(data);
                    
                    data = data.lat_lon
                    
                    let markers = L.markerClusterGroup();
                    data.forEach(element => {
                        // Check for the location property.
                        // if (element.location){
                        // Add a new marker to the cluster group, and bind a popup.
                        markers.addLayer(L.marker([element[5], element[6]]).bindPopup(`<h1>Primary Type: ${element[0]}</h1><hr><br>Date: ${element[1]}<br>Crime Description: ${element[2]}<br>location: ${element[3]}`)
                        )
                    });
                    markers.addTo(myMap)
                    
                //     var markers = L.markerClusterGroup();
                //     for (var i = 0; i < 200; i++) {
                //         // Set the data location property to a variable.
                //         var location = [data.data.data[i].lat, data.data.data[i].lon]
                        // console.log(location)
                        // L.marker(location).bindPopup("<h1>" + data.data.stations[i].name + "</h1> <hr> <h3> StationID: " + data.data.stations[i].station_id + "</h3> <h3> Capacity: " + data.data.stations[i].capacity + "<h4> Location: " + location + "</h4>").addTo(myMap);
                //       };
                //     })

                // });
                    // var markers = L.markerClusterGroup()
                    
                    // L.markers.bindPopup(`<h1>${element[0]}</h1>`)
                    // console.log(markers);
                    // Add our marker cluster layer to the map.
                    // myMap.addLayer(markers)
            
            })
})}
