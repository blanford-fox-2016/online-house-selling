<!--GET ALL HOUSE-->
let baseURL = 'http://localhost:3000'

$(document).ready(function () {
    $('#buttonCreateHouse').on('click', function () {
        console.log("asasa")
        var mapInput = new GMaps({
            el: '#inputMap',
            zoom: 16,
            lat: -12.043333,
            lng: -77.028333,
            click: function(e) {
                console.log(e.latLng)
                mapInput.removeMarkers();
                mapInput.addMarker({
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng()
                });

                $('input[name="lat"]').val(e.latLng.lat())
                $('input[name="long"]').val(e.latLng.lng())
            }
        });
    })
    getAllHousesData()
})

function getAllHousesData() {
    $.ajax({
        url: "http://localhost:3000/api/house",
        success: function (data) {
            displayAllHouses(data)
        }
    })
}

function displayAllHouses(data) {
    let house = []
    let rowOfHouse = $('#rowOfHouses')
    for (var i = 0; i < data.length; i++) {
        house.push(`
                    <div id="rowHouse${data[i]._id}" class="col-lg-3 col-md-6 col-sm-12">
                        <div class="panel panel-default">
                            <div class="panel-heading text-center text-uppercase">
                                ${data[i].title}
                            </div>
                            <div class="panel-body">
                                <div class="text-center">
                                    <a id="detail#${data[i]._id}" class="detailHouse">
                                        <img class="img-responsive" src="${data[i].photoURL}" alt="">
                                    </a>
                                </div>
                                <div>
                                    <p>Address: ${data[i].location.address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                                        `)
    }

    rowOfHouse.append(house.join(""))
}


$(document).on('click', 'a[class="detailHouse"]', function () {
    let tempId = this.id.split("#")
    let houseId = tempId[1]
    $.ajax({
        url: `${baseURL}/api/house/${houseId}`,
        success: function (data) {
            showDetailHouse(data)
        }
    })

})

function showDetailHouse(data) {
    let html = `
                <div id="rowOfDetailHouse" class="container">
        
                    <div class="row">
                        <div class="col-sm-12">
                            <h1 class="text-center">Online House Selling</b></h1>
                            <button id="backToHome" class="btn btn-info btn-lg">Back</button>
                        </div>
                    </div>
                
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                            <div>
                                <img class="img-responsive" src="${data.photoURL}" alt="">
                            </div>
                            <p>Title : ${data.title}</p>
                            <p>Address : ${data.location.address}</p>
                            <p>Price : ${data.price}</p>
                            <button id="edit#${data._id}" name="buttonEdit" class="btn btn-warning">Edit</button>
                            <button id="delete#${data._id}" name="buttonDelete" class="btn btn-danger">Delete</button>
                            
                            <div id="map" class="map" data-id="${data._id}"></div>
                        </div>
                    </div>
                </div>
`

    $('#home').replaceWith(html)

    initMap(data.location.lat, data.location.long)
}


function initMap(lat, long) {
    map = new GMaps({
        div: '#map',
        zoom: 16,
        lat: lat,
        lng: long,

    });

    map.addMarker({
        lat: lat,
        lng: long,
        title: 'Lima',
        click: function(e) {
            alert('You clicked in this marker');
        }
    });
}


$(document).on('click', 'button[name="buttonEdit"]', function () {
    let tempId = this.id.split("#")
    let houseId = tempId[1]

    $.ajax({
        url: `${baseURL}/api/house/${houseId}`,
        method: "get",
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
            getHouseId(data)
        }
    })
})

function getHouseId(data) {
    let title = `input[name=editTitle]`
    let address = `textarea[name=editAddress]`
    let price = `input[name=editPrice]`
    let long = `input[name=editLong]`
    let lat = `input[name=editLat]`
    $(title).val(data.title)
    $(address).val(data.location.address)
    $(price).val(data.price)
    $(long).val(data.location.long)
    $(lat).val(data.location.lat)
    $('#formEditHouse').modal('show')

    let temp = $("input[name='id']").val()
    if ( typeof temp != "undefined") {
        $("input[name='id']").replaceWith(`<input type='hidden' class='form-control' name='id' value='${data._id}'>`)
    }
    else {
        $("#formEdit").append(`<input type='hidden' class='form-control' name='id' value='${data._id}'>`)
    }
}

$(document).on('click', 'button[id="submitEditHouse"]', function (e) {
    e.preventDefault()
    updateHouse()
})

function updateHouse() {
    let id = $("input[name='id']").val()
    let title = $("input[name='editTitle']").val()
    let address = $("textarea[name='editAddress']").val()
    let price = $("input[name='editPrice']").val()
    let photoURL = $("input[name='editPhoto-url']").val()
    let photoFile = $("input[name='editPhoto-file']").val()
    let long = $("input[name='editLong']").val()
    let lat = $("input[name='editLat']").val()

    $.ajax({
        url: `${baseURL}/api/house/${id}`,
        method: "put",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: id,
            title: title,
            address: address,
            price: price,
            photoURL: photoURL,
            photoFile:photoFile,
            long: long,
            lat: lat
        },
        success: function (data) {
            updateViewAfterUpdate(data)
        }
    })
}

function updateViewAfterUpdate(data) {
    let html = `
                <div id="rowOfDetailHouse" class="container">
        
                    <div class="row">
                        <div class="col-sm-12">
                            <h1 class="text-center">Online House Selling</b></h1>
                            <button id="backToHome" class="btn btn-info btn-lg">Back</button>
                        </div>
                    </div>
                
                    <div class="row">
                        <div class="col-sm-6 col-sm-offset-3">
                            <div>
                                <img class="img-responsive" src="${data.photoURL}" alt="">
                            </div>
                            <p>Title : ${data.title}</p>
                            <p>Address : ${data.location.address}</p>
                            <p>Price : ${data.price}</p>
                            <p>Longitute : ${data.location.long}</p>
                            <p>Latitude : ${data.location.lat}</p>
                            <button id="edit#${data._id}" name="buttonEdit" class="btn btn-warning">Edit</button>
                            <button id="delete#${data._id}" name="buttonDelete" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
`
    $(`#rowOfDetailHouse`).replaceWith(html)

    $('#formEditHouse').modal('hide')
    $("input[name='title']").val("")
    $("textarea[name='address']").val("")
    $("input[name='price']").val("")
    $("input[name='long']").val("")
    $("input[name='lat']").val("")
}

$(document).on('click', 'button[name="buttonDelete"]', function () {
    let tempId = this.id.split("#")
    let houseId = tempId[1]

    $.ajax({
        url: `${baseURL}/api/house/${houseId}`,
        method: "delete",
        contentType: 'application/x-www-form-urlencoded',
        success: function () {
            updateViewAfterDelete()
        }
    })
})

function updateViewAfterDelete() {
    let html = `
        <div id="home" class="container">
    
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="text-center">Online House Selling</b></h1>
                    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#formCreateHouse">Create House</button>
                </div>
            </div>
        
            <div id="rowOfHouses" class="row">
        
            </div>
        
        </div>
`
    $('#rowOfDetailHouse').replaceWith(html)

    var rowOfHouse = $('#rowOfHouses')
    $.ajax({
        url: "http://localhost:3000/api/house",
        success: function (data) {
            displayAllHouses(data)
        }
    })
}

$(document).on('click', 'button[id="backToHome"]', function () {
    let html = `
        <div id="home" class="container">
    
            <div class="row">
                <div class="col-sm-12">
                    <h1 class="text-center">Online House Selling</b></h1>
                    <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#formCreateHouse">Create House</button>
                </div>
            </div>
        
            <div id="rowOfHouses" class="row">
        
            </div>
        
        </div>
`
    $('#rowOfDetailHouse').replaceWith(html)

    var rowOfHouse = $('#rowOfHouses')
    $.ajax({
        url: "http://localhost:3000/api/house",
        success: function (data) {
            displayAllHouses(data)
        }
    })
})

//    CREATE HOUSE
$(document).on('click', 'button[id="submitHouse"]', function (e) {
    e.preventDefault()
    createHouse()
})

function createHouse() {

    let title = $('input[name="title"]').val()
    let address = $('textarea[name="address"]').val()
    let price = $('input[name="price"]').val()
    let lat = $('input[name="lat"]').val()
    let long = $('input[name="long"]').val()
    let photoURL = $('input[name="photoURL"]').val()
    console.log(lat)
    $.ajax({
        url: `${baseURL}/api/house`,
        method: "post",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            title: title,
            address: address,
            price: price,
            lat: lat,
            long: long,
            photoURL: photoURL
        },
        success: function (data) {

            updateViewAfterCreateHouse(data)
        }
    })
}

function updateViewAfterCreateHouse(data) {
    let html = `
                <div id="rowHouse${data._id}" class="col-lg-3 col-md-6 col-sm-12">
                    <div class="panel panel-default">
                        <div class="panel-heading text-center text-uppercase">
                            ${data.title}
                        </div>
                        <div class="panel-body">
                            <div class="text-center">
                                <a id="detail#${data._id}" class="detailHouse">
                                     <img class="img-responsive" src="${data.photoURL}" alt="">
                                </a>
                            </div>
                            <div>
                                <p>Address: ${data.location.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
                                `

    $('#rowOfHouses:last').append(html)
    $('input[name="title"]').val("")
    $('input[name="price"]').val("")
    $('textarea[name="address"]').val("")
    $('input[name="photoURL"]').val("")
    $('#formCreateHouse').modal('hide');
}
