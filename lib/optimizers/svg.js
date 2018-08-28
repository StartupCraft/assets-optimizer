"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _svgo = _interopRequireDefault(require("svgo"));

var _filesize = _interopRequireDefault(require("filesize.js"));

var _glob = _interopRequireDefault(require("glob"));

var _svg = _interopRequireDefault(require("config/svg"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var filepath = _path.default.resolve(__dirname, 'src');

var svgo = new _svgo.default(_svg.default);
var dataLengthBefore = 0;
var dataLengthAfter = 0;
(0, _glob.default)("src/**/*.svg", {}, function (error, files) {
  if (error) {
    throw error;
  }

  files.forEach(function (file, index) {
    var data = _fs.default.readFileSync(file, 'utf8');

    dataLengthBefore += data.length;
    svgo.optimize(data, {
      path: filepath
    }).then(function (result) {
      if (result.data.length !== data.length) {
        _fs.default.writeFileSync(file, result.data);

        var decreaseFile = data.length - result.data.length;
        var decreaseFilePercent = decreaseFile / data.length * 100;
        console.log("Wrote ".concat(file, ", result: ").concat((0, _filesize.default)(data.length), " > ").concat((0, _filesize.default)(result.data.length), ", ").concat(decreaseFilePercent.toFixed(2), "%"));
      }

      dataLengthAfter += result.data.length;

      if (files.length - 1 === index) {
        var decrease = dataLengthBefore - dataLengthAfter;
        var decreasePercent = decrease / dataLengthBefore * 100;
        console.log('———————————————————————');
        console.log("Size before optimization: ".concat((0, _filesize.default)(dataLengthBefore), ", after: ").concat((0, _filesize.default)(dataLengthAfter), ", decrease by ").concat(decreasePercent.toFixed(2), "%"));
        console.log('———————————————————————');
      }
    });
  });
});
/*  */