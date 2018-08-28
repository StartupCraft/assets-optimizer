const svgConfig = {
  plugins: [
    {
      removeDoctype: true,
    },
    {
      removeXMLProcInst: false,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeXMLNS: false,
    },
    {
      removeEditorsNSData: true,
    },
    {
      cleanupAttrs: true,
    },
    {
      inlineStyles: true,
    },
    {
      minifyStyles: true,
    },
    {
      convertStyleToAttrs: true,
    },
    {
      cleanupIDs: true,
    },
    {
      removeRasterImages: false,
    },
    {
      removeUselessDefs: true,
    },
    {
      cleanupNumericValues: true,
    },
    {
      cleanupListOfValues: true,
    },
    {
      convertColors: true,
    },
    {
      removeUnknownsAndDefaults: true,
    },
    {
      removeNonInheritableGroupAttrs: true,
    },
    {
      removeUselessStrokeAndFill: true,
    },
    {
      removeViewBox: true,
    },
    {
      cleanupEnableBackground: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      moveElemsAttrsToGroup: true,
    },
    {
      moveGroupAttrsToElems: true,
    },
    {
      collapseGroups: true,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeEmptyContainers: true,
    },
    {
      mergePaths: true,
    },
    {
      removeUnusedNS: true,
    },
    {
      sortAttrs: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeDimensions: true,
    },
    {
      removeStyleElement: true,
    },
    {
      removeScriptElement: true,
    },
  ],
}

export default svgConfig
