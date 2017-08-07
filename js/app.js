$(function(){

  var $brand = $('.brand');
  var $color = $('.color');
  var $size = $('.size');
  var $price = $('.price');
  var $nStock = $('.nStock');

  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/api/shoes',
    success: function(data) {
      // console.log('success', data);
      $.each(data, function(i, shoe) {
        $brand.append(shoe.brand + '<br>');
        $color.append(shoe.color + '<br>');
        $size.append(shoe.size + '<br>');
        $price.append(shoe.price + '<br>');
        $nStock.append(shoe.in_stock + '<br>');
      });
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://localhost:4000/api/shoes',
    success: function(data) {

    }
  });

  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/api/shoes/brand/:brand',
    success: function(data) {

    }
  });

  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/api/shoes/size/:size',
    success: function(data) {

    }
  });

});
