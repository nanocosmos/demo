function createElement(props) {
    var elem;

    if (props.type) elem = document.createElement(props.type);
    if (props.textContent) elem.textContent = props.textContent;
    if (props.id) elem.id = props.id;
    if (props.classes) addClasses(elem, props.classes);
    if (props.styles) {
        Object.keys(props.styles).forEach(function (key) {
            elem.style[key] = props.styles[key];
        });
    }
    if (props.events) {
        props.events.forEach(function (event) {
            elem.addEventListener(event.type, event.callback.bind(null, event.data));
        });
    }
    if (props.childNodes) {
        props.childNodes.forEach(function (child) {
            var childNode = createElement(child);
            elem.appendChild(childNode);
        });
    }

    return elem;
}

function removeAllChildNodes(elem) {
    while (elem.firstChild) {
        elem.removeChild(elem.firstChild);
    }
}

function appendChildNodes(elem, childNodes) {
    childNodes.forEach(childNode => {
        elem.appendChild(childNode);
    })
}

function addClasses(elem, classesString) {
    var classes = classesString.split(" ");

    classes.forEach(c => {
        elem.classList.add(c);
    });
}

function getElementById(id) {
    return document.getElementById(id);
}

function log(e, consoleOnly) {
    if (typeof e === 'object') {
        try {
            e = JSON.stringify(e);
        } catch (err) { }
    }
    e = new Date().toLocaleTimeString() + ": " + e;
    //console.log(e);
}