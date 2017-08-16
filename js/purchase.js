// slideshow
// $(".rslides").responsiveSlides();

$(function() {

  var $brand = $('.searchBrand');
  var $size = $('.searchSize');

  $('.collapsed').on('click', function() {
    $('.collapse').slideToggle();
  });

  $('.find-btn').on('click', function() {

    $.ajax({
      type: 'GET',
      url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val().toLowerCase()
    }).done(function(data) {
      if (data) {
        document.querySelector('.brand').innerHTML = "";
        document.querySelector('.color').innerHTML = "";
        document.querySelector('.size').innerHTML = "";
        document.querySelector('.price').innerHTML = "";
        document.querySelector('.stockN').innerHTML = "";
        $.each(data, function(i, shoe) {
            $('.brand').append(shoe.brand + '<br>');
            $('.color').append(shoe.color + '<br>');
            $('.size').append('US/' + shoe.size + '<br>');
            $('.price').append('R ' + shoe.price + '<br>');
            $('.stockN').append(shoe.in_stock + '<br>');
        });
      } else if (!data) {
        document.querySelector('.status').innerHTML = '<div class="alert alert-danger warning">We currently do not have that on storage!</div>'
      }
    });

  });

  $('.order-btn').on('click', function() {



    $.ajax({
      type: 'POST',
      url: 'https://api-shoe-catalogue.herokuapp.com/api/shoes/sold/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val().toLowerCase(),
      success: function(data) {

        document.querySelector('.status').innerHTML = '<div class="alert alert-success warning">Your order has been sent!</div>';
        document.querySelector('.searchBrand').value = "";
        document.querySelector('.searchSize').value = "";

      },
      error: function(err) {

        console.log(err);
        alert('We do not have that available in storage at the moment!')
      }
    });

  });

});
