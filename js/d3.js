
var width = 1200;
var height = 700;

var svg = d3.select("#myGraph")
                .attr("width", width)
                .attr("height", height);

var path = d3.geoPath()
                .projection(d3.geoMercator()
                    .center([141.356427, 43.061190])
                    // .center(centroid(svg))
                    .scale(200000)
                    .translate([width / 2, height / 2])
            );

d3.json("/ut_open/data/h27ka01101.json").then(function (data){
    // if (err) throw err
    // console.log(data[0]);
    svg.selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        .on("click", function(d){
            alert(d.properties.MOJI+"の人口は"+d.properties.JINKO+"です。"
            )
        })
        .on("mouseover", function(d){
            d3.select(this).style("fill", "#ef0211")
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style("fill", "#ffffff")
        });
    })
