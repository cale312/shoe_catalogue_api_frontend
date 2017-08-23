const $brand = $('.findBrand');
const $size = $('.findSize');
const $amount = $('.amount');

$('.collapsed').on('click', function() {
  $('.collapse').slideToggle();
});

const api = 'https://api-shoe-catalogue.herokuapp.com/api/shoes';

document.querySelector('.update-btn').disabled = true;
document.querySelector('.find-btn').disabled = true;

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

$('.findBrand, .findSize').on('keyup', function() {
  if ($brand.val().length > 0 && $size.val().length > 0) {
    document.querySelector('.find-btn').disabled = false;
  } else {
    document.querySelector('.find-btn').disabled = true;
    document.querySelector('.update-btn').disabled = true;
  }
});

$('.findBrand').on('keyup', function() {
  var input, filter, table, tr, td, i;
  input = $('.findBrand').val().toLowerCase();
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
    url: api + '/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val()
  }).done(function(data) {
    if (data && data.length > 0) {
      document.querySelector('.table-display').innerHTML = table_instance({
        data: data
      });
      document.querySelector('.update-btn').disabled = false;
      document.querySelector('.status').innerHTML = "";
    } else {
      document.querySelector('.status').innerHTML = '<div class="alert alert-danger warning">Item not found!</div>';
    }
  });
});


$('.update-btn').on('click', function() {
  $.ajax({
    type: 'POST',
    url: api + '/update/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val() + '/amount/' + $amount.val()
  }).done(function() {
    $.ajax({
      type: 'GET',
      url: api + '/brand/' + $brand.val().toLowerCase() + '/size/' + $size.val()
    }).done(function(data) {
      if (data && data.length > 0) {
        document.querySelector('.table-display').innerHTML = table_instance({
          data: data
        });
        document.querySelector('.update-btn').disabled = false;
        document.querySelector('.status').innerHTML = "";
      }
    }).done(function() {
      document.querySelector('.status').innerHTML = '<div class="alert alert-success success">Stock item successfully updated!</div>';
    });
  });
});
