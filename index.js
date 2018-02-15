module.exports = function nuxtSassResourcesLoader (moduleOptions = {}) {
    if (typeof moduleOptions === 'string' || Array.isArray(moduleOptions)) {
        moduleOptions = {resources: moduleOptions}
    }

    const options = Object.assign({}, {resources: this.options.sassResources}, moduleOptions)

    const sassResourcesLoader = {
        loader: 'sass-resources-loader', options
    }

    this.extendBuild((config, { isClient, isServer }) => {

        const stylusLoader = config.module.rules.filter(({test}) => {
            return [ '/\\.styl/', '/\\.styl(us)?$/' ].indexOf(test.toString()) !== -1
        })

        const vueLoader = config.module.rules.find(({test}) => {
            return test.toString() === '/\\.vue$/'
        })

        const loaders = vueLoader.options.loaders;

        Object.keys(loaders).forEach(loader => {
            if (['styl', 'stylus'].indexOf(loader) !== -1) {
                loaders[loader].push(sassResourcesLoader)
            }
        })

        Object.keys(stylusLoader).forEach(loader => {
            stylusLoader[loader].use.push(sassResourcesLoader)
        })

    })
}

module.exports.meta = require('./package.json')
