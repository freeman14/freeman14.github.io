Grid.filters.ll = (function(ll){
    var self = ll;

    self.name = 'll';
    self.active = false;
    self.value = 0;

    self.init = function(){
        if (Grid.url.hash.ll) {
            self.value = Grid.url.hash.ll;
            self.active = true;
        }
    };

    self.reset = function(){
        self.active = false;
        self.value = 0;
    };

    return self;
})(Grid.filters.ll || {});