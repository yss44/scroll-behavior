import { POP } from 'history/lib/Actions'

import scrollTo from './utils/scrollTo'

/**
 * `useSimpleScroll` scrolls to the top of the page on `PUSH` and `REPLACE`
 * transitions, while allowing the browser to manage scroll position for `POP`
 * transitions.
 *
 * This can give pretty good results with synchronous transitions on browsers
 * like Chrome that don't update the scroll position until after they've
 * notified `history` of the location change. It will not work as well when
 * using asynchronous transitions or with browsers like Firefox that update
 * the scroll position before emitting the location change.
 */
export default function useSimpleScroll(createHistory) {
  return options => {
    const history = createHistory(options)

    // Don't override the browser's scroll behavior here - we actively want the
    // browser to take care of scrolling on `POP` transitions.

    history.listen(({ action }) => {
      if (action === POP) {
        return
      }

      scrollTo(0, 0)
    })

    return history
  }
}
