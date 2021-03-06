// 展示姓名、性别信息，以及，实时监控、帮助文档、修改密码、退出登陆等按钮
package com.example.lenovo.jiankong;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class InfoActivity extends AppCompatActivity {

    private Button mBtnLogOut;
    private Button mBtnModify;
    private Button mBtnHelp;
    private Button mBtnAbout;
    private Button mBtnSearch;
    private Button mBtnAdmin;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info);
        mBtnLogOut = findViewById(R.id.btn_LogOut);
        mBtnLogOut.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //跳转到登陆页面
                Intent intent = new Intent(InfoActivity.this,MainActivity.class);
                startActivity(intent);
            }
        });
        mBtnModify = findViewById(R.id.btn_modify);
        mBtnModify.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //跳转到修改密码页面
                Intent intent = new Intent(InfoActivity.this,ModifyActivity.class);
                startActivity(intent);
            }
        });
        mBtnHelp = findViewById(R.id.btn_help);
        mBtnHelp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //跳转到帮助文档页面，InfoActivity
                Intent intent = new Intent(InfoActivity.this,HelpActivity.class);
                startActivity(intent);
            }
        });
        mBtnAbout = findViewById(R.id.btn_about);
        mBtnAbout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //跳转到关于我们页面
                Intent intent = new Intent(InfoActivity.this,AboutActivity.class);
                startActivity(intent);
            }
        });
        mBtnSearch = findViewById(R.id.btn_search);
        mBtnSearch.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //跳转到心率、血氧数据显示页面
                Intent intent = new Intent(InfoActivity.this,EchartsActivity.class);
                startActivity(intent);
            }
        });
        mBtnAdmin = findViewById(R.id.btn_admin);
        mBtnAdmin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //跳转到站点管理页面
                Intent intent = new Intent(InfoActivity.this,AdminActivity.class);
                startActivity(intent);
            }
        });

    }
}
