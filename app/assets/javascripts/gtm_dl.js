import * as nuanceWatcher from './waitForChanges'
import * as nuanceCIAPIWatcher from './waitForCIAPIFixedChanges'
import * as chatListener from './cuiChatListener'
import * as webchatListener from './webchatListener'

if (!window.isCUI) {
    nuanceWatcher.waitForChanges(window, document);
    if (!window.location.pathname.includes("virtual-assistant")) {
        webchatListener.initChatListener(window)
    }
} else {
    if (document.getElementById("HMRC_CIAPI_Fixed_1")){
        nuanceCIAPIWatcher.waitForCIAPIFixedChanges(window, document)
    }
    chatListener.initChatListener(window)
}

