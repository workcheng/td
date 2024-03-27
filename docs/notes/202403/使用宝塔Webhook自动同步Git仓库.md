>团队协作离不开[git]仓库，今天来给大家介绍一下配置[宝塔]上面的web hooks ,实现将本地代码提交到码云仓库后自己 更新到云服务器

一、在[宝塔]面板中的软件中安装“[宝塔][webhook]”，没有安装的直接点安装就行

![安装宝塔webhook](/安装宝塔webhook.png)

二、生成公钥（私有仓库一定要配置）

直接根据提示，回车下一步就行

```
ssh-keygen -t rsa
```

![ssh-keygen](/ssh-keygen.png)

三，查看公钥，并复制到码云[gitee]仓库

```
cat /root/.ssh/id_rsa.pub
```

![id_rsa](/id_rsa.png)

四、创建[webhook]脚本

![webook脚本](/webook脚本.png)

名称随便起就行

执行脚本可以参考以下，注意$1 [git]仓库最好和文件夹一致，如果不一致，可以根据自己的情况改一下下面的代码

```
#!/bin/bash

echo ""
#输出当前时间
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "Start"
#判断宝塔webhook参数是否存在
if [ ! -n "$1" ];
then 
          echo "param参数错误"
          echo "End"
          exit
fi
#git项目路径
gitPath="/www/wwwroot/$1"
#git 网址两种方式都可以ssh 或者https
gitHttp="https://gitee.com/xxx/$1.git"
#gitHttp="git@gitee.com:xxx/$1.git"
echo "Web站点路径：$gitPath"
#判断项目路径是否存在
if [ -d "$gitPath" ]; then
        cd $gitPath
        #判断是否存在git目录
        if [ ! -d ".git" ]; then
                echo "在该目录下克隆 git"
                sudo git clone $gitHttp gittemp
                sudo mv gittemp/.git .
                sudo rm -rf gittemp
        fi
        echo "拉取最新的项目文件"
        #sudo git reset --hard origin/master
        sudo git pull        
        echo "设置目录权限"
        sudo chown -R www:www $gitPath
        echo "End"
        exit
else
        echo "该项目路径不存在"
        echo "新建项目目录"
        mkdir $gitPath
        cd $gitPath
        #判断是否存在git目录
        if [ ! -d ".git" ]; then
                echo "在该目录下克隆 git"
                sudo git clone $gitHttp gittemp
                sudo mv gittemp/.git .
                sudo rm -rf gittemp
        fi
        echo "拉取最新的项目文件"
        #sudo git reset --hard origin/master
        sudo git pull
        echo "设置目录权限"
        sudo chown -R www:www $gitPath
        echo "End"
        exit
fi

```

![宝塔WebHook](/宝塔WebHook.png)

点击查看秘钥，复制脚本地址和秘钥

![查看密钥](/查看密钥.png)

然后到码云配置[webhook]

![添加WebHook](/添加WebHook.png)

选择事件根据自己的情况选择即可

创建完后，我们可以看到他默认请求了一次，也可以自己进行测试，直接点后面的测试即可，然后点击下面的查看更多，可以查看更多的详细信息

![WebHooks管理](/WebHooks管理.png)

![请求历史](/请求历史.png)

然后我们回到[宝塔]刷新查看[webhook]日志，可以看到已经调用了两次了

![请求历史](/请求历史2.png)

注意事项

如果[webhook]执行了，查看推送过来的代码并没有创建成功，很有可能是权限的问题

我们尝试手动拉取一次，提示[gitee.com]不可信，这下找到原因了，直接根据提示输入yes 即可，后面的就可以实时的推送过来了

```
The authenticity of host 'gitee.com (212.64.62.183)' can't be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
ECDSA key fingerprint is MD5:27:e5:d3:f7:2a:9e:eb:6c:93:cd:1f:c1:47:a3:54:b1.
Are you sure you want to continue connecting (yes/no)?
```

# 补充
转载的执行脚本有问题，最终使用脚本：
```
#!/bin/bash

sudo ssh-add /root/.ssh/id_rsa
sudo ssh-add -l |cat
echo ""
#输出当前时间
date --date='0 days ago' "+%Y-%m-%d %H:%M:%S"
echo "Start"
#判断宝塔webhook参数是否存在
if [ ! -n "$1" ];
then 
  echo "param参数错误"
  echo "End"
  exit
fi
#git项目路径
gitPath="/www/wwwroot/$1"
#git 网址两种方式都可以ssh 或者https
gitHttp="git@gitee.com:xxx/$1.git"
#gitHttp="git@gitee.com:xxx/$1.git"
echo "Web站点路径：$gitPath,git地址:$gitHttp"
#判断项目路径是否存在
if [ -d "$gitPath" ]; then
  cd $gitPath
  #判断是否存在git目录
  if [ ! -d ".git" ]; then
    echo "在该目录下克隆 git"
    sudo git clone $gitHttp gittemp
    sudo mv gittemp/.git .
    sudo mv gittemp/* .
    sudo rm -rf gittemp
  fi
  echo "拉取最新的项目文件"
  #sudo git reset --hard origin/master
  sudo git pull        
  echo "设置目录权限"
  sudo chown -R www:www $gitPath
  echo "End"
  exit
else
  echo "该项目路径不存在"
  echo "新建项目目录"
  mkdir $gitPath
  cd $gitPath
  #判断是否存在git目录
  if [ ! -d ".git" ]; then
    echo "在该目录下克隆 git"
    sudo git clone $gitHttp gittemp
    sudo mv gittemp/.git .
    sudo mv gittemp/* .
    sudo rm -rf gittemp
  fi
  echo "拉取最新的项目文件"
  #sudo git reset --hard origin/master
  sudo git pull
  echo "设置目录权限"
  sudo chown -R www:www $gitPath
  echo "End"
  exit
fi
```

著作权归作者所有。
商业转载请联系作者获得授权，非商业转载请注明出处。
作者：ECHO陈文
链接：https://www.luweipai.cn/ops/1628733995/
来源：芦苇派