// var main = new Vue({
//     el: '#main-container',
//     data: {
//         message: ''
//     },
//     methods: {
//         createTodo: function() {
//             axios.post('http://localhost:3000/api/todo', {
//                     todo: this.data.message
//                 })
//                 .then(function(response) {
//                     console.log(response);
//                 })
//                 .catch(function(error) {
//                     console.log(error);
//                 });
//         },
//         getAllTodo: function() {
//             axios.get('http://localhost:3000/api/todo')
//                 .then(function(response) {
//                     console.log(response);
//                 })
//                 .catch(function(error) {
//                     console.log(error);
//                 });
//
//         }
//     }
// })


function loadTodo() {
    let html = ''
    $.ajax({
        url: `http://localhost:3000/api/todo`,
        method: "get",
        success: function(data) {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                html += ``
            }
            $('#all_question').append(html)

        }
    })

}

function createTodo() {
    var vm = new Vue({
        el: '#form-todo'
    })

    axios.post('http://localhost:3000/api/todo', {
            todo:
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        });
}
