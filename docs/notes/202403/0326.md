>团队协作离不开[git](https://www.luweipai.cn/tag/git/ "git")仓库，今天来给大家介绍一下配置[宝塔](https://www.luweipai.cn/tag/%e5%ae%9d%e5%a1%94/ "宝塔")上面的web hooks ,实现将本地代码提交到码云仓库后自己 更新到云服务器

一、在[宝塔](https://www.luweipai.cn/tag/%e5%ae%9d%e5%a1%94)面板中的软件中安装”[宝塔](https://www.luweipai.cn/tag/%e5%ae%9d%e5%a1%94)[webhook](https://www.luweipai.cn/tag/webhook)”，没有安装的直接点安装就行

![image.png](https://upload-images.jianshu.io/upload_images/2219799-0fd13d667fad6d1a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

二、生成公钥（私有仓库一定要配置）

直接根据提示，回车下一步就行

```
ssh-keygen -t rsa
```

![image.png](https://upload-images.jianshu.io/upload_images/2219799-25b0d3c7e9d1be83.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

三，查看公钥，并复制到码云[git](https://www.luweipai.cn/tag/git)ee仓库

```
cat /root/.ssh/id_rsa.pub
```

![image.png](https://upload-images.jianshu.io/upload_images/2219799-7842d6ee240e7712.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

四、创建[webhook](https://www.luweipai.cn/tag/webhook/ "webhook")s脚本

![image.png](https://upload-images.jianshu.io/upload_images/2219799-3318ece871e6f5ee.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

名称随便起就行

执行脚本可以参考以下，注意$1 [git](https://www.luweipai.cn/tag/git) 仓库最好和文件夹一致，如果不一致，可以根据自己的情况改一下下面的代码

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

![image.png](https://upload-images.jianshu.io/upload_images/2219799-dcc62ed2ece8d73b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

点击查看秘钥，复制脚本地址和秘钥

![image.png](https://upload-images.jianshu.io/upload_images/2219799-172a1a28dc519d97.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后到码云配置[webhook](https://www.luweipai.cn/tag/webhook)

![image.png](https://upload-images.jianshu.io/upload_images/2219799-f1e09669f7734a82.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

选择事件根据自己的情况选择即可

创建完后，我们可以看到他默认请求了一次，也可以自己进行测试，直接点后面的测试即可，然后点击下面的查看更多，可以查看更多的详细信息

![image.png](https://upload-images.jianshu.io/upload_images/2219799-0e39b2c29da297f7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![image.png](https://upload-images.jianshu.io/upload_images/2219799-c9c2e2bbf7b40bc9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

然后我们回到[宝塔](https://www.luweipai.cn/tag/%e5%ae%9d%e5%a1%94)刷新查看[webhook](https://www.luweipai.cn/tag/webhook) 日志，可以看到已经调用了两次了

![image.png](https://upload-images.jianshu.io/upload_images/2219799-8094d032babe64df.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

注意事项

如果[webhook](https://www.luweipai.cn/tag/webhook)执行了，查看推送过来的代码并没有创建成功，很有可能是权限的问题

我们尝试手动拉取一次，提示[git](https://www.luweipai.cn/tag/git)ee.com 不可信，这下找到原因了，直接根据提示输入yes 即可，后面的就可以实时的推送过来了

```
The authenticity of host 'gitee.com (212.64.62.183)' can't be established.
ECDSA key fingerprint is SHA256:FQGC9Kn/eye1W8icdBgrQp+KkGYoFgbVr17bmjey0Wc.
ECDSA key fingerprint is MD5:27:e5:d3:f7:2a:9e:eb:6c:93:cd:1f:c1:47:a3:54:b1.
Are you sure you want to continue connecting (yes/no)?
```

著作权归作者所有。
商业转载请联系作者获得授权，非商业转载请注明出处。
作者：ECHO陈文
链接：https://www.luweipai.cn/ops/1628733995/
来源：芦苇派

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
