//Global
var Grid =(function(Grid){
    var self = Grid;

    self.body = HS().findOne('body');
    self.layout = HS().sClass('layout');
    self.searchResult = HS().sClass('search-results');

    self.resizeChange = false;
    self.isMobile = !parseFloat(self.body.css('width'))>919;

    self.mapOption = {
        lat: 40.7567,
        lng: -73.9865,
        zoom: 9
    };


    /**
     * setIsMobile() set isMobile to true or false
     *
     *
     * @return {Element} isMobile
     */
    self.setIsMobile = function(){
        return self.isMobile = !parseFloat(self.body.css('width'))>919;
    };


    /**
     * Handle when window resize
     *
     */
    HS.addEvent(window, 'resize', function(){
        self.setIsMobile();
    });

    return self;
})(Grid || {});


HS.ready(function(){

    (function loadGoogleMapsAPI() {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "http://maps.googleapis.com/maps/api/js?key=AIzaSyBJrDk9-JHmQYqBq_TmcnRweesbS9xyo90&sensor=true&libraries=places&language=ru&callback=Grid.mapModule.init";
        document.body.appendChild(script);
    })();

});
