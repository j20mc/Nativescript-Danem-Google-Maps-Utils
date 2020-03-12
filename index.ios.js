"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _mapView = {};
const imageSourceModule = require("tns-core-modules/image-source");
const Image = require('@nativescript/core/ui/image');

var GMUClusterManagerDelegateImpl = (function (_super) {
    __extends(GMUClusterManagerDelegateImpl, _super);

    /**
     * init @Class
     */
    function GMUClusterManagerDelegateImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        return _this;
    }


    GMUClusterManagerDelegateImpl.initWithMapAlgorithmRenderer = function (mapView, algorithm, renderer, owner) {
        var delegate = GMUClusterManagerDelegateImpl.new();
        delegate._mapView = mapView;
        delegate._algorithm = algorithm;
        delegate._renderer = renderer
        delegate._owner = owner
        return delegate;
    }

    GMUClusterManagerDelegateImpl.prototype.clusterManagerDidTapClusterItem = function (clusterManager, poiItem) {
        var owner = this._owner.get();
        _mapView.notifyMarkerTapped(poiItem);
        return false;
    };

    GMUClusterManagerDelegateImpl.ObjCProtocols = [GMUClusterManagerDelegate];
    return GMUClusterManagerDelegateImpl;

}(NSObject));

/**
 * Delegate for id<GMUClusterRenderer> to provide extra functionality to the default
 * renderer.
 */
var GMUClusterRendererDelegateImpl = (function (_super) {
    __extends(GMUClusterRendererDelegateImpl, _super);

    /**
     * init @Class
     */
    function GMUClusterRendererDelegateImpl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        return _this;
    }

    /**
     * Creates a new cluster renderer with a given map view and icon generator.
     *
     * @param mapView The map view to use.
     * @param iconGenerator The icon generator to use. Can be subclassed if required.
     */
    GMUClusterRendererDelegateImpl.initWithMapViewClusterIconGenerator = function (mapView, iconGenerator, owner) {
        var delegate = GMUClusterRendererDelegateImpl.new();
        delegate._mapView = mapView;
        delegate._iconGenerator = iconGenerator;
        delegate._owner = owner;
        return delegate;
    };

    /**
     * Raised when a marker (for a cluster or an item) is about to be added to the map.
     * Use the marker.userData property to check whether it is a cluster marker or an
     * item marker.
     */
    GMUClusterRendererDelegateImpl.prototype.rendererWillRenderMarker = function (renderer, marker) {
        var owner = this._owner.get();
        if (marker.userData instanceof POIItem) {
            var mIcon = Image;
            mIcon.imageSource = imageSourceModule.fromResource(marker.userData.imageUrl);
            marker.icon = mIcon.imageSource.ios
        } else {
            // cluster marker
        }
    };

    GMUClusterRendererDelegateImpl.ObjCProtocols = [GMUClusterRendererDelegate];
    return GMUClusterRendererDelegateImpl;

}(NSObject));

function moveCamera(latitude, longitude, zoom) {
    let cameraUpdate = GMSCameraPosition.alloc().initWithLatitudeLongitudeZoom(latitude, longitude, zoom)
    _mapView.nativeView.animateToCameraPosition(cameraUpdate)
}
exports.moveCamera = moveCamera;

function clearMap() {
    _mapView.gMap.clear()
}
exports.clearMap = clearMap;

function setupMarkerCluster(mapView, markers) {
    _mapView = mapView;
    var iconGenerator = GMUDefaultClusterIconGenerator.alloc().init();
    var algorithm = GMUNonHierarchicalDistanceBasedAlgorithm.alloc().init();
    var renderer = GMUDefaultClusterRenderer.alloc().initWithMapViewClusterIconGenerator(mapView.nativeView, iconGenerator)
    var clusterManager = GMUClusterManager.alloc().initWithMapAlgorithmRenderer(mapView.nativeView, algorithm, renderer)
    var clusterManagerDelegate = GMUClusterManagerDelegateImpl.initWithMapAlgorithmRenderer(mapView.nativeView, algorithm, renderer, new WeakRef(this))
    clusterManager.clearItems();
    clusterManager.setDelegateMapDelegate(clusterManagerDelegate, mapView);
    var rendererDelegate = GMUClusterRendererDelegateImpl.initWithMapViewClusterIconGenerator(mapView.nativeView, iconGenerator, new WeakRef(this))
    renderer.delegate = rendererDelegate;
    for (var i = 0; i < markers.length; i++) {
        var clusterItem = POIItem.alloc().initWithPositionNameImageUrl(markers[i].position.ios, markers[i].userData, markers[i].infoWindowTemplate)
        clusterManager.addItem(clusterItem)
        if (i === markers.length - 1) {
            clusterManager.cluster();
        }
    }

}

exports.setupMarkerCluster = setupMarkerCluster;
function setupHeatmap(mapView, positions, config) {

}
exports.setupHeatmap = setupHeatmap;
//# sourceMappingURL=index.ios.js.map
