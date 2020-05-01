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
    constructor(parent_element) {
        this.parent_element = parent_element;
        this.w = 3; // width and height of squares, a better name would be square_size
        this.d = 60;    // diameter of the whole acvs stimuli display
        this.r = (this.d - this.w) / 2;    //  outer ring radius
        this.cx = 70 - this.w / 2;    // acvs display center x
        this.cy = 30 - this.w / 2;    // acvs display center y
        this.magenta = "rgb(254, 0, 254)";
        this.gray = "rgb(105, 105, 105)";
        this.cyan = "rgb(0, 150, 150)";
        this.colors_rgb = [magenta, gray, cyan];
        //  This string represents the colors and digits of the squares
        this.colors = "212100110212110220222111121020001022100010220020211120";
        this.digits = "978669996768697888887889969677693997967787586886767679";
        //  The data of the display for d3 to use
        this.data = generate_data_for_all_squares(
            this.w, this.r, this.cx, this.cy, this.colors_rgb, this.colors, this.digits
        );
        //  An array of strings representing lines to be displayed at the top left corner
        this.instruction_paragraphs = [];
        //  A string representing the footer text, default set as shown
        this.footer_text = "Press <SPACE> to continue ...";
        // window.addEventListener("resize", this.draw_acvs.bind(this));
        this.acvs_svg = parent_element.append("svg").attr("class", "acvs");
        this.rects_selection = this.acvs_svg.selectAll("rect");
        this.digits_selection = this.acvs_svg.selectAll("text");
    }

    /**
     * Some accessor and setter methods.
     */
    set_colors(colors) {
        this.colors = colors;
        this.data = generate_data_for_all_squares(
            this.w, this.r, this.cx, this.cy, this.colors_rgb, this.colors, this.digits
        );
    }
    set_digits(digits) { this.digits = digits }
    set_instruction_paragraphs(strs) { this.instruction_paragraphs = strs }
    set_footer_text(strs) { this.footer_text = strs }


    /**
     * This method is called upon class instantiation, but can also serve as a method to
     * update data.
     * @param {*} w 
     * @param {*} r 
     * @param {*} cx 
     * @param {*} cy 
     * @param {*} colors_rgb 
     * @param {*} colors 
     * @param {*} digits 
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



    /**
     * A helper function. Generate data for d3 to use.
     * 
     * @param {*} radius : the radius of the ring
     * @param {*} count : the number of squares on this ring
     * @param {*} cx : x coord of ring center
     * @param {*} cy : y coord of ring center
     * @param {*} w : width (and height) of the square, i.e. the square size
     * @param {*} colors : a list of strings representing color of each square
     * @param {*} positions : a list of numbers representing the arbitrary position number of each square
     * @param {*} digits : a list of numbers representing the digits on each square
     * 
     * @returns
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


    /**
     * 
     * @param {boolean} include_digits 
     */
    draw_acvs(include_digits = true) {
        // const data = this.data;
        // // Draw the rectangles on the screen:
        // const acvs = this.parent_element.append("svg");
        // const rects = acvs.selectAll("rect").data(data);
        // rects.enter().append("rect")
        //     .attr("width", function (d) { return d.w })
        //     .attr("height", function (d) { return d.h })
        //     .attr("x", function (d) { return d.x })
        //     .attr("y", function (d) { return d.y })
        //     .attr("fill", function (d) { return d.fill })
        //     .attr("class", function (d) {
        //         // create a string representing class names
        //         let c = "";
        //         // add color names as a first class
        //         switch (d.fill) {
        //             case "rgb(254, 0, 254)": c = "magenta"; break;
        //             case "rgb(0, 150, 150)": c = "cyan"; break;
        //             case "rgb(105, 105, 105)": c = "gray"
        //         }
        //         // add target/nontarget info as a second class
        //         switch (d.digit) {
        //             case "2":
        //             case "3":
        //             case "4":
        //             case "5":
        //                 c += " target"; break;
        //              default: c += " nontarget"
        //         }
        //         return c;
        //     })
        //     .attr("id", function (d) { return `sq_${d.no}` })
        // rects.exit().remove();

        // if (include_digits) {
        //     // Draw the text on the screen:
        //     let text_shift = 0.65;
        //     let text = acvs.selectAll("text").data(data);
        //     text.enter().append("text")
        //         .attr("x", (function (d) { return d.x + w / 3.25 + "" }))
        //         .attr("y", (function (d) { return d.y + w / 1.35 + "" }))
        //         .attr("fill", "white")
        //         .attr("class", "ace_pretty_text")
        //         .attr("font-size", w * text_shift + "")
        //         .text(function (d) { return d.digit });
        //     text.exit().remove();
        // }




    }


    /**
     * 
     * 
     */
    acvs_render(include_digits=true) {
        const rects = this.rects_selection;
        const data = this.data;
        rects.data(data)
            .enter().append("rect")
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
            .attr("id", function (d) { return `sq_${d.no}` })
        .merge(rects)
            .transition(1000)
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

        // Draw the digits on squares
        if (include_digits) {
            const texts = this.digits_selection;
            const text_shift = 0.65;
            const w = this.w;
            texts.data(data)
                .enter().append("text")
                    .attr("x", (function (d) { return d.x + w / 3.25 + "" }))
                    .attr("y", (function (d) { return d.y + w / 1.35 + "" }))
                    .attr("fill", "white")
                    .attr("class", "ace_pretty_text")
                    .attr("font-size", w * text_shift + "")
                    .text(function (d) { return d.digit });
            texts.exit().remove();
        }

    }


    acvs_random_update() {
        this.colors = "000000000000000000111111111111111111222222222222222222".shuffle();
        this.data = generate_data_for_all_squares(
            this.w, this.r, this.cx, this.cy, this.colors_rgb, this.colors, this.digits
        );
        this.acvs_render();
    }


    draw_instructions() {
        const lines = this.instruction_paragraphs;
        const texts = this.parent_element.append("svg");
        texts.selectAll("text").data(lines)
            .enter().append("text")
            .text(function (d) { return d })
            .attr("x", 2)
            // TODO: it's very strange that when I write like d,i=>i*5 it won't work at all
            .attr("y", function (d, i) { return (i + 1) * 4 })
            .attr("font-size", w)
            .attr("fill", "white");
    }


    /**
     * @TODO: footer coordinates not accessible
     */
    draw_footer() {
        const str = this.footer_text;
        this.parent_element.append("text")
            .attr("id", "inst-footer")
            .text(str)
            .attr("x", "40")
            .attr("y", "80")
            .attr("font-size", w + "")
            .attr("fill", "white");
    }


    draw_cue() {

    }


    trigger_two_groups_demo() {

    }





}