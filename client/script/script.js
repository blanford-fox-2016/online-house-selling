$(document).ready(function(){
  showAllAds()
  addNewAdd()


})

function showAllAds(){
    $.ajax({
      url: 'http://localhost:3000/api/ads',
      method: 'GET',
      contentType: 'application/x-www-form-urlencoded',
      success: function(show_all){
        console.log(show_all);
        var show_all_HTML = ''

        for (var i = 0; i < show_all.length; i++) {
          show_all_HTML += `
            <div class="col-sm-3" id="${show_all[i]._id}" >
              <div class="panel panel-default" style="min-height: 300px;">
                <div class="panel-heading">${show_all[i].title}</div>
                <div class="panel-body">
                  <img src="${show_all[i].photo}" width="100%" height="200">
                </div>
                <div class="panel-footer" style="height: 60px;">
                  <span>Price : $${show_all[i].price}</span>
                  <button type="button" id="detail" name="detail" class="pull-right btn btn-warning" data-toggle="modal" data-target="#modal_view" data-id="${show_all[i]._id}">View Details</button>
                </div>
              </div>
            </div>
          `
        }

        $('#data_div').append(show_all_HTML)

        $('button#detail').on('click', function(){
          var id = $(this).attr('data-id')
          showModal(id)
        })
      }
    })
}

function showModal(id) {
  console.log(id);

  $.ajax({
    url: 'http://localhost:3000/api/ads/'+id,
    method: 'GET',
    success: function(selected_ad){
      console.log(selected_ad);
      $('#modal_view .modal-title').text(selected_ad.title)
      $('#modal_view .modal-body img').attr("src", `${selected_ad.photo}`)
      $('#modal_view .modal-body #price').text(`Price : ${selected_ad.price}`)
      $('#modal_view .modal-body #description').text(`Desc: ${selected_ad.description}`)
      $('#modal_view .modal-body #address').text(`Address: ${selected_ad.location.address}`)
      $('#modal_view .modal-body #addressCountry').text(`Country: ${selected_ad.location.addressCountry}`)
      $('#modal_view .modal-body #postalCode').text(`Postal Code: ${selected_ad.location.postalCode}`)
      $('#modal_view .modal-footer #update').attr("onclick", `updateAd('${selected_ad._id}')`)
      $('#modal_view .modal-footer #delete').attr("onclick", `deleteAd('${selected_ad._id}')`)
    },
    error: function(err){
      console.log(err);
    }
  })
}

function updateAd(id){
  $('#modal_view').hide()
  // $('#modal_view').dialog("close")
  $.ajax({
    url: 'http://localhost:3000/api/ads/'+id,
    method: 'GET',
    success: function(selected_ad){
      console.log(selected_ad);
      $('#modal_update input#title').val(selected_ad.title)
      $('#modal_update .modal-body #description').text(selected_ad.description)
      $('#modal_update .modal-body #photo').val(selected_ad.photo)
      $('#modal_update .modal-body #price').val(selected_ad.price)
      $('#modal_update .modal-body #address').val(selected_ad.location.address)
      $('#modal_update .modal-body #addressCountry').val(selected_ad.location.addressCountry
      )
      $('#modal_update .modal-body #postalCode').val(selected_ad.location.postalCode)

      $('#modal_update .modal-body #btn_update').attr("onclick", `processUpdate('${selected_ad._id}')`)
    }
  })


  $('#modal_update .modal-footer #close_modal').on('click', function(){
    $('.modal-backdrop.fade.in').remove()
  })
  $('#modal_update .modal-header .close').on('click', function(){
    $('.modal-backdrop.fade.in').remove()
  })
}

function processUpdate(id){
  $('.modal-backdrop.fade.in').remove()
  var data_update ={
    title: $('#modal_update .modal-content #title').val(),
    description: $('#modal_update .modal-content #description').val(),
    photo: $('#modal_update .modal-content #photo').val(),
    price: $('#modal_update .modal-content #price').val(),
    address: $('#modal_update .modal-content #address').val(),
    addressCountry: $('#modal_update .modal-content #addressCountry').val(),
    postalCode: $('#modal_update .modal-content #postalCode').val()
  }

  $.ajax({
    url: 'http://localhost:3000/api/ads/'+id,
    method: 'PUT',
    data: data_update,
    success: function(updated_data){
      console.log(updated_data);

      var updated_data_HTML = `
      <div class="col-sm-3" id="${updated_data._id}" >
        <div class="panel panel-default" style="min-height: 300px;">
          <div class="panel-heading">${updated_data.title}</div>
          <div class="panel-body">
            <img src="${updated_data.photo}" width="100%" height="200">
          </div>
          <div class="panel-footer" style="height: 60px;">
            <span>Price : $${updated_data.price}</span>
            <button type="button" id="detail" name="detail" class="pull-right btn btn-warning" data-toggle="modal" data-target="#modal_view" data-id="${updated_data._id}">View Details</button>
          </div>
        </div>
      </div>
      `

      $(`#${updated_data._id}`).replaceWith(updated_data_HTML)
      $('button#detail').on('click', function(){
        var id = $(this).attr('data-id')
        showModal(id)
      })

      $('#modal_view .modal-title').text("")
      $('#modal_view .modal-body img').attr("src", "")
      $('#modal_view .modal-body #price').text("")
      $('#modal_view .modal-body #description').text("")
      $('#modal_view .modal-body #address').text("")
      $('#modal_view .modal-body #addressCountry').text("")
      $('#modal_view .modal-body #postalCode').text("")
      $('#modal_view .modal-footer #update').prop("onclick", null)
      $('#modal_view .modal-footer #delete').prop("onclick", null)
    }
  })
}

function addNewAdd(){
  $('#btn_add').on('click', function(e){
    e.preventDefault()
    var input_data = {
      title: $('#title').val(),
      description: $('#description').val(),
      photo: $('#photo').val(),
      price: $('#price').val(),
      address: $('#address').val(),
      addressCountry: $('#addressCountry').val(),
      postalCode: $('#postalCode').val()
    }
    $.post({
      url: 'http://localhost:3000/api/ads',
      data: input_data,
      success: function(new_data){
        console.log(new_data);
        var new_data_HTML = ''

        new_data_HTML = `
        <div class="col-sm-3" id="${new_data._id}" >
          <div class="panel panel-default" style="min-height: 300px;">
            <div class="panel-heading">${new_data.title}</div>
            <div class="panel-body">
              <img src="${new_data.photo}" width="100%" height="200">
            </div>
            <div class="panel-footer" style="height: 60px;">
              <span>Price : $${new_data.price}</span>
              <button type="button" id="detail" name="detail" class="pull-right btn btn-warning" data-toggle="modal" data-target="#modal_view" data-id="${new_data._id}">View Details</button>
            </div>
          </div>
        </div>
        `

        $('#data_div').prepend(new_data_HTML)

        $('#title').val('')
        $('#description').val('')
        $('#photo').val('')
        $('#price').val('')
        $('#address').val('')
        $('#addressCountry').val('')
        $('#postalCode').val('')

        $('button#detail').on('click', function(){
          var id = $(this).attr('data-id')
          showModal(id)
        })
      }
    })
  })
}

function deleteAd(id){
  $('#modal_view').hide()
  $('.modal-backdrop.fade.in').remove()
  $.ajax({
    url         : 'http://localhost:3000/api/ads/'+id,
    method      : 'DELETE',
    dataType    : 'json',
    contentType : 'application/x-www-form-urlencoded',
    success: function(deleted_data){
      console.log(`delete nih`);
      console.log(deleted_data);
      $(`#${deleted_data._id}`).remove()
    }
  })
}
