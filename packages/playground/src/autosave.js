import { getRecord, putRecord, deleteRecord } from './indexedDB.js';

export class AutosaveManager {
  constructor(editorInstance, playgroundInstance, showNotification, loadDefaultCode) {
    this.editor = editorInstance;                   // CodeMirror EditorView instance
    this.playground = playgroundInstance;          // Playground instance (to check running state, file info)
    this.showNotification = showNotification;      // Function to show notifications
    this.loadDefaultCode = loadDefaultCode;        // Function for resetting to default code
    
    this.autosaveInterval = 5000;                   // Autosave interval 5s
    this.debounceDelay = 400;                        // Debounce delay on doc changes
    this.debounceTimer = null;
    this.lastContent = '';
    
    this.isDirty = false;                            // Tracks if content changed since last save

    this.setupEventListeners();
    this.restoreContent();                           // Load saved content on start
    this.startAutosaveLoop();
  }
  
//   getCurrentKey() {
//     const file = this.playground.currentFile;
//     if (file && file.path) {
//       return `file:${encodeURIComponent(file.path)}`;
//     } else {
//       const lang = document.getElementById('language-select').value;
//       return `lang:${lang}`;
//     }
//   }

  getCurrentKey() {
    const lang = document.getElementById('language-select').value;
    return `lang:${lang}`;
    }

  
  handleEditorUpdate(update) {
  if (update.docChanged) {
    this.isDirty = true;
    this.lastChangeTime = Date.now();
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.saveIfDirty(), this.debounceDelay);
  }
}

  async restoreContent() {
    const key = this.getCurrentKey();
    console.log('Attempting restore with key:', key);
    const record = await getRecord(key);
    if (record && record.content) {
        const language = record.language; 
        const content = record.content;
        
        // 1. Set the language selector value
        const langSelect = document.getElementById('language-select');
        if (langSelect && langSelect.value !== language) {
            langSelect.value = language;
            
            // 2. CRITICAL: Manually dispatch a 'change' event
            //    This tells the setupUI change listener to call ui.setEditorLanguage()
            const event = new Event('change');
            langSelect.dispatchEvent(event);
        }
      const currentDoc = this.editor.state.doc.toString();
      // Only restore if editor empty or matches default template (avoid overwriting imported files)
      if (!currentDoc.trim() || currentDoc === this.lastContent) {
        this.editor.dispatch({
          changes: { from: 0, to: this.editor.state.doc.length, insert: record.content }
        });
        this.lastContent = record.content;
        this.isDirty = false;
        this.showNotification('Restored saved content');
      }
    } else {
      this.loadDefaultCode();
      this.lastContent = this.editor.state.doc.toString();
      this.isDirty = false;
    }
  }
  
  setupEventListeners() {
    // Debounce content changes
    // this.editor.state.field(EditorView.updateListener, false).listeners.push(update => {
    //   if (update.docChanged) {
    //     this.isDirty = true;
    //     this.lastChangeTime = Date.now();
    //     clearTimeout(this.debounceTimer);
    //     this.debounceTimer = setTimeout(() => this.saveIfDirty(), this.debounceDelay);
    //   }
    // });



    // Save on page unload, visibility hidden, or window blur
    window.addEventListener('beforeunload', () => this.saveIfDirty(true));
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') this.saveIfDirty(true);
    });
    window.addEventListener('blur', () => this.saveIfDirty(true));
    
    // Manual save button hook
    const saveBtn = document.getElementById('save-btn');
    if (saveBtn) saveBtn.addEventListener('click', () => this.saveNow());

    // Reset to Default button hook
    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) resetBtn.addEventListener('click', () => this.resetToDefault());

    // Keyboard shortcut Ctrl+Shift+S for save
    window.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        this.saveNow();
      }
    });

    // Language change restores saved content for new language
    const langSelect = document.getElementById('language-select');
    if (langSelect) {
      langSelect.addEventListener('change', () => {
        this.restoreContent();
      });
    }
  }

  async saveIfDirty(force = false) {
    if (!this.isDirty && !force) return;

    const key = this.getCurrentKey();
    const content = this.editor.state.doc.toString();
    // Avoid overwrite if content equals last saved
    if (!force && content === this.lastContent) {
      this.isDirty = false;
      return;
    }

    // Do not overwrite imported file content unintentionally
    if (this.playground.currentFile && !this.isDirty) return;

    try {
      await putRecord({
        id: key,
        language: document.getElementById('language-select').value,
        filePath: this.playground.currentFile?.path || null,
        content,
        updatedAt: Date.now(),
      });
      this.lastContent = content;
      this.isDirty = false;
      if (force) this.showNotification('Content saved');
    } catch (err) {
      console.error('Error saving content:', err);
    }
  }

  async saveNow() {
    await this.saveIfDirty(true);
  }

  async resetToDefault() {
    try {
      const key = this.getCurrentKey();
      await deleteRecord(key);
      this.loadDefaultCode();
      this.lastContent = this.editor.state.doc.toString();
      this.isDirty = false;
      this.showNotification('Reset to default and cleared saved content');
    } catch (err) {
      console.error('Error resetting content:', err);
      this.showNotification('Error resetting content', true);
    }
  }
  
  startAutosaveLoop() {
    setInterval(() => {
      this.saveIfDirty();
    }, this.autosaveInterval);
  }
}
