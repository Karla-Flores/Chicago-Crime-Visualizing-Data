export async function handler(event) {
    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers" : "Content-Type",
            "Access-Control-Allow-Origin": "http://127.0.0.1:5000/api/v1.0/<year>/<primary_type>",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
        },
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
}


// JS promise
d3.json('http://127.0.0.1:5000/api/v1.0/<year>/<primary_type>')
    .then(function (data) {
        init(data);
        console.log(data);
    });


// Json organization
function init(data) {
    console.log(data.year);
    load_dropdown_list(data.year);
    // load_dropdown_list(data.primary_type);
    build_chart('2011');
};


// Dropdown menu with Ids
function load_dropdown_list(year) {
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

// Linking id selected on dropdown with function
function optionChanged(year) {
    build_chart(year);
}

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

// url = ''

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

