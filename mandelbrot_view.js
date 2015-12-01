(function (exports) {
  var fill = function (points) {
    for (var i = 0; i < points.length; ++i) {
      points[i] = i;
    }
  };

  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; --i) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  var MandelbrotView = function (mandelbrot, canvas, onNextFrame) {
    this.mandelbrot = mandelbrot;
    this.canvas = canvas;
    this.onNextFrame = onNextFrame;

    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.pointsPerFrame = 5000;
    this.maxIterations = 50;

    this.points = new Array(this.width * this.height);
    fill(this.points);
    shuffle(this.points);
  };

  MandelbrotView.prototype.colour = function (iterations) {
    if (iterations == this.maxIterations) {
      return 'black';
    } else {
      var hue = Math.round(iterations * 360 / this.maxIterations);
      return 'hsl(' + hue + ', 100%, 50%)';
    }
  };

  MandelbrotView.prototype.drawPoint = function (x, y) {
    iterations = this.mandelbrot.iterationsAt(x, y, this.maxIterations);
    this.context.fillStyle = this.colour(iterations);
    this.context.fillRect(x - 0.5, y - 0.5, 1, 1);
  };

  MandelbrotView.prototype.startDrawing = function () {
    var pointIndex = 0;

    var drawNextPoint = function () {
      var x = this.points[pointIndex] % this.width;
      var y = Math.floor(this.points[pointIndex] / this.height);
      this.drawPoint(x, y);

      pointIndex++;
      if (pointIndex == this.points.length) {
        pointIndex = 0;
      }
    }.bind(this);

    var drawFrame = function () {
      for (var i = 0; i < this.pointsPerFrame; ++i) {
        drawNextPoint();
      }

      this.onNextFrame(drawFrame);
    }.bind(this);

    drawFrame();
  };

  exports.MandelbrotView = MandelbrotView;
}(this));
