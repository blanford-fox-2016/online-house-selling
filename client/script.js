<!--GET ALL HOUSE-->
let baseURL = 'http://localhost:3000'

$(document).ready(function () {
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

    initMap(data._id, data.location.lat, data.location.long)
}

function initMap(id, lat, long) {
    // console.log($(`.map[data-id=${id}]`))

    var myLatLng = {lat: -25.363, lng: 131.044}

    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        scrollwheel: false,
        zoom: 4
    })

    // Create a marker and set its position.
    var marker = new google.maps.Marker({
        map: map,
        position: myLatLng,
        title: 'Hello World!'
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

//    CREATE QUESTION
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
                <div id="rowHouse${data._id}" class="col-sm-3">
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
