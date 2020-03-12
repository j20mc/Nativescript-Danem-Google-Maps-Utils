declare module "nativescript-danem-google-maps-utils" {

  import { MapView, Position, Marker } from "nativescript-google-maps-sdk";

  export function enableDebug(debugFn?: ((...args: Array<any>) => any)): void;
  export function disableDebug(): void;

  export function setupMarkerCluster(mapView: MapView, markers: Array<Marker>): void;

  export function moveCamera(latitude, longitude, zoom): void;

  export function clearMap(): void;

  export interface IHeatmapConfig {
      provider: any;
      overlay: any;
  }

  export function setupHeatmap(mapView: MapView, positions: Array<Position>, config?: IHeatmapConfig) : IHeatmapConfig;
}
