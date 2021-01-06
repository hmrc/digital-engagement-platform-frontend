export function parseData(string) {
      var properties = string.split(', ');
      var parsedObject = {};
      Array.prototype.forEach.call(properties, function(property, i) {
        var tup = property.split(':');
        parsedObject[tup[0]] = tup[1]
      });
      return parsedObject
    }
  