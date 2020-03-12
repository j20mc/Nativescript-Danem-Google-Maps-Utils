nativescript-google-maps-utils
==================================

NativeScript Google Maps SDK utility library IOS & Android :

* Clustering implemented
* Heatmap not implemented


## Dependencies

* [nativescript-google-maps-sdk](https://github.com/dapriett/nativescript-google-maps-sdk)
* https://github.com/googlemaps/android-maps-utils
* https://github.com/googlemaps/google-maps-ios-utils

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
```

# Clustering Info

## Marker icon

For the moment, the titles are not yet implemented. Don't add marker title.

```
var icon = 'marker_icon'
var marker: Marker = new Marker();
marker.infoWindowTemplate = icon;
makerSet.push(marker)
```

## MoveCamera

```
GoogleMapsUtils.moveCamera(lat,lon,zoom)
```

## Clear 

```
GoogleMapsUtils.clearMap();
```



Plugin inspired by nativescript-google-maps-utils, thanks @naderio
