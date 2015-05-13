# language-graph
> Directed World languages graph. [See Demo](http://urbanoalvarez.es/language-graph)

It uses public data extracted from [multiple sources](https://github.com/aurbano/language-graph/blob/master/data/sources.json), and D3js to render the graph.

As the dataset improves I'll add a RESTful API to consume it, instead of the current JSON file. I will also probably move it to another repository containing only the data.

The graph renderer accepts several parameters that are then fed to D3:

|Parameter|Default|Description|
|---------|-------|-----------|
|linkDistance|30|Sets the target distance between linked nodes to the specified value. Links are not implemented as "spring forces", as is common in other force-directed layouts, but as weak geometric constraints.|
|charge|-60|Sets the charge strength to the specified value. A negative value results in node repulsion, while a positive value results in node attraction.|
|linkStrength|0.1|Sets the strength (rigidity) of links to the specified value in the range [0,1].|
|friction|0.002|Sets the friction coefficient to the specified value. It is similar to velocity decay: at each tick of the simulation, the particle velocity is scaled by the specified `friction`. Thus, a value of 1 corresponds to a frictionless environment, while a value of 0 freezes all particles in place.|
|gravity|0.1|Sets the gravitational strength to the specified numerical value. `gravity` is implemented as a weak geometric constraint similar to a virtual spring connecting each node to the center of the layout's size.|
|theta|0.8|Sets the [Barnes–Hut](http://en.wikipedia.org/wiki/Barnes-Hut_simulation) approximation criterion to the specified value.|
|alpha|0.1|Sets the force layout's cooling parameter|
