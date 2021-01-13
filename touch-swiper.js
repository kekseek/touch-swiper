/**
 * @author Wadim Kuritsyn
 * @version 0.1.0
 */


/**
 * Creates a new swiper instance
 * @class
 * @classdesc Class adds to the selected DOM-element touch swipe events
 * @since 0.1.0
 */
class Swiper {
    constructor(element) {
        /**
         * @type {*}
         * @private
         */
        this.element = document.querySelector(element);

        this.pageWidth = window.innerWidth || document.body.clientWidth;

        this.treshold = Math.max(1,Math.floor(0.01 * (this.pageWidth)));

        /**
         * @type {number}
         * @private
         */
        this._touchstartX = 0;

        /**
         * @type {number}
         * @private
         */
        this._touchstartY = 0;

        /**
         * @type {number}
         * @private
         */
        this._touchendX = 0;

        /**
         * @type {number}
         * @private
         */
        this._touchendY = 0;

        /**
         * @type {number}
         * @private
         */
        this.limit = Math.tan(45 * 1.5 / 180 * Math.PI);

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onLeft = this.onLeft.bind(this);
        this.onRight = this.onRight.bind(this);
        this.onDown = this.onDown.bind(this);
        this.onTop = this.onTop.bind(this);
        this.destroy = this.destroy.bind(this);
        this.handleGesture = this.handleGesture.bind(this);

        this.element.addEventListener('touchstart', this.onTouchStart, false);
        this.element.addEventListener('touchend', this.onTouchEnd, false);
    }

    onTouchStart(event) {
        this.touchstartX = event.changedTouches[0].screenX;
        this.touchstartY = event.changedTouches[0].screenY;
    }

    onTouchEnd(event) {
        this.touchendX = event.changedTouches[0].screenX;
        this.touchendY = event.changedTouches[0].screenY;
        this.handleGesture();
    }

    set touchstartX(value) {
        this._touchstartX = value;
    }
    get touchstartX() {
        return this._touchstartX;
    }
    set touchstartY(value) {
        this._touchstartY = value;
    }
    get touchstartY() {
        return this._touchstartY;
    }
    set touchendX(value) {
        this._touchendX = value;
    }
    get touchendX() {
        return this._touchendX;
    }
    set touchendY(value) {
        this._touchendY = value;
    }
    get touchendY() {
        return this._touchendY;
    }

    /**
     * @public
     * @param callback
     */
    onLeft(callback) {
        this.onLeft = callback;
    }

    /**
     * @public
     * @param callback
     */
    onRight(callback) {
        this.onRight = callback;
    }

    /**
     * @public
     * @param callback
     */
    onTop(callback) {
        this.onTop = callback;
    }

    /**
     * @public
     * @param callback
     */
    onDown(callback) {
        this.onDown = callback;
    }

    /**
     * Touch event handler
     * @private
     * @param {event} e
     */
    handleGesture(e) {
        let x = this.touchendX - this.touchstartX;
        let y = this.touchendY - this.touchstartY;
        let xy = Math.abs(x / y);
        let yx = Math.abs(y / x);
        if (Math.abs(x) > this.treshold || Math.abs(y) > this.treshold) {
            if (yx <= this.limit) {
                if (x < 0) {
                    // Left
                    this.onLeft();
                } else {
                    // Right
                    this.onRight();
                }
            }
            if (xy <= this.limit) {
                if (y < 0) {
                    // Top
                    this.onTop();
                } else {
                    // Down
                    this.onDown();
                }
            }
        } else {
            // Tap
        }
    }

    /**
     * Remove event listeners from the element
     */
    destroy() {
        this.element.removeEventListener('touchstart', this.onTouchStart);
        this.element.removeEventListener('touchend', this.onTouchEnd);
    }
}