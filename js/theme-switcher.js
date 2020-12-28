const themeSwitchBtn = document.querySelector('.theme-switcher-btn');
let allThemes;

switchThemeLight();

function removeThemeColorMetaTag() {
  const metas = document.getElementsByTagName('meta');

  for (let i = 0; i < metas.length; i++) {
    if (metas[i].getAttribute('name') === 'theme-color') {
      metas[i].remove();
    }
  }
}

function setThemeColorMetaTag(color) {
  removeThemeColorMetaTag();
  let meta = document.createElement('meta');
  meta.name = 'theme-color';
  meta.content = color;
  document.getElementsByTagName('head')[0].appendChild(meta);
}

function switchThemeLight() {
  allThemes = document.querySelectorAll('.theme');
  allThemes.forEach((theme) => {
    theme.classList.remove('dark');
    theme.classList.add('light');
  });
  setThemeColorMetaTag('#fff');
}

function switchThemeDark() {
  allThemes = document.querySelectorAll('.theme');
  allThemes.forEach((theme) => {
    theme.classList.remove('light');
    theme.classList.add('dark');
  });
  setThemeColorMetaTag('#2f2f2f');
}

themeSwitchBtn.addEventListener('click', () => {
  isDarkTheme = !isDarkTheme;
  if (isDarkTheme) {
    switchThemeDark();
  } else {
    switchThemeLight();
  }
});
