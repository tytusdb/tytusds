function make_path(state, cost, parent) {
    return {
        state  : state,
        cost   : cost,
        parent : parent
    };
};

function write_path(path) {
    var s = "";
    if (path.parent) s = write_path(path.parent) + " => ";
    s += path.state + "(" + path.cost + ")";
    return s;
};

function make_graph(ways) {
    var graph = {};
    function link(s1, s2, cost) {
        var h = graph[s1] || (graph[s1] = {});
        h[s2] = cost;
    };
    for (var i = 0; i < ways.length; ++i) {
        var w = ways[i];
        link(w[0], w[1], w[2]);
        link(w[1], w[0], w[2]);
    }
    return graph;
};

// busnca el indice del elemento en el array
// f retorna el valor mas pequeño
function find_min(a, f) {
    var min = null, pos = null;
    for (var i = 0; i < a.length; ++i) {
        var el = f(a[i]);
        if (min === null || min > el) {
            min = el;
            pos = i;
        }
    }
    return pos;
};

// remueve y retorna el costo
function remove_choice(frontier) {
    var index = find_min(frontier, function(path){
        return path.cost;
    });
    var it = frontier[index];
    frontier.splice(index, 1); // quita
    return it;
};

function with_graph(def, func) {
    var graph = make_graph(def);


    function actions(state) {
        var a = [], s = graph[state];
        for (var i in s) {
            a.push({ state: i, cost: s[i] });
        }
        return a;
    };

    function uniform_cost_search(start, goal, gossip) {
        var frontier = [ make_path(start, 0, null) ];
        var explored = {};
        while (frontier.length > 0) {
            var path = remove_choice(frontier);
            explored[path.state] = 1;
            if (gossip) gossip(path, frontier, explored);
            if (path.state == goal) return path;
            actions(path.state).forEach(function(a){
                if (!explored[a.state]) {
                    var p = make_path(a.state, a.cost + path.cost, path);
                    frontier.push(p);
                }
            });
        }
    };

    func(uniform_cost_search);
};
