# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html
import os
from scrapy.exporters import JsonItemExporter


class PinDuoduoPipeline(object):
    def process_item(self, item, spider):
        return item


class JsonExportReadyWorkPipeline(object):
    def __init__(self, settings):
        data_path = os.path.join(settings.get('DATA_PATH'), "work.json")
        self.save_file = open(data_path, "wb")
        self.exporter = JsonItemExporter(self.save_file, encoding="utf8", ensure_ascii=False)
        self.exporter.start_exporting()

    @classmethod
    def from_crawler(cls, crawler):
        settings = crawler.settings
        return cls(settings)

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.save_file.close()

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        self.exporter.file.write(b'\n')
        return item


class JsonExportDataPipeline(object):
    def __init__(self, settings):
        data_path = os.path.join(settings.get('DATA_PATH'), "data.json")
        self.save_file = open(data_path, "wb")
        self.exporter = JsonItemExporter(self.save_file, encoding="utf8", ensure_ascii=False)
        self.exporter.start_exporting()

    @classmethod
    def from_crawler(cls, crawler):
        settings = crawler.settings
        return cls(settings)

    def close_spider(self, spider):
        self.exporter.finish_exporting()
        self.save_file.close()

    def process_item(self, item, spider):
        self.exporter.export_item(item)
        self.exporter.file.write(b'\n')
        return item
