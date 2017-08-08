'use strict'

$(function() {

  const $brand = $('.brand');
  const $color = $('.color');
  const $size = $('.size');
  const $price = $('.price');
  const $nStock = $('.nStock');

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
        $nStock.append(shoe.in_stock + '<br>');
      });
    },
    error: function() {
      alert('error loading the stock');
    }
  });

  $('.addBtn').on('click', function() {

    let nStock = {
      brand: $newBrand.val(),
      size: $newSize.val(),
      color: $newColor.val(),
      in_stock: $newStock.val(),
      price: $newPrice.val(),
    };

    // console.log(nStock);

    $.ajax({
      type: 'POST',
      url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes',
      data: nStock,
      success: function(newShoe) {
        $brand.append(newShoe.brand + '<br>');
        $color.append(newShoe.color + '<br>');
        $size.append('US/' + newShoe.size + '<br>');
        $price.append('R ' + newShoe.price + '<br>');
        $nStock.append(newShoe.in_stock + '<br>');
      },
      error: function() {
        alert('error saving new stock');
      }
    });

  });


  // $.ajax({
  //   type: 'GET',
  //   url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes/brand/:brand',
  //   success: function(data) {
  //
  //   }
  // });
  //
  // $.ajax({
  //   type: 'GET',
  //   url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes/size/:size',
  //   success: function(data) {
  //
  //   }
  // });

});
