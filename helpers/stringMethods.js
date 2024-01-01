String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.titleCase = function () {
  return this.split(" ")
    .map((word) => word.capitalize())
    .join(" ");
};
