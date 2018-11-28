// 登陆主页面
package com.example.lenovo.jiankong;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;
import android.content.SharedPreferences;
import android.text.TextUtils;

public class MainActivity extends AppCompatActivity {

    private  Button mBtnLogin;
    private  Button mBtnRegister;
    private  EditText et_userName, et_psw;
    private  String  userName, psw, spPsw;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mBtnLogin = findViewById(R.id.btn_login);
        mBtnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                et_userName = findViewById(R.id.et_userName);
                et_psw = findViewById(R.id.et_psw);
                userName = et_userName.getText().toString().trim();
                psw = et_psw.getText().toString().trim();

                spPsw = readPsw(userName);
                if(TextUtils.isEmpty(userName)){
                    Toast.makeText(MainActivity.this, "请输入用户名", Toast.LENGTH_SHORT).show();
                    return;
                }else if(TextUtils.isEmpty(psw)){
                    Toast.makeText(MainActivity.this, "请输入密码", Toast.LENGTH_SHORT).show();
                    return;
                    // md5Psw.equals(); 判断，输入的密码加密后，是否与保存在SharedPreferences中一致
                }else if(psw.equals(spPsw)){
                    //一致登录成功
                    Toast.makeText(MainActivity.this, "登录成功", Toast.LENGTH_SHORT).show();
                    //保存登录状态，在界面保存登录的用户名 定义个方法 saveLoginStatus boolean 状态 , userName 用户名;
                    saveLoginStatus(true, userName);
                    //登录成功后关闭此页面进入主页
                    Intent data=new Intent();
                    //datad.putExtra( ); name , value ;
                    data.putExtra("isLogin",true);
                    //RESULT_OK为Activity系统常量，状态码为-1
                    // 表示此页面下的内容操作成功将data返回到上一页面，如果是用back返回过去的则不存在用setResult传递data值
                    setResult(RESULT_OK,data);
                    //销毁登录界面
                    MainActivity.this.finish();
                    //跳转到主界面，登录成功的状态传递到 MainActivity 中
                    startActivity(new Intent(MainActivity.this, InfoActivity.class));
                    return;
                }else if((spPsw!=null&&!TextUtils.isEmpty(spPsw)&&!psw.equals(spPsw))){
                    Toast.makeText(MainActivity.this, "输入的用户名和密码不一致", Toast.LENGTH_SHORT).show();
                    return;
                }else{
                    Toast.makeText(MainActivity.this, "此用户名不存在", Toast.LENGTH_SHORT).show();
                }
                /*//跳转到信息页面，InfoActivity
                Intent intent = new Intent(MainActivity.this,InfoActivity.class);
                startActivity(intent);*/
            }
        });
        mBtnRegister = findViewById(R.id.btn_regist);
        mBtnRegister.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                //跳转到注册页面
                Intent intent = new Intent(MainActivity.this,RegisterActivity.class);
                startActivity(intent);
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
    private void saveLoginStatus(boolean status,String userName){
        //saveLoginStatus(true, userName);
        //loginInfo表示文件名  SharedPreferences sp=getSharedPreferences("loginInfo", MODE_PRIVATE);
        SharedPreferences sp=getSharedPreferences("loginInfo", MODE_PRIVATE);
        //获取编辑器
        SharedPreferences.Editor editor=sp.edit();
        //存入boolean类型的登录状态
        editor.putBoolean("isLogin", status);
        //存入登录状态时的用户名
        editor.putString("loginUserName", userName);
        //提交修改
        editor.commit();
    }

}
