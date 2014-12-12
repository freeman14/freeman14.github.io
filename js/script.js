var filtersBtn      =  HS().sClass('header-logo'),
    layout          =  HS().sClass('layout'),
    offCanvasMenu   =  HS().sClass('off-canvas-menu');

var filtersMenuOpen = false;
filtersBtn.button(function(e){
    e.preventDefault();
    if(filtersMenuOpen){
        layout.removeClass('menu-open');
        offCanvasMenu.removeClass('menu-open').css('width', '');
        Velocity(HS().sClass('layout'), { left: 0 });
        filtersMenuOpen = false;
    } else {
        var hotelPanelWidth = HS().findOne('.hotel').css('width');
        console.log(hotelPanelWidth);
        layout.addClass('menu-open');
        offCanvasMenu.css('width', hotelPanelWidth).addClass('menu-open');
        Velocity(HS().sClass('layout'), { left: hotelPanelWidth });
        filtersMenuOpen = true;
    }
});