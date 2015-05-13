/**
 * GraphViewer
 * @author Alejandro U. Alvarez
 * @license MIT
 */

var GraphViewer = function(opts, data) {
  'use strict';

  console.info('GraphViewer');

  var width = $(opts.container).width(),
    height = $(opts.container).height();

  var force = d3.layout.force()
    .size([width, height])
    .nodes([]) // initialize with a single node
    .linkStrength(opts.linkStrength || 0.1)
    .friction(opts.friction || 0.9)
    .linkDistance(opts.linkDistance || 20)
    .charge(opts.charge || -30)
    .gravity(opts.gravity || 0.1)
    .theta(opts.theta || 0.8)
    .alpha(opts.alpha || 0.1)
    .on('tick', tick);

  var zoom = d3.behavior.zoom()
    .scaleExtent([0.1, 10])
    .on("zoom", zoomed);

  var drag = d3.behavior.drag()
    .origin(function(d) {
      return d;
    })
    .on("dragstart", dragstarted)
    .on("drag", dragged)
    .on("dragend", dragended);

  var svg = d3.select(opts.container || 'body').append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(zoom);

  var container = svg.append("g");

  var nodes = force.nodes(),
    links = force.links(),
    link = container.selectAll('.link');

  var node = container.selectAll('.node')
    .data(force.nodes())
    .enter().append('g')
    .attr('class', 'node')
    .call(force.drag)
    .call(drag);

  node.append('circle')
    .attr('r', 8);

  node.append('text')
    .attr('x', 12)
    .attr('dy', '.35em')
    .text(function(d) {
      return d.name;
    });

  function restart() {
    link = link.data(links);

    link.enter().insert('line', '.node')
      .attr('class', 'link');

    node = node.data(nodes);

    node.enter().append('g')
      .attr('class', 'node')
      .call(force.drag);

    node.append('circle')
      .attr('r', 8);

    node.append('text')
      .attr('x', 12)
      .attr('dy', '.35em')
      .text(function(d) {
        return d.name;
      });

    force.start();
  }

  function processLanguage(lang, parentNode) {
    if (typeof(lang.ref) === 'string') {
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
  console.time('Processing data');
  processLanguage(data);
  restart();
  console.timeEnd('Processing data');

  function tick() {
    link
      .attr('x1', function(d) {
        return d.source.x;
      })
      .attr('y1', function(d) {
        return d.source.y;
      })
      .attr('x2', function(d) {
        return d.target.x;
      })
      .attr('y2', function(d) {
        return d.target.y;
      });

    node
      .attr('transform', function(d) {
        return 'translate(' + d.x + ',' + d.y + ')';
      });
  }

  function zoomed() {
    container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
  }

  function dragstarted(d) {
    d3.event.sourceEvent.stopPropagation();
    d3.select(this).classed("dragging", true);
  }

  function dragged(d) {
    d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
  }

  function dragended(d) {
    d3.select(this).classed("dragging", false);
  }

  d3.selectAll('circle.node').on('click', function(node) {
    console.log(node);
  });

  zoomed();
};
