//修改密码界面
package com.example.lenovo.jiankong;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

public class ModifyActivity extends AppCompatActivity {

    private Button mBtnConfirm;
    private String psw_old, psw_new, psw_new_again, spPsw, userName, loginUserName;
    private EditText et_psw_old, et_psw_new, et_psw_new_again;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_modify);
        mBtnConfirm = findViewById(R.id.btn_confirm);
        mBtnConfirm.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                et_psw_old = findViewById(R.id.et_psw_old);
                et_psw_new = findViewById(R.id.et_psw_new);
                et_psw_new_again = findViewById(R.id.et_psw_new_again);
                psw_old = et_psw_old.getText().toString().trim();
                psw_new = et_psw_new.getText().toString().trim();
                psw_new_again = et_psw_new_again.getText().toString().trim();

                /*loginUserName = "loginUserName";
                SharedPreferences sp=getSharedPreferences("loginInfo", MODE_PRIVATE);*/
                userName = readPsw("loginUserName");
                spPsw = readPsw(userName);

                if(TextUtils.isEmpty(psw_old)){
                    Toast.makeText(ModifyActivity.this, "请输入原密码", Toast.LENGTH_SHORT).show();
                    return;
                }else if(TextUtils.isEmpty(psw_new)){
                    Toast.makeText(ModifyActivity.this, "请输入新密码", Toast.LENGTH_SHORT).show();
                    return;
                }else if(TextUtils.isEmpty(psw_new_again)){
                    Toast.makeText(ModifyActivity.this, "请再次输入新密码", Toast.LENGTH_SHORT).show();
                    return;
                }else if(!psw_old.equals(spPsw)){
                    Toast.makeText(ModifyActivity.this, "密码错误", Toast.LENGTH_SHORT).show();
                    return;
                }else if(!psw_new.equals(psw_new_again)){
                    Toast.makeText(ModifyActivity.this, "两次密码输入不同", Toast.LENGTH_SHORT).show();
                    return;
                }else if(psw_old.equals(spPsw)){
                    //一致登录成功
                    Toast.makeText(ModifyActivity.this, "修改成功", Toast.LENGTH_SHORT).show();
                    //保存登录状态，在界面保存登录的用户名 定义个方法 saveLoginStatus boolean 状态 , userName 用户名;
                    saveModifyInfo(userName, psw_new);
                    //销毁登录界面
                    ModifyActivity.this.finish();
                    //修改密码完成，跳转到InfoActivity
                    Intent intent = new Intent(ModifyActivity.this,InfoActivity.class);
                    startActivity(intent);
                }

            }
        });
    }

    /**
     *从SharedPreferences中根据用户名读取密码
     */
    private String readPsw(String userName){
        //getSharedPreferences("loginInfo",MODE_PRIVATE);
        //"loginInfo",mode_private; MODE_PRIVATE表示可以继续写入
        SharedPreferences sp=getSharedPreferences("loginInfo", MODE_PRIVATE);
        //sp.getString() userName, "";
        return sp.getString(userName , "");
    }

    private void saveModifyInfo(String userName,String psw){
        //loginInfo表示文件名, mode_private SharedPreferences sp = getSharedPreferences( );
        SharedPreferences sp=getSharedPreferences("loginInfo", MODE_PRIVATE);
        //获取编辑器， SharedPreferences.Editor  editor -> sp.edit();
        SharedPreferences.Editor editor=sp.edit();
        //以用户名为key，密码为value保存在SharedPreferences中
        //key,value,如键值对，editor.putString(用户名，密码）;
        editor.putString(userName, psw);
        //提交修改 editor.commit();
        editor.commit();
    }

}
