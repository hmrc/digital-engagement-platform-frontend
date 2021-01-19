import * as nuanceWatcher from './waitForChanges'

if (window.isCUI) {
    nuanceWatcher.waitForCUI(window, document);
} else {
    nuanceWatcher.waitForChanges(window, document);
}
