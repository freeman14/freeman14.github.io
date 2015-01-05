Grid.mapModule = (function(map){
    var self = map;

    self.options = {
        latLng: {
            lat: 40.7567,
            lng: -73.9865
        },
        zoom: 9
    };

    self.init = function(){
        var properties = {
            zoom                : self.options.zoom,
            panControl          : false,
            scaleControl        : false,
            streetViewControl   : false,
            mapTypeControl      : false,
            zoomControl         : true,
            zoomControlOptions  : {
                style: google.maps.ZoomControlStyle.SMALL,
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            },
            //center              : new google.maps.LatLng(self.options.latLng.lat , self.options.latLng.lng),
            center              : new google.maps.LatLng(self.options.latLng.lat , self.options.latLng.lng),
            minZoom             : 8,
            maxZoom             : 18,
            styles              : [{
                featureType: "poi",
                stylers: [
                    {
                        visibility: "off"
                    }
                ]
            }]
        };

        //Map init

        try{
            self.map = new google.maps.Map(document.getElementById('map'), properties);
        } catch(e){
            throw new Error('Could not initialize map: ' + e.message);
        }

        self.addMarkers(hotels);

        self.getCurrentCenter();

        //
        HS.addEvent(window, 'resize', function() {
            self.setCurrentCenter();
        });
    };

    self.addMarkers = function(hotels){
        var count = 0;
        for(var i=0;i<hotels.length;i++) {
            count++;
            var hotel = hotels[i];

            if(count > 20){
                var icon = new google.maps.MarkerImage('img/map/marker-mini.png', null, null, null, new google.maps.Size(10, 10));
            } else{
                var icon = new google.maps.MarkerImage('img/map/marker.png', null, null, null, new google.maps.Size(50, 38));
            }

            var marker = new google.maps.Marker({
                id: hotel.id,
                position: new google.maps.LatLng(hotel.lat, hotel.lng),
                map: self.map,
                icon: icon,
                il: hotel.il,
                title: hotel.n,
                price: hotel._p,
                optimized: false
            });
        }
    };

    self.getCurrentCenter = function(){
        self.currentCenter = self.map.getCenter();
    };

    self.setCurrentCenter = function(){
        self.map.setCenter(self.currentCenter);
    };

    self.setPolygon = function(){
        var self = this;

        console.log(self.options.polygonCoordinates);

        var googleMapsPolygonCoordinates = [],
            j = 0;

        // duplicating the first point to the end of the array
        // and create google lant/lng coordinates
        for(var i = 0; i < self.options.polygonCoordinates.length; i++){
            j++;
            console.log(i);
            var lat = self.options.polygonCoordinates[i][0];
            var lng = self.options.polygonCoordinates[i][1];
            console.log(self.options.polygonCoordinates[i][0]);
            googleMapsPolygonCoordinates.push(new google.maps.LatLng(lat, lng));
            if(self.options.polygonCoordinates.length == j){
                googleMapsPolygonCoordinates.push(new google.maps.LatLng(self.options.polygonCoordinates[0][0], self.options.polygonCoordinates[0][1]));
            }
        }

        // polygon option
        self.polygonBigMap = new google.maps.Polygon({
            clickable: false,
            paths: googleMapsPolygonCoordinates,
            strokeColor: '#69B1E4',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#69B1E4',
            fillOpacity: 0.35
        });

        self.polygonBigMap.setMap(Grid.mapModule.map);
    };

    return self;
})(Grid.mapModule || {});

