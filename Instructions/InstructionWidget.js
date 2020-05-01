/**
 * The <InstructionWidget> is a class that encapsulates the logic for displays of
 * intruction pages.
 */
InstructionWidget = class {

    /**
     * The constructor only takes in its parent element. Other parameters that
     * specify the display can be changed
     * 
     * @param {object} parent_element : the element where the display is shown
     */
    constructor (parent_element) {
        this.parentElement = parent_element;
        this.w = 3; // width and height of squares, a better name would be square_size
        this.d = 60;    // diameter of the whole acvs stimuli display
        this.r = (this.d - this.w)/2;    //  outer ring radius
        this.cx = 70 - this.w/2;    // acvs display center x
        this.cy = 30 - this.w/2;    // acvs display center y
        this.magenta = "rgb(254, 0, 254)";
        this.gray = "rgb(105, 105, 105)";
        this.cyan = "rgb(0, 150, 150)";
        this.colors_rgb = [magenta, gray, cyan];
        //  This string represents the colors and digits of the squares
        this.colors = "212100110212110220222111121020001022100010220020211120";
        this.digits = "978669996768697888887889969677693997967787586886767679";
        //  The data of the display for d3 to use
        this.data = this.generate_data_for_all_squares(
            this.w, this.r, this.cx, this.cy, this.colors_rgb, this.colors, this.digits
        );
    }

    /**
     * Some accessor and setter methods.
     */
    set_colors (colors) { this.colors = colors}
    set_digits (digits) { this.digits = digits}

    
    /**
     * This method is called upon class instantiation, but can also serve as a method to
     * update data.
     */
    generate_data_for_all_squares(w, r, cx, cy, colors_rgb, colors, digits) {

        const get_a_list_of_colors = function (n) {
            let result = [];
            for (let i = 0; i < n; i++) {
                result.push(colors_rgb[colors[colors.length - 1]]);
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
        this.data = data;
    }


    /**
     * Helper function. Generate data for d3 to use.
     * 
     * @param
     * radius = the radius of the ring
     * count = the number of squares on this ring
     * cx = x coord of ring center
     * cy = y coord of ring center
     * w = width (and height) of the square
     * colors = a list of strings representing color of each square
     * positions = a list of numbers representing the arbitrary position number of each square
     * digits = a list of numbers representing the digits on each square
     */
    static generate_data_for_one_ring_of_squares(radius, count, cx, cy, w, colors, positions, digits) {
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










}