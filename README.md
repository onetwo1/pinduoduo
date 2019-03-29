## 拼多多加密参数解析 

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

        node merge.js http://yangkeduo.com/catgoods.html
```



## 全站抓取


#### 步骤一: 获取一级二级分类,并处理

```txt 
    文件路径: pin_duoduo/pin_duoduo/utils.py
    执行过程: process_first() => 生成 pdd_first.json 文件
    执行结果: 一级分类二级分类信息保存完成
```

#### 步骤二: 进行准备工作, 获取三级分类

```txt 
    文件路径: pin_duoduo/pin_duoduo/spiders/readyWork.py
    执行过程: 通过运行 scrapy 爬虫 readyWork 获取二级分类的首页来获取三级分类 => 生成 work.json 文件
    执行结果: 三级分类信息保存完成
```

#### 步骤三: 获取列表数据(只进行到这一步, 没有进详情页, 基本数据在列表页即可获取完成)

```txt 
    文件路径: pin_duoduo/pin_duoduo/spiders/pdd.py
    执行过程: 通过运行 scrapy 爬虫 pdd 循环获取列表数据(测试只获取 5 页数据) => 生成 data.json 文件
    执行结果: 总体流程完成,数据获取成功
```

## 说明

```python 

    """
        pdd_sanic 是使用 sanic 简单写的一个 web 服务, 通过 post api 来获取数据(没有使用)
    
        使用方式: 首先运行 run.py 文件, 然后运行 _test.py 即可看到效果
    """
    
    """
        pdd_search.py 是搜索接口数据获取的方式, 可以用来帮助改写成按关键字搜索的爬虫
    """
    
    
    """
        randomproxy.py 是自定义的 scrapy 中间件, 实现代理更换 | user-agent 更换 | 请求出错时更换代理并重爬等功能, 
        可以直接将这个中间件应用到其它 scrapy 爬虫项目中
    """
    
    
    """
        pipelines.py 中直接使用 scrapy 提供的 exporters.JsonItemExporter 进行数据存储, 
        并且在存储列表数据时直接将 json 数据保存, 并没有定义 item 
    """
```











