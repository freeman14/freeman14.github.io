Grid.hotelModule = (function(hotel){
    var self = hotel;

    var _hotels         = HS().sClass('hotel'),
        _oneHotelCnt    = HS().sClass('hotel-open');

    self.openHotelStatus = false;

    _hotels.button(function(e){
        e.preventDefault();
        if(!self.openHotelStatus){
            self.openHotel();
        } else{
            self.closeHotel();
        }
    });

    _oneHotelCnt.button(function(e){
        e.preventDefault();
        self.closeHotel();
    });

    self.openHotel = function(){
        _oneHotelCnt.addClass('open');
        Grid.layout.addClass('hidden');
        self.openHotelStatus = true;
    };

    self.closeHotel = function(){
        _oneHotelCnt.removeClass('open');
        Grid.layout.removeClass('hidden');
        self.openHotelStatus = false;
    };

    self.setOpenHotelWidth = function(){
        var width = parseFloat(HS().findOne('.hotel').css('width')) + 20;
        _oneHotelCnt.css({
            width : width + 'px'
        });
    };

    HS.addEvent(window, 'resize', function(){
        self.setOpenHotelWidth();
    });

    HS.addEvent(window, 'keyup', function(e){
        self.closeHotel();
    });

    HS.ready(function(){
        self.setOpenHotelWidth();
    });

    return self;
})(Grid.hotelModule || {});
