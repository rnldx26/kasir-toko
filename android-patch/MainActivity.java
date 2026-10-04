package com.kasir.toko;

import android.Manifest;
import android.os.Build;
import android.os.Bundle;
import androidx.core.app.ActivityCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    if (Build.VERSION.SDK_INT >= 31) {
      ActivityCompat.requestPermissions(
        this,
        new String[] { Manifest.permission.BLUETOOTH_CONNECT },
        1
      );
    }
  }
}
