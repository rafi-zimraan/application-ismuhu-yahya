package com.ismuhuyahya

import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ViewManager

class InternetSettingsPackage : ReactPackage {

    override fun createNativeModules(reactContext: ReactApplicationContext): List<NativeModule> {
        return listOf(InternetSettingsModule(reactContext)) // Mendaftarkan InternetSettingsModule
    }

    override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
        return emptyList() // Tidak ada ViewManager yang diperlukan dalam package ini
    }
}
