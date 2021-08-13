// JS promise
d3.json('http://127.0.0.1:5000/api/v1.0/dropdown')
    .then(function (data) {
        init(data);
        console.log(data);
    });


// // Json organization
function init(data) {
    console.log(data.year);
    load_dropdown_list(data.Year);
    load_dropdown_list_too(data.Primary_Type);
    build_chart('2011');
};


// // Dropdown menu with Ids
function load_dropdown_list(year) {
    console.log(year);
    let dropdown = document.getElementById('selDataset_1');
    year.forEach(function (year) {
        let opt = document.createElement('option');
        let att = document.createAttribute('value');
        att.value = year;
        opt.setAttributeNode(att);
        opt.text = year;
        dropdown.appendChild(opt);
    })
};

function load_dropdown_list_too(primary) {
    console.log(primary);
    let dropdown = document.getElementById('selDataset');
    primary.forEach(function (primary) {
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
    let dropdown = this.id;
    console.log(dropdown);

    // ## if dropdown = selDataset_1, update value of year
    console.log(this.value);
    build_chart(year, primary)
});


function build_chart(year) {
    console.log('build_chartfor' + year);
    // d3.json('/api/v1.0/year/<year>')
    d3.json('/api/v1.0/year/'+ year)
    // d3.json('/api/v1.0/year/'+ console.log(year))
        .then(function (data) {
            let primary_month = data.primary_type_bymonth;
            console.log(primary_month)
            let arrest_count = data.arrest_count;
            let location = data.location;
            let description_count = data.description_count;
            // Creating a trace for bar chart
            let x = []
            let y = []
            primary_month.forEach(function (month) {
                x.push(month[1]),
                y.push(month[2])
            });

            var traceBar = {
                x: x,
                y: y,
                type: 'bar',
                marker: {
                    color: 'tomato'
                }
            }
            // Defining traceBar
            var traceBar = [traceBar];
            Plotly.newPlot('bar_1', traceBar);

            let x_1 = ["False", "True"]
            let y_1 = [912, 96]
            // arrest_count.forEach(function (arrest) {
            //     y.push(arrest[2])
            // });
            var traceBar_1 = {
                x: x_1,
                y: y_1,
                type: 'bar',
                marker: {
                    color: 'tomato'
                }
            }
            var traceBar_1 = [traceBar_1];
            Plotly.newPlot('bar_2', traceBar_1);
        })
};


// Leaflet

// Creating the map object
myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 8,
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Starting the conection

// d3.json('/api/v1.0/<year>/<primary_type>')
//     .then(function (year) {
//         init(year);
//         console.log(data);
//     });


// url = '/api/v1.0/<year>/<primary_type>'
// d3.json(url).then(function (data) {
//     console.log(data);
//     L.geoJSON(data, {
//         onEachFeature: onEachFeature,
//         // Creating circle marker
//         pointToLayer: function (feature, latlng) {
//             console.log('Creatin marker');
//             return new L.CircleMarker(latlng, {
//                 // Defining circle radius according to the magnitude
//                 radius: feature.properties.mag * 4,
//                 fillColor: getFillColor(feature.geometry.coordinates[2]),
//                 fillOpacity: 0.6,
//                 weight: 0
//             }).addTo(quakes).addTo(myMap);
//         },
//     });
// });

// function onEachFeature(feature, layer) {
//     console.log('Creating pop up');
//     // Time format
//     var format = d3.timeFormat('%d-%b-%Y at %H:%M');
//     //Pop up layer using title, title and magnitude
//     var popupText = (layer.bindPopup('<h2>' + 'Primary Type : ' + '<br>' + feature.properties.title + '</h2>' + '<hr>' + '<h3>' + 'Date : ' + (format(new Date(feature.properties.time))) + '</h3>' + '<h3>' + 'Description: ' + feature.properties.type + '</h3>' + '<h3>' + 'Location : ' + feature.properties.mag + '</h3>' + '<h3>' + 'Arrest : ' + feature.geometry.coordinates[2] + '</h3>'
//     )).addTo(myMap);
// };
