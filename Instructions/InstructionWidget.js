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
        this.allColors = [magenta, gray, cyan];
        //  This string represents the colors and digits of the squares
        this.colors = "212100110212110220222111121020001022100010220020211120";
        this.digits = "978669996768697888887889969677693997967787586886767679";
        //  The data of the display for d3 to use
        this.data = this.generate_data_for_all_squares(

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
        this.data = result;
    }










}