package com.example.lenovo.jiankong;

import android.graphics.Bitmap;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.KeyEvent;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class AdminActivity extends AppCompatActivity {

    private WebView mWvAdmin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin);
        mWvAdmin = findViewById(R.id.wv);
        mWvAdmin.getSettings().setJavaScriptEnabled(true);
        mWvAdmin.setWebViewClient(new MyWebViewClient());
        mWvAdmin.loadUrl("http://10.180.59.63:8000/admin/");

    }
    class MyWebViewClient extends WebViewClient{
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            view.loadUrl(request.getUrl().toString());
            return true;
        }
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if(keyCode == KeyEvent.KEYCODE_BACK && mWvAdmin.canGoBack()){
            mWvAdmin.goBack();
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
