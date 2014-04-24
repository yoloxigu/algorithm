requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
        "jquery": "jquery-1.11.0.min",
        "Sort": "../class/Sort.class"
    }
});

// Load the main app module to start the app
requirejs([
    "../app/main",
    "Sort"
]);