(function(){
  'use strict';

  $(document).ready(function(){
    $('#addresses').on('click', '.delete.btn.btn-danger', delAddress);
  });

  function delAddress(){
    var id = $(this).closest('.address').attr('data-address-id'),
      type = 'delete',
      url  = '/addresses/' + id;

    $.ajax({url:url, type:type, dataType:'json', success:function(data){
      var $address = $('.address[data-address-id='+data.id+']');
      $address.fadeOut();

      setTimeout(function(){$address.remove();}, 2000);
    }});
  }


})();

