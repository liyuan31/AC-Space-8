HtmlGui = class Gui {

    constructor() {
        this.container = d3.select("#workspace").append("div")
            .attr("class", "ace_svg_container");
        this.svg = this.container.append("svg")
            .attr("class", "ace_svg_content_responsive")
            .attr("viewBox", "0 0 100 100")
            .attr("preserveAspectRatio", "xMinYMin meet");
    }
}