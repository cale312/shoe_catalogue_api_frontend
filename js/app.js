'use strict'

$(function() {

  const $warning = $('.warning');

  const $brand = $('.brand');
  const $color = $('.color');
  const $size = $('.size');
  const $price = $('.price');
  const $stockN = $('.nStock');

  const $newBrand = $('.newBrand');
  const $newColor = $('.newColor');
  const $newSize = $('.newSize');
  const $newPrice = $('.newPrice');
  const $newStock = $('.newStock');

  // var stock = [];

  $.ajax({
    type: 'GET',
    url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes',
    success: function(data) {
      // stock = JSON.stringify(data);
      $.each(data, function(i, shoe) {
        $brand.append(shoe.brand + '<br>');
        $color.append(shoe.color + '<br>');
        $size.append('US/' + shoe.size + '<br>');
        $price.append('R ' + shoe.price + '<br>');
        $stockN.append(shoe.in_stock + '<br>');
      });
    },
    error: function() {
      alert('error loading the stock');
    }
  });

  $('.addBtn').on('click', function() {

    var nStock = {
      brand: $newBrand.val(),
      size: $newSize.val(),
      color: $newColor.val(),
      in_stock: $newStock.val(),
      price: $newPrice.val()
    };

    // var nStock = JSON.stringify(nStock);
    // alert(nStock);

    if ($newBrand.val() !== '' && $newSize.val() !== '' && $newColor.val() !== '' && $newStock.val() !== '' && $newPrice.val() !== '') {
      $.ajax({
        type: 'POST',
        url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes',
        data: JSON.stringify(nStock),
        contentType: "application/json",
      }).done(function(data) {
        // alert(data);
        $brand.append(data.brand + '<br>');
        $color.append(data.color + '<br>');
        $size.append('US/' + data.size + '<br>');
        $price.append('R ' + data.price + '<br>');
        $stockN.append(data.in_stock + '<br>');
        location.reload();
      });
    } else {
      $warning.append('<div class="alert alert-danger warning">Please enter valid stock values!</div>');
    }

  });


  // $.ajax({
  //   type: 'GET',
  //   url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes/brand/' + $brand,
  //   success: function(data) {
  //
  //   }
  // });
  //
  // $.ajax({
  //   type: 'GET',
  //   url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes/size/' + $size,
  //   success: function(data) {
  //
  //   }
  // });

});
