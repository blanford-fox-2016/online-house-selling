<!--GET ALL HOUSE-->
let baseURL = 'http://localhost:3000'

$(document).ready(function () {
    let rowOfHouse = $('#rowOfHouses')

    $.ajax({
        url: "http://localhost:3000/api/house",
        success: function (data) {
            let house = []
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
                                        <img class="img-responsive" src="https://nwhm.com/sites/default/files/styles/renderings-2x/public/renderings/garden-hosue_0002_Layer-12.jpg?itok=i69UXy2v" alt="">
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
    })
})


$(document).on('click', 'a[class="detailHouse"]', function () {
    let tempId = this.id.split("#")
    let houseId = tempId[1]
    $.ajax({
        url: `${baseURL}/api/house/${houseId}`,
        success: function (data) {
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
                                <img class="img-responsive" src="https://nwhm.com/sites/default/files/styles/renderings-2x/public/renderings/garden-hosue_0002_Layer-12.jpg?itok=i69UXy2v" alt="">
                            </div>
                            <p>Title : ${data.title}</p>
                            <p>Address : ${data.location.address}</p>
                            <p>Price : ${data.price}</p>
                            <button id="edit#${data._id}" name="buttonEdit" class="btn btn-warning">Edit</button>
                            <button id="delete#${data._id}" name="buttonDelete" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                </div>
`

            $('#home').replaceWith(html)
        }
    })

})

$(document).on('click', 'button[name="buttonEdit"]', function () {
    let tempId = this.id.split("#")
    let houseId = tempId[1]

    $.ajax({
        url: `${baseURL}/api/house/${houseId}`,
        method: "get",
        contentType: 'application/x-www-form-urlencoded',
        success: function (data) {
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
    })
})

$(document).on('click', 'button[id="submitEditHouse"]', function (e) {
    e.preventDefault()
    let id = $("input[name='id']").val()
    let title = $("input[name='editTitle']").val()
    let address = $("textarea[name='editAddress']").val()
    let price = $("input[name='editPrice']").val()
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
            long: long,
            lat: lat
        },
        success: function (data) {
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
                                <img class="img-responsive" src="https://nwhm.com/sites/default/files/styles/renderings-2x/public/renderings/garden-hosue_0002_Layer-12.jpg?itok=i69UXy2v" alt="">
                            </div>
                            <p>Title : ${data.title}</p>
                            <p>Address : ${data.location.address}</p>
                            <p>Price : ${data.price}</p>
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
    })
})

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
            console.log(data)
            let house = []
            for (var i = 0; i < data.length; i++) {
                house.push(`
                    <div id="rowHouse${data[i]._id}" class="col-lg-3 col-md-6 col-sm-12">
                        <div class="panel panel-default">
                            <div class="panel-heading text-center text-uppercase">
                                <a id="detail#${data[i]._id}" class="detailHouse">${data[i].title}</a>
                            </div>
                            <div class="panel-body">
                                <div class="text-center">
                                    <img class="img-responsive" src="https://nwhm.com/sites/default/files/styles/renderings-2x/public/renderings/garden-hosue_0002_Layer-12.jpg?itok=i69UXy2v" alt="">
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
    })
})

//    CREATE QUESTION
$(document).on('click', 'button[id="submitHouse"]', function (e) {
    e.preventDefault()
    let title = $('input[name="title"]').val()
    let address = $('textarea[name="address"]').val()
    let price = $('input[name="price"]').val()

    $.ajax({
        url: `${baseURL}/api/house`,
        method: "post",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            title: title,
            address: address,
            price: price
        },
        success: function (data) {

            let html = `
                <div id="rowHouse${data._id}" class="col-sm-3">
                    <div class="panel panel-default">
                        <div class="panel-heading text-center text-uppercase">
                            <a id="detail#${data._id}" class="detailHouse">${data.title}</a>
                        </div>
                        <div class="panel-body">
                            <div class="text-center">
                                <img class="img-responsive" src="https://nwhm.com/sites/default/files/styles/renderings-2x/public/renderings/garden-hosue_0002_Layer-12.jpg?itok=i69UXy2v" alt="">
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
            $('#formCreateHouse').modal('hide');
        }
    })
})

$(document).on('click', 'li[id="userLogout"]', function () {
    Auth.deauthenticateUser()
    window.location.href = 'http://127.0.0.1:8080/login.html'
})


function deleteQuestion(questionId) {
    $.ajax({
        url: `http://localhost:3000/api/question/${questionId}`,
        method: "delete",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            questionId: questionId
        },
        success: function () {
            $("#rowOfQuestion").find(`#rowQuestion${questionId}`).remove()
        }
    })
}

function editQuestion(questionId) {
    $.ajax({
        url: `http://localhost:3000/api/question/${questionId}`,
        method: "get",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            questionId: questionId
        },
        success: function (data) {
            $('#formEditQuestion').modal('show');
            $('input[name="titleEdit"]').val(data.title)
            $('textarea[name="contentEdit"]').val(data.content)

            var temp = $("input[name='questionId']").val()
            if ( typeof temp != "undefined") {
                $("input[name='questionId']").replaceWith(`<input type='hidden' name='questionId' value='${data.questionId}'>`)
            }
            else {
                $("#formEditQuestion").append(`<input type='hidden' class='form-control' name='questionId' value='${data.questionId}'>`)
            }
        }
    })

}

$(document).on('click', 'button[id="submitEditQuestion"]', function(e) {
    e.preventDefault()
    let questionId = $('input[name="questionId"]').val()
    let titleEdit = $('input[name="titleEdit"]').val()
    let contentEdit = $('textarea[name="contentEdit"]').val()

    $.ajax({
        url: `http://localhost:3000/api/question/${questionId}`,
        method: "put",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            title: titleEdit,
            content: contentEdit
        },
        success: function (data) {
            console.log(data)
            let html = `
                        <div id="rowQuestion${data.questionId}" class="row">
                            <hr>
                            <div class="col-sm-12">
                                <div class="row">
                                    <div class="col-sm-1 text-center">
                                        <div>${data.votes.length}</div>
                                        <div>votes</div>
                                    </div>
                                    <div class="col-sm-1 text-center">
                                        <div>${data.answers.length}</div>
                                        <div>answers</div>
                                    </div>
                                    <div class="col-sm-1 text-center">
                                        <div>10</div>
                                        <div>view</div>
                                    </div>
                                    <div class="col-sm-7">
                                        <h4><a href="question.html?id=${data.questionId}">${data.title}</a></h4>
                                    </div>
                                    <div class="col-sm-2">
                                        <button class="btn btn-warning" onclick="editQuestion('${data.questionId}')">Edit</button>
                                        <button class="btn btn-danger" onclick="deleteQuestion('${data.questionId}')">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                                `

            $(`#rowQuestion${data.questionId}`).replaceWith(html)
            $('input[name="titleEdit"]').val("")
            $('textarea[name="contentEdit"]').val("")
            $('#formEditQuestion').modal('hide');
        }
    })
});