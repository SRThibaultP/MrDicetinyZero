let date = new Date();
let options = {hour: "2-digit", minute: "2-digit"};
module.export = date.toLocaleTimeString("fr-fr", options);
