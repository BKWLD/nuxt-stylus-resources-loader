module.exports = function(moduleOptions) {
  let resources = []

  if (typeof moduleOptions === 'string' || moduleOptions instanceof String) {
    resources.push(moduleOptions)
  }

  if (Array.isArray(moduleOptions)) {
    resources = moduleOptions
  }

  this.extendBuild((config) => {
    [].concat(...config.module.rules.find(
      (rule) => rule.test.toString()
      .match(/\.styl/))
      .oneOf.map((x) => x.use
      .filter((x) => x.loader == 'stylus-loader')))
      .forEach((instance) => {
        Object.assign(instance.options, {
          import: resources
        })
      }
    )
  })
}

module.exports.meta = require('./package.json')
