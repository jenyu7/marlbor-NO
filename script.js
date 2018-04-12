var width = 960,
    height = 500;

var projection = d3.geo.orthographic()
	.scale(250)
	.translate([width / 2, height / 2])
	.clipAngle(90);

var path = d3.geo.path()
    .projection(projection);

var λ = d3.scale.linear()
	.domain([0, width])
	.range([-180, 180]);

var φ = d3.scale.linear()
	.domain([0, height])
	.range([90, -90]);

var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

/***
svg.on("mousemove", function() {
    var p = d3.mouse(this);
    projection.rotate([λ(p[0]), φ(p[1])]);
    svg.selectAll("path").attr("d", path);
});
***/
d3.json("/test.json", function(error, world) {
    if (error) throw error;
    svg.append("g")
	.attr("class", "countries")
	.selectAll("path")
	.data(topojson.feature(world, world.objects.countries).features)
	.enter().append("path")
	.attr("d", path);

    svg.append("path")
	.attr("class", "boundary")
	.attr("d", path(topojson.mesh(world, world.objects.countries,
				      function (a, b) {
					  return a !== b; })));
    /***
    svg.insert("path", ".graticule")
	.datum(topojson.feature(world, world.objects.countries))
	.attr("class", "land")
	.attr("d", path);

    svg.insert("path", ".graticule")
	.datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
	.attr("class", "boundary")
	.attr("d", path); 
    ***/
});

/***
 var globe = {type: "Sphere"},
 land = topojson.feature(world, world.objects.land),
 countries = topojson.feature(world, world.objects.countries).features,
 borders = topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }),
 i = -1,
 n = countries.length;
 ***/
