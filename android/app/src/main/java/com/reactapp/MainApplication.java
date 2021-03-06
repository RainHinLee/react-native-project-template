package com.reactapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.rnfs.RNFSPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.react.rnspinkit.RNSpinkitPackage; 
import com.horcrux.svg.SvgPackage;
import com.gettipsi.stripe.StripeReactPackage;
import com.taessina.paypal.RNPaypalWrapperPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new SplashScreenReactPackage(),
          new RNFSPackage(),
          new ReactVideoPackage(),
          new RNSpinkitPackage(),
          new SvgPackage(),
          new StripeReactPackage(),
          new RNPaypalWrapperPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
