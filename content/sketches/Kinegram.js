class Kinegram {
    constructor(frames = [], slitWidth = 5, name = "Kinegram " + int(random(100, 999))) {
        this.name = name;
        this.frames = frames;
        this.slitWidth = slitWidth;
        this.kinegram = null;
        this.overlay = null;
        if (this.frames.length > 0) {
            this.kinegram = createImage(this.frames[0].width, this.frames[0].height);
            this.overlay = createImage(this.frames[0].width * 2, this.frames[0].height);
        }
    }

    addFrame(img) {
        this.frames.push(img);

        // create an blank image only when the first frame is pushed
        if (this.frames.length == 1) {
            this.kinegram = createImage(this.frames[0].width, this.frames[0].height);
            this.overlay = createImage(this.frames[0].width * 2, this.frames[0].height);
        }
    }

    reset() {
        this.frames.splice(0,this.frames.length)
        this.kinegram = null;
        this.overlay = null;
    }

    generateKinegram() {
        print('generating kinegram for ' + this.name);
        for (let i = 0; i < this.frames.length; i++) {
            this.frames[i].loadPixels();
            if (this.frames[0].width != this.frames[i].width && this.frames[0].height == this.frames[i].height) {
                print("image dimensions are not consistent");
                return null;
            }
        }

        this.kinegram = createImage(this.frames[0].width, this.frames[0].height);
        this.kinegram.loadPixels();
        for (var x = 0; x < this.kinegram.width; x++) {
            for (var y = 0; y < this.kinegram.height; y++) {

                let imgIndex = int(x / this.slitWidth) % this.frames.length;
                this.kinegram.set(x, y, this.frames[imgIndex].get(x, y));
            }
        }
        this.kinegram.updatePixels();

        print('done generating kinegram for ' + this.name);
        return this.kinegram;
    }

    generateOverlay() {
        print('generating overlay for ' + this.name);
        this.overlay.loadPixels();

        for (var x = 0; x < this.overlay.width; x++) {
            for (var y = 0; y < this.overlay.height; y++) {
                let index = int(x / this.slitWidth) % this.frames.length;
                if (index > 0) {
                    this.overlay.set(x, y, color(0, 255));
                } else {
                    this.overlay.set(x, y, color(0, 0));
                }
            }
        }
        this.overlay.updatePixels();
        print('done generating overlay for ' + this.name);
        return this.overlay;
    }


    showKinegram(x = width / 2, y = height / 2) {
        if (this.kinegram !== null)
            image(this.kinegram, x, y);
        // else
            // console.warn('kinegram not found')
    }

    showOverlay(x = width / 2, y = height / 2) {
        if (this.overlay !== null)
            image(this.overlay, x, y);
        // else
            // console.warn('overlay not found')
    }

    saveKinegram(filename = this.name) {
        if (this.kinegram !== null)
            this.kinegram.save(filename, 'png');
        else
            console.warn('kinegram not found')
    }

    saveOverlay(filename = this.name + '_overlay') {
        if (this.overlay !== null)

            this.overlay.save(filename, 'png');
        else
            console.warn('overlay not found')
    }

    save(filename = this.name) {
        this.saveKinegram(filename);
        this.saveOverlay(filename + '_overlay');
    }
}