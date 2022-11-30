import { App } from "vue";

import {
  ElAlert,
  ElTag,
  ElContainer,
  ElHeader,
  ElMain,
  ElButton,
  ElAside,
  ElDivider,
  ElTabs,
  ElTabPane,
  ElMenu,
  ElIcon,
  ElLoading,
} from "element-plus";

const plugins = [
  ElAlert,
  ElTag,
  ElContainer,
  ElHeader,
  ElMain,
  ElButton,
  ElAside,
  ElDivider,
  ElTabs,
  ElTabPane,
  ElMenu,
  ElIcon,
  ElLoading,
];

function useElement(app: App) {
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
}

export { useElement };
