const themeSwitchBtn = document.querySelector('.theme-switcher-btn');
const allThemes = document.querySelectorAll('.theme');

switchThemeLight();

function switchThemeLight() {
  allThemes.forEach((theme) => {
    theme.classList.remove('dark');
    theme.classList.add('light');
  });
}

function switchThemeDark() {
  allThemes.forEach((theme) => {
    theme.classList.remove('light');
    theme.classList.add('dark');
  });
}

themeSwitchBtn.addEventListener('click', () => {
  isDarkTheme = !isDarkTheme;
  if (isDarkTheme) {
    switchThemeDark();
  } else {
    switchThemeLight();
  }
});
