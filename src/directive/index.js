import nodata from "./module/nodata"
import draggable from "./module/draggable"
import scroll from "./module/scroll"

export default function install(app) {
  // 无数据占位符
  // v-nodata.暂无数据="list.length === 0"
  app.directive('nodata', nodata)

  // 滚动回调方法。默认滚动到底部
  // v-scroll.bottom="callback[Function]"
  app.directive('scroll', scroll)

  // 自由拖动方法
  // v-draggable="{left:0,top:0}"
  app.directive('draggable', draggable)
}
