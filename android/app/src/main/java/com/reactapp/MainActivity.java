package com.reactapp;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import com.cboy.rn.splashscreen.SplashScreen; 

import br.com.vizir.rn.paypal.PayPalPackage; 
import br.com.vizir.rn.paypal.PayPal; 
import android.content.Intent; 
public class MainActivity extends ReactActivity {

	private static final int PAY_PAL_REQUEST_ID = 9; 
    private PayPalPackage payPalPackage; 
    
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "reactapp";
    }
    
   @Override
    protected void onCreate(Bundle savedInstanceState) {
   		super.onCreate(savedInstanceState);
   		
        SplashScreen.show(this); 
        payPalPackage = new PayPalPackage(this, PAY_PAL_REQUEST_ID);
    }
    
    @Override
    public void onActivityResult(final int requestCode, final int resultCode, final Intent data) {
       super.onActivityResult(requestCode, resultCode, data);
       if (requestCode == PAY_PAL_REQUEST_ID) {
           payPalPackage.handleActivityResult(requestCode, resultCode, data); 
       }
    }   
    
}
