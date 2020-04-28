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

/*
    Dimming three colors alternatedly.
*/
function flashThreeColors() {
    const t = 800;  // transtion duration
    // get the rgb value string for three colors
    const magenta = d3.select(".magenta").attr("fill");
    const gray = d3.select(".gray").attr("fill");
    const cyan = d3.select(".cyan").attr("fill");
    // create selections for groups
    const squares = d3.selectAll("rect");
    const nonMagenta = squares.filter(".gray, .cyan");
    const nonGray = squares.filter(".magenta, .cyan");
    const nonCyan = squares.filter(".magenta, .gray");

    /*
        To achieve desired effect, the following steps are followed.
        - dim all squares
        - light magenta
        - dim magenta and light gray
        - dim gray and light cyan
        - dim cyan and light magenta
    */

    function dimNonMagenta() {
        nonMagenta.transition()
            .duration(t)
            .attr("fill", "#212422")
            .on("end", grayTrigger)
    }

    function grayTrigger() {
        nonGray.transition()
            .duration(t)
            .attr("fill", "#212422")
            .on("end", cyanTrigger)
    }

    function cyanTrigger() {
        nonCyan.transition()
            .duration(t)
            .attr("fill", "#212422")
            .on("end", flashThreeColors)
    }

    magentaTrigger();

}