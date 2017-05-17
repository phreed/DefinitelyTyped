
/// <reference types="node" />

/** 
http://js.cytoscape.org/#notation/elements-json
*/
function test_elements_json() {
    cytoscape({

        container: document.getElementById('cy'),

        elements: [
            { // node n1
                group: 'nodes', // 'nodes' for a node, 'edges' for an edge
                // NB the group field can be automatically inferred for you but specifying it
                // gives you nice debug messages if you mis-init elements


                data: { // element data (put json serialisable dev data here)
                    id: 'n1', // mandatory (string or number) id for each element, assigned automatically on undefined
                    parent: 'nparent', // indicates the compound node parent id; not defined => no parent
                },

                // scratchpad data (usually temp or nonserialisable data)
                scratch: {
                    foo: 'bar'
                },

                position: { // the model position of the node (optional on init, mandatory after)
                    x: 100,
                    y: 100
                },

                selected: false, // whether the element is selected (default false)

                selectable: true, // whether the selection state is mutable (default true)

                locked: false, // when locked a node's position is immutable (default false)

                grabbable: true, // whether the node can be grabbed and moved by the user

                classes: 'foo bar' // a space separated list of class names that the element has
            },

            { // node n2
                data: { id: 'n2' },
                renderedPosition: { x: 200, y: 200 } // can alternatively specify position in rendered on-screen pixels
            },

            { // node n3
                data: { id: 'n3', parent: 'nparent' },
                position: { x: 123, y: 234 }
            },

            { // node nparent
                data: { id: 'nparent', position: { x: 200, y: 100 } }
            },

            { // edge e1
                data: {
                    id: 'e1',
                    // inferred as an edge because `source` and `target` are specified:
                    source: 'n1', // the source node id (edge comes from this node)
                    target: 'n2'  // the target node id (edge goes to this node)
                }
            }
        ],

        layout: {
            name: 'preset'
        },

        // so we can see the ids
        style: [
            {
                selector: 'node',
                style: {
                    'content': 'data(id)'
                }
            }
        ]

    });
}

/**
 * http://js.cytoscape.org/#notation/compound-nodes
 */
function test_compound_nodes() {
    let a = cy.$('#a'); // assume a compound node

    // the neighbourhood of `a` contains directly connected elements
    let directlyConnected = a.neighborhood();

    // you may want everything connected to its descendants instead
    // because the descendants "belong" to `a`
    let indirectlyConnected = a.add(a.descendants()).neighborhood();
}

/**
 * http://js.cytoscape.org/#getting-started/initialisation
 */
function test_initialization() {
    // An instance of Cytoscape.js corresponds to a graph. You can create an instance as follows:
    let cy = cytoscape({
        container: document.getElementById('cy') // container to render in
    });
}

function test_initialization() {
    // You can pass a jQuery instance as the container for convenience:

    let cy = cytoscape({
        container: $('#cy')
    });
}

/**
 * http://js.cytoscape.org/#getting-started/specifying-basic-options
 */
function test_specifying_basic_options() {
    let cy = cytoscape({

        container: document.getElementById('cy'), // container to render in

        elements: [ // list of graph elements to start with
            { // node a
                data: { id: 'a' }
            },
            { // node b
                data: { id: 'b' }
            },
            { // edge ab
                data: { id: 'ab', source: 'a', target: 'b' }
            }
        ],

        style: [ // the stylesheet for the graph
            {
                selector: 'node',
                style: {
                    'background-color': '#666',
                    'label': 'data(id)'
                }
            },

            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'line-color': '#ccc',
                    'target-arrow-color': '#ccc',
                    'target-arrow-shape': 'triangle'
                }
            }
        ],

        layout: {
            name: 'grid',
            rows: 1
        }

    });
}


/**
 * Core
 * http://js.cytoscape.org/#core
 */

/**
 * http://js.cytoscape.org/#core/initialisation
 */
function test_core_initialization_minimum() {
    var cy = cytoscape({
        container: document.getElementById('cy')
    });
}

function test_core_initialization() {
    var cy = cytoscape({
        // very commonly used options
        container: undefined,
        elements: [ /* ... */],
        style: [ /* ... */],
        layout: { name: 'grid' /* , ... */ },

        // initial viewport state:
        zoom: 1,
        pan: { x: 0, y: 0 },

        // interaction options:
        minZoom: 1e-50,
        maxZoom: 1e50,
        zoomingEnabled: true,
        userZoomingEnabled: true,
        panningEnabled: true,
        userPanningEnabled: true,
        boxSelectionEnabled: false,
        selectionType: 'single',
        touchTapThreshold: 8,
        desktopTapThreshold: 4,
        autolock: false,
        autoungrabify: false,
        autounselectify: false,

        // rendering options:
        headless: false,
        styleEnabled: true,
        hideEdgesOnViewport: false,
        hideLabelsOnViewport: false,
        textureOnViewport: false,
        motionBlur: false,
        motionBlurOpacity: 0.2,
        wheelSensitivity: 1,
        pixelRatio: 'auto'
    });
}

/**
 * http://js.cytoscape.org/#cy.add
 */
function test_cy_add() {
    cy.add({
        group: "nodes",
        data: { weight: 75 },
        position: { x: 200, y: 200 }
    });


    var eles = cy.add([
        { group: "nodes", data: { id: "n0" }, position: { x: 100, y: 100 } },
        { group: "nodes", data: { id: "n1" }, position: { x: 200, y: 200 } },
        { group: "edges", data: { id: "e0", source: "n0", target: "n1" } }
    ]);
}

/**
 * http://js.cytoscape.org/#cy.remove
 */
function test_cy_remove() {
    // Remove an element:

    var j = cy.$("#j");
    cy.remove(j);

    // Remove a collection:

    var collection = cy.elements("node[weight > 50]");
    cy.remove(collection);

    // Remove elements matching a selector:

    cy.remove("node[weight > 50]"); // remove nodes with weight greater than 50
}

/**
 * http://js.cytoscape.org/#cy.collection
 */
function test_cy_collection() {
    // Keep a collection of nodes that have been clicked:

    var collection = cy.collection();
    cy.nodes().on("click", function () {
        collection = collection.add(this);
    });
}

/**
 * http://js.cytoscape.org/#cy.getElementById
 */
function test_cy_get_element_by_id() {
    cy.getElementById('j');

    // Using the shorter alias:

    cy.$id('j');
}

/**
 * http://js.cytoscape.org/#cy.$
 */
function test_cy_selector() {
    // Get nodes with weight greater than 50:

    cy.nodes("[weight>50]");

    // Get edges with source node n0:

    cy.edges("[source='j']");

    // Get all nodes and edges with weight greater than 50:

    cy.elements("[weight>50]");
    cy.filter("[weight>50]"); // works the same as the above line

    // Get nodes with weight greater than 50 with a filter function:

    cy.filter(function (element, i) {
        if (element.isNode() && element.data("weight") > 50) {
            return true;
        }
        return false;
    });
}

/**
 * http://js.cytoscape.org/#cy.batch
 */
function test_cy_batch() {
    cy.$('#j')
        .data('weight', '70')   // style update
        .addClass('funny')      // style update AGAIN
        .removeClass('serious') // style update YET AGAIN

    // Synchronous style:

    cy.batch(function () {
        cy.$('#j')
            .data('weight', '70')
            .addClass('funny')
            .removeClass('serious')
            ;
    });

    // Asynchronous style:

    cy.startBatch();

    cy.$('#j')
        .data('weight', '70')
        .addClass('funny')
        .removeClass('serious')
        ;

    cy.endBatch();
}

/**
 * http://js.cytoscape.org/#core/events
 */
function test_cy_on() {
    // Bind to events that bubble up from elements matching the specified node selector:

    cy.on('tap', 'node', function (evt) {
        var node = evt.target;
        console.log('tapped ' + node.id());
    });

    // Bind to all tap events that the core receives:

    cy.on('tap', function (event) {
        // target holds a reference to the originator
        // of the event (core or element)
        var evtTarget = event.target;

        if (evtTarget === cy) {
            console.log('tap on background');
        } else {
            console.log('tap on some element');
        }
    });
}

/**
 * http://js.cytoscape.org/#cy.promiseOn
 */
function test_cy_promise_on() {
    cy.pon('tap').then(function (event) {
        console.log('tap promise fulfilled');
    });
}

/**
 * http://js.cytoscape.org/#cy.one
 */
function test_cy_one() {
    cy.one('tap', 'node', function () {
        console.log('tap!');
    });

    cy.$('node').eq(0).trigger('tap'); // tap!
    cy.$('node').eq(1).trigger('tap'); // nothing b/c already tapped
}

/**
 * http://js.cytoscape.org/#cy.off
 */
function test_cy_off() {
    For all handlers:

    cy.on("tap", function () { /* ... */ });

    // unbind all tap handlers, including the one above
    cy.off("tap");

    For a particular handler:

    var handler = function () {
        console.log("called handler");
    };
    cy.on("tap", handler);

    var otherHandler = function () {
        console.log("called other handler");
    };
    cy.on("tap", otherHandler);

    // just unbind handler
    cy.off("tap", handler);
}

/**
 * http://js.cytoscape.org/#cy.trigger
 */
function test_cy_trigger() {
    cy.bind('tap', function (evt, f, b) {
        console.log('tap', f, b);
    });

    cy.trigger('tap', ['foo', 'bar']);
}

/**
 * http://js.cytoscape.org/#core/viewport-manipulation
 */
/**
 * http://js.cytoscape.org/#cy.center
 */
function test_cy_center() {
    var j = cy.$("#j");
    cy.center(j);
}

/** http://js.cytoscape.org/#cy.fit */
function test_cy_fit() {
    // Fit the graph on nodes j and e:

    cy.fit(cy.$('#j, #e'));
}


function test_cy_pan_by() {
    cy.panBy({
        x: 100,
        y: 0
    });
}
