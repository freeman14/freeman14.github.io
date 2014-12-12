var filtersBtn      =  HS().sClass('header-logo'),
    layout          =  HS().sClass('layout'),
    offCanvasMenu   =  HS().sClass('off-canvas-menu');

var filtersMenuOpen = false;
filtersBtn.button(function(e){
    e.preventDefault();
    if(filtersMenuOpen){
        Velocity(HS().sClass('layout'), { left: 0 }, { duration: 100 });
        offCanvasMenu.removeClass('menu-open').css('width', '');
        filtersMenuOpen = false;

    } else {
        var hotelPanelWidth = HS().findOne('.hotel').css('width');
        console.log(hotelPanelWidth);
        //layout.addClass('menu-open');
        offCanvasMenu.addClass('menu-open').css('width', hotelPanelWidth);
        Velocity(HS().sClass('layout'), { left: hotelPanelWidth }, { duration: 100 });
        filtersMenuOpen = true;
    }
});