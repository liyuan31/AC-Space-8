/**
 * Get a d3 selection of the workspace <div>. Create if not exist.
 * @version 1.0
 * @date 20200508
 */
function get_workspace() {
    const master = d3.select(".master-container");
    if (master.select("#workspace").empty()) {
        master.append("canvas")
            .attr("id", "workspace")
            .attr("width", "600")
            .attr("height", "800");
    }
    return master.select("#workspace");
}
