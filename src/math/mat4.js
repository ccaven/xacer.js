
export class Matrix4 extends Float32Array {

    /**
     * Create a new identity matrix
     */
    constructor() {
        super(
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        );
    }

    /**
     * Create a clone of the matrix
     * @returns {Matrix4} the clone
     */
    get () {
        let m = new Matrix4();
        m.set(this);
        return m;
    }

    /**
     * Set the values of the 4x4 matrix
     * @param {Number} x0 - The x component of the first column
     * @param {Number} x1 - The x component of the second column
     * @param {Number} x2 - The x component of the third column
     * @param {Number} x3 - The x component of the fourth column
     * @param {Number} y0 - The y component of the first column
     * @param {Number} y1 - The y component of the second column
     * @param {Number} y2 - The y component of the third column
     * @param {Number} y3 - The y component of the fourth column
     * @param {Number} z0 - The z component of the first column
     * @param {Number} z1 - The z component of the second column
     * @param {Number} z2 - The z component of the third column
     * @param {Number} z3 - The z component of the fourth column
     * @param {Number} w0 - The w component of the first column
     * @param {Number} w1 - The w component of the second column
     * @param {Number} w2 - The w component of the third column
     * @param {Number} w3 - The w component of the fourth column
     * @returns
     */
    fromValues (x0, x1, x2, x3, y0, y1, y2, y3, z0, z1, z2, z3, w0, w1, w2, w3) {
        this[0] = x0;
        this[1] = x1;
        this[2] = x2;
        this[3] = x3;

        this[4] = y0;
        this[5] = y1;
        this[6] = y2;
        this[7] = y3;

        this[8] = z0;
        this[9] = z1;
        this[10] = z2;
        this[11] = z3;

        this[12] = w0;
        this[13] = w1;
        this[14] = w2;
        this[15] = w3;

        return this;
    }

    /**
     * Multiply two matrices
     * @param {Matrix4} that - The matrix to multiply by
     * @returns {Matrix4} reference to original
     */
    mul (that) {
        let a00 = this[0],
            a01 = this[1],
            a02 = this[2],
            a03 = this[3];
        let a10 = this[4],
            a11 = this[5],
            a12 = this[6],
            a13 = this[7];
        let a20 = this[8],
            a21 = this[9],
            a22 = this[10],
            a23 = this[11];
        let a30 = this[12],
            a31 = this[13],
            a32 = this[14],
            a33 = this[15];
        // Cache only the current line of the second matrix
        let b0 = that[0],
            b1 = that[1],
            b2 = that[2],
            b3 = that[3];
        this[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = that[4];
        b1 = that[5];
        b2 = that[6];
        b3 = that[7];

        this[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = that[8];
        b1 = that[9];
        b2 = that[10];
        b3 = that[11];

        this[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        b0 = that[12];
        b1 = that[13];
        b2 = that[14];
        b3 = that[15];

        this[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        return this;
    }

}