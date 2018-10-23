let Vue

function extend (Vue) {
  Vue.directive('animation', (el, binding, vnode) => {
    const params = binding.value
    let delay = (params.delay || 0)
    if (params.value) {
      window.setTimeout(() => { el.classList.add('appear') }, 10 + delay)
    } else {
      window.setTimeout(() => { el.classList.remove('appear') }, 10 + delay)
    }
  })
}

function _install (_Vue) {
  Vue = _Vue
  extend(Vue)
}

let Animation = function Animation (options = {}) {}

Animation.install = _install
Animation.version = '0.0.1'

export default Animation
