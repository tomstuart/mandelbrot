(function (exports) {
  var Complex = function (real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  };

  Complex.prototype.magnitude = function () {
    return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
  };

  Complex.prototype.scale = function (scale) {
    return new Complex(this.real * scale, this.imaginary * scale);
  };

  Complex.prototype.add = function (that) {
    var real = this.real + that.real;
    var imaginary = this.imaginary + that.imaginary;

    return new Complex(real, imaginary);
  };

  Complex.prototype.subtract = function (that) {
    var real = this.real - that.real;
    var imaginary = this.imaginary - that.imaginary;

    return new Complex(real, imaginary);
  };

  Complex.prototype.multiply = function (that) {
    var real = this.real * that.real - this.imaginary * that.imaginary;
    var imaginary = this.real * that.imaginary + this.imaginary * that.real;

    return new Complex(real, imaginary)
  };

  exports.Complex = Complex;
}(this));
