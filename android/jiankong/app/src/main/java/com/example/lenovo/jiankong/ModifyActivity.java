//修改密码界面
package com.example.lenovo.jiankong;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class ModifyActivity extends AppCompatActivity {

    private Button mBtnConfirm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_modify);
        mBtnConfirm = findViewById(R.id.btn_confirm);
        mBtnConfirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //跳转到修改密码页面，InfoActivity
                Intent intent = new Intent(ModifyActivity.this,InfoActivity.class);
                startActivity(intent);
            }
        });
    }
}
