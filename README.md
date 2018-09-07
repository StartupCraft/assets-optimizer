# assets-optimizer
Bunch of assets optimizers (svg, png, jpg, etc...)


### Install

```sh
yarn add assets-optimizer --dev
```

### Usage

To optimize all SVG in project, just run:
```sh
yarn optimize svg
```

If you have already optimized SVG, please run this command to generate `optimized.json` file:
```sh
yarn optimize svg --save-already-optimized
```

After this script will optimize only changed files
