"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils = require("tns-core-modules/utils/utils");
var ClusterManager = com.google.maps.android.clustering.ClusterManager;
var DefaultClusterRenderer = com.google.maps.android.clustering.view.DefaultClusterRenderer;
var _mapView = {};
var ImageSource = require("tns-core-modules/image-source").ImageSource;
var Image = require('@nativescript/core/ui/image');

const CustomClusterItem = java.lang.Object.extend({
    interfaces: [com.google.maps.android.clustering.ClusterItem],
    marker: null,
    init: function () { },
    getMarker: function () {
        return this.marker;
    },
    getPosition: function () {
        return this.marker.position.android;
    },
    getTitle: function () {
        return this.marker.title;
    },
    getSnippet: function () {
        return this.marker.snippet;
    },
});

function moveCamera(latitude, longitude) {
    if (_mapView.gMap === undefined) {
        console.log("NO INIT MAPVIEW")
    } else {
        try {
            var cameraUpdate = new com.google.android.gms.maps.CameraUpdateFactory.newLatLng(new com.google.android.gms.maps.model.LatLng(latitude, longitude))
            _mapView.gMap.animateCamera(cameraUpdate)
        } catch (e) {
            console.log(e)
        }
    }

}
exports.moveCamera = moveCamera;

function clearMap() {
    _mapView.gMap.clear()
}
exports.clearMap = clearMap;

function setupMarkerCluster(mapView, markers) {
    console.log(mapView, markers.length)
    _mapView = mapView
    const CustomClusterRenderer = DefaultClusterRenderer.extend({
        init: function () { },
        onBeforeClusterItemRendered: function (item, markerOptions) {
            var mIcon = Image;
            mIcon.imageSource = ImageSource.fromResourceSync(item.getMarker().infoWindowTemplate);
            var androidIcon = com.google.android.gms.maps.model.BitmapDescriptorFactory.fromBitmap(mIcon.imageSource.android);
            markerOptions.icon(androidIcon);
        }
    });
    var clusterManager = new ClusterManager(utils.ad.getApplicationContext(), _mapView.gMap);
    var renderer = new CustomClusterRenderer(utils.ad.getApplicationContext(), _mapView.gMap, clusterManager);
    clusterManager.mapView = _mapView;
    if (_mapView.gMap.setOnCameraIdleListener) {
        _mapView.gMap.setOnCameraIdleListener(clusterManager);
    }
    else if (_mapView.gMap.setOnCameraChangeListener) {
        _mapView.gMap.setOnCameraChangeListener(clusterManager);
    }
    clusterManager.setRenderer(renderer);
    _mapView.gMap.setOnInfoWindowClickListener(clusterManager);
    _mapView.gMap.setOnMarkerClickListener(clusterManager);
    clusterManager.setOnClusterItemClickListener(new ClusterManager.OnClusterItemClickListener({
        onClusterItemClick: function (gmsMarker) {
            var marker = markers.find(mk => mk.android.getPosition() === gmsMarker.getPosition());
            marker && _mapView.notifyMarkerTapped(marker);
            return false;
        }
    }));

    clusterManager.setOnClusterClickListener(new ClusterManager.OnClusterClickListener({
        onClusterClick: function (cluster) {
            var listeMarker = cluster.getItems().toArray();
            moveCamera(cluster.getPosition().latitude, cluster.getPosition().longitude, 18)
            _mapView.notifyMarkerTapped(listeMarker);
            return false;
        }
    }));

    var arrayMarker = new java.util.ArrayList()
    for(var i = 0; i < markers.length; i++){
        var markerItem = new CustomClusterItem();
        markerItem.marker = markers[i];
        arrayMarker.add(markerItem)
        if(i === markers.length - 1){
            clusterManager.addItems(arrayMarker)
        }
    }
    clusterManager.cluster();
}
exports.setupMarkerCluster = setupMarkerCluster;

function setupHeatmap(mapView, positions, config) {
    /*
    */
}
exports.setupHeatmap = setupHeatmap;
//# sourceMappingURL=index.android.js.map
