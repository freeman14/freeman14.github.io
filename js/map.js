Grid.mapModule = (function(map){
    var self = map;

    self.options = {
        latLng: {
            lat: 40.7567,
            lng: -73.9865
        },
        polygonCoordinates: {
            0: {
                0: "40.48109",
                1: "-74.25962"
            },
            1: {
                0: "40.587378",
                1: "-73.719557"
            },
            2: {
                0: "40.752023",
                1: "-73.703151"
            },
            3: {
                0: "40.874413",
                1: "-73.756228"
            },
            4: {
                0: "40.911242",
                1: "-73.896595"
            },
            5: {
                0: "40.914684",
                1: "-73.911574"
            },
            6: {
                0: "40.72615",
                1: "-74.18348"
            },
            7: {
                0: "40.67699",
                1: "-74.22474"
            },
            8: {
                0: "40.48109",
                1: "-74.25962"
            },
            9: {
                0: "40.48109",
                1: "-74.25962"
            }
        },
        zoom: 9
    };

    self.init = function(){
        if(typeof google != 'object') return

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

        self.map = new google.maps.Map(document.getElementById('map'), properties);
        self.getCurrentCenter();
        HS.addEvent(window, 'resize', function() {
            self.setCurrentCenter();
        });
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
        for(var i = 0; i < self.options.polygonCoordinates.length; ++i){
            j++;
            var lat = self.options.polygonCoordinates[i][0];
            var lng = self.options.polygonCoordinates[i][1];
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

