const gencode = require("../index.js");

describe("gencode", () => {
  test("should generate code of requested length", () => {
    const length = 5;
    const [code] = gencode.generate({ length });

    expect(code.length).toBe(length);
  });

  test("should generate code of default length", () => {
    const defaultLength = 8;
    const [code] = gencode.generate({});

    expect(code.length).toBe(defaultLength);
  });

  test("should generate code if no config is provided", () => {
    const defaultLength = 8;
    const [code] = gencode.generate();

    expect(code.length).toBe(defaultLength);
  });

  test("should generate 5 unique codes", () => {
    const codes = gencode.generate({ length: 2, count: 5 });

    expect(codes.length).toBe(5);
    codes.forEach((code, idx) => {
      expect(code.length).toBe(2);
      expect(codes.indexOf(code)).toBe(idx);
    });
  });

  test("should generate a code consisting of numbers only", () => {
    const numbers = "0123456789";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const [code] = gencode.generate({ length: 10, charset: numbers });

    expect(code.length).toBe(10);
    [...code].forEach((char) => {
      expect(numbers).toContain(char);
      expect(letters).not.toContain(char);
    });
  });

  test("should generate a code consisting of letters only", () => {
    const numbers = "0123456789";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const [code] = gencode.generate({ length: 10, charset: letters });

    expect(code.length).toBe(10);
    [...code].forEach((char) => {
      expect(letters).toContain(char);
      expect(numbers).not.toContain(char);
    });
  });

  test("should generate code with prefix", () => {
    const [code] = gencode.generate({ prefix: "promo-" });

    expect(code).toMatch(/^promo-/);
  });

  test("should generate code with postfix", () => {
    const [code] = gencode.generate({ postfix: "-extra" });

    expect(code).toMatch(/-extra$/);
  });

  test("should generate code with prefix and postfix", () => {
    const [code] = gencode.generate({ prefix: "promo-", postfix: "-extra" });

    expect(code).toMatch(/^promo-.*-extra$/);
  });

  test("should generate code from pattern", () => {
    const [code] = gencode.generate({ pattern: "##-###-##" });

    expect(code).toMatch(
      /^([0-9a-zA-Z]{2})-([0-9a-zA-Z]{3})-([0-9a-zA-Z]{2})$/,
    );
  });

  test("should detect infeasible config", () => {
    const config = { count: 1000, charset: "abc", length: 5 };

    expect(() => gencode.generate(config)).toThrow(
      "Not possible to generate requested number of codes.",
    );
  });

  test("should detect infeasible config for charset with duplicates", () => {
    const config = { count: 2, charset: "11", length: 2 };

    expect(() => gencode.generate(config)).toThrow(
      "Not possible to generate requested number of codes.",
    );
  });

  test("should generate fixed code", () => {
    const config = { count: 1, pattern: "FIXED" };
    const [code] = gencode.generate(config);

    expect(code).toEqual("FIXED");
  });

  test("should generate single sequential codes from numbers charset", () => {
    const config = { charset: gencode.charset("numbers"), pattern: "A###Z" };
    const codes = [
      "A000Z",
      "A001Z",
      "A002Z",
      "A005Z",
      "A009Z",
      "A010Z",
      "A011Z",
      "A099Z",
      "A100Z",
      "A101Z",
      "A599Z",
      "A600Z",
      "A601Z",
    ];

    codes.forEach((expected, idx) => {
      expect(gencode.generate(config, idx)[0]).toEqual(expected);
    });
  });

  test("should generate series of sequential codes from numbers charset", () => {
    const config = {
      charset: gencode.charset("numbers"),
      pattern: "A###Z",
      count: 12,
    };
    const codes = gencode.generate(config, 190);

    expect(codes).toEqual([
      "A190Z",
      "A191Z",
      "A192Z",
      "A193Z",
      "A194Z",
      "A195Z",
      "A196Z",
      "A197Z",
      "A198Z",
      "A199Z",
      "A200Z",
      "A201Z",
    ]);
  });

  test("should generate first or last code when sequenceOffset is out of range", () => {
    const config = { charset: gencode.charset("numbers"), pattern: "A##Z" };

    const cases = [
      { offset: -2, expected: "A00Z" },
      { offset: -1, expected: "A00Z" },
      { offset: 0, expected: "A00Z" },
      { offset: 99, expected: "A99Z" },
      { offset: 100, expected: "A99Z" },
      { offset: 101, expected: "A99Z" },
    ];

    cases.forEach(({ offset, expected }) => {
      expect(gencode.generate(config, offset)[0]).toEqual(expected);
    });
  });

  test("should generate series of sequential codes from alphabetic charset", () => {
    const config = {
      charset: gencode.charset("alphabetic"),
      pattern: "###",
      prefix: "prefix-",
      postfix: "-postfix",
    };

    const codes = [
      "prefix-aaa-postfix",
      "prefix-aab-postfix",
      "prefix-aac-postfix",
      "prefix-aad-postfix",
      "prefix-aae-postfix",
      "prefix-aaf-postfix",
      "prefix-aap-postfix",
      "prefix-aaz-postfix",
      "prefix-aaA-postfix",
      "prefix-aaZ-postfix",
      "prefix-aba-postfix",
      "prefix-abZ-postfix",
      "prefix-aZZ-postfix",
      "prefix-baa-postfix",
      "prefix-bab-postfix",
    ];

    codes.forEach((expected, idx) => {
      expect(gencode.generate(config, idx)[0]).toEqual(expected);
    });
  });

  test("should generate series of sequential codes from charset with duplicates", () => {
    const config = { charset: "001", pattern: "##", count: 4 };
    const codes = gencode.generate(config, 0);

    expect(codes).toEqual(["00", "01", "10", "11"]);
  });
});
