// Purpose: Storybook preview — loads Tailwind via theme.css. Mode/context toolbars come in Task 3.
import type { Preview } from "@storybook/react-vite";
import "../src/styles/theme.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
