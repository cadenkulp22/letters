function allowDrop(ev) {
  ev.preventDefault();  // allows for elements to be dropped into other elements
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);  // sets the datatype and value ofthe dragged data
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");

  //ADDED to allow drag and copy, not just drag and drop
  var nodeCopy =document.getElementById(data).cloneNode(true);
  nodeCopy.id = "newId";
  ev.target.appendChild(nodeCopy); // appends copied dragged data into drop element
  // the following uncommented line is used for drag and drop
  //ev.target.appendChild(document.getElementById(data)); // appends dragged data into drop element
}
