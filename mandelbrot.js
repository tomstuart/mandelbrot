(function (exports) {
  var Mandelbrot = function (min, max, width, height) {
    this.min = min;
    this.max = max;
    this.width = width;
    this.height = height;
  };

  Mandelbrot.prototype.valueAt = function (x, y) {
    var real = this.min.real + (x / this.width) * (this.max.real - this.min.real);
    var imaginary = this.min.imaginary + (y / this.height) * (this.max.imaginary - this.min.imaginary);

    return new Complex(real, imaginary);
  };

  Mandelbrot.prototype.iterationsAt = function (x, y, maxIterations) {
    var c = this.valueAt(x, y);
    var z = new Complex(0, 0);

    var iterations = 0;
    while (iterations < maxIterations) {
      z = z.multiply(z).add(c);
      if (z.magnitude() >= 2) {
        break;
      }
      iterations++;
    }

    if (iterations < maxIterations) {
      var nu = Math.log(Math.log(z.magnitude()) / Math.log(2)) / Math.log(2);
      iterations = iterations + 1 - nu;
    }

    return iterations;
  }

  exports.Mandelbrot = Mandelbrot;
}(this));
