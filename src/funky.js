(function() {
    'use strict';

    function FunkyGal(container, layers, size) {
        this.container = container;
        this.layers = layers;
        this.items = {};
        this.currentLayer = 0;

        if(!size) var size = {width: $(window).width(), height: $(window).height()};
        this.resize(size);
        this.BEGIN();
    }
    FunkyGal.prototype.resize = function(size) {
        this.container.css({
            width: size.width,
            height: size.height
        });
    };
    FunkyGal.prototype.setup = function() {
        var _this = this;
        this.container.css({
            position: 'relative'
        });
        this._loopLayers(function(layer) {
            layer.layer.css({
                position: 'absolute',
                width: _this.container.width(),
                height: _this.container.height()
            });
        });
        this._loopImages(function(itemSet) {
            itemSet.each(function() {
                var item = $(this);
                var layerPos = item.parent().attr('data-layer');

                item.each(function() {
                    $(this).css({
                        position: 'absolute',
                        left: Math.random() * _this.container.width() * 0.75,
                        top: Math.random() * _this.container.height() * 0.75,
                        width: item.width() - (item.width()/2 * 1/layerPos),
                        height: item.height() - (item.height()/2 * 1/layerPos),
                        opacity: 1 - 20*(layerPos/100),
                        zIndex: 10000 - (layerPos * 10)
                    })
                    .data({
                        opacity: 1 - 20*(layerPos/100),
                        zIndex: 10000 - (layerPos * 10),
                        width: item.width() - (item.width()/2 * 1/layerPos),
                        height: item.height() - (item.height()/2 * 1/layerPos)
                    });
                });
            });
        });
    };
    FunkyGal.prototype.loadLayers = function() {
        var tmp = this.layers;
        this.layers = [];
        for(var i = 0; i < tmp.length; i++) {
            this.layers.push({
                id: i,
                z: tmp.eq(i).attr('data-layer'),
                layer: tmp.eq(i)
            });
        }
    };
    FunkyGal.prototype._loopLayers = function(fn) {
        if(!fn) return;
        for(var id in this.layers) fn(this.layers[id]);
    };
    FunkyGal.prototype._loopImages = function(fn) {
        if(!fn) return;
        for(var id in this.items) fn(this.items[id]);
    };
    FunkyGal.prototype.loadImages = function() {
        var _this = this;
        this._loopLayers(function(layer) {
            _this.items[layer.id] = layer.layer.find('.funky-item');
        });
    };
    FunkyGal.prototype.moveIn = function() {
    };
    FunkyGal.prototype.BEGIN = function() {
        this.loadLayers();
        this.loadImages();
        this.setup();
        console.dir(this);
    };

    $(function() { window.FUNKY = new FunkyGal( $('#funkyGal'), $('.funky-layer'), {width: 800, height: 800} ); });
})();