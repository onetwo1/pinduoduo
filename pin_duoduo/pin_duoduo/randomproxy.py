# 自定义代理中间件 - 作用: 1, 更换代理 2. 更换 UA 3. 出错更换代理重爬
import time
import random
import requests
# from fake_useragent import UserAgent


class ResponseCodeError(Exception):
    """响应状态码非 200 异常"""
    pass


class RandomProxy(object):

    def __init__(self):
        self.proxies_list = []
        # self.ua = UserAgent()

    @classmethod
    def from_crawler(cls, crawler):
        return cls()

    def save_proxies(self):
        """自己获取代理的接口函数"""
        while True:
            response = requests.get("代理接口")
            data = response.json()
            code = data.get("ERRORCODE")
            result = data.get("RESULT")
            if code == "0" and result:
                return self.proxies_list.extend(result)
            time.sleep(1)

    def get_random_proxies(self):
        if not self.proxies_list:
            self.save_proxies()
        return random.choice(self.proxies_list)

    def del_proxies(self, proxy_value):
        try:
            self.proxies_list.remove(proxy_value)
        except Exception as e:
            pass

    def process_request(self, request, spider):
        proxy = self.get_random_proxies()
        request.meta['proxy'] = "http://{ip}:{port}".format(**proxy)
        request.meta['proxy_value'] = proxy
        print("set proxy : ", proxy)
        # request.headers.setdefault("User-Agent", self.ua.random)

    def process_exception(self, request, exception, spider):
        proxy_value = request.meta["proxy_value"]
        self.del_proxies(proxy_value)
        return request.replace(url=request.url, dont_filter=True)

    def process_response(self, request, response, spider):
        if response.status == 200:
            return response
        # 出错会引发异常而进入 process_exception 逻辑, 更换代理重抓
        raise ResponseCodeError
