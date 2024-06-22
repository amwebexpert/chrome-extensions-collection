const fs = require("fs");
const path = require("path");

import { marked } from "marked";

describe('markdown parser tests suite', () => {

  it('should extract markdown TOC', async () => {
    // arrange
    const file = path.join(__dirname, "../../", "public/markdowns/example-1.md");
    const markdownText = fs.readFileSync(file, "utf8", (_err: any, data: any) => data);

    // act
    const markdownTokens = marked.lexer(markdownText)

    // assert
    expect(markdownTokens).toBeDefined();
  });

});