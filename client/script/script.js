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
        // tambahkan click listener pada button name=detail
        // $(element button denga name).on('click', )
        // munculkan modal dengan memanggil showModal, sambil mendapatkan attribute data-id
      }
    })
}


// gabungini ini

function showModal(id) {
  // console.log(id);
  // dapatkan data-id dahulu
  $.ajax({
    url: 'http://localhost:3000/api/ads/'+id,
    success: function(selected_ad){
      console.log(selected_ad);
    }
  })
  // lakukan get request sesuai data-id

  // tamiplkan modal sesuai dengan data yang didapat sebeloumnay
  var showModal = `
  <!-- Modal -->
  <div id="modal_view" class="modal fade" role="dialog">
    <div class="modal-dialog">
      <!-- Modal content-->
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">Sell your house now !</h4>
        </div>

        <div class="modal-body">
        </div>

        <div class="modal-footer">
          <p>Copyright Sell Your House Now ! &copy; 2016</p>
          <button type="button" class="btn btn-default btn-lg" data-dismiss="modal">Close</button>
        </div>
      </div>

    </div>
  </div>
  <!-- end modal -->
  `
}

function addNewAdd(){
  $('#btn_add_add').on('click', function(e){
    e.preventDefault()
    var input_data = {
      title: $('#title').val(),
      description: $('#description').val(),
      photo: $('#photo').val(),
      price: $('#price').val(),
      address: $('#address').val(),
      addressCountry: $('#addressCountry').val(),
      postalCode: $('#postalCode').val(),
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
              <button type="button" id="detail" name="detail" class="pull-right btn btn-warning">View Details</button>
            </div>
          </div>
        </div>
        `

        $('#data_div').prepend(new_data_HTML)
      }
    })
  })
}
