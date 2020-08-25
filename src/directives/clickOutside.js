export default {
  bind(el, binding){
    const { method, elemToExclude } = binding.value
    // const elToExclude = document.querySelector(elemToExclude)
    
    el.__ClickOutSideCB__ = (event) => {
      if(!(el === event.target || el.contains(event.target) )) {
        method(event)
      }
    }
    document.body.addEventListener("click", el.__ClickOutSideCB__)
  },
  unbind(el) {
    document.body.removeEventListener("click", el.__ClickOutSideCB__)
  }
}