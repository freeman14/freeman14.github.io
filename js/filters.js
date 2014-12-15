Grid.filters = (function(filters){

    var self = filters;

    var _filtersBtnOpen      = HS().sClass('header-logo'),
        _offCanvasMenu       = HS().sClass('off-canvas-menu'),
        _offCanvasMenuMask   = HS().sClass('off-canvas-menu_mask'),
        _filtersCnt          = HS().sClass('filters'),
        _filtersBtnClose     = HS().sClass('filters-btn-close');


    self.filtersOpenStatus = false;

    _filtersBtnOpen.button(function(e){
        e.preventDefault();
        self.openFilterMenu();
    });

    _filtersBtnClose.button(function(e){
        e.preventDefault();
        self.closeFilterMenu();
    });

    _offCanvasMenuMask.button(function(e){
        e.preventDefault();
        self.closeFilterMenu();
    });

    self.openFilterMenu = function(){
        if(Grid.resizeChange){
            self.setFilterMenuWidth();
            Grid.resizeChange = false;
        }

        _offCanvasMenu.addClass('open');
        Grid.layout.addClass('hidden');
        self.filtersOpenStatus = true;
    };

    self.closeFilterMenu = function(){
        _offCanvasMenu.removeClass('open');
        Grid.layout.removeClass('hidden');
        self.filtersOpenStatus = false;
    };

    self.setFilterMenuWidth = function(){
        var width = HS().findOne('.hotel').css('width');
        _filtersCnt.css({
            width : width,
            left  : '-' + width
        });
    };

    HS.addEvent(window, 'resize', function(){
        self.closeFilterMenu();
        Grid.resizeChange = true;

        setTimeout(function(){
            self.setFilterMenuWidth();
        }, 1000);
    });

    HS.ready(function(){
        self.setFilterMenuWidth();
    });

    return self;
})(Grid.filters || {});