import * as nuanceWatcher from './waitForChanges'
import * as chatListener from './cuiChatListener'
import * as webchatListener from './webchatListener'

if (!window.isCUI) {
    nuanceWatcher.waitForChanges(window, document);
    if (!window.location.pathname.includes("virtual-assistant")) {
        webchatListener.initChatListener(window)
    }
} else {
    chatListener.initChatListener(window)
}

