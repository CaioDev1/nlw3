import Image from '../models/images'

export default {
    render(image: Image) {
        return {
            id: image.id,
            url: `http://192.168.0.105:5000/uploads/${image.path}`
        }
    },

    renderMany(images: Image[]) {
        return images.map(img => {
           return this.render(img)
        })
    }
}