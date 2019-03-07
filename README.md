## 拼多多爬虫 

#### 文件说明

```txt 
    1.txt     -> 测试获取的数据
    pdd.py    -> python 运行文件
    merge.js  -> 获取 anti_content 加密参数的 js 合并文件

    Get_c
    Get_i
    Get_s
    Get_u

    上述四个 js 文件是为了解密 anti_content 参数而需要的 4 个对象(在 merge.js 中已经包含使用, 这里是为了方便查看)
 ```

#### 测试使用

```txt 
    运行代码(会生成 1.txt 文件将获取数据写入):

        python3 pdd.py

    只获取 anti_content 结果: 

        node merge.js `referer_page_url`

    其中 referer_page_url 是需要的来源 url , python 生成示例:
```
```python 
    def getRandomString(e):
        e = 32 if not e else e
        t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
        r = ""
        for i in range(e):
            _ = math.floor(random.random()*len(t))
            if _ < len(t):
                r+= t[_]
        return r

    def getTimeStamp():
        return int(round(time.time() * 1000))

    referer_page_id = f"10031_{str(getTimeStamp())}_{getRandomString(10)}"
    referer_page_url = f"""http://yangkeduo.com/catgoods.html?opt_id=2715&opt_type=2&opt_name=%e8%a3%99%e8%a3%85&opt_g=1&refer_page_name=search&refer_page_id={referer_page_id}&refer_page_sn=10031"""
```

