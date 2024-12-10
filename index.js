"use strict";

(function () {
  const root = this;

  const randomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const randomElem = (arr) => arr[randomInt(0, arr.length - 1)];

  const sequenceElem = (config, sequenceOffset, charIndex) => {
    const base = config.uniqueCharset.length;
    return config.uniqueCharset[
      Math.floor(
        sequenceOffset / Math.pow(base, config.length - charIndex - 1),
      ) % base
    ];
  };

  const charset = (name) => {
    const charsets = {
      numbers: "0123456789",
      alphabetic: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
      alphanumeric:
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
    };
    return charsets[name];
  };

  const repeat = (str, count) => str.repeat(count);

  class Config {
    constructor(config = {}) {
      this.count = config.count || 1;
      this.length = config.length || 8;
      this.charset = config.charset || charset("alphanumeric");
      this.uniqueCharset = uniqueCharset(this.charset);
      this.prefix = config.prefix || "";
      this.postfix = config.postfix || "";
      this.pattern = config.pattern || repeat("#", this.length);

      if (config.pattern) {
        this.length = (config.pattern.match(/#/g) || []).length;
      }
    }
  }

  const uniqueCharset = (charset) => {
    const uniqueChars = new Set(charset);
    return Array.from(uniqueChars).join("");
  };

  const generateOne = (config, sequenceOffset) => {
    let generateIndex = 0;

    const code = [...config.pattern]
      .map((char) => {
        if (char === "#") {
          return isNaN(sequenceOffset)
            ? randomElem(config.charset)
            : sequenceElem(config, sequenceOffset, generateIndex++);
        }
        return char;
      })
      .join("");

    return `${config.prefix}${code}${config.postfix}`;
  };

  const maxCombinationsCount = (config) =>
    Math.pow(config.uniqueCharset.length, config.length);

  const isFeasible = (config) => maxCombinationsCount(config) >= config.count;

  const generate = (config, sequenceOffset) => {
    config = new Config(config);
    let { count } = config;

    if (!isFeasible(config)) {
      throw new Error("Not possible to generate requested number of codes.");
    }

    sequenceOffset = Number(sequenceOffset);

    if (!isNaN(sequenceOffset)) {
      const maxCount = maxCombinationsCount(config);
      sequenceOffset = Math.max(0, Math.min(sequenceOffset, maxCount - 1));
    }

    const codes = new Set();

    while (codes.size < count) {
      const code = generateOne(config, sequenceOffset);
      codes.add(code);
      sequenceOffset++;
    }

    return Array.from(codes);
  };

  const gencode = {
    generate,
    charset,
  };

  if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      module.exports = gencode;
    } else {
      exports.gencode = gencode;
    }
  } else {
    root.gencode = gencode;
  }
}).call(this);
