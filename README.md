# gencodex - Modernized Code Generator Library

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Discord](https://img.shields.io/discord/1275486972252786730?label=discord)](https://discord.gg/viish)

A lightweight, customizable, and efficient code generation library written in JavaScript. This modernized version preserves all the original functionality while enhancing readability, maintainability, and compatibility with ES6+ standards.

---

## ✨ Features

- Generate random codes with custom lengths, charsets, and patterns.
- Supports prefixes, postfixes, and unique sequential code generation.
- Handles alphanumeric, numeric, and alphabetic charsets.
- Fully backward-compatible with legacy implementations.
- Detects infeasible configurations to avoid errors.
- Modernized with ES6+ features for cleaner and more efficient code.

---

## 📦 Installation

```bash
npm install gencodex
```

---

## 🚀 Usage

### Import the Library

#### For Node.js

```javascript
const gencodex = require("gencodex");
```

#### For Browsers

Include the script file:

```html
<script src="path/to/gencodex.js"></script>
<script>
  const code = gencodex.generate({ length: 6 });
</script>
```

---

### Generate a Code

```javascript
const code = gencodex.generate({
  length: 8,
  prefix: "promo-",
  postfix: "-end",
})[0];

console.log(code); // Example: promo-Ab12Cd34-end
```

### Generate Multiple Unique Codes

```javascript
const codes = gencodex.generate({
  count: 5,
  length: 6,
  charset: gencodex.charset("alphabetic"),
});

console.log(codes);
// Example: ['AbCdEf', 'GhIjKl', 'MnOpQr', 'StUvWx', 'YzAbCd']
```

### Sequential Code Generation

```javascript
const config = {
  pattern: "A###Z",
  charset: gencodex.charset("numbers"),
};

console.log(gencodex.generate(config, 0)); // ['A000Z']
console.log(gencodex.generate(config, 1)); // ['A001Z']
console.log(gencodex.generate(config, 10)); // ['A010Z']
```

---

## 🛠️ Modernization Improvements

The library has been upgraded to use:

- **ES6+ Syntax**: Arrow functions, template literals, `class`, and `const/let`.
- **Improved Efficiency**: Leveraging modern features like `Set` for uniqueness checks.
- **Enhanced Readability**: Cleaner and more modular code structure.
- **Backward Compatibility**: Fully supports legacy environments and usage patterns.

---

## ⚡ Tests

The library includes a comprehensive test suite. Run the tests using:

```bash
npm test
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
