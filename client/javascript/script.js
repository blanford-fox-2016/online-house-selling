$(document).ready(function() {
  // alert('test')
  $('#sell-house-button').click(function() {
    generatingHouse()
  })

  showAll()
})

let generatingHouse = () => {
  let houseData = {
    title: $('#house-title').val(),
    image: $('#house-img').val(),
    price: $('#house-price').val(),
    description: $('house-description').val()
  }

  console.log(houseData);

  $.ajax({
    type: "POST",
    url: 'http://localhost:3000/api/houses',
    data: houseData,
    success: function(house) {
      alert("House has been posted")
    },
  });
}


let showAll = () => {
  $.ajax({
    type: "GET",
    url: 'http://localhost:3000/api/houses',
    success: function(house) {
      console.log(house)
      let data = ''
      for(var i = 0; i < house.length; i += 1) {
        data += `
        <div class="house">
          <div class="house-title">
            <h3> ${house[i].title} </h3>
            <hr>
          </div>
          <div class="house-image">
            <img src=${house[i].image} alt="house pict" />
          </div>
          <div class="house-detail">
            <div class="house-description">
              <p>
                ${house[i].description}
              </p>
            </div>
            <div class="house-price">
              <p> ${house[i].price} </p>
            </div>
            <div class="house-map">
              <p> This is a map </p>
            </div>
        `
      }
      $('.house-collections').append(data)
    },
  });
}
