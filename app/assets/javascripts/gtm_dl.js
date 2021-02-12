import * as nuanceWatcher from './waitForChanges'
import * as chatListener from './cuiChatListener'

if (!window.isCUI) {
    nuanceWatcher.waitForChanges(window, document);
} else {
    chatListener.initChatListener(window)
}
