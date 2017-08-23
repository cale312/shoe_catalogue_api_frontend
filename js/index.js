'use strict'

const api = 'https://api-shoe-catalogue.herokuapp.com/api/shoes';

$('.collapsed').on('click', function() {
  $('.collapse').slideToggle();
});

const table_template = document.querySelector('.table-template').innerHTML;
const table_instance = Handlebars.compile(table_template);
const table_display = document.querySelector('.table-display');
document.querySelector('.add-btn').disabled = true;

$('.newBrand, .newStock, .newSize, .newPrice, .newColor').on('keyup', function() {
  if ($('.newBrand').val().length > 0 && $('.newSize').val().length > 0 && $('.newColor').val().length > 0 && $('.newPrice').val().length > 0 && $('.newStock').val().length > 0) {
    document.querySelector('.add-btn').disabled = false;
  } else {
    document.querySelector('.add-btn').disabled = true;
  }
});

$.ajax({
  type: 'GET',
  url: api,
  success: function(data) {
    table_display.innerHTML = table_instance({
      data: data
    });
    console.log('Stock loaded successfully!');
  },
  error: function() {
    alert('error loading the stock!');
  }
});

var statusMsg = document.querySelector('.status');

$('.input').on('keyup', function() {
  var input, filter, table, tr, td, i;
  input = $('.input').val().toLowerCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.indexOf(input) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
});

$('.add-btn').on('click', function() {
  let newStock = {
    brand: $('.newBrand').val().toLowerCase(),
    size: $('.newSize').val(),
    color: $('.newColor').val(),
    price: $('.newPrice').val(),
    in_stock: $('.newStock').val()
  }

  $.ajax({
    type: 'POST',
    data: JSON.stringify(newStock),
    url: api,
    contentType: "application/json"
  }).done(function(data) {
    if (data) {
      document.querySelector('.table-display').innerHTML = table_instance({
        data: data
      });
      document.querySelector('.newBrand').value = "";
      document.querySelector('.newSize').value = "";
      document.querySelector('.newColor').value = "";
      document.querySelector('.newPrice').value = "";
      document.querySelector('.newStock').value = "";
      document.querySelector('.add-btn').disabled = true;
      statusMsg.innerHTML = '<div class="alert success alert-success">Stock added successfully!</div>';
    } else {
      statusMsg.innerHTML = '<div class="alert warning alert-danger">Error adding stock!</div>';
    }
  });

});
