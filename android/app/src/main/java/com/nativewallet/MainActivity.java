package com.nativewallet;

import com.facebook.react.ReactActivity;

import android.content.IntentFilter;
import android.os.Bundle;
import android.util.Log;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "nativewallet";
  }
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {

    super.onCreate(null);
    Log.i("Broadcastreceiver: ", "creating intent for broadcast receiver");
    IntentFilter intentFilter = new IntentFilter("com.minima.newblock");
    MyBroadcastReceiver objReceiver = new MyBroadcastReceiver();
    registerReceiver(objReceiver, intentFilter);

  }
}
