const map = L.map("mapid").setView([-23.9524013, -46.337895], 14);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const icon = L.icon({
  iconUrl: "/images/map-marker.svg",
  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [170, 2],
});

let marker;

map.on("click", (event) => {
  const lat = event.latlng.lat;
  const lng = event.latlng.lng;

  document.querySelector("[name=lat").value = lat;
  document.querySelector("[name=lng").value = lng;

  //rm icon
  marker && map.removeLayer(marker);

  //adicionar marker
  marker = L.marker([lat, lng], { icon }).addTo(map);
});

//add photos area
function addPhotoField() {
  // take photos container #images
  const container = document.querySelector("#images");
  // take container for duplicate .new-upload
  const fieldsContainer = document.querySelectorAll(".new-upload");
  // make clone at last images add
  const newFieldContainer = fieldsContainer[
    fieldsContainer.length - 1
  ].cloneNode(true);
  //verify text clean if y don add at photos container
  const input = newFieldContainer.children[0];

  if (input.value == "") {
    return;
  }

  // clean text area before clone container
  input.value = "";

  // add clone on images container
  container.appendChild(newFieldContainer);
}

//delete field

function deleteField(event) {
  const span = event.currentTarget;

  const fieldsContainer = document.querySelectorAll(".new-upload");

  if (fieldsContainer.length <= 1) {
    //clean text area
    span.parentNode.children[0].value = "";
    return;
  }
  //delete all field
  span.parentNode.remove();
}

//select yes or no

function toggleSelect(event) {
  //remove class active at buttons
  document
    .querySelectorAll(".button-select button")
    .forEach((button) => button.classList.remove("active"));

  //get button clicked
  //put class active on clicked button
  const button = event.currentTarget;
  button.classList.add("active");

  //att input hidden with select value
  const input = document.querySelector('[name="open_on_weekends"]');
  console.log(input);

  //verify yes or no

  input.value = button.dataset.value;
}

function validate(event) {
  const position = document.querySelector('.position')
  if (position.value == "") {
    event.preventDefault()
    alert('Por favor selecione um local no mapa')
  }
}