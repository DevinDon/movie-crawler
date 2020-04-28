export interface Result {
  id?: string;
  title: string;
  image: string;
  url: string;
  type: string;
  year: string;
  description?: string;
}

// 详情页面
// GET https://www.pianku.tv/mv/wNnZjYidja.html
// 下载地址请求
// GET https://www.pianku.tv/ajax/downurl/{{id}}/
// 搜索请求
// GET https://www.pianku.tv/s/ajax.php?q={{keyword}}
