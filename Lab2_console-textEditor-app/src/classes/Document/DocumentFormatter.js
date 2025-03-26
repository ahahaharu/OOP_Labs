class DocumentFormatter {
  static formatMarkdown(content) {
    let result = content;
    result = result.replace(/^# (.*)$/gm, "\x1b[41m$1\x1b[0m");
    result = result.replace(/^## (.*)$/gm, "\x1b[42m$1\x1b[0m");
    result = result.replace(/^### (.*)$/gm, "\x1b[43m$1\x1b[0m");
    result = result.replace(/^#### (.*)$/gm, "\x1b[44m$1\x1b[0m");
    result = result.replace(/^##### (.*)$/gm, "\x1b[45m$1\x1b[0m");
    result = result.replace(/^###### (.*)$/gm, "\x1b[46m$1\x1b[0m");
    result = result.replace(/\*\*(.*?)\*\*/g, "\x1b[1m$1\x1b[0m");
    result = result.replace(/\*(.*?)\*/g, "\x1b[3m$1\x1b[0m");
    result = result.replace(/__(.*?)__/g, "\x1b[4m$1\x1b[0m");
    result = result.replace(/\[red\](.*?)\[\/red\]/g, "\x1b[31m$1\x1b[0m");
    result = result.replace(/\[green\](.*?)\[\/green\]/g, "\x1b[32m$1\x1b[0m");
    result = result.replace(/\[blue\](.*?)\[\/blue\]/g, "\x1b[34m$1\x1b[0m");
    return result;
  }

  static formatRichText(content) {
    return content
      .map((segment) => {
        let text = segment.text;
        if (segment.bold) text = `\x1b[1m${text}\x1b[0m`;
        if (segment.italic) text = `\x1b[3m${text}\x1b[0m`;
        if (segment.underline) text = `\x1b[4m${text}\x1b[0m`;
        if (segment.color) {
          const colors = {
            red: "\x1b[31m",
            green: "\x1b[32m",
            blue: "\x1b[34m",
          };
          text = `${colors[segment.color] || ""}${text}\x1b[0m`;
        }
        return text;
      })
      .join("");
  }
}

module.exports = DocumentFormatter;
