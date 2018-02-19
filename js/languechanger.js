//$('.lang-menu').width($('.lang-menu ul li:first-child').width()+12);

$(document).on("click",'.lang-menu a',function(){
   $(this).parents('.lang-menu').toggleClass("open");
   var clickedId = $(this).attr("id");
   var activeId = $('.lang-menu li:first-child a').attr("id");
   var first = $('.lang-menu li:first-child').html();
   var currentLi = $('.lang-menu a[id$="'+clickedId+'"]').closest("li");

   var current = currentLi.html();
  if(clickedId == activeId) {
     return false;
     }
   else{
     $('.lang-menu').each(function(){
            $(this).find('li:first-child').html(current);
     });
   currentLi.each(function(){
      $(this).html(first);
    });
   var currentHref = $('.lang-menu li:first-child a').attr("href");
    location.href = currentHref; //  переход на другой язык
   }
return false;
});
