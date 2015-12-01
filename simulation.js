(function (exports) {
  var Particle = function (position, velocity, target) {
    this.position = position;
    this.velocity = velocity;
    this.target = target;

    this.origin = position;
  };

  var Simulation = function (min, max) {
    this.min = min;
    this.max = max;
    this.particles = [];

    this.speed = 1/1000;
    this.attraction = 0.1;
    this.targetSize = 0.1;
    this.damping = 0.95;
  };

  Simulation.prototype.update = function (elapsedTime) {
    this.particles.forEach(function (particle) {
      particle.velocity = particle.velocity.add(particle.target.subtract(particle.position).scale(this.attraction)).scale(this.damping);
      particle.position = particle.position.add(particle.velocity.scale(elapsedTime * this.speed));

      var distance = particle.target.subtract(particle.position).magnitude();
      if (distance < this.targetSize) {
        particle.target = particle.target.multiply(particle.target).add(particle.origin);
      }
    }, this);

    this.particles = this.particles.filter(function (particle) {
      return particle.position.magnitude() < 2 || particle.target.magnitude() < 2;
    });
  };

  exports.Simulation = Simulation;
  exports.Particle = Particle;
}(this));
