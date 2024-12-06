package com.ismuhuyahya 

import android.content.Intent
import android.provider.Settings
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class DeveloperOptionsModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    // Override untuk memberikan nama modul yang bisa dipanggil dari JavaScript
    override fun getName(): String {
        return "DeveloperOptions"
    }

    // Fungsi yang bisa dipanggil dari JavaScript untuk membuka Developer Options
    @ReactMethod
    fun open() {
        val intent = Intent(Settings.ACTION_APPLICATION_DEVELOPMENT_SETTINGS)
        intent.flags = Intent.FLAG_ACTIVITY_NEW_TASK
        reactApplicationContext.startActivity(intent)
    }
}
