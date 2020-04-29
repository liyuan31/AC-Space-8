function footerFlash() {
    d3.selectAll("#inst-footer")
        .transition()
        .duration(1000)
        .attr("fill", "white")
        .transition()
        .duration(1000)
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
function threeColorsDemo() {
    const t = 1500;  // transtion duration
    const dimColor = "#0f0f0f";
    // get the rgb value string for three colors
    const magenta = d3.select(".magenta").attr("fill");
    const gray = d3.select(".gray").attr("fill");
    const cyan = d3.select(".cyan").attr("fill");
    // create selections for groups
    const squares = d3.selectAll("rect");
    const magentas = squares.filter(".magenta");
    const grays = squares.filter(".gray");
    const cyans = squares.filter(".cyan");

    /*
        To achieve desired effect, the following steps are followed.
        - dim all squares
        - light magenta
        - dim magenta and light gray
        - dim gray and light cyan
        - dim cyan and light magenta
    */

    squares.attr("fill", dimColor);

    const lightMagenta = function() {
        magentas.transition()
            .duration(t)
            .attr("fill", magenta)
            .on("end", dimMagentaLightGray)
    }

    const dimMagentaLightGray = function() {
        magentas.transition()
            .duration(t)
            .attr("fill", dimColor);
        grays.transition()
            .duration(t)
            .attr("fill", gray)
            .on("end", dimGrayLightCyan)
    }

    const dimGrayLightCyan = function() {
        grays.transition()
            .duration(t)
            .attr("fill", dimColor);
        cyans.transition()
            .duration(t)
            .attr("fill", cyan)
            .on("end", dimCyan)
    }

    const dimCyan = function() {
        cyans.transition()
            .duration(t)
            .attr("fill", dimColor)
            .on("end", lightMagenta)
    }

    lightMagenta();

}

/*
    This is a function that allows two groups of squares to flash alternatively.
    The grouping is quite arbitary, in this case it's magenta+gray & cyan.
    To make it happen, we still need the following steps:
    -- dim all the squares
    -- light magenta+gray
    -- dim magenta+gray and light cyan
    -- dim cyan
*/
function twoGroupsDemo() {

    const t = 1500;  // transtion duration
    const dimColor = "#0a0a0a";

    // get the rgb value string for three colors
    const magenta = d3.select(".magenta").attr("fill");
    const gray = d3.select(".gray").attr("fill");
    const cyan = d3.select(".cyan").attr("fill");

    // create selections for groups
    const squares = d3.selectAll("rect");
    const magentas = squares.filter(".magenta");
    const grays = squares.filter(".gray");
    const cyans = squares.filter(".cyan");
    // const nonMagenta = squares.filter(".gray, .cyan");
    // const nonGray = squares.filter(".magenta, .cyan");
    const nonCyan = squares.filter(".magenta, .gray");
    
    // do the deed
    squares.attr("fill", dimColor);

    const lightMagentaAndGray = function() {
        magentas.transition()
            .duration(t)
            .attr("fill", magenta);
        grays.transition()
            .duration(t)
            .attr("fill", gray)
            .on("end", dimMagentaAndGrayLightCyan)
    }

    const dimMagentaAndGrayLightCyan = function() {
        nonCyan.transition()
            .duration(t)
            .attr("fill", dimColor);
        cyans.transition()
            .duration(t)
            .attr("fill", cyan)
            .on("end", dimCyan)
    }

    const dimCyan = function() {
        cyans.transition()
            .duration(t)
            .attr("fill", dimColor)
            .on("end", lightMagentaAndGray);
    }

    // pull the trigger
    lightMagentaAndGray();

    
}

function cueDemo(optColor, nonOptColor1, nonOptColor2) {

    // specify transition durations
    const t = 1000;

    // specify dimmed color
    const dimColor = "#0a0a0a";

    // get the rgb value string for three colors
    const magenta = d3.select(".magenta").attr("fill");
    const gray = d3.select(".gray").attr("fill");
    const cyan = d3.select(".cyan").attr("fill");

    // create selections for groups
    const optSquares = d3.selectAll(`.${optColor}`);
    const nonOptSquares = d3.selectAll(`.${nonOptColor1}, .${nonOptColor2}`);

    // create selections for inner cue circles
    const optCue = d3.select("#opt-cue-circle");
    const nonOptCues = d3.selectAll("#nonopt-cue-circle-1, #nonopt-cue-circle-2");

    // start adding the animations
    const lightOptDimNonOpt = function() {
        optSquares.transition()
            .duration(t)
            .attr("stroke", "white")
            .attr("stroke-width", "0.6");
        optCue.transition()
            .duration(t)
            .attr("stroke", "white")
            .attr("stroke-width", "0.2");
        nonOptSquares.transition()
            .duration(t)
            .attr("fill", dimColor)
            .attr("stroke", null)
            .attr("stroke-width", null);
        nonOptCues.transition()
            .duration(t)
            .attr("stroke", null)
            .attr("stroke-width", null)        
            .on("end", dimOptLightNonOpt);
    }

    const dimOptLightNonOpt = function() {
        optSquares.transition()
            .duration(t)
            .attr("fill", dimColor)
            .attr("stroke", null)
            .attr("stroke-width", null);
        optCue.transition()
            .duration(t)
            .attr("stroke", null)
            .attr("stroke-width", null)
        nonOptSquares.transition()
            .duration(t)
            .attr("stroke", "white")
            .attr("stroke-width", "0.6");
        nonOptCues.transition()
            .duration(t)
            .attr("stroke", "white")
            .attr("stroke-width", "0.2")
            .on("end", lightOptDimNonOpt);
    }

    // pull the trigger
    lightOptDimNonOpt();
}