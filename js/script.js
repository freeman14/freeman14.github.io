var filtersBtn      =  HS().sClass('header-logo'),
    layout          =  HS().sClass('layout'),
    offCanvasMenu   =  HS().sClass('off-canvas-menu'),
    offCanvasMenuMask = HS().sClass('off-canvas-menu_mask');

var filtersMenuOpen = false;

filtersBtn.button(function(e){
    e.preventDefault();
    if(filtersMenuOpen){
        offCanvasMenu.removeClass('open');
        filtersMenuOpen = false;
    } else {
        offCanvasMenu.addClass('open');
        filtersMenuOpen = true;
    }
});

offCanvasMenuMask.button(function(e){
    e.preventDefault();
    offCanvasMenu.removeClass('open');
    filtersMenuOpen = false;
});