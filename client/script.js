<!--GET ALL HOUSE-->
let baseURL = 'http://localhost:3000'

$(document).ready(function () {
    var rowOfHouse = $('#rowOfHouses')

    $.ajax({
        url: "http://localhost:3000/api/house",
        success: function (data) {
            console.log(data)
            let house = []
            for (var i = 0; i < data.length; i++) {
                house.push(`
                    <div id="rowHouse${data[i]._id}" class="col-sm-3">
                        <div class="panel panel-default">
                            <div class="panel-heading text-center text-uppercase">
                                <a href="detail#${data[i]._id}">${data[i].title}</a>
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
                            <a href="detail#${data._id}">${data.title}</a>
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