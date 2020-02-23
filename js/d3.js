
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

var t = d3.scaleLinear()
            .domain([0, 1000])
            .range([1, 0]);

d3.json("/ut_open/data/h27ka01101.json").then(function (data){
    svg.selectAll("path")
        .data(data.features)
        .enter().append("path")
        .attr("d", path)
        // 人口の値によって色分け
        .style("fill", function(d) {return d3.interpolateRdYlGn(t(d.properties.JINKO));})
        // マウスホバーでピンク色
        .on("mouseover", function(d){
            d3.select(this).style("fill", "#ff1493")
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style("fill", function(d) {return d3.interpolateRdYlGn(t(d.properties.JINKO));})
            })
        // クリックで町丁目の人口をアラート表示
        .on("click", function(d){
            alert(d.properties.MOJI+"の人口は"+d.properties.JINKO+"です。"
            )
        })
        })
