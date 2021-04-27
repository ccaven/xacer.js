/**
 * Stores a four dimensional vector
 */
export class Vector4 {

    /**
     * Create a four dimensional vector
     * @param {Number} x - The x component
     * @param {Number} y - The y component
     * @param {Number} z - The z component
     * @param {Number} w - The w component
     */
    constructor(x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    /**
     * Create a clone of the vector
     * @returns {Vector4} the cloned vector
     */
    get () {
        return new Vector4(this.x, this.y, this.z, this.w);
    }

    /**
     * Set the values of the four dimensional vector
     * @param {Number} x - The x component
     * @param {Number} y - The y component
     * @param {Number} z - The z component
     * @param {Number} w - The w component
     * @returns {Vector4} reference to original
     */
    set (x, y, z, w) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
        return this;
    }

    /**
     * Compute the dot product between this and another vector
     * @param {Vector4} that - The other vector
     * @returns {Number} the dot product
     */
    dot (that) {
        return this.x * that.x + this.y * that.y + this.z * that.z + this.w * that.w;
    }

    /**
     * Compute the length of a vector
     * @returns {Number} the length
     */
    length () {
        return Math.hypot(this.x, this.y, this.z, this.w);
    }

}