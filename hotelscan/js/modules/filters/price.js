Grid.filters.price = (function(price){
    var self = price;

    self.name = 'price';
    self.active = false;
    self.minPrice = 0;
    self.maxPrice = 10;
    self.slider = {};

    //TODO add toLocalCur and hConf

    self.init = (function(){
        if ((Grid.url.hash.minPrice || Grid.url.hash.maxPrice) && !(Grid.url.hash.minPrice == '0' && Grid.url.hash.maxPrice == '0')) {
            self.minPrice = Grid.url.hash.minPrice;
            self.maxPrice = Grid.url.hash.maxPrice;
            self.active = true;
        }

        self.slider = new Slider('#price-slider', {
            min : 0,
            max : 10,
            range: true
        });

    })();

    self.reset = function(){
        self.active = false;
    };

    return self;
})(Grid.filters.price || {});