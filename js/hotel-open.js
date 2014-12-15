Grid.hotel = (function(hotel){
    var self = hotel;

    var _hotels         = HS().sClass('hotel'),
        _oneHotelCnt    = HS().sClass('hotel-open');

    console.log(_hotels);

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
        self.openHotelStatus = true;
    };

    self.closeHotel = function(){
        _oneHotelCnt.removeClass('open');
        self.openHotelStatus = false;
    };

    self.setOpenHotelWidth = function(){
        var width = HS().findOne('.hotel').css('width');
        var left  = HS().sClass('search-results').css('width');
        _oneHotelCnt.css({
            width : width,
            left  : left
        });
    };

    HS.addEvent(window, 'resize', function(){
        self.closeHotel();

        setTimeout(function(){
            self.setOpenHotelWidth();
        }, 1000)
    });

    HS.ready(function(){
        self.setOpenHotelWidth();
    });

    return self;
})(Grid.hotel || {});
