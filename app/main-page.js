var createViewModel = require("./main-view-model").createViewModel;
var Observable = require("data/observable").Observable;

function onNavigatingTo(args) {
    var page = args.object;
    page.bindingContext = createViewModel();
}

exports.onNavigatingTo = onNavigatingTo;