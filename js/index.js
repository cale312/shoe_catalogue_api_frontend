'use strict'

$('.collapsed').on('click', function() {
  $('.collapse').slideToggle();
});

const table_template = document.querySelector('.table-template').innerHTML;
const table_instance = Handlebars.compile(table_template);

const $input = $('.input');

$.ajax({
  type: 'GET',
  url: 'http://localhost:4000/api/shoes',
  success: function(data) {
    document.querySelector('.table-display').innerHTML = table_instance({
      data: data
    });
  },
  error: function() {
    alert('error loading the stock');
  }
});

const table_display = document.querySelector('.table-display');

const $searchInput = $('.input');
var statusMsg = document.querySelector('.status');

$('.input').on('keyup', function() {
  if ($searchInput.val().length == 0) {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:4000/api/shoes',
    }).done(function(data) {
      document.querySelector('.table-display').innerHTML = table_instance({
        data: data
      });
      statusMsg.innerHTML = "";
    });
  }
});

$('.filter-btn').on('click', function() {

  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/api/shoes/brand/' + $input.val().toLowerCase()
  }).done(function(data) {
    if (data && data.length > 0) {
      document.querySelector('.table-display').innerHTML = table_instance({
        data: data
      });
    } else {
      statusMsg.innerHTML = '<div class="alert warning alert-danger">Shoe not found!</div>';
    }
  });

  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/api/shoes/size/' + $input.val().toLowerCase()
  }).done(function(data) {
    if (data && data.length > 0) {
      document.querySelector('.table-display').innerHTML = table_instance({
        data: data
      });
    } else {
      statusMsg.innerHTML = '<div class="alert warning alert-danger">Shoe not found!</div>';
    }
  });

});

document.querySelector('.add-btn').disabled = true;

$('.newBrand, .newStock, .newSize, .newPrice, .newColor').on('keyup', function() {
  if ($('.newBrand').val().length > 0 && $('.newSize').val().length > 0 && $('.newColor').val().length > 0 && $('.newPrice').val().length > 0 && $('.newStock').val().length > 0) {
    document.querySelector('.add-btn').disabled = false;
  } else {
    document.querySelector('.add-btn').disabled = true;
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

  if ($('.newBrand').val() !== "" && $('.newSize').val() !== "" && $('.newColor').val() !== "" && $('.newPrice').val() !== "" && $('.newStock').val() !== "") {
    $.ajax({
      type: 'POST',
      data: JSON.stringify(newStock),
      url: 'http://localhost:4000/api/shoes',
      contentType: "application/json"
    }).done(function(data) {
      if (data) {
        document.querySelector('.table-display').innerHTML = table_instance({
          data: data
        });
        document.querySelector('.newBrand') = "";
        document.querySelector('.newSize') = "";
        document.querySelector('.newColor') = "";
        document.querySelector('.newPrice') = "";
        document.querySelector('.newStock') = "";
        statusMsg.innerHTML = '<div class="alert success alert-success">Stock added successfully!</div>';
      } else {
        statusMsg.innerHTML = '<div class="alert warning alert-danger">Error adding stock!</div>';
      }
    });
  } else {
    alert('Please make sure all fields with asteriks(*) are filled');
  }

});
