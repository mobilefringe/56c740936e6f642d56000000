/*Created 2015-02-28 by CodeCloud Team*/

function init(e){
    $('.open_menu').click(function(e){
        $('body').addClass('no_scroll');
        $('.mobile_menu_container').fadeIn();
    });
    $('#close_menu').click(function(e){
        $('body').removeClass('no_scroll');
        $('.mobile_menu_container').fadeIn();
    });
    
}