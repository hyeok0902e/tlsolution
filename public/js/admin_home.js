$(function () {
    var nowurl = $(location).attr('href');

    if(nowurl.indexOf('admin') != -1){
        $('header').css('display','none');
        $('footer').css('display','none');
        $('.container').css('display','none');
        $('.admin').css('display','flex');
    };

    if(nowurl.indexOf('/admin_home') != -1){
        
    };


    
});