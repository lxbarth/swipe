(function() {
    var layerids = (location.search.split('?')[1] || '')
        .split('/')[0]
        .split('&');

    var map = L.mapbox.map('map', null, {
        center: [0, 0],
        zoom: 3
    });
    var hash = L.hash(map);

    L.mapbox.tileLayer(layerids[1]).addTo(map);
    var overlay = L.mapbox.tileLayer(layerids[0]).addTo(map);

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
