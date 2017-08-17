var $brand = $('.searchBrand');
var $size = $('.searchSize');
var $amount = $('.amount');

$('.collapsed').on('click', function() {
  $('.collapse').slideToggle();
});

document.querySelector(".find-btn").disabled = true;
document.querySelector(".order-btn").disabled = true;

function sortData(data) {
  document.querySelector('.brand').innerHTML = "";
  document.querySelector('.size').innerHTML = "";
  document.querySelector('.color').innerHTML = "";
  document.querySelector('.price').innerHTML = "";
  document.querySelector('.stockN').innerHTML = "";
  $.each(data, function(i, shoe) {
    $('.brand').append(shoe.brand + '<br>');
    $('.color').append(shoe.color + '<br>');
    $('.size').append('US/' + shoe.size + '<br>');
    $('.price').append('R ' + shoe.price + '<br>');
    $('.stockN').append(shoe.in_stock + '<br>');
  });
}

$('.searchSize, .searchBrand').on('keyup', function() {

  if ($brand.val().length > 0 && $size.val().length > 0) {
    document.querySelector(".find-btn").disabled = false;
  } else {
    document.querySelector(".find-btn").disabled = true;
    document.querySelector(".order-btn").disabled = true;
  }

});

// find the item by specific brand and size
// and enable order button

$('.find-btn').on('click', function() {

  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/api/shoes/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val(),
    success: function(data) {
      if (data && data.length > 0) {
        sortData(data);
        document.querySelector('.order-btn').disabled = false;
        document.querySelector('.status').innerHTML = "";
      } else {
        document.querySelector('.order-btn').disabled = true;
        document.querySelector('.status').innerHTML = '<div class="alert dange alert-danger">Shoe not found!</div>';
      }
    }
  });

});

$('.order-btn').on('click', function() {

  $.ajax({
    type: 'POST',
    url: 'http://localhost:4000/api/shoes/sold/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val() + '/amount/' + $amount.val()
  }).done(function(data) {
    if (data) {
      document.querySelector('.searchBrand').value = ""
      document.querySelector('.searchSize').value = ""
      document.querySelector('.amount').value = ""
      document.querySelector('.status').innerHTML = '<div class="alert success alert-success">Your order has been sent!</div>';
    }
  });

});
