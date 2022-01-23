const tailwind = require("./tailwind");

module.exports = {
  plugins:
    [
      require("tailwindcss")("./tailwind.config.js"),
      require("autoprefixer")
    ]
  // {
  //   tailwindcss: {},
  //   autoprefixer: {},
  // },
}
