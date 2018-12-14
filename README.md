# nuxt-stylus-resources-loader

This module does all the hard work of configuring global stylus mixins, functions, variables, etc. for your Nuxt application.

## Install

```sh
npm i nuxt-stylus-resources-loader

# or

yarn add nuxt-stylus-resources-loader
```

## Usage

```js
// nuxt.config.js
const resolve = require('path').resolve

module.exports = {
  modules: [
    // provide path to the file with resources
    ['nuxt-stylus-resources-loader', resolve(__dirname, 'path/to/resources.styl')],

    // or array of relative paths
    ['nuxt-stylus-resources-loader', [
        resolve(__dirname, 'path/to/first-resources.stylus'),
        resolve(__dirname, 'assets/stylus/mixin.styl'),
    ]],
  ],
}
```

### Glob pattern matching

You can specify glob patterns to match your all of your files in the same directory.

```js
// Specify a single path
'./path/to/resources/**/*.styl', // will match all files in folder and subdirectories

// or an array of paths
[ './path/to/resources/**/*.styl', './path/to/another/**/*.styl' ]
```

> Note that stylus-resources-loader will resolve your files in order. If you want your variables to be accessed across all of your mixins you should specify them in first place.

## License

[MIT](http://opensource.org/licenses/MIT)

## Example

#### # nuxt.config.js
```js
const resolve = require('path').resolve

module.exports = {
  modules: [
    ['nuxt-stylus-resources-loader', [
        resolve(__dirname, 'assets/stylus/helpers/variables.styl'),
        resolve(__dirname, 'assets/stylus/helpers/mixins.styl'),
    ]],
  ],
}
```

#### # variables.styl
```stylus
$tablet = "(min-width: 768px)"
$desktop = "(min-width: 1440px)"
```

#### # mixins.styl
```stylus
tablet()
  @media $tablet
  {block}
    
desktop()
  @media $desktop
  {block}
```


#### # components/sample.vue
```vue
<template lang="pug">
    .container
        h1 Test
</template>

<style lang="stylus">
h1
    font-size 14px
    +tablet()
        font-size 16px
    +desktop()
        font-size 18px
</style>

```