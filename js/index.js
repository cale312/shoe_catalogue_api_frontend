'use strict'

const api = 'https://api-shoe-catalogue.herokuapp.com/api/shoes';

$('.collapsed').on('click', function() {
  $('.collapse').slideToggle();
});

const table_template = document.querySelector('.table-template').innerHTML;
const table_instance = Handlebars.compile(table_template);

const $input = $('.input');

$.ajax({
  type: 'GET',
  url: api,
  success: function(data) {
    document.querySelector('.table-display').innerHTML = table_instance({
      data: data
    });
    console.log('Stock loaded successfully!');
  },
  error: function() {
    alert('error loading the stock');
  }
});

const table_display = document.querySelector('.table-display');

const $searchInput = $('.input');
var statusMsg = document.querySelector('.status');
document.querySelector('.filter-btn').disabled = true;

$('.input').on('keyup', function() {
  if ($searchInput.val().length == 0) {
    document.querySelector('.filter-btn').disabled = true;
    $.ajax({
      type: 'GET',
      url: api,
    }).done(function(data) {
      document.querySelector('.table-display').innerHTML = table_instance({
        data: data
      });
      statusMsg.innerHTML = "";
    });
  } else {
    document.querySelector('.filter-btn').disabled = false;
  }
});

$('.filter-btn').on('click', function() {

  $.ajax({
    type: 'GET',
    url: api + '/brand/' + $input.val().toLowerCase()
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
    url: api + '/size/' + $input.val()
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
      statusMsg.innerHTML = '<div class="alert success alert-success">Stock added successfully!</div>';
    } else {
      statusMsg.innerHTML = '<div class="alert warning alert-danger">Error adding stock!</div>';
    }
  });


});
