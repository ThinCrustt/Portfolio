let $navSection = $('#navigation');
let $homeBtn = $('#view-button');
var lastPos = 0;
var isMobile = window.innerWidth < 768;

//resize event
$(window).on('resize', function(){
  isMobile =  window.innerWidth < 768;
  scrollEvt();
  
  //mobile navbar
  if(isMobile){
    $(".nav-bar-toggle").click(function(){
        $('.nav-bar-menu.wrap').toggleClass('visible');
    })
  }
});

//animated navigation
$('.page-link').click(
    function(){ 
        var anchor = $(this).attr('dest'); 
        $('.nav-bar-menu.wrap').removeClass('visible');
        $('html, body').animate(
        {
          scrollTop: $('#' + anchor).offset().top 
        },
        700
    );
    if(!isMobile)
      $navSection.addClass("sticky");
    else
      $navSection.removeClass("sticky");
});

//highlight nav links
function highlightLink(anchor) {
    $('nav .active').removeClass('active');
    $('nav')
      .find('[dest="' + anchor + '"]')
      .addClass('active');
  }

//scroll event
$(window).on('scroll', function() {
  scrollEvt();
});

function scrollEvt(){
  var navPos = $navSection.position().top;
  var aboutPos = $('#about').position().top;
  var pos = $(window).scrollTop();
  var pos2 = pos + $navSection.height();

  if (!isMobile) {
    if (pos >= navPos + $navSection.height() && lastPos < pos) {
      $navSection.addClass('sticky');
    }
    if (pos < aboutPos && lastPos > pos) {
      $navSection.removeClass('sticky');
    }
    lastPos = pos;
  }
  //link highlighting
  if (pos2 > $('#home').offset().top) {
      highlightLink('home');
  }
  if (pos2 > $('#about').offset().top) {
      highlightLink('about');
  }
  if (pos2 > $('#resume').offset().top) {
      highlightLink('resume');
  }
  if (pos2 > $('#projects').offset().top) {
      highlightLink('projects');
  }
  if (pos2 > $('#contact').offset().top || pos + $(window).height() === $(document).height()) {
      highlightLink('contact');
  }
}
