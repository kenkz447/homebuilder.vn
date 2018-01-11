
import * as scrollTo from 'scroll-to'

function calculateScrollOffset(elem, additionalOffset, alignment, elementToScroll?) {
  const body = document.body,
    html = document.documentElement

  const elemRect = elem.getBoundingClientRect()
  const clientHeight = html.clientHeight
  const documentHeight = Math.max(body.scrollHeight, body.offsetHeight,
    html.clientHeight, html.scrollHeight, html.offsetHeight)

  additionalOffset = additionalOffset || 0

  let scrollPosition
  if (alignment === 'bottom') {
    scrollPosition = elemRect.bottom - clientHeight
  } else if (alignment === 'middle') {
    scrollPosition = elemRect.bottom - clientHeight / 2 - elemRect.height / 2
  } else { // top and default
    scrollPosition = elemRect.top
  }

  const maxScrollPosition = documentHeight - clientHeight
  return Math.min(scrollPosition + additionalOffset + window.pageYOffset,
    maxScrollPosition)
}

export function scrollToElement(elem, options?) {
  options = options || {}
  if (typeof elem === 'string')
    elem = document.querySelector(elem)
  if (elem)
    return scrollTo(0, calculateScrollOffset(elem, options.offset, options.align, options.elementToScroll), options)
}