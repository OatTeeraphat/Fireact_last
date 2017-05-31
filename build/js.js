$(document).foundation();

$(window).scroll(function() {
      var scroll = $(window).scrollTop();
      if (scroll >= 70) {
          $(".title-bar").addClass("nav-fix");
      }
      else{
         $(".title-bar").removeClass("nav-fix");
      }
})


