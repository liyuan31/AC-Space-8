/*
    A function that allows a text element to breathe between two colors
    @para
        selection: a d3 selection of, usually a <text> element
        colorFrom: the color from which the element is changed
        colorTo: the color to which the element is changed, although the order of from and to doesn't really matter
        frequency: the breathe frequency in Hz
*/
function breathe(selection, colorFrom, colorTo, frequency) {
    const duration = 1/frequency*1000;
    selection.attr("fill", colorFrom);
    selection.transition()
        .duration(duration)
        .attr("fill", colorTo)
        .on("end", breathe(selection, colorFrom, colorTo, frequency));
}