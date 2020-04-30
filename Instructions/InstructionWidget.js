/**
 * The <InstructionWidget> is a class that encapsulates the logic for displays of
 * intruction pages.
 */
exp.InstructionWidget = class {

    /**
     * The constructor only takes in its parent element. Other parameters that
     * specify the display can be changed
     * 
     * @param {object} parent_element 
     */
    constructor (parent_element) {
        this.parentElement = parent_element;
        this.w = 3; // width and height of squares, a better name would be square_size
        this.d = 60;    // diameter of the whole acvs stimuli display
        this.r = (this.d - this.w)/2;    //  outer ring radius
    }

    /**
     * 
     */











}