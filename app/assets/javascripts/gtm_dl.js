import * as nuanceWatcher from './waitForChanges'

if (!window.isCUI) {
    nuanceWatcher.waitForChanges(window, document);
}

