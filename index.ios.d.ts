import { BarcodeScannerView as BarcodeScannerBaseView, ScanOptions, ScanResult } from "./barcodescanner-common";
export declare class BarcodeScannerView extends BarcodeScannerBaseView {
    private _reader;
    private _scanner;
    private _hasSupport;
    constructor();
    createNativeView(): Object;
    initView(): void;
    onLayout(left: number, top: number, right: number, bottom: number): void;
    protected pauseScanning(): void;
    protected resumeScanning(): void;
}
export declare class BarcodeScanner {
    private _observer;
    private _observerActive;
    _currentVolume: number;
    private _scanner;
    private _scanDelegate;
    private _audioSession;
    private _closeCallback;
    private _device;
    private _lastScanViewController;
    constructor();
    private _hasCameraPermission;
    private _hasDeniedCameraPermission;
    private _addVolumeObserver;
    private _removeVolumeObserver;
    private _enableTorch;
    private _disableTorch;
    available(): Promise<boolean>;
    hasCameraPermission(): Promise<boolean>;
    requestCameraPermission(): Promise<boolean>;
    stop(): Promise<any>;
    scan(arg: ScanOptions): Promise<ScanResult>;
    private isPresentingModally;
    private close;
    private getViewControllerToPresentFrom;
}
