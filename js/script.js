$(document).ready(function() {

$('a[disabled]').bind("click",function(){
    return false;
});

    $(window).scroll(function() {
    });
    $(window).resize(function() {
    });

var sliderHome = $('.home .slider');

sliderHome.slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  centerMode: false,
  variableWidth: false
});


$(function() {
    var activeAccordian = null;
    var $accordions = $(".faqardion").on('click', function() {
        activeAccordian = this;
    }).accordion({
        collapsible: true,
        active: false,
        icons: true
    }).on('accordionchange', function(event, ui) {
        $accordions.not(activeAccordian).accordion('activate', false);
    });
});

$('.constructormokap .slider2').slick({
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  centerMode: true,
  variableWidth: false
});



  var date = $('#countdown').data("date");
  if(date){
  var dateArr = date.split('.')
  var day = dateArr[0];
  var month = dateArr[1];
  var year = dateArr[2];



    var labels = [$('#countdown').data("days"), $('#countdown').data("hours"), $('#countdown').data("minutes"), $('#countdown').data("seconds")],
      toDate = new Date(year,month-1,day),
      template = _.template($('#countdown-template').html()),
      currDate = '00:00:00:00',
      nextDate = '00:00:00:00',
      parser = /([0-9]{2})/gi,
      $example = $('#countdown');

    // Parse countdown string to an object
    function strfobj(str) {
      var parsed = str.match(parser),
        obj = {};
      labels.forEach(function(label, i) {
        obj[label] = parsed[i]
      });
      return obj;
    }

    // Return the time components that diffs
    function diff(obj1, obj2) {
      var diff = [];
      labels.forEach(function(key) {
        if (obj1[key] !== obj2[key]) {
          diff.push(key);
        }
      });
      return diff;
    }
    // Build the layout
    var initData = strfobj(currDate);
    labels.forEach(function(label, i) {
      $example.append(template({
        curr: initData[label],
        next: initData[label],
        label: label
      }));
    });
    // Starts the countdown
    $example.countdown(toDate, function(event) {
      var newDate = event.strftime('%D:%H:%M:%S'),
        data;
      if (newDate !== nextDate) {
        currDate = nextDate;
        nextDate = newDate;
        // Setup the data
        data = {
          'curr': strfobj(currDate),
          'next': strfobj(nextDate)
        };
        // Apply the new values to each node that changed
        diff(data.curr, data.next).forEach(function(label) {
          var selector = '.%s'.replace(/%s/, label),
              $node = $example.find(selector);
          // Update the node
          $node.removeClass('flip');
          $node.find('.curr').text(data.curr[label]);
          $node.find('.next').text(data.next[label]);
          // Wait for a repaint to then flip
          _.delay(function($node) {
            $node.addClass('flip');
          }, 50, $node);
        });
      }
    });
}

/* Page scrollTo
  -----------------------------------------------------------------------------*/
  var menuHeight = $('header nav').height() - 76,
    targetBlock;

   $('header nav a').on('click', function () {
    var target         = $(this);
    var targetBlock;
      if(!$(this).attr('href') || $(this).attr('href').substring(0,1) != "#") return true;

    targetBlock = $(this).attr('href').substring(1, $(this).attr('href').length);

    if($('.menu-mobile').is(':visible') && $('body').hasClass("menu-open")){
        $('body').removeClass("menu-open");
    }

    $('header nav a').removeClass('active');
    $.scrollTo($('section.' + targetBlock), 1200, {
      easing:  'easeInOutQuart',
      offset: -(menuHeight),
      onAfter: function() {
        setTimeout(function() {
            window.location.hash = targetBlock;
          }, 100);
      }
    });

    return false
  });

  // Set sections positions
  var sectionsPos = $('section'),
    sectionsArr = $.makeArray(sectionsPos);

  // scrollTo if "hash" in url
  if (window.location.hash) {
    targetBlock = window.location.hash.substring(1, window.location.hash.length);
    setTimeout(function() {
      $.scrollTo($('section.' + targetBlock), 1200, {
        easing:  'easeInOutQuart',
        offset: -(menuHeight-20)
      });
    }, 300);
  }

  /* Window scroll actions
  -----------------------------------------------------------------------------*/

  var sectionsPosScroll = $('section'),
    sectionsArrScroll = $.makeArray(sectionsPosScroll);

  $(window).scroll(function () {
    var targetBlock;
    windowMarginTop = $(this).scrollTop();

    //Set item active in main menu
    var j = 0;
    for (var i = 0; i < sectionsArrScroll.length; i++) {
      var itemMarginTop = $(sectionsArrScroll[i]).offset().top - 100;

      if ((windowMarginTop + menuHeight) >= itemMarginTop) j = i;
      if (j >= 0) {
        var classList = $(sectionsArrScroll[j]).attr('class').split(/\s+/);
        var targetBlock = classList[0];
        $('header nav a').removeClass('active');
        $('header nav a[href$="'+targetBlock+'"]').addClass('active');
        }
      else $('header nav a').removeClass('active');
    };
  });

  /**************** выезд главного меню при скролле *******************/

      var wasAnimate = false;
      var wasAnimateM = false;
      var wasUnlock = false;
      var offset = parseInt($('header').outerHeight() - $('header nav').outerHeight()  + 180);
      var offsetM = parseInt($('.logo-large').outerHeight()) +40;

      var place = function(){
      var dy = $(window).scrollTop();

      if(!$('.menu-mobile').is(':visible')){
        if (dy > offset){
          if(wasAnimate == false){
            setTimeout(function(){
              $('.intro').animate({"top": "0"},500,function(){
                 $('body').addClass('fixedHeader');
              });
               $('section,footer').animate({"top": "145px"},500);
            },30);
                wasAnimate = true;
          }
        }
        else{
          if(wasAnimate == true){
            $('body').removeClass('fixedHeader');

            $('.intro,section,footer').animate({"top": "0"},500);
           // $('section.home').animate({"margin-top": "-90px","margin-bottom":"-90px"},500);
               wasAnimate = false;
        }
      }
    }

    else{

       if (dy > offsetM){
          if(wasAnimateM == false){
            setTimeout(function(){
            $('body').addClass('fixedHeaderMobile');
              $('.menu-mobile').css({"top": "20px"});
            },30);
                wasAnimateM = true;
          }
        }
        else{
          if(wasAnimateM == true){
            $('body').removeClass('fixedHeaderMobile');
               wasAnimateM = false;
        }
      }

    }
    };
  place();

  $(window).scroll(function(){
        place();
    });


    //$('.lang-menu').width($('.lang-menu ul li:first-child').width()+12);

    $(document).on("click",'.lang-menu a',function(){
      $(this).toggleClass('open');
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


/* points scroll*/
var a = 0;
var b;
var innerlen;
$('.points .item').css({"top":"100px","opacity":0});
var itemlen = $('.points .item').length;
$(window).scroll(function() {
if($('.points').length){
  var oTop = $('.points').offset().top - $(window).innerHeight();
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.points .item').each(function(i) {
      b = 0;
      var oTopEach = $(this).find('.icon').offset().top - $(window).innerHeight();
          if (b == 0 && $(window).scrollTop() > oTopEach){
              var item = $(this);
            setTimeout(function(){
                item.animate({"top": 0,"opacity":1},800);
            },80*(i+1));

            b = 1;
           innerlen = i;
           }
    });
     if(innerlen == itemlen-1) a = 1;
  }
}
});



/* keyproblems scroll*/
var a1 = 0;
var b1;
var innerlen1;
$('.keyproblem .item').css({"top":"100px","opacity":0});
var itemlen1 = $('.keyproblem .item').length;
$(window).scroll(function() {
if($('.keyproblem').length){
  var oTop = $('.keyproblem').offset().top - $(window).innerHeight();
  if (a1 == 0 && $(window).scrollTop() > oTop) {
    $('.keyproblem .item').each(function(i) {
      b1 = 0;
      var oTopEach1 = $(this).find('h3').offset().top - $(window).innerHeight();
          if (b1 == 0 && $(window).scrollTop() > oTopEach1){
              var item = $(this);
            setTimeout(function(){
                item.animate({"top": 0,"opacity":1},800);
            },180*(i+1));

            b1 = 1;
           innerlen1 = i;
           }
    });
     if(innerlen1 == itemlen1-1) a1 = 1;
  }
}
});



/* platform scroll*/
var a2 = 0;
var b2;
var innerlen2;
$('.platform .item').css({"top":"100px","opacity":0});
var itemlen2 = $('.platform .item').length;
$(window).scroll(function() {
if($('.platform').length){
  var oTop = $('.platform').offset().top - $(window).innerHeight();
  if (a2 == 0 && $(window).scrollTop() > oTop) {
    $('.platform .item').each(function(i) {
      b2 = 0;
      var oTopEach2 = $(this).find('h3').offset().top - $(window).innerHeight();
          if (b2 == 0 && $(window).scrollTop() > oTopEach2){
              var item = $(this);
            setTimeout(function(){
                item.animate({"top": 0,"opacity":1},800);
            },180*(i+1));

            b2 = 1;
           innerlen2 = i;
           }
    });
     if(innerlen2 == itemlen2-1) a2 = 1;
  }
}
});



/* fivesteps scroll*/
var a3 = 0;
var b3;
var innerlen3;
$('.fivesteps .step').css({"opacity":0});
var itemlen3 = $('.fivesteps .item').length;
$(window).scroll(function() {
if($('.fivesteps').length){
  var oTop = $('.fivesteps').offset().top - $(window).innerHeight();
  if (a3 == 0 && $(window).scrollTop() > oTop) {
    $('.fivesteps .step').each(function(i) {
      b3 = 0;
      var oTopEach3 = $(this).find('.icon').offset().top - $(window).innerHeight();
          if (b3 == 0 && $(window).scrollTop() > oTopEach3){
              var item = $(this);
            setTimeout(function(){
                item.animate({"opacity":1},800);
            },180*(i+1));

            b3 = 1;
           innerlen3 = i;
           }
    });
     if(innerlen3 == itemlen3-1) a2 = 1;
  }
}
});



/* profits scroll*/
var a4 = 0;
var b4;
var innerlen4;
$('.profits .item').css({"top":"100px","opacity":0});
var itemlen4 = $('.profits .item').length;
$(window).scroll(function() {
if($('.profits').length){
  var oTop = $('.profits').offset().top - $(window).innerHeight();
  if (a4 == 0 && $(window).scrollTop() > oTop) {
    $('.profits .item').each(function(i) {
      b4 = 0;
      var oTopEach4 = $(this).find('.icon').offset().top - $(window).innerHeight();
          if (b4 == 0 && $(window).scrollTop() > oTopEach4){
              var item = $(this);
            setTimeout(function(){
                item.animate({"top": 0,"opacity":1},800);
            },180*(i+1));

            b4 = 1;
           innerlen4 = i;
           }
    });
     if(innerlen4 == itemlen4-1) a4 = 1;
  }
}
});


/* cases scroll*/
var a5 = 0;
var b5;
var innerlen5;
$('.cases .item .text').css({"top":"100px","opacity":0});
$('.cases .item .img').css({"opacity":0});

var itemlen5 = $('.cases .item').length;
$(window).scroll(function() {
if($('.cases').length){
  var oTop = $('.cases').offset().top - $(window).innerHeight();
  if (a5 == 0 && $(window).scrollTop() > oTop) {
    $('.cases .item').each(function(i) {
      b5 = 0;
      var oTopEach5 = $(this).find('img').offset().top - $(window).innerHeight();
          if (b5 == 0 && $(window).scrollTop() > oTopEach5){
              var item = $(this);
            setTimeout(function(){
                item.find('.img').animate({"opacity":1},800);
            },180*(i+1));

            setTimeout(function(){
                item.find('.text').animate({"top": 0,"opacity":1},800);
            },189*(i+1));


            b5 = 1;
           innerlen5 = i;
           }
    });
     if(innerlen5 == itemlen5-1) a5 = 1;
  }
}
});



/* news scroll*/
var a6 = 0;
var b6;
var innerlen6;
$('.news .item').css({"top":"100px","opacity":0});
var itemlen6 = $('.news .item').length;
$(window).scroll(function() {
if($('.news').length){
  var oTop = $('.news').offset().top - $(window).innerHeight();
  if (a6 == 0 && $(window).scrollTop() > oTop) {
    $('.news .item').each(function(i) {
      b6 = 0;
      var oTopEach6 = $(this).find('h3').offset().top - $(window).innerHeight();
          if (b6 == 0 && $(window).scrollTop() > oTopEach6){
              var item = $(this);
            setTimeout(function(){
                item.animate({"top": 0,"opacity":1},800);
            },180*(i+1));

            b6 = 1;
           innerlen6 = i;
           }
    });
     if(innerlen6 == itemlen6-1) a6 = 1;
  }
}
});



/* presscentre scroll*/
var a7 = 0;
var b7;
var innerlen7;
$('.presscentre .item').css({"top":"100px","opacity":0});
var itemlen7 = $('.news .item').length;
$(window).scroll(function() {
if($('.presscentre').length){
  var oTop = $('.presscentre').offset().top - $(window).innerHeight();
  if (a7 == 0 && $(window).scrollTop() > oTop) {
    $('.presscentre .item').each(function(i) {
      b7 = 0;
      var oTopEach7 = $(this).find('h3').offset().top - $(window).innerHeight();
          if (b7 == 0 && $(window).scrollTop() > oTopEach7){
              var item = $(this);
            setTimeout(function(){
                item.animate({"top": 0,"opacity":1},800);
            },180*(i+1));

            b7 = 1;
           innerlen7 = i;
           }
    });
     if(innerlen7 == itemlen7-1) a7 = 1;
  }
}
});


/* team scroll*/
var a8 = 0;
var b8;
var innerlen8;
$('.team .item').css({"top":"100px","opacity":0});
var itemlen8 = $('.team .item').length;
$(window).scroll(function() {
if($('.team').length){
  var oTop = $('.team').offset().top - $(window).innerHeight();
  if (a8 == 0 && $(window).scrollTop() > oTop) {
    $('.team .item').each(function(i) {
      b8 = 0;
      var oTopEach8 = $(this).find('h3').offset().top - $(window).innerHeight();
          if (b8 == 0 && $(window).scrollTop() > oTopEach8){
              var item = $(this);
            setTimeout(function(){
                item.animate({"top": 0,"opacity":1},800);
            },80*(i+1));

            b8 = 1;
           innerlen8 = i;
           }
    });
     if(innerlen8 == itemlen8-1) a8 = 1;
  }
}
});

/*
Highcharts.chart('pie-container-1', {
  colors: ['#1b215c', '#996666', '#e6e8f0', '#e30613', '#aaeeee',
      '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: '1',
            y: 56.33
        }, {
            name: '2',
            y: 24.03,
            sliced: true,
            selected: true
        }, {
            name: '3',
            y: 10.38
        }, {
            name: '4',
            y: 4.77
        }, {
            name: '5',
            y: 0.91
        }, {
            name: '6',
            y: 0.2
        }]
    }]
});

Highcharts.chart('pie-container-2', {
 colors: ['#1b215c', '#996666', '#e6e8f0', '#e30613', '#aaeeee',
      '#ff0066', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: ''
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                    color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                }
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'team',
            y: 26.33
        }, {
            name: 'grail',
            y: 44.03,
            sliced: true,
            selected: true
        }, {
            name: 'token',
            y: 20.38
        }, {
            name: 'bitcoin',
            y: 4.77
        }, {
            name: 'world',
            y: 0.91
        }, {
            name: 'Other',
            y: 0.2
        }]
    }]
});

*/
$('body').on("scroll", function(e) {
if (this.scrollTop > 147) {
  $('.nav').addClass("fixback");
} else {
  $('.nav').removeClass("fixback");
}
});

$('#menuBurger').click(function(){
  $('body').toggleClass('open');
  $('body').toggleClass('menu-open');
})
$('#closeMenu').click(function(){
  $('body').removeClass('open');
})


// hSince - Hours

moment.locale('ru');

var now = moment();

var hSince;
var bonusOneGone = moment('2018-03-07T12:00:00');
var bonusTwoGone = moment('2018-03-17T12:00:00');
var bonusThreeGone = moment('2018-03-27T12:00:00');
var currentBonus;
var bonusPercent;
checker = 0;

if((bonusOneGone.diff(now, 'days') >= 0) && (bonusOneGone.diff(now, 'days') < 10)){
  currentBonus = $('.firstBonusLeft');
  currentEngBonus = $('.firstEngBonusLeft');
  hSince = (bonusOneGone.diff(now, 'days')+1).toString();
  bonusPercent = 25;
  daysleftPercent = (5*hSince);
  $('.bonuses .firstBonus').width(daysleftPercent + '%');
  checker = 1;
}
if((bonusTwoGone.diff(now, 'days') >= 0) && (bonusTwoGone.diff(now, 'days') < 10)){
    $('.firstBonus').hide();
    currentBonus = $('.secondBonusLeft');
    currentEngBonus = $('.secondEngBonusLeft');
    hSince = (bonusTwoGone.diff(now, 'days')+1).toString();
    bonusPercent = 20;
    daysleftPercent = (5*hSince);
    $('.bonuses .secondBonus').width(daysleftPercent + '%');
    checker = 1;
}
if((bonusThreeGone.diff(now, 'days') >= 0) && (bonusThreeGone.diff(now, 'days') < 10)){
    $('.firstBonus').hide();
    $('.secondBonus').hide();
    currentBonus = $('.thirdBonusLeft');
    currentEngBonus = $('.thirdEngBonusLeft');
    hSince = (bonusThreeGone.diff(now, 'days')+1).toString();
    bonusPercent = 15;
    daysleftPercent = (5*hSince);
    $('.bonuses .thirdBonus').width(daysleftPercent + '%');
    checker = 1;
}
if(checker == 0){
  bonusPercent = 0;
  $('.bonuses').hide();
  $('.bonusLefter').hide();
}

var hword;
var dword;

if(hSince){
  if((hSince.substr(hSince.length-1,1)) == 1 ){
    hword = ' час';
  }
  if((hSince.substr(hSince.length-1,1)) > 1 && (hSince.substr(hSince.length-1,1)) < 5 ){
    hword = ' часa';
  }
  if((hSince.substr(hSince.length-1,1)) > 4 || (hSince.substr(hSince.length-1,1)) == 0 ){
    hword = ' часов';
  }

  if((hSince.substr(hSince.length-1,1)) == 1 ){
    dword = ' день';
    edword = ' day';
  }
  if((hSince.substr(hSince.length-1,1)) > 1 && (hSince.substr(hSince.length-1,1)) < 5 ){
    dword = ' дня';
  }
  if((hSince.substr(hSince.length-1,1)) > 4 || (hSince.substr(hSince.length-1,1)) == 0 ){
    dword = ' дней';
  }

  if((hSince.substr(hSince.length-1,1)) == 1 ){
    edword = ' day';
  } else {
    edword = ' days';
  }
  $('#daysLeft').text(hSince + dword);
  $('#edaysLeft').text(hSince + edword);
  currentBonus.text(hSince + dword);
  currentEngBonus.text(hSince + edword);

  $('.bonusPercent').text(bonusPercent+'%');
  $('#extraBonus').text(' (starting from $10 000 - ' + (parseInt(bonusPercent)+5) +'%)')
  function showBonuses(){
    $('.firstBonus, .secondBonus, .thirdBonus').css('opacity', '1');
  }

  setTimeout(showBonuses, 1500);
}

    function processText(text = '', callback = function () { return true }) {
        $.ajax({
            url: 'https://api.graphgrail.com/ner/v1',
            method: "POST",
            dataType: "json",
            data: {
                'message': text,
            },
            success: function (data, status, jqXHR) {
                callback(data);
            },
            error: function (error) {
                callback(error);
            }
        });

    };

    $('#botFormActivation').click(function(){
        let textInputValue = $('#botFormTextInput').val();
        if (textInputValue.trim() !== '') {
          $('.processBlocker').css('display', 'flex');
          processText(textInputValue, processTextCallback);
        } else {
          $('.processedText').html('<p class="botError">Enter some text, please</p>');
        }
    });

    function processTextCallback(data){
        if(data && !data.error) {
            let finalResult = [];
            let finalResult2 = [];

            let responce = data.ner_result;

            responceLength = responce.length;
            for (let i = 0; i < responceLength; i++) {
                for (let i2 = 0; i2 < (responce[i].length); i2++) {
                    let responceBlock = responce[i][i2];
                    let cloudInfo = '';
                      let cloudInfoText = '';
                      let cloudInfoColor = '';
                      if (responce[i][i2][1] === 'I-ORG') {
                          cloudInfoText = 'Organisation';
                          cloudInfoColor = 'Green';
                      } else if (responce[i][i2][1] === 'I-PER') {
                          cloudInfoText = 'Person';
                          cloudInfoColor = 'Blue';
                      } else if (responce[i][i2][1] === 'I-LOC') {
                          cloudInfoText = 'Location';
                          cloudInfoColor = 'Red';
                      } else {
                          cloudInfoText = 'Text';
                      }
                      cloudInfo = '<div class="responceCloudInfo">' + cloudInfoText + '</div>';
                    finalResult2 += '<div class="bot_sentence2"><div class="bot_sentence2Text ' + cloudInfoColor + '">' + responce[i][i2][0] + cloudInfo +'</div></div>';
                }
                finalResult = '<div class="bot_sentence">' + finalResult2 + '</div>';
            }

            $('.processedText').html(finalResult);
            $('.processBlocker').css('display', 'none');
        } else {
            $('.processBlocker').css('display', 'none');
            $('.processedText').html('<p class="botError">An unexpected error occurred. Check if the data entered correctly. Supported languages: English, Russian</p>');
        }
    };
  });
