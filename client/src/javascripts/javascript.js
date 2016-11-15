$(document).ready(function() {})

function loadProperty() {
    $('#main-container').empty()
    document.getElementById('panel-menu-home').className = 'active'
    document.getElementById('panel-menu-form').className = ''
    document.getElementById('panel-menu-search').className = ''
    let html = ''
    $.ajax({
        url: `http://localhost:3000/api/property`,
        method: "get",
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                html += `
                    <div class="col-sm-6 col-md-3">
                        <div class="thumbnail">
                            <img src="${data[i].image}" class="img-responsive" alt="Responsive image">
                            <div class="caption">
                                <hr>
                                <p class='text-center'><strong>${data[i].title}</strong></p>
                                <hr>
                                <p><strong>Estimate price: </strong></p>
                                <p>Rp ${data[i].price}</p>
                                <hr>
                                <p><strong>Facility: </strong></p>
                                <p>${data[i].details}</p>
                                <hr>
                                <span><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal${data[i].property_id}">
                                View Detail
                                </button></span>
                                <div class="modal fade" id="myModal${data[i].property_id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                        </button>
                                                <h4 class="modal-title" id="myModalLabel">${data[i].title}</h4>
                                            </div>
                                            <div class="modal-body">
                                            <div class='text-xs-center'>
                                            <img src="${data[i].image}" class="img-responsive" alt="src/img/home-icon.png">
                                            </div>
                                            <div class="alert alert-success" role="alert">
                                                <h4 class="alert-heading"><strong>Property Details</strong></h4>
                                                <p class="mb-0"><strong>Facility :</strong></p>
                                                <p>${data[i].details}</p>
                                                <p class="mb-0"><strong>Type :</strong></p>
                                                <p>${data[i].property_type}</p>
                                                <p class="mb-0"><strong>Price : </strong></p>
                                                <p>Rp ${data[i].price}</p>
                                                <p class="mb-0"><strong>Location : </strong></p>
                                                <p>${data[i].location.address}</p>
                                                <p class="mb-0"><strong>Contact Person : </strong></p>
                                                <br>
                                                <div class="alert alert-warning" role="alert">
                                                <p class="mb-0"><strong>Name : </strong></p>
                                                <p>${data[i].contact.name}</p>
                                                <p class="mb-0"><strong>Phone : </strong></p>
                                                <p>${data[i].contact.phone}</p>
                                                <p class="mb-0"><strong>Email : </strong></p>
                                                <p>${data[i].contact.email}</p>
                                                </div>


                                            </div>
                                            <!-- Button trigger modal -->
                                            <button type="button" class="btn btn-success" data-toggle="modal" data-target="#editbutton${data[i].property_id}">
                                              Edit  <span class="glyphicon glyphicon-edit" aria-hidden="true"></span>
                                            </button>

                                            <!-- Modal -->
                                            <div class="modal fade" id="editbutton${data[i].property_id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                      <span aria-hidden="true">&times;</span>
                                                    </button>
                                                            <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                                                        </div>
                                                        <div class="modal-body">
                                                        <div class="form-group row">
                                                            <label for="example-text-input" class="col-xs-2 col-form-label">Title</label>
                                                            <div class="col-xs-10">
                                                                <input class="form-control" type="text" placeholder="Title" id="update-title${data[i].property_id}" value='${data[i].title}'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="example-text-input" class="col-xs-2 col-form-label">Tipe</label>
                                                            <div class="col-xs-10">
                                                                <input class="form-control" type="text" placeholder="Tipe Property" id="update-type${data[i].property_id}" value='${data[i].property_type}'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="example-text-input" class="col-xs-2 col-form-label">Address</label>
                                                            <div class="col-xs-10">
                                                                <input class="form-control" type="text" placeholder="Address" id="update-address${data[i].property_id}" value='${data[i].location.address}'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="example-text-input" class="col-xs-2 col-form-label">Detail Property</label>
                                                            <div class="col-xs-10">
                                                                <input class="form-control" type="text" placeholder="Details" id="update-details${data[i].property_id}" value='${data[i].details}'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="example-text-input" class="col-xs-2 col-form-label">Price</label>
                                                            <div class="col-xs-10">
                                                                <input class="form-control" type="text" placeholder="Price" id="update-price${data[i].property_id}" value='${data[i].price}'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="example-text-input" class="col-xs-2 col-form-label">Seller Name</label>
                                                            <div class="col-xs-10">
                                                                <input class="form-control" type="text" placeholder="Name" id="update-name${data[i].property_id}" value='${data[i].contact.name}'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="example-text-input" class="col-xs-2 col-form-label">Phone</label>
                                                            <div class="col-xs-10">
                                                                <input class="form-control" type="text" placeholder="Phone" id="update-phone${data[i].property_id}" value='${data[i].contact.phone}'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="example-text-input" class="col-xs-2 col-form-label">Email</label>
                                                            <div class="col-xs-10">
                                                                <input class="form-control" type="text" placeholder="Email" id="update-email${data[i].property_id}" value='${data[i].contact.email}'>
                                                            </div>
                                                        </div>
                                                        <div class="form-group row">
                                                            <label for="example-text-input" class="col-xs-2 col-form-label">Location</label>
                                                            <div class="col-xs-10">
                                                            <div id="map-container" class="col-md-6"></div>
                                                            </div>
                                                        </div>

                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-primary" onclick='editProperty(${data[i].property_id})'>Save changes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- Button trigger modal -->
                                            <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deletebtn${data[i].property_id}">
                                              Delete  <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
                                            </button>

                                            <!-- Modal -->
                                            <div class="modal fade" id="deletebtn${data[i].property_id}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                                                <div class="modal-dialog" role="document">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                      <span aria-hidden="true">&times;</span>
                                                    </button>

                                                        </div>
                                                        <div class="modal-body">
                                                          <h4 class="modal-title" id="myModalLabel">Are you sure want to delete this property?</h4>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-danger" data-dismiss="modal" onclick='deleteProperty(${data[i].property_id})'>OK</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary">Buy Now  <span class="glyphicon glyphicon-shopping-cart" aria-hidden="true"></span></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            }
            $('#main-container').append(html)
        }
    })
}

function formPage() {
    $('#main-container').empty()
    document.getElementById('panel-menu-home').className = ''
    document.getElementById('panel-menu-form').className = 'active'
    document.getElementById('panel-menu-search').className = ''

    html = `
    <div class="col-sm-9 col-md-12">
  <div class="form-group row">
      <label for="example-text-input" class="col-xs-2 col-form-label">Title</label>
      <div class="col-xs-10">
          <input class="form-control" type="text" placeholder="Title" id="form-title">
      </div>
  </div>
  <div class="form-group row">
      <label for="example-text-input" class="col-xs-2 col-form-label">Tipe</label>
      <div class="col-xs-10">
          <input class="form-control" type="text" placeholder="Tipe Property" id="form-type">
      </div>
  </div>
  <div class="form-group row">
      <label for="example-text-input" class="col-xs-2 col-form-label">Address</label>
      <div class="col-xs-10">
          <input class="form-control" type="text" placeholder="Address" id="form-address">
      </div>
  </div>
  <div class="form-group row">
      <label for="example-text-input" class="col-xs-2 col-form-label">Detail Property</label>
      <div class="col-xs-10">
          <input class="form-control" type="text" placeholder="Details" id="form-details">
      </div>
  </div>
  <div class="form-group row">
      <label for="example-text-input" class="col-xs-2 col-form-label">Price</label>
      <div class="col-xs-10">
          <input class="form-control" type="text" placeholder="Price" id="form-price">
      </div>
  </div>
  <div class="form-group row">
      <label for="example-text-input" class="col-xs-2 col-form-label">Image</label>
      <div class="col-xs-10">
          <input class="form-control" type="text" placeholder="Price" id="form-image">
      </div>
  </div>

  <div class="form-group row">
      <label for="example-text-input" class="col-xs-2 col-form-label">Seller Name</label>
      <div class="col-xs-10">
          <input class="form-control" type="text" placeholder="Name" id="form-name">
      </div>
  </div>
  <div class="form-group row">
      <label for="example-text-input" class="col-xs-2 col-form-label">Phone</label>
      <div class="col-xs-10">
          <input class="form-control" type="text" placeholder="Phone" id="form-phone">
      </div>
  </div>
  <div class="form-group row">
      <label for="example-text-input" class="col-xs-2 col-form-label">Email</label>
      <div class="col-xs-10">
          <input class="form-control" type="text" placeholder="Email" id="form-email">
      </div>
  </div>
  <div class="form-group row">
      <label for="example-text-input" class="col-xs-2 col-form-label">Location</label>
      <div id='map-container'></div>
      <div class="col-xs-10">
          <input class="form-control" type="hidden" name='lat' id="form-lat">
          <input class="form-control" type="hidden" name='lng' id="form-lng">
      </div>
  </div>

  <button type="button" id='buttonCreateHouse' class="btn btn-primary" onclick='createProperty()'>Create</button>
  </div>
  `
    $('#main-container').append(html)
    initMap()

}

function createProperty() {
    let $title = $('#form-title').val()
    let $property_type = $('#form-type').val()
    let $address = $('#form-address').val()
    let $lat = $('#form-lat').val()
    let $lng = $('#form-lng').val()
    let $details = $('#form-details').val()
    let $price = $('#form-price').val()
    let $image = $('#form-image').val()
    let $name = $('#form-name').val()
    let $phone = $('#form-phone').val()
    let $email = $('#form-email').val()

    $.ajax({
        url: `http://localhost:3000/api/property`,
        method: "post",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            title: $title,
            property_type: $property_type,
            address: $address,
            lat: $lat,
            long: $lng,
            details: $details,
            price: $price,
            image: $image,
            name: $name,
            phone: $phone,
            email: $email
        },
        success: function(data) {
            $('.modal-backdrop').hide()
            console.log(data);
            loadProperty()

        }
    })

}

function editProperty(parameter) {
    let updtitle = $(`#update-title${parameter}`).val()
    let updproperty_type = $(`#update-type${parameter}`).val()
    let updaddress = $(`#update-address${parameter}`).val()
    let updlat = $(`#update-lat${parameter}`).val()
    let updlong = $(`#update-long${parameter}`).val()
    let upddetails = $(`#update-details${parameter}`).val()
    let updprice = $(`#update-price${parameter}`).val()
    let updname = $(`#update-name${parameter}`).val()
    let updphone = $(`#update-phone${parameter}`).val()
    let updemail = $(`#update-email${parameter}`).val()
    console.log('EDIT FUNCTION');
    $.ajax({
        url: `http://localhost:3000/api/property/${parameter}`,
        method: "put",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            title: updtitle,
            property_type: updproperty_type,
            address: updaddress,
            lat: updlat,
            long: updlong,
            details: upddetails,
            price: updprice,
            name: updname,
            phone: updphone,
            email: updemail
        },
        success: function(data) {
            // $(`#myModal${data.property_id}`).modal('toggle')
            $('.modal-backdrop').hide()
            $('#main-container').empty()
            console.log(data);
            loadProperty()

        }
    })


}

function deleteProperty(parameter) {


    $.ajax({
        url: `http://localhost:3000/api/property/${parameter}`,
        method: "delete",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            property_id: parameter
        },
        success: function() {
            $('.modal-backdrop').hide()
            console.log(data);
            loadProperty()
        }
    })
}

function initMap() {
    var map = new GMaps({
        el: '#map-container',
        lat: -6.175,
        lng: 106.827,
        click: function(e) {
            map.removeMarkers()
            console.log(e.latLng)
            var lat = e.latLng.lat()
            var lng = e.latLng.lng()
            console.log(lat, lng)
            map.addMarker({
                lat: lat,
                lng: lng,
                title: 'Marker',
                infoWindow: {
                    content: '<p>Marker</p>'
                }
            });
            $('#form-lat').val(e.latLng.lat())
            $('#form-lng').val(e.latLng.lng())
        }
    })
    google.maps.event.addDomListener(window, 'load', initMap);
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

}
