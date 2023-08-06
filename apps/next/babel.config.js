module.exports = function (api) {
  const presets = ["next/babel"];
  const plugins = ["effector/babel-plugin"];

  api.cache(true);

  return {
    presets,
    plugins,
  };
};
