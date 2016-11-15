$(document).ready(function() {
    loadProperty()
})

function loadProperty() {
    let html = ''
    $.ajax({
        url: `http://localhost:3000/api/property`,
        method: "get",
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                html += `
                <div class="row">
                    <div class="col-sm-6 col-md-4">
                        <div class="thumbnail">
                            <img src="src/img/home-icon.png" class="img-responsive" alt="Responsive image">
                            <div class="caption">
                                <hr>
                                <h3>${data[i].title}</h3>
                                <hr>
                                <p><strong>Estimate price: </strong></p>
                                <h3>${data[i].price}</h3>
                                <hr>
                                <p><strong>Facility: </strong></p>
                                <p>${data[i].details}</p>
                                <hr>
                                <span><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal">
                                View Detail
                                </button></span>
                                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
                                            <img src="src/img/home-icon.png" class="rounded mx-auto d-block" alt="Responsive image">
                                            </div>
                                            <div class="alert alert-success" role="alert">
                                                <h4 class="alert-heading"><strong>Property Details</strong></h4>
                                                <p class="mb-0"><strong>Facility :</strong></p>
                                                <p>${data[i].details}</p>
                                                <p class="mb-0"><strong>Type :</strong></p>
                                                <p>${data[i].property_type}</p>
                                                <p class="mb-0"><strong>Price : </strong></p>
                                                <p>${data[i].price}</p>
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
                </div>
                `
            }
            $('#main-container').append(html)
        }
    })
}

function viewDetails(parameter) {
    let html = ''
    $.ajax({
        url: `http://localhost:3000/api/property/${parameter}`,
        method: "get",
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                html += `
              `
            }
            $('#main-container').append(html)
        }
    })
}
