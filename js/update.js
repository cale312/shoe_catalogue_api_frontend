const $brand = $('.findBrand');
const $size = $('.findSize');
const $amount = $('.amount');

function filterShoes(data) {
  if (data) {
    $.each(data, function(i, shoe) {
      $('#brand').append(shoe.brand + '<br>');
      $('#color').append(shoe.color + '<br>');
      $('#size').append('US/' + shoe.size + '<br>');
      $('#price').append('R ' + shoe.price + '<br>');
      $('#stockN').append(shoe.in_stock + '<br>');
    });
  }
}

$('.find-btn').on('click', function() {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/api/shoes/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val(),
    success: function(data) {
      if (data) {
        filterShoes(data);
      } else {
        document.querySelector('.condition').innerHTML = '<div class="alert alert-danger warning">Item not found!</div>';
      }
    },
    error: function(err) {
      console.log(err);
      document.querySelector('.condition').innerHTML = '<div class="alert alert-danger warning">Item not found!</div>';
    }
  });
});


$('.update-btn').on('click', function() {
  $.ajax({
    type: 'POST',
    url: 'http://localhost:4000/api/shoes/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val() + '/amount/' + $amount.val(),
    success: function(data) {
      document.querySelector('.condition').innerHTML = '<div class="alert alert-success success">Stock updated!</div>';
    },
    error: function(err) {
      alert(err);
    }
  });
});
