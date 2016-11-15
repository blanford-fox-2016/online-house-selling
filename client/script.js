$(document).ready(function(){
  refreshAllHouse()
  $("#all-house").hide()
  $("#search").hide()
  $("#new-house").hide()

  $("#menu-add").click(function(){
    $("#all-house").hide()
    $("#search").hide()
    $("#new-house").show()
  })

  $("#menu-display").click(function(){
    $("#all-house").show()
    $("#search").hide()
    $("#new-house").hide()
  })

  $("#menu-search").click(function(){
    $("#all-house").hide()
    $("#search").show()
    $("#new-house").hide()
  })

  $("#input-submit").click(function(){
    $.ajax({
      url:'http://localhost:3000/api/houses',
      type: 'POST',
      data: {title: $("#input-title").val(), address: $("#input-address").val(), description: $("#input-description").val(), price: $("#input-price").val(), phone_number: $("#input-phone_number").val(), email: $("#input-email").val(), picture: $("#input-picture").val(), lat: marker.getPosition().lat(), lng: marker.getPosition().lng()},
      success: function(result){
        $("#input-title").val("");
        $("#input-address").val("");
        $("#input-description").val("");
        $("#input-price").val("");
        $("#input-phone_number").val("");
        $("#input-email").val("");
        $("#input-picture").val("");
        $("#message").html("Adding data is successful")
        refreshAllHouse()
      }
    })
  })

  $("#search-box").keyup(function(){
    if($("#search-box").val().length >2){
      searchHouse($("#search-box").val())
    } else {
      $("#search-result").html("")
    }
  })
})

let refreshAllHouse = function(){
  $.ajax({
    url: 'http://localhost:3000/api/houses',
    type: "GET",
    success: function(result){
      let allHouse = ""
      for(let i in result){
        let component =
        `<div class="row">
          <div class="col-sm-6 col-md-4">
            <a class="thumbnail" data-toggle="modal" data-target="#modal-app">
              <div class="viewer ">
                // <img src="https://source.unsplash.com/pmhdkgRCbtE">
                <ul class="note">
                  <li>IDR ${result[i].price}</li>
                </ul>
              </div>
              <div class="caption">
                <h4 class="title">${result[i].title}</h4>
                  <p class="description">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    Address: ${result[i].address} <br>
                    Description: ${result[i].description} <br>
                    Price: ${result[i].price} <br>
                    Phone_Number: ${result[i].phone_number} <br>
                    Email: ${result[i].email} <br>
                    Picture: ${result[i].picture} <br>
                    <img width="300px" src="https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7Clabel:C%7C${result[i].google_map.lat},${result[i].google_map.lng}&size=400x300&key=AIzaSyDIX6COlQ7CX56xKv70D7S3zZh5nSQjKC8">
                    <br>
                  </p>
                </div>
              </a>
          </div>`


        allHouse = allHouse + component
      }
      $("#all-house").html(allHouse)
    }
  })
}

let searchHouse = function(query){
  $.ajax({
    url: `http://localhost:3000/api/houses/${query}`,
    type: "GET",
    success: function(result){
      let allHouse = ""
      for(let i in result){
        let component =
        `
        <br><br>
        <center>
        <div class="row">
          <div class="col-sm-3 col-md-4"></div>
          <div class="col-sm-6 col-md-4">
            <a class="thumbnail" data-toggle="modal" data-target="#modal-app">
              <div class="viewer">
                <img src="https://source.unsplash.com/pmhdkgRCbtE">
                <ul class="note">
                  <li>IDR ${result[i].price}</li>
                </ul>
              </div>
              <div class="caption">
                <h4 class="title">${result[i].title}</h4>
                  <p class="description">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                    Address: ${result[i].address} <br>
                    Description: ${result[i].description} <br>
                    Price: ${result[i].price} <br>
                    Phone_Number: ${result[i].phone_number} <br>
                    Email: ${result[i].email} <br>
                    Picture: ${result[i].picture} <br>
                    <img width="300px" src="https://maps.googleapis.com/maps/api/staticmap?markers=color:red%7Clabel:C%7C${result[i].google_map.lat},${result[i].google_map.lng}&size=400x300&key=AIzaSyBjA9s2q4vk2TCvQ9O81qrqbv5rx4lqKj0"><br>
                  </p>
                </div>
              </a>
          </div>
          <div class="col-sm-3 col-md-4"></div>
        </div>
        </center>`

        allHouse = allHouse + component
      }
      $("#search-result").html(allHouse)
    }
  })
}
