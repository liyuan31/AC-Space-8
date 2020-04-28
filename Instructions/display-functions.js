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
// Generate data for d3 to use.
// @para
// radius = the radius of the ring
// count = the number of squares on this ring
// cx = x coord of ring center
// cy = y coord of ring center
// w = width (and height) of the square
// colors = a list of strings representing color of each square
// positions = a list of numbers representing the arbitrary position number of each square
// digits = a list of numbers representing the digits on each square
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

function generate_data_for_all_squares(w, d, r, cx, cy, allColors, colors, digits) {

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