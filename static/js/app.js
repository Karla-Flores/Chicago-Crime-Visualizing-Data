// JS promise
d3.json('http://127.0.0.1:5000/api/v1.0/dropdown')
    .then(function (data) {
        init(data);
    });

// Json organization
function init(data) {
    console.log(data);
    load_dropdown_list(data.year);
    load_dropdown_list(data.primary_type);
    build_chart('2011');
};


// Dropdown menu with Ids
function load_dropdown_list(year) {
    let dropdown = document.getElementById('selDataset');
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
function optionChanged(id) {
    build_chart(id);
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



