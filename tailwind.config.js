module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    layers: ['utilities'],
    content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  },
}
