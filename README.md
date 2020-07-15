nativescript-danem-google-maps-utils (V1.0.13)
==================================

NativeScript Google Maps SDK utility library IOS & Android :

* Clustering implemented
* Heatmap IOS not implemented (In progress)

*** I am available to improve this plugin as needed, so do not hesitate to open a ticket for a request ! ***

## Dependencies

* [nativescript-google-maps-sdk](https://github.com/dapriett/nativescript-google-maps-sdk)
* (Android - gradle) googlePlayServicesVersion = "17.0.0"

# Install

```
tns plugin add nativescript-danem-google-maps-utils
```



# Usage

## Import

```
var GoogleMaps = require('nativescript-google-maps-sdk');
var GoogleMapsUtils = require('nativescript-google-maps-utils');
```

## Call function

```
// After initializing google maps and creating a marker array :
GoogleMapsUtils.setupMarkerCluster(mapView, makerSet);
GoogleMapsUtils.setupHeatmap(this.mapView, positionSet);
```

# Clustering Info

## Marker icon

```
var icon = 'marker_icon'
var marker: Marker = new Marker();
marker.infoWindowTemplate = icon;
makerSet.push(marker)
```

## Marker Select & Cluster Select
```
onMarkerSelect(event) {
// Be careful, if you tap on a marker it returns a marker, if you tap on a cluster it returns an array of markers.
// var marker = event.marker
// or
// var arrayMarkers = event.marker
}
```
## MoveCamera

```
GoogleMapsUtils.moveCamera(lat,lon,zoom)
```

## Clear 

```
GoogleMapsUtils.clearMap();
```

# HeatMap Demo

```
generateRandomPosition(position, distance) {
    var r = distance / 111300;

    var x = position[0];
    var y = position[1];

    var u = Math.random();
    var v = Math.random();

    var w = r * Math.sqrt(u);
    var t = 2 * Math.PI * v;

    var dx = w * Math.cos(t) / Math.cos(y);
    var xy = w * Math.sin(t);

    return [x + dx, y + xy];
}

demoSetupHeatMap() {
    var positionSet = [];
    var makerSet;
    for (var i = 0; i < 200; i++) {
        positionSet.push(this.generateRandomPosition([48.7797613, 2.4658653], 10000));
    }

    positionSet = positionSet.map(function (position) {
        return GoogleMaps.Position.positionFromLatLng(position[0], position[1]);
    });
    GoogleMapsUtils.setupHeatmap(this.mapView, positionSet);
}
   ```

Plugin inspired by nativescript-google-maps-utils, thanks @naderio
