ui.html = class {
    /**
     * Get a d3 selection of the workspace <div>. Create if not exist.
     * @version 1.0
     * @date 20200508
     */
    static get_workspace() {
        const master = d3.select(".master-container");
        if (master.select(".workspace").empty()) {
            master.append("div").attr("class", "workspace");
        }
        return master.select(".workspace");
    }
}
