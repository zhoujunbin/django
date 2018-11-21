// 心率 血氧数据网页显示
package com.example.lenovo.jiankong;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

public class EchartsActivity extends AppCompatActivity {

    private WebView mWvMain;
//    private WebView mWvAdmin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_echarts);
        mWvMain = findViewById(R.id.wv);
        mWvMain.setWebChromeClient(new MyWebChromeClient());
        mWvMain.getSettings().setJavaScriptEnabled(true);
        mWvMain.loadUrl("http://192.168.137.171:8000");

    }

    class MyWebChromeClient extends WebChromeClient{
        @Override
        public void onProgressChanged(WebView view, int newProgress) {
            super.onProgressChanged(view, newProgress);
        }

        @Override
        public void onReceivedTitle(WebView view, String title) {
            super.onReceivedTitle(view, title);
            setTitle(title);
        }
    }
}
