/**
 * 搜索结果。
 */
export interface Summary {

  /**
   * 豆瓣 ID
  */
  id: string;

  /**
   * 类别，电影、电视剧、音乐短片等
   */
  type: string;

  /**
   * 封面
   */
  image: string;

  /**
   * 标题
   */
  title: string;

  /**
   * 年份
   */
  year: number;

  /**
   * 评分
   */
  rating: number;

  /**
   * 热度
   */
  hot: number;

  /**
   * 关键字
   */
  keywords: string[];

  /**
   * 描述
   */
  description: string;

}
