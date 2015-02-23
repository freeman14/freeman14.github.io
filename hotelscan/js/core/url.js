Grid.url = (function(url){
    var self = url;
    self.hash = {};

    function _urlDecode(t) {
        return decodeURIComponent(t).replace(/\+/g, ' ');
    }

    self.urlRefresh = (function(){

        self.hash = {};

        var urlParts = window.location.search.replace(/^\?/,'').split('&');

        for(var i=0, len=urlParts.length; i<len; i++){
            if (urlParts[i].indexOf('=') == -1) continue;
            var keyValue = urlParts[i].split('=');
            url.hash[_urlDecode(keyValue[0])] = _urlDecode(keyValue[1]);
        }

        //if(hConf.isHotelRequest) {
        //    var parts = window.location.pathname.split('/');
        //    var value = parts[parts.length-1];
        //
        //    if (/^\d+$/.test(value)) {
        //        if (!url.hash.hid && !url.hash.guid){
        //            url.hash.hid = urldecode(parts[parts.length-1]);
        //        }
        //    } else {
        //        if (!url.hash.hid && !url.hash.guid){
        //            url.hash.guid = urldecode(parts[parts.length-1]);
        //        }
        //    }
        //} else if (!window.url.hash.hid && !window.url.hash.guid && !window.url.hash.display) { // city case
        //    var parts = window.location.pathname.split('/');
        //    if (parts.length > 2){
        //        url.hash.display = urldecode(parts[parts.length-1]);
        //    }
        //}
    })();

    self.passedParams = ['display', 'll', 'hid', 'guid', 'date', 'dates', 'checkin', 'checkout', 'geoid', 'gclid'];

    return self;
})(Grid.url || {});