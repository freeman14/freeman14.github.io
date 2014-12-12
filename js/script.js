var filtersBtn      =  HS().sClass('header-logo'),
    layout          =  HS().sClass('layout'),
    offCanvasMenu   =  HS().sClass('off-canvas-menu');

var filtersMenuOpen = false;
filtersBtn.button(function(){
    var self = this.hsobj;
    if(filtersMenuOpen){
        layout.removeClass('menu-open').css('left', '');
        offCanvasMenu.removeClass('menu-open').css('left', '');
        filtersMenuOpen = false;
    } else {
        var hotelPanelWidth = HS().sClass('search-results').css('width') / 2;
        layout.addClass('menu-open').css('left', hotelPanelWidth+'px');
        offCanvasMenu.css('width', hotelPanelWidth+'px').addClass('menu-open');
        filtersMenuOpen = true;
    }
});