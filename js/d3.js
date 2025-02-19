// 地図部分
const mapWidth = 800;
const mapHeight = 600;
const graphWidth = 1000;
const graphHeight = 15000;

var map = d3.select("#mapChuo")
                .attr("width", mapWidth)
                .attr("height", mapHeight);

var path = d3.geoPath()
                .projection(d3.geoMercator()
                    .center([141.30, 43.03])
                    .scale(200000)
                    .translate([mapWidth / 2, mapHeight / 2])
                );

var t = d3.scaleLinear()
            .domain([0, 1200])
            .range([1, 0]);


var zoom = d3.zoom()
                .scaleExtent([1, 8])
                .on("zoom", zoomed);

map.call(zoom)

var chart = d3.select("#graphChuo")
                .attr("width", graphWidth)
                .attr("height", graphHeight);

d3.json("./data/h27ka01101.json").then(function (data){
    map.selectAll("path")
    .data(data.features)
    .enter().append("path")
    .attr("d", path)
    // 人口の値によって色分け
    .style("fill", function(d) {return d3.interpolateRdYlGn(t(d.properties.JINKO));})
    // マウスホバーでピンク色
    .on("mouseover", function(){
        d3.select(this).style("fill", "#ff1493")
    })
    .on("mouseout", function(d) {
        d3.select(this)
        .style("fill", function(d) {return d3.interpolateRdYlGn(t(d.properties.JINKO));})
    })
    // クリックで町丁目の人口をアラート表示
    .on("click", function(d){
        alert(d.properties.MOJI+"の人口は"+d.properties.JINKO+"です。")
    });

    // 棒グラフ部分
    chart.selectAll("rect")
    .data(data.features)
    .enter()
    .append("rect")
    .attr("x", function(d) {return 150;})
    .attr("y", function(d, i) {return i * (graphHeight / data.features.length)})
    .attr("width", function(d) {return d.properties.JINKO})
    .attr("height", graphHeight / data.features.length)
    // 人口の値によって色分け
    .style("fill", function(d) {return d3.interpolateRdYlGn(t(d.properties.JINKO));})
    // マウスホバーでピンク色
    .on("mouseover", function(){
        d3.select(this).style("fill", "#ff1493")
    })
    .on("mouseout", function(d) {
        d3.select(this)
        .style("fill", function(d) {return d3.interpolateRdYlGn(t(d.properties.JINKO));})
    })
    // クリックで町丁目の人口をアラート表示
    .on("click", function(d){
        alert(d.properties.MOJI+"の人口は"+d.properties.JINKO+"です。")
    });

    chart.selectAll("text")
    .data(data.features)
    .enter()
    .append("text")
    .text(function(d) {return d.properties.MOJI})
    .attr("x", function(d) {return 0;})
    .attr("dominant-baseline", "central")
    .attr("y", function(d, i) {return i * (graphHeight / data.features.length) + (graphHeight / data.features.length - 2) / 2})
});

// ズーム機能
function zoomed() {
    map.selectAll("path")
        .attr("transform", d3.event.transform);
        // .attr("stroke-width", 1 / d3.event.transform.k);
}

