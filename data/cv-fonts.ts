import type { ResumeFontId } from "@/types";

export interface CvFontDefinition {
  id: ResumeFontId;
  label: string;
  /** CSS font-family stack for HTML preview */
  cssFamily: string;
  /** Google Fonts CSS URL for preview <link>, or null for system/built-in */
  googleCssUrl: string | null;
  /** TTF URL for @react-pdf Font.register (regular), or null to use built-in */
  pdfRegularUrl: string | null;
  /** TTF URL for bold variant */
  pdfBoldUrl: string | null;
  /** Built-in react-pdf family name when not loading a custom font */
  pdfBuiltIn?: "Helvetica" | "Times-Roman" | "Courier";
}

export const CV_FONTS: Record<ResumeFontId, CvFontDefinition> = {
  helvetica: {
    id: "helvetica",
    label: "Helvetica",
    cssFamily: "Helvetica, Arial, sans-serif",
    googleCssUrl: null,
    pdfRegularUrl: null,
    pdfBoldUrl: null,
    pdfBuiltIn: "Helvetica",
  },
  times: {
    id: "times",
    label: "Times",
    cssFamily: "Times New Roman, Times, serif",
    googleCssUrl: null,
    pdfRegularUrl: null,
    pdfBoldUrl: null,
    pdfBuiltIn: "Times-Roman",
  },
  inter: {
    id: "inter",
    label: "Inter",
    cssFamily: '"Inter", Helvetica, Arial, sans-serif',
    googleCssUrl:
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap",
    pdfRegularUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf",
    pdfBoldUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf",
  },
  roboto: {
    id: "roboto",
    label: "Roboto",
    cssFamily: '"Roboto", Helvetica, Arial, sans-serif',
    googleCssUrl:
      "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
    pdfRegularUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-400-normal.ttf",
    pdfBoldUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/roboto@latest/latin-700-normal.ttf",
  },
  "source-sans": {
    id: "source-sans",
    label: "Source Sans 3",
    cssFamily: '"Source Sans 3", Helvetica, Arial, sans-serif',
    googleCssUrl:
      "https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;600;700&display=swap",
    pdfRegularUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/source-sans-3@latest/latin-400-normal.ttf",
    pdfBoldUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/source-sans-3@latest/latin-700-normal.ttf",
  },
  lato: {
    id: "lato",
    label: "Lato",
    cssFamily: '"Lato", Helvetica, Arial, sans-serif',
    googleCssUrl:
      "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap",
    pdfRegularUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/lato@latest/latin-400-normal.ttf",
    pdfBoldUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/lato@latest/latin-700-normal.ttf",
  },
  "open-sans": {
    id: "open-sans",
    label: "Open Sans",
    cssFamily: '"Open Sans", Helvetica, Arial, sans-serif',
    googleCssUrl:
      "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap",
    pdfRegularUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-400-normal.ttf",
    pdfBoldUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/open-sans@latest/latin-700-normal.ttf",
  },
  georgia: {
    id: "georgia",
    label: "Georgia",
    cssFamily: 'Georgia, "Times New Roman", serif',
    googleCssUrl: null,
    pdfRegularUrl: null,
    pdfBoldUrl: null,
    pdfBuiltIn: "Times-Roman",
  },
  merriweather: {
    id: "merriweather",
    label: "Merriweather",
    cssFamily: '"Merriweather", Georgia, serif',
    googleCssUrl:
      "https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap",
    pdfRegularUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/merriweather@latest/latin-400-normal.ttf",
    pdfBoldUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/merriweather@latest/latin-700-normal.ttf",
  },
  playfair: {
    id: "playfair",
    label: "Playfair Display",
    cssFamily: '"Playfair Display", Georgia, serif',
    googleCssUrl:
      "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap",
    pdfRegularUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/playfair-display@latest/latin-400-normal.ttf",
    pdfBoldUrl:
      "https://cdn.jsdelivr.net/fontsource/fonts/playfair-display@latest/latin-700-normal.ttf",
  },
};

export const CV_FONT_OPTIONS = Object.values(CV_FONTS);
