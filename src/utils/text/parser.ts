const HtmlToReactParser = require("html-to-react").Parser;

export const stringToHtmlParser = (element: string) => {
  const htmlToReactParser = new HtmlToReactParser();
  const parsed = htmlToReactParser.parse(element);

  return parsed;
};
