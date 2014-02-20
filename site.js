(function() {
    var layerids = (location.search.split('?')[1] || '')
        .split('/')[0]
        .split('&');
    var createLayer = function(layerid) {
        if (layerid.toLowerCase() == 'bing') {
            return new L.BingLayer("Anqm0F_JjIZvT0P3abS6KONpaBaKuTnITRrnYuiJCE0WOhH6ZbE4DzeT6brvKVR5");
        }
        return L.mapbox.tileLayer(layerid);
    };
    var map = L.mapbox.map('map', null, {
        center: [0, 0],
        zoom: 3
    });
    var hash = L.hash(map);

    createLayer(layerids[1]).addTo(map);
    var overlay = createLayer(layerids[0]).addTo(map);

    var range = document.getElementById('range');

    function clip() {
        var nw = map.containerPointToLayerPoint([0, 0]),
            se = map.containerPointToLayerPoint(map.getSize()),
            clipX = nw.x + (se.x - nw.x) * range.value;
        overlay.getContainer().style.clip = 'rect(' + [nw.y, clipX, se.y, nw.x].join('px,') + 'px)';
    }

    range['oninput' in range ? 'oninput' : 'onchange'] = clip;
    map.on('move', clip);
})();
