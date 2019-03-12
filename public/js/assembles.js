$(function () {
  $('.box_01').click(function(){
    $this = $(this);
    
    var type = $this.find('.temp_type').text();
    var title = $this.find('.temp_title').text();
    var text = " [ "+type +" ] "+ title;
    var jsviewchk = $('.js_view_check').text();
    var attrfor = $this.attr('for');
    var classname = attrfor.substring(0,6);
    var classnumber = attrfor.substring(7);
    var wwidth = $(window).width();

    if(jsviewchk.indexOf(text) != -1){ // 누른것이 중복일 경우
        if(attrfor.indexOf('r') != -1){ // 누른것이 라디오 버튼일 경우
            $('.'+classname).remove();
            $('.js_view_check').append("<p class='"+classname+" "+classnumber+"'>"+text+"</p>");
        }
        else{
            $('.'+classnumber).remove();
        }
    }
    else{
        if(attrfor.indexOf('r') != -1){ // 누른것이 라디오 버튼일 경우{
            $('.'+classname).remove();
            $('.js_view_check').append("<p class='"+classname+" "+classnumber+"'>"+text+"</p>");
        }
        else{
            $('.js_view_check').append("<p class='"+classname+" "+classnumber+"'>"+text+"</p>");
        }
    }

    $('.temp_text03').fadeOut(150);

    $('.js_write').fadeIn(150);
    $('.btn_02_block').css('display','none');

    if(wwidth < 750){
        $('.price_shortbox').slideUp(150).slideDown(150);
    }

  });
  
  $('.js_write').click(function(e){
    var choice_info = $('.js_view_check').html();
    
    $('.price_box .js_view_check p').each(function(){
      console.log("<input name"+$(this).text()+"></input>");
    });

    $('.send_box').slideDown(250);
    $('.blind_black').fadeIn(250);
      console.log("실행");
  });

  $('.blind_black, .js_back').click(function(){
    var wwidth = $(window).width();

    if(wwidth < 750){
        $('.send_box').slideUp(250);
        $('.price_flex').slideUp(250);
        $('.blind_black').fadeOut(250);
        $('.price_shortbox').slideDown(250);
    }
    else{
        $('.send_box').slideUp(250);
        $('.blind_black').fadeOut(250);
    }
  });

  $('.price_shortbox').click(function(){
    $('.price_flex').slideDown(250);
    $('.temp_price_blind').fadeIn(250);
    $('.price_shortbox').slideUp(250);
  });


  
});