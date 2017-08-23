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

const table_template = document.querySelector('.table-template').innerHTML;
const table_instance = Handlebars.compile(table_template);
const table_display = document.querySelector('.table-display');

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

$('.searchBrand').on('keyup', function() {
  var input, filter, table, tr, td, i;
  input = $('.searchBrand').val().toLowerCase();
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
      $.ajax({
        type: 'GET',
        url: api,
      }).done(function(data) {
        table_display.innerHTML = table_instance({
          data: data
        });
      });
      document.querySelector('.searchBrand').value = ""
      document.querySelector('.searchSize').value = ""
      document.querySelector('.amount').value = ""
      document.querySelector('.status').innerHTML = '<div class="alert success alert-success">Your order has been sent!</div>';
    }
  });

});
