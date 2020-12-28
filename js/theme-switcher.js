const themeSwitchBtn = document.querySelector('.theme-switcher-btn');
let allThemes;

switchThemeLight();

function switchThemeLight() {
  allThemes = document.querySelectorAll('.theme');
  allThemes.forEach((theme) => {
    theme.classList.remove('dark');
    theme.classList.add('light');
  });
}

function switchThemeDark() {
  allThemes = document.querySelectorAll('.theme');
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
