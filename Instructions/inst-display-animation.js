function footerFlash() {
    d3.selectAll("#footer")
        .transition()
        .duration(2000)
        .attr("fill", "white")
        .transition()
        .duration(2000)
        .attr("fill", "black")
        .on("end", footerFlash);

}

function targetFlash() {
    // just add some flash effect on the two targets
    const targets = d3.selectAll(".target");
    const targetsFlashTrigger = function () {
        targets
            .transition()
            .duration(800)
            .attr("stroke", "yellow")
            .attr("stroke-width", "0.7")
            .transition()
            .duration(800)
            .attr("stroke", null)
            .on("end", targetsFlashTrigger)
    }
    targetsFlashTrigger();
}

/*
    Dim a certain colored squares.
*/
function dim(color, recover=false) {
    const originalColor = d3.select(`.${color}`).attr("fill");
    const squares = d3.selectAll(`.${color}`)
        .transition().duration(500)
            .attr("fill", "#212422");
    if(recover) {
        squares.attr("fill", originalColor);
    }
}