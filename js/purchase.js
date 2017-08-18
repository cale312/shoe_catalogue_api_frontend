var $brand = $('.searchBrand');
var $size = $('.searchSize');
var $amount = $('.amount');

$('.collapsed').on('click', function() {
  $('.collapse').slideToggle();
});

const api = 'https://api-shoe-catalogue.herokuapp.com/api/shoes';

document.querySelector(".find-btn").disabled = true;
document.querySelector(".order-btn").disabled = true;

$('.searchSize, .searchBrand').on('keyup', function() {

  if ($brand.val().length > 0 && $size.val().length > 0) {
    document.querySelector(".find-btn").disabled = false;
  } else {
    document.querySelector(".find-btn").disabled = true;
    document.querySelector(".order-btn").disabled = true;
    document.querySelector('.status').innerHTML = "";
  }

});

// find the item by specific brand and size
// and enable order button
const table_template = document.querySelector('.table-template').innerHTML;
const table_instance = Handlebars.compile(table_template);

$('.find-btn').on('click', function() {

  $.ajax({
    type: 'GET',
    url: api + '/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val(),
    success: function(data) {
      if (data && data.length > 0) {
        document.querySelector('.table-display').innerHTML = table_instance({
          data: data
        });
        document.querySelector('.order-btn').disabled = false;
      } else {
        document.querySelector('.order-btn').disabled = true;
        document.querySelector('.status').innerHTML = '<div class="alert dange alert-danger">Shoe not found!</div>';
        document.querySelector('.table-display').innerHTML = "";
      }
    }
  });

});

$('.order-btn').on('click', function() {

  $.ajax({
    type: 'POST',
    url: api + '/sold/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val() + '/amount/' + $amount.val()
  }).done(function(data) {
    if (data) {
      document.querySelector('.searchBrand').value = ""
      document.querySelector('.searchSize').value = ""
      document.querySelector('.amount').value = ""
      document.querySelector('.status').innerHTML = '<div class="alert success alert-success">Your order has been sent!</div>';
    }
  });

});
