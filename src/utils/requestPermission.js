export default function (permission) {
  // cordova 权限申请
  // var permissions = cordova.plugins.permissions
  // permissions.checkPermission(permission, successCallback, errorCallback);//校验权限
  // permissions.requestPermission(permission, successCallback, errorCallback);//申请权限
  // permissions.requestPermissions(permissions, successCallback, errorCallback);//申请权限集合

  const permissions = cordova.plugins.permissions
  //校验app是否有安卓写入权限
  permissions.checkPermission(permissions[permission], function (s) {
    //hasPermission 验证是否成功
    if (!s.hasPermission) {
      //没有权限
      //app申请写入权限
      permissions.requestPermission(permissions[permission], function (s) {
        if (s.hasPermission) {
          //申请成功
        }
        else {
          //申请失败
          console.log('申请失败:', permission)
        }
      }, function (error) {
        console.log('错误：', permission, error)
      })
    } else {
      //拥有权限
    }
  }, function (error) {
    console.log('错误：', permission, error)
  })
}


/**
1 . Android应用想使用任何系统资源，必须去申请Android的权限。这就是<uses-permission>元素的作用。

2 . 想要获得networking APIs的使用权限，我们指定如下的元素作为 <manifest>的子元素。

3 . 一个权限通常有以下格式，用一个名字为name 的字符串去指导我们希望使用的权限。

<uses-permission android:name="string"/>

4 . 想要获得networking APIs的使用权限，我们指定如下的元素作为 <manifest>的子元素
<uses-permission android:name="android.permission.INTERNET"/>
5 . 如果还需要添加其他的元素，我们只需简单的添加更多的<uses-permission>就行了。下面是网上收集的关于Android uses-permission资料带中文注释

//允许应用程序访问和修改checkin数据库中”properties”表数据
android.permission.ACCESS_CHECKIN_PROPERTIES
//允许应用程序通过WiFi或移动基站获取粗略的位置信息
android.permission.ACCESS_COARSE_LOCATION
//允许应用程序通过GPS获取精确的位置信息
android.permission.ACCESS_FINE_LOCATION
//允许应用程序访问额外的位置提供者命令
android.permission.ACCESS_LOCATION_EXTRA_COMMANDS
//允许应用程序获取模拟定位信息用于开发者调试应用
android.permission.ACCESS_MOCK_LOCATION
//允许应用程序获取网络信息状态
android.permission.ACCESS_NETWORK_STATE
//允许应用程序使用SurfaceFlinger底层图形显示支持,一般用于游戏或照相机预览界面和底层模式的屏幕截图
android.permission.ACCESS_SURFACE_FLINGER
//允许应用程序访问Wi-Fi网络状态信息
android.permission.ACCESS_WIFI_STATE
//允许应用程序获取账户验证信息，主要为GMail账户信息，只有系统级进程才能访问的权限
android.permission.ACCOUNT_MANAGER
//允许应用程序使用语音邮件
com.android.voicemail.permission.ADD_VOICEMAIL
//允许应用程序通过账户验证方式访问账户管理ACCOUNT_MANAGER相关信息
android.permission.AUTHENTICATE_ACCOUNTS
//允许应用程序更新手机电池统计信息
android.permission.BATTERY_STATS
//允许应用程序绑定小插件,告诉appWidget服务需要访问小插件的数据库
android.permission.BIND_APPWIDGET
//允许应用程序绑定设备管理,请求系统管理员接收者receiver，只有系统才能使用
android.permission.BIND_DEVICE_ADMIN
//允许应用程绑定输入法,请求InputMethodService服务，只有系统才能使用
android.permission.BIND_INPUT_METHOD
//允许应用程绑定RemoteView,必须通过RemoteViewsService服务来请求，只有系统才能用
android.permission.BIND_REMOTEVIEWS
//要求有一个TextService，如SpellCheckerService（拼写检查服务），来确保只有系统能够与之交互
android.permission.BIND_TEXT_SERVICE
//要求有一个VpnService，来确保只有系统能够与之交互
android.permission.BIND_VPN_SERVICE
//允许应用程绑定壁纸,必须通过WallpaperService服务来请求，只有系统才能用
android.permission.BIND_WALLPAPER
//允许应用程序连接配对过的蓝牙设备
android.permission.BLUETOOTH
//允许应用程序管理蓝牙,搜索和配对新的蓝牙设备
android.permission.BLUETOOTH_ADMIN
//允许应用程序能够禁用设备(非常危险)
android.permission.BRICK
//允许应用程序在删除时触发一个提示消息
android.permission.BROADCAST_PACKAGE_REMOVED
//允许应用程序收到短信时触发一个广播
android.permission.BROADCAST_SMS
//允许应用程序收到广播后快速收到下一个广播
android.permission.BROADCAST_STICKY
//允许应用程序WAP PUSH服务收到后触发一个广播
android.permission.BROADCAST_WAP_PUSH
//允许应用程序拨打电话,从非系统拨号器里初始化一个电话拨号
android.permission.CALL_PHONE
//允许应用程序拨打任何号码，包含紧急号码无需通过拨号用户界面
android.permission.CALL_PRIVILEGED
//允许应用程序访问摄像头
android.permission.CAMERA
//允许应用程序改变组件是否启用的状态
android.permission.CHANGE_COMPONENT_ENABLED_STATE
//允许应用程序修改当前设置，如本地化
android.permission.CHANGE_CONFIGURATION
//允许应用程序改变网络连接状态
android.permission.CHANGE_NETWORK_STATE
//允许应用程序设置WiFi连接多模式
android.permission.CHANGE_WIFI_MULTICAST_STATE
//允许应用程序改变Wi-Fi连接状态
android.permission.CHANGE_WIFI_STATE
//允许应用程序清除应用缓存
android.permission.CLEAR_APP_CACHE
//允许应用程序清除应用的用户数据
android.permission.CLEAR_APP_USER_DATA
//允许应用程序从无线模块启用/禁止位置更新提示
android.permission.CONTROL_LOCATION_UPDATES
//允许应用程序删除缓存文件
android.permission.DELETE_CACHE_FILES
//允许应用程序删除应用
android.permission.DELETE_PACKAGES
//允许应用程序底层电源管理
android.permission.DEVICE_POWER
//允许应用程序RW诊断资源
android.permission.DIAGNOSTIC
//允许应用程序禁用键盘锁
android.permission.DISABLE_KEYGUARD
//允许应用程序从系统服务检索状态转储信息
android.permission.DUMP
//允许应用程序扩展或收缩状态栏
android.permission.EXPAND_STATUS_BAR
//允许应用程序运行工厂测试模式
android.permission.FACTORY_TEST
//允许应用程序访问闪光灯
android.permission.FLASHLIGHT
//允许应用程序强制使用back后退按键，无论Activity是否在顶层
android.permission.FORCE_BACK
//允许应用程序访问GMail账户列表
android.permission.GET_ACCOUNTS
//允许应用程序获取应用的文件大小
android.permission.GET_PACKAGE_SIZE
//允许应用程序获取当前或最近运行的应用
android.permission.GET_TASKS
//允许应用程序使用全局搜索功能
android.permission.GLOBAL_SEARCH
//允许应用程序访问硬件辅助设备，用于硬件测试
android.permission.HARDWARE_TEST
//允许应用程序访问本程序的底层事件
android.permission.INJECT_EVENTS
//允许应用程序安装定位提供者
android.permission.INSTALL_LOCATION_PROVIDER
//允许应用程序安装应用
android.permission.INSTALL_PACKAGES
//允许应用程序开内部窗口，不对第三方应用程序开放此权限
android.permission.INTERNAL_SYSTEM_WINDOW
//允许应用程序访问网络连接
android.permission.INTERNET
//允许应用程序调用killBackgroundProcesses(String)方法结束后台进程
android.permission.KILL_BACKGROUND_PROCESSES
//允许应用程序管理AccountManager中的账户列表
android.permission.MANAGE_ACCOUNTS
//允许应用程序管理程序引用
android.permission.MANAGE_APP_TOKENS
//允许应用程序执行软格式化，删除系统配置信息
android.permission.MASTER_CLEAR
//允许应用程序修改全局音频设置
android.permission.MODIFY_AUDIO_SETTINGS
//允许应用程序修改电话状态，如飞行模式等
android.permission.MODIFY_PHONE_STATE
//允许应用程序格式化可移动文件系统，比如格式化清空SD卡
android.permission.MOUNT_FORMAT_FILESYSTEMS
//允许应用程序挂载、卸载外部文件系统
android.permission.MOUNT_UNMOUNT_FILESYSTEMS
//允许应用程序执行NFC近距离通讯操作
android.permission.NFC
//允许应用程序创建一个永久的Activity
android.permission.PERSISTENT_ACTIVITY
//允许应用程序监视、修改外拨电话
android.permission.PROCESS_OUTGOING_CALLS
//允许应用程序读取用户日历数据
android.permission.READ_CALENDAR
//允许应用程序读取通话记录
android.permission.READ_CALL_LOG
//允许应用程序读取联系人通讯录信息
android.permission.READ_CONTACTS
//允许应用程序读取扩展存储器
android.permission.READ_EXTERNAL_STORAGE
//允许应用程序读取帧缓存用于屏幕截图
android.permission.READ_FRAME_BUFFER
//允许应用程序读取浏览器收藏夹和历史记录
com.android.browser.permission.READ_HISTORY_BOOKMARKS
//允许应用程序读取当前键的输入状态，仅用于系统
android.permission.READ_INPUT_STATE
//允许应用程序读取系统底层日志
android.permission.READ_LOGS
//允许应用程序读取电话状态
android.permission.READ_PHONE_STATE
//允许应用程序读取用户的个人信息资料
android.permission.READ_PROFILE
//允许应用程序读取短信内容
android.permission.READ_SMS
//允许应用程序读取用户的社交流数据
android.permission.READ_SOCIAL_STREAM
//允许应用程序读取同步设置，读取Google在线同步设置
android.permission.READ_SYNC_SETTINGS
//允许应用程序读取同步状态，读取Google在线同步设置
android.permission.READ_SYNC_STATS
//允许应用程序读取用户词典Provider取得数据
android.permission.READ_USER_DICTIONARY
//允许应用程序重新启动设备
android.permission.REBOOT
//允许应用程序开机自动运行
android.permission.RECEIVE_BOOT_COMPLETED
//允许应用程序接收彩信
android.permission.RECEIVE_MMS
//允许应用程序接收短信
android.permission.RECEIVE_SMS
//允许应用程序接收WAP PUSH信息
android.permission.RECEIVE_WAP_PUSH
//允许应用程序录制音频
android.permission.RECORD_AUDIO
//允许应用程序改变Z轴排列任务
android.permission.REORDER_TASKS
//允许应用程序重新启动其他程序
android.permission.RESTART_PACKAGES
//允许应用程序发送短信
android.permission.SEND_SMS
//允许应用程序监控或控制系统中已经启动的activities
android.permission.SET_ACTIVITY_WATCHER
//允许应用程序设置闹铃提醒
com.android.alarm.permission.SET_ALARM
//允许应用程序设置程序在后台是否总是退出
android.permission.SET_ALWAYS_FINISH
//设置全局动画缩放
android.permission.SET_ANIMATION_SCALE
//设置调试程序，一般用于开发
android.permission.SET_DEBUG_APP
//允许底层访问设置屏幕方向和实际旋转
android.permission.SET_ORIENTATION
//允许底层访问设置指针速度
android.permission.SET_POINTER_SPEED
//允许应用程序设置应用的参数
android.permission.SET_PREFERRED_APPLICATIONS
//允许应用程序设置最大的运行进程数量
android.permission.SET_PROCESS_LIMIT
//允许应用程序设置系统时间
android.permission.SET_TIME
//允许应用程序设置系统时区
android.permission.SET_TIME_ZONE
//允许应用程序设置桌面壁纸
android.permission.SET_WALLPAPER
//允许应用程序设置壁纸建议
android.permission.SET_WALLPAPER_HINTS
//允许应用程序请求发送信号到所有显示的进程中
android.permission.SIGNAL_PERSISTENT_PROCESSES
//允许应用程序打开、关闭或禁用状态栏及图标
android.permission.STATUS_BAR
//允许应用程序访问订阅RSS Feed内容提供者
android.permission.SUBSCRIBED_FEEDS_READ
//允许应用程序写入或修改订阅RSS Feed内容提供者的数据
android.permission.SUBSCRIBED_FEEDS_WRITE
//允许应用程序打开系统窗口，显示其他应用程序
android.permission.SYSTEM_ALERT_WINDOW
//允许应用程序更新设备状态
android.permission.UPDATE_DEVICE_STATS
//允许应用程序请求从AccountManager验证
android.permission.USE_CREDENTIALS
//允许应用程序使用SIP视频服务
android.permission.USE_SIP
//允许访问振动设备
android.permission.VIBRATE
//允许应用程序在手机锁屏后进程仍然运行
android.permission.WAKE_LOCK
//允许应用程序写入网络GPRS接入点设置
name="android.permission.WRITE_APN_SETTINGS
//允许应用程序写入用户日程，但不可读取
android.permission.WRITE_CALENDAR
//允许应用程序写入通话记录
android.permission.WRITE_CALL_LOG
//允许应用程序写入联系人，但不可读取
android.permission.WRITE_CONTACTS
//允许应用程序写入外部存储，如SD卡上写文件
android.permission.WRITE_EXTERNAL_STORAGE
//允许应用程序写入Google Map服务数据
android.permission.WRITE_GSERVICES
//允许应用程序写入浏览器历史记录或收藏夹，但不可读取
com.android.browser.permission.WRITE_HISTORY_BOOKMARKS
//允许应用程序写用户个人档案资料,但不可读取
android.permission.WRITE_PROFILE
//允许应用程序写入安全设置
android.permission.WRITE_SECURE_SETTINGS
//允许应用程序读取或写入系统设置
android.permission.WRITE_SETTINGS
//允许应用程序写短信
android.permission.WRITE_SMS
//允许应用程序写用户的社交流数据，但不可读取
android.permission.WRITE_SOCIAL_STREAM
//允许程序Google在线同步设置
android.permission.WRITE_SYNC_SETTINGS
//允许应用程写入取用户词典Provider的数据
android.permission.WRITE_USER_DICTIONARY
 */
