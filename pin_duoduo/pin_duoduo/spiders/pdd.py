# -*- coding: utf-8 -*-
"""开始抓取: 从 data > work.json 中拼接处三级列表页连接请求并翻页获取数据 ==goods_list== """
import os
import json
import scrapy
from urllib.parse import urlencode
from pin_duoduo.utils import get_random_string, get_anti_content


class PddSpider(scrapy.Spider):
    name = 'pdd'
    custom_settings = dict(
        COOKIES_ENABLED=False,  # 禁用 cookie
        RETRY_ENABLED=False,    # 重试中间件 指定关闭 默认为 True 是开启状态
        DOWNLOAD_TIMEOUT=15.0,
        # HTTPERROR_ALLOWED_CODES=[302, 500, 502, 404, 403, 503]
        ITEM_PIPELINES={'pin_duoduo.pipelines.JsonExportDataPipeline': 300}
    )
    headers = {
        'AccessToken': "R63WNH4E64IV5CZSCI77CLIYEEV4KV47D6Y6SZNZ4HJRYPCY755Q103d93f",
        'Content-Type': "application/x-www-form-urlencoded;charset=UTF-8",
        'Origin': "http://yangkeduo.com",
        'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_2) "
                      "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36",
    }

    def start_requests(self):
        data_path = self.settings.get('DATA_PATH')
        js_path = self.settings.get('JS_FILE_PATH')
        file_path = os.path.join(data_path, 'work.json')
        with open(file_path, "r", encoding="utf8") as f:
            data_list = json.loads(f.read(), encoding="utf8")

        for data in data_list:
            tab_name = data["tabName"]
            opt_name = data["optName"]
            opt_infos = data["optInfos"]
            if not opt_infos:
                continue
            for opt_info in opt_infos[:1]:
                opt_id = opt_info.get('id')
                info_name = opt_info.get('opt_name')
                offset = 0
                # 测试只取前 5 页数据
                for i in range(5):
                    group_params = dict(
                        offset=offset,
                        size=100,
                        opt_type=3,
                        sort_type="DEFAULT",
                        list_id=f"{opt_id}_rec_list_catgoods_{get_random_string(6)}",
                        anti_content=str(get_anti_content(opt_id=opt_id, opt_name=info_name, opt_type=3)),
                        pdduid=0
                    )
                    url = "http://apiv3.yangkeduo.com/v4/operation/{}/groups?".format(opt_id)
                    cat_url = f'{url}{urlencode(group_params)}'
                    yield scrapy.Request(cat_url, headers=self.headers, meta={"tabName": tab_name,
                                                                               "optName": opt_name,
                                                                               "info_name": info_name})
                    offset += 20

    def parse(self, response):
        text = response.text
        try:
            json_data = json.loads(text)
            goods_list = json_data["goods_list"]
            for goods in goods_list:
                yield goods
        except Exception as e:
            self.logger.error(text)
            return
