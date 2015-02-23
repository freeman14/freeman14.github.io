Grid.filters.distance = (function(distance){
    var self = distance;

    self.slider = {};
    self.name = 'distance';
    self.eventLabel = 'filterDistance';
    self.active = false;
    self.GlobeWidth = 256;
    self.distMin = 0.1;
    self.distMax = 100;
    self.sliderMin = 0;
    self.sliderMax = 10;
    self.scale = (Math.log(self.distMax)-Math.log(self.distMin))/(self.sliderMax - self.sliderMin);

    self.zoom2lng = function(zoom, pixelWidth){
        if (!pixelWidth) {
            pixelWidth = 220;
        }

        return (pixelWidth * 360)/(self.GlobeWidth * Math.pow(2, zoom));
    };

    self.lng2zoom = function(lng, pixelWidth){
        if (!pixelWidth) {
            pixelWidth = 220;
        }

        return Math.round(Math.log(pixelWidth * 360 / lng / self.GlobeWidth) / Math.LN2);
    };

    self.lng2dist = function(lng){
        var lat = Grid.mapOption.lat * Math.PI / 180;
        lng *= Math.PI / 180;// toRadians()

        var arg = Math.sin(lat)*Math.sin(lat) + Math.cos(lat)*Math.cos(lat) * Math.cos(lng);
        arg = Math.min(1, arg);
        arg = Math.max(-1, arg);

        return Math.acos(arg) * 6371/2;
    };

    self.dist2lng = function(dist){
        dist *=2;
        var lat = Grid.mapOption.lat * Math.PI / 180;

        var arg = (Math.cos(dist/6371) - Math.sin(lat)*Math.sin(lat))/(Math.cos(lat)*Math.cos(lat));
        arg = Math.min(1, arg);
        arg = Math.max(-1, arg);

        var lng = Math.acos(arg);
        lng /= Math.PI / 180;// toGradus()

        return lng;
    };

    self.slider2dist = function(slider){
        return Math.exp(Math.log(self.distMin) + self.scale*(slider-self.sliderMin));
    };

    self.dist2slider = function(dist){
        return (Math.log(dist) - Math.log(self.distMin))/self.scale + self.sliderMin;
    };

    self.slider2zoom = function(sliderValue){
        return self.lng2zoom(self.dist2lng(self.slider2dist(sliderValue)));
    };

    self.zoom2slider = function(zoom){
        return self.dist2slider(self.lng2dist(self.lng2dist(zoom)));
    };

    //TODO add toLocalCur and hConf

    self.init = (function(){
        if(Grid.url.hash.distance){
            self.distance = Grid.url.hash.distance;
            self.active = true;
        } else{
            self.distance = self.slider2dist(self.sliderValue);
        }

        self.slider = new Slider('#distance-slider', {
            step: .1,
            min: 0,
            max: 10
        });

        //TODO add opportunity to set array of events

        self.slider.on('slide', function(value){
            Grid.mapModule.map.setZoom(self.slider2zoom(value));
        });

        self.slider.on('change', function(value){
            self.sliderValue = value;
            var dist = self.slider2dist(value);
            self.distance = dist > 2 ? Math.round(dist) : Math.round(dist*10)/10;
            self.active = true;
        });

    })();

    self.reset = function(){
        self.active = false;
    };

    return self;
})(Grid.filters.distance || {});
