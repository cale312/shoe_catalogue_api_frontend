'use strict'

$(function() {

  $('.collapsed').on('click', function() {
    $('.collapse').slideToggle();
  });

  // var input, filter, table, tr, td, i;
  // input = document.querySelector(".input");
  // filter = input.value.toLowerCase();
  // table = document.querySelector(".myTable");
  // tr = table.getElementsByTagName("tr");
  //
  // input.addEventListener('input', function() {
  //   console.log('type');
  //   // Loop through all table rows, and hide those who don't match the search query
  //   for (i = 0; i < tr.length; i++) {
  //     td = tr[i].getElementsByTagName("td");
  //     if (td) {
  //       if (td.innerHTML.toLowerCase().indexOf(filter) > -1) {
  //         tr[i].style.display = "";
  //       } else {
  //         tr[i].style.display = "none";
  //       }
  //     }
  //   }
  // });

  $.ajax({
    type: 'GET',
    url: 'http://localhost:4000/api/shoes',
    success: function(data) {
      filterShoes(data);
      console.log('data retrieved');
    },
    error: function() {
      alert('error loading the stock');
    }
  });


});
