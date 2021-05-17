const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const themeSwitchedRef = document.querySelector('#theme-switch-toggle');

const setTheme = () => {
  const bodyClassList = document.body.classList;

  if (themeSwitchedRef.checked === false) {
    if (bodyClassList.contains(Theme.DARK)) {
      bodyClassList.remove(Theme.DARK);
    }

    bodyClassList.add(Theme.LIGHT);
    localStorage.setItem('Theme', Theme.LIGHT);
  } else if (themeSwitchedRef.checked === true) {
    if (bodyClassList.contains(Theme.LIGHT)) {
      bodyClassList.remove(Theme.LIGHT);
    }

    bodyClassList.add(Theme.DARK);
    localStorage.setItem('Theme', Theme.DARK);
  }
};

const getThemeFromLocalStorage = () => {
  const localStorageTheme = localStorage.getItem('Theme');

  if (localStorageTheme === Theme.DARK) {
    themeSwitchedRef.checked = true;
    setTheme();
  }
};
getThemeFromLocalStorage();

themeSwitchedRef.addEventListener('change', setTheme);
