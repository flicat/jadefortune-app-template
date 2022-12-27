// 无数据占位符
// v-nodata.暂无数据="list.length === 0"

export default {
  mounted(el, binding) {
    el.dataset.nodata = binding.arg || '暂无数据'
    binding.value ? el.classList.add('pl-v-nodata') : el.classList.remove('pl-v-nodata')
  },
  updated(el, binding) {
    binding.value ? el.classList.add('pl-v-nodata') : el.classList.remove('pl-v-nodata')
  },
  unmounted(el) {
    el.classList.remove('pl-v-nodata')
  }
}
