/**
 * GraphViewer
 * @author Alejandro U. Alvarez
 * @license MIT
 */

var GraphViewer = function(opts, data) {
  'use strict';
  
  console.info("GraphViewer");

  var width = $(opts.container).width(),
    height = $(opts.container).height();

  var fill = d3.scale.category20();

  var force = d3.layout.force()
    .size([width, height])
    .nodes([]) // initialize with a single node
    .linkDistance(opts.linkDistance || 30)
    .charge(opts.charge || -60)
    .on('tick', tick);

  var svg = d3.select(opts.container || 'body').append('svg')
    .attr('width', width)
    .attr('height', height);

  var nodes = force.nodes(),
    links = force.links(),
    link = svg.selectAll('.link');

  var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .call(force.drag);

  node.append("circle")
    .attr("r", 8);

  node.append("text")
    .attr("x", 12)
    .attr("dy", ".35em")
    .text(function(d) {
      return d.name;
    });

  function restart() {
    link = link.data(links);

    link.enter().insert('line', '.node')
      .attr('class', 'link');

    node = node.data(nodes);

    node.enter().append("g")
      .attr("class", "node")
      .call(force.drag);

    node.append("circle")
      .attr("r", 8);

    node.append("text")
      .attr("x", 12)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.name;
      })

    force.start();
  }

  function processLanguage(lang, parentNode) {
    if(typeof(lang.ref) === 'string'){
      // TODO Process references to other nodes
      return;
    }
    
    var currentNode = {
      name: lang.name,
      type: lang.type,
      importance: lang.children.length
    };
    nodes.push(currentNode);

    if (parentNode) {
      links.push({
        source: parentNode,
        target: currentNode
      });
    }

    lang.children.forEach(function(child) {
      processLanguage(child, currentNode);
    });
  }
  console.time("Processing data");
  processLanguage(data);
  restart();
  console.timeEnd("Processing data");

  function tick() {
    link
      .attr("x1", function(d) {
        return d.source.x;
      })
      .attr("y1", function(d) {
        return d.source.y;
      })
      .attr("x2", function(d) {
        return d.target.x;
      })
      .attr("y2", function(d) {
        return d.target.y;
      });

    node
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      });
  }

  d3.selectAll('circle.node').on('click', function(node) {
    console.log(node);
  });
};
