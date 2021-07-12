function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export const setItem = (key, value) => {
  if (!storageAvailable('localStorage')) {
    alert("You can't use localStorage in this browser");
    return;
  }
  localStorage.setItem(key, value);
};

export const getItem = (key) => {
  if (!storageAvailable('localStorage')) {
    alert("You can't use localStorage in this browser");
    return;
  }
  return localStorage.getItem(key);
};

export const removeItem = (key) => {
  if (!storageAvailable('localStorage')) {
    alert("You can't use localStorage in this browser");
    return;
  }
  localStorage.removeItem(key);
};

export const clear = () => {
  if (!storageAvailable('localStorage')) {
    alert("You can't use localStorage in this browser");
    return;
  }
  localStorage.clear();
};
