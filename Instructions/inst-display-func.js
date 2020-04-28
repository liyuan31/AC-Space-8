class Square {
    constructor(x, y, w, h, fill, no, digit) {
        // actual parameter for a square
        this.x = x; // x coord
        this.y = y; // y coord
        this.w = w; // width
        this.h = h; // height
        this.fill = fill; // color
        // ACVS-specific things
        this.no = no; // square number, or, position
        this.digit = digit; // text on square
    }
}

/*
    Generate data for d3 to use.
    @para
    radius = the radius of the ring
    count = the number of squares on this ring
    cx = x coord of ring center
    cy = y coord of ring center
    w = width (and height) of the square
    colors = a list of strings representing color of each square
    positions = a list of numbers representing the arbitrary position number of each square
    digits = a list of numbers representing the digits on each square
*/
function generate_data_for_one_ring_of_squares(radius, count, cx, cy, w, colors, positions, digits) {

    let result = [];

    const alpha = 2 * Math.PI / count;

    for (let i = 0; i < count; i++) {

        currentColor = "";
        currentPosition = "";
        currentDigit = "";
        typeof colors === "string" ? currentColor = colors : currentColor = colors[i];
        typeof positions === "string" ? currentPosition = positions : currentPosition = positions[i];
        typeof digits === "string" ? currentDigit = digits : currentDigit = digits[i];

        let x = (Math.cos(alpha * i + Math.PI / 2) * radius + cx);
        let y = (Math.sin(alpha * i + Math.PI / 2) * radius + cy);

        result.push(new Square(x, y, w, w, currentColor, currentPosition, currentDigit));
    }
    return result;
}

function generate_data_for_all_squares(w, r, cx, cy, allColors, colors, digits) {

    const get_a_list_of_colors = function (n) {
        let result = [];
        for (let i = 0; i < n; i++) {
            result.push(allColors[colors[colors.length - 1]]);
            colors = colors.slice(0, colors.length - 1);
        }
        return result;
    }
    const get_a_list_of_digits = function (n) {
        let result = [];
        for (let i = 0; i < n; i++) {
            result.push(digits[digits.length - 1]);
            digits = digits.slice(0, digits.length - 1);
        }
        return result;
    }

    // Helper function for generating a ring of <Square> objects
    // Given start and end index, return an array of strings representing positions
    const get_a_list_of_positions = function (startIndex, endIndex) {
        let result = [];
        for (let i = startIndex; i <= endIndex; i++) { result.push(`${i}`) }
        return result;
    }
    const data = generate_data_for_one_ring_of_squares(r, 24, cx, cy, w, get_a_list_of_colors(24), get_a_list_of_positions(0, 23), get_a_list_of_digits(24))
        .concat(generate_data_for_one_ring_of_squares(r * 0.75, 18, cx, cy, w, get_a_list_of_colors(18), get_a_list_of_positions(24, 41), get_a_list_of_digits(18))
            .concat(generate_data_for_one_ring_of_squares(r * 0.50, 12, cx, cy, w, get_a_list_of_colors(12), get_a_list_of_positions(42, 54), get_a_list_of_digits(12))));
    return data;
}

// Use d3 to draw the squares and digits on the screen
function draw_acvs() {
    // Draw the rectangles on the screen:
    const acvs = svg.append("svg");
    const rects = acvs.selectAll("rect").data(data);
    rects.enter().append("rect")
        .attr("width", function (d) { return d.w })
        .attr("height", function (d) { return d.h })
        .attr("x", function (d) { return d.x })
        .attr("y", function (d) { return d.y })
        .attr("fill", function (d) { return d.fill })
        .attr("class", function (d) {
            // create a string representing class names
            let c = "";
            // add color names as a first class
            switch (d.fill) {
                case "rgb(254, 0, 254)": c = "magenta"; break;
                case "rgb(0, 150, 150)": c = "cyan"; break;
                case "rgb(105, 105, 105)": c = "gray"
            }
            // add target/nontarget info as a second class
            switch (d.digit) {
                case "2":
                case "3":
                case "4":
                case "5":
                    c += " target"; break;
                default: c += " nontarget"
            }
            return c;
        })
        .attr("id", function (d) { return `sq_${d.no}` });
    rects.exit().remove();

    // Draw the text on the screen:
    let text_shift = 0.65;
    let text = acvs.selectAll("text").data(data);
    text.enter().append("text")
        .attr("x", (function (d) { return d.x + w / 3.25 + "" }))
        .attr("y", (function (d) { return d.y + w / 1.35 + "" }))
        .attr("fill", "white")
        .attr("class", "ace_pretty_text")
        .attr("font-size", w * text_shift + "")
        .text(function (d) { return d.digit });
    text.exit().remove();
}


function addFooter() {
    const footer = svg
        .append("text")
        .attr("id", "footer")
        .text("Press <SPACE> to continue ...")
        .attr("x", "40")
        .attr("y", "80")
        .attr("font-size", w + "");
}

