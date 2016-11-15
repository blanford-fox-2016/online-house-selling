var app = new Vue({
  el: '#app',
  data: {
    houses: [],
    searchtitle: '',

    // DATA INPUT FOR NEW HOUSE
    newtitle: '',
    newdesc: '',
    newprice: '',
    newimage: '',
    newowner: '',
    newphone: '',
    newaddress: '',

    // DATA INPUT FOR EDIT HOUSE
    edittitle: '',
    editdesc: '',
    editprice: '',
    editimage: '',
    editowner: '',
    editphone: '',
    editaddress: ''
  },
  ready: function() {
    console.log('Ready');
    this.getAllHouses();
  },
  methods: {
    resetForm: function() {
      console.log('Ini resetForm');
      app.newtitle = ""
      app.newdesc = ""
      app.newprice = ""
      app.newimage = ""
      app.newowner = ""
      app.newphone = ""
      app.newaddress = ""
    },
    renderMap: function(id) {
      // console.log('rendermap dengan ' + JSON.stringify(resdata));

      // for (var i = 0; i < resdata.length; i++) {
        // console.log('ini resdata:' +(resdata[i]._id));
        var mapdiv = '#map'+id;
        // console.log(mapdiv);
        setTimeout(function(){
          console.log(mapdiv);
          new GMaps({
            div: mapdiv,
            lat: -12.043333,
            lng: -77.028333
          });
        }, 1000)

      // }
    },
    // retrieve all houses from api
    getAllHouses: function()
    {
      axios.get('http://localhost:3000/api/house', {})
      .then(function (response) {
        app.houses = response.data;
        console.log(response);
        // setTimeout(function(){app.renderMap(response.data)}, 5000)

      })
      .catch(function (error) {
        console.log(error);
      });
    },
    // Insert new house to database using api
    createNewHouse: function() {
      axios.post('http://localhost:3000/api/house', {
        title: app.newtitle,
        description: app.newdesc,
        price: app.newprice,
        image: app.newimage,
        owner: app.newowner,
        phone: app.newphone,
        address: app.newaddress
      })
      .then(function(response){
        app.houses.push(response.data);
        console.log(response.data);
        app.resetForm();
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    setmodeledit: function(id) {
      axios.get('http://localhost:3000/api/house/'+id, {})
      .then(function(response){
        console.log(response);
        app.edittitle = response.data.title,
        app.editdesc = response.data.description,
        app.editprice = response.data.price,
        app.editimage = response.data.image,
        app.editowner = response.data.owner,
        app.editphone = response.data.phone,
        app.editaddress = response.data.address
      })
      .catch(function(error) {
        console.log(error);
      })
    },
    updateHouse: function(id) {
      axios.put('http://localhost:3000/api/house/'+id, {
        _id: id,
        title: app.edittitle,
        description: app.editdesc,
        price: app.editprice,
        image: app.editimage,
        owner: app.editowner,
        phone: app.editphone,
        address: app.editaddress
      })
      .then(function(response){
        console.log(response.data);
        app.getAllHouses()
      })
      .catch(function (error) {
        console.log(error);
      })
    },
    deleteHouse: function(id) {
      axios.delete('http://localhost:3000/api/house/'+id, {})
      .then(function(response){
        console.log(response.data);
        app.getAllHouses();
        document.querySelector('.modal-backdrop.fade.in').style.display = 'none';
      })
      .catch(function (error) {
        console.log(error);
      })
    }
  }

})
app.getAllHouses();
