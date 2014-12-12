'use strict';

var HS = function () {
    return new HS.Init();
};

HS.Init = function () {
    this.length = 0;
};

HS.Init.prototype = HS.prototype = {

    constructor: HS,

    length : 0,

    selector : '',

    selectorType : '',

    context : '',
    //API methods

    //Selectors

    sClass : function(selector){
        //Clear obj before select
        this.length = 0;
        var elements = document.getElementsByClassName(selector);
        if(!elements.length) return this;

        this.selector = selector;
        this.selectorType = 'class';
        return merge(this.constructor(), elements);
    },

    findOne : function(selector){
        //Clear obj before select
        this.length = 0;
        var element = document.querySelector(selector);

        this.selector = selector;
        this.selectorType = 'findOne';

        if(isEmpty(element)) return this;
        this.push.call( this, element);

        return this
    },

    sId : function(selector){
        this.length = 0;
        var elem = document.getElementById(selector);

        if(isEmpty(elem)) return this;
        this.push.call( this, elem);

        this.selector = selector;

        this.selectorType = 'class';

        return this;
    },

    find : function(selector){
        //IE 8 CSS2 selectors only
        //Support all native selectors
        if(!selector) return this;

        var elemArr = [],
            elements, i, j;

        this.selector = selector;
        this.selectorType = 'find';

        if(this.length){
            for(i=0; i<this.length; i++) {
                elements = this[i].querySelectorAll(selector);
                if(elements.length){
                    for(j=0; j<elements.length; j++){
                        elemArr.push(elements[j]);
                    }
                }
            }
            return merge(this.constructor(), elemArr);
        } else if(selector.nodeType){
            console.log(selector);
            elemArr.push(selector);
            return merge(this.constructor(), elemArr);
        } else{
            elemArr = document.querySelectorAll(selector);
            return merge(this.constructor(), elemArr);
        }
    },

    //Styleshets

    css : function(obj) {
        if(!this.length) return this;
        //GET
        if(arguments.length == 1 && typeof obj == "string"){
            if (this[0].currentStyle) {
                this[0].currentStyle(obj);
            } else if (window.getComputedStyle) {
                return document.defaultView.getComputedStyle(this[0],null).getPropertyValue(obj);
            }
        }
        //SET
        if(arguments.length == 2){
            console.log(arguments);
            for(var i = 0; i<this.length; i++) {
                this[i].style[arguments[0]] = arguments[1];
            }
            //IE <9
        } else{
            for(var i = 0; i<this.length; i++){
                for(var prop in obj) {
                    this[i].style[prop] = obj[prop];
                }
            }
        }
        return this;
    },

    //IE classList method support for version 10
    //Regexp function used for IE<10

    hasClass : function(c) {
        if(!this.length) return;
        if ('classList' in document.documentElement) {
            for(var i = 0; i<this.length; i++){
                return this[i].classList.contains(c);
            }
        } else{
            for(var i = 0; i<this.length; i++) {
                return classReg(c).test(this[i].className);
            }
        }
    },

    getClass : function(){
        if(!this.length) return;
        if ('classList' in document.documentElement) {
            //return object
            return this[0].classList;
        } else{
            //return string
            return this[0].className;
        }
    },

    addClass : function(c){
        if(!this.length) return;
        if ('classList' in document.documentElement) {
            for(var i = 0; i<this.length; i++) {
                this[i].classList.add(c);
            }
        } else{
            for(var i = 0; i<this.length; i++) {
                //Avoid repetition of classes. ClassList add has native method
                if ( !this[i].hasClass(c) ) {
                    this[i].className = this[i].className + ' ' + c;
                }
            }
        }
        return this;
    },

    removeClass : function(c) {
        if(!this.length) return;
        if ('classList' in document.documentElement) {
            for(var i = 0; i<this.length; i++) {
                this[i].classList.remove(c);
            }
        } else{
            for(var i = 0; i<this.length; i++) {
                //Avoid repetition of classes. ClassList add has native method
                if ( !this[i].hasClass(c) ) {
                    this[i].className = this[i].className.replace(classReg(c), ' ');
                }
            }
        }
        return this;
    },

    toggleClass : function(c) {
        if(!this.length) return;
        if(this.hasClass(c)){
            return this.removeClass(c);
        } else{
            return this.addClass(c);
        }
    },

    //Attributes

    attr : function(obj){
        if(!this.length || !arguments.length || !this.length && !arguments.length) return this;
        //GET
        if(arguments.length == 1 && typeof obj == "string"){
            return this[0].getAttribute(obj);
        }
        //SET
        for(var i = 0; i<this.length; i++) {
            for(var prop in obj) {
                this[i].setAttribute(prop, obj[prop]);
            }
        }
        return this;
    },

    //DOM

    parent : function(){
        //TODO
        //Add find by selector

        if(!this.length) return this;
        var par,
            parArr = [],
            similar = false;
        for(var i=0; i<this.length; i++){
            par = this[i].parentNode;
            if(!parArr.length){
                parArr.push(par);
            } else{
                //Remove duplicates
                for(var j= 0; j<parArr.length; j++){
                    if(par == parArr[j]) similar = true;
                }
                if(!similar) parArr.push(par);
                similar = false;
            }
        }
        if(parArr.length){
            this.length = 0;
            for(i = 0; i<parArr.length; i++){
                this.push.call( this, parArr[i]);
            }
        }
        return this;
    },

    append : function(elem, num){
        if(!this.length || !arguments.length || typeof elem != 'string') return this;
        var newElems = [];
        for(var i=0; i<this.length; i++){
            if(num && isNumber(num)){
                var j = 0;
                while(j < num){
                    j++;
                    var newElem = document.createElement(elem);
                    this[i].appendChild(newElem);
                    newElems.push(newElem);
                }
            } else{
                var newElem = document.createElement(elem);
                this[i].appendChild(newElem);
                newElems.push(newElem);
            }
        }
        this.length = 0;
        for(var i=0; i<newElems.length; i++){
            this.push.call( this, newElems[i]);
        }

        return this;
    },

    sibling: function(n, elem) {
        var matched = [];

        for ( ; n; n = n.nextSibling ) {
            if ( n.nodeType === 1 && n !== elem ) {
                matched.push( n );
            }
        }

        return matched;
    },

    //Events

    button : function(handler, context, tochstartColor, tochendColor){
        if(!this.length || typeof handler != 'function') return this;
        return new HS.FastButton(this, handler, context);
    },

    on : function(event, handler, context){
        if(typeof event != 'string' || typeof  handler != 'function' || !this.length) return this;
        if(context && typeof context == 'string'){
            console.log('a');
            var parent = HS().find(context);
            if(parent.length == 0) return;

        }
        if (this[0].addEventListener) {
            for(var i = 0; i<this.length; i++){
                this[i].addEventListener(event, handler, false);
            }
        } else {
            for(var i = 0; i<this.length; i++){
                this[i].attachEvent("on" + event, function() {
                    // set the this pointer same as addEventListener when fn is called
                    return(handler.call(this[i], window.event));
                });
            }
        }
    }
};

//FastButton


HS.FastButton = function(elements, handler, context,  touchstartColor, touchendColor) {
    var self = this;
    self.touchstartColor = touchstartColor;
    self.touchendColor = touchendColor;
    if(typeof context === 'string'){
        //var parentContext = document.querySelector(context);
        self.element = document.querySelector(context);
        self.handler = function(event){
            console.log(event);
            //if(event.target.classList.contains(elements.selector)){
            //    return handler(event);
            //}
            if (event.target === elements[0] || event.target.offsetParent === elements[0]) {
                return handler(event);
            }
        };

        self.element.addEventListener('touchstart', self, false);
        self.element.addEventListener('click', self, false);
    } else if(elements.length === 1){
        self.element = elements[0];
        self.hsobj = elements;
        self.handler = handler;

        elements[0].addEventListener('touchstart', self, false);
        elements[0].addEventListener('click', self, false);
    } else{
        for(var i = 0; i<elements.length; i++){
            self.element = elements[i];
            self.handler = handler;

            elements[i].addEventListener('touchstart', self, false);
            elements[i].addEventListener('click', self, false);
        }
    }
};

HS.FastButton.prototype.handleEvent = function(event) {
    switch (event.type) {
        case 'touchstart': this.onTouchStart(event); break;
        case 'touchmove': this.onTouchMove(event); break;
        case 'touchend': this.onClick(event); break;
        case 'click': this.onClick(event); break;
    }
};

HS.FastButton.prototype.onTouchStart = function(event) {
    event.stopPropagation();

    this.element.style['background'] = this.touchstartColor;

    this.element.addEventListener('touchend', this, false);
    document.body.addEventListener('touchmove', this, false);

    this.startX = event.touches[0].clientX;
    this.startY = event.touches[0].clientY;
};

HS.FastButton.prototype.onTouchMove = function(event) {
    if (Math.abs(event.touches[0].clientX - this.startX) > 10 ||
        Math.abs(event.touches[0].clientY - this.startY) > 10) {
        this.element.style['background'] = this.touchendColor;
        this.reset();
    }
};

HS.FastButton.prototype.onClick = function(event) {
    event.stopPropagation();
    this.reset();
    this.handler(event);

    if (event.type == 'touchend') {
        this.element.style['background'] = this.touchendColor;
        HS.clickbuster.preventGhostClick(this.startX, this.startY);
    }
};

HS.FastButton.prototype.reset = function() {
    this.element.removeEventListener('touchend', this, false);
    document.body.removeEventListener('touchmove', this, false);
};

HS.clickbuster = function() {}

HS.clickbuster.preventGhostClick = function(x, y) {
    HS.clickbuster.coordinates.push(x, y);
    window.setTimeout(HS.pop, 2500);
};

HS.clickbuster.pop = function() {
    HS.clickbuster.coordinates.splice(0, 2);
};

HS.clickbuster.onClick = function(event) {
    for (var i = 0; i < HS.clickbuster.coordinates.length; i += 2) {
        var x = HS.clickbuster.coordinates[i];
        var y = HS.clickbuster.coordinates[i + 1];
        if (Math.abs(event.clientX - x) < 25 && Math.abs(event.clientY - y) < 25) {
            event.stopPropagation();
            event.preventDefault();
        }
    }
};

document.addEventListener('click', HS.clickbuster.onClick, true);
HS.clickbuster.coordinates = [];

//new HS.FastButton(document.querySelector('.wrapper'), function(e){
//    console.log(e.type);
//});

HS.ajax = function(type, url, async){
    var xmlhttp;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
};

//For internal use only.
HS.prototype.push = Array.prototype.push;
HS.prototype.splice = Array.prototype.splice;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var arr = [];

var slice = arr.slice;

var concat = arr.concat;


function isEmpty(obj) {

    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}

function classReg(className) {
    return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function merge( first, second ) {
    var len = +second.length,
        j = 0,
        i = first.length;

    for ( ; j < len; j++ ) {
        first[ i++ ] = second[ j ];
    }

    first.length = i;

    return first;
}