const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdvertisementSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    Collection: {
        type: String,
        required: true
    },
    AdvertismentBanner: {
        type: String,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    // Price: {
    //     type: String,
    //     required: true
    // },
    // https://mongoosejs.com/docs/schematypes.html#buffers
    img: {
        type: Buffer,
        required: true
    },
    imgType: {
        type: String,
        required: true
    }
    
});
// https://mongoosejs.com/docs/tutorials/virtuals.html
// a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
// IT WILL GIVE US OUR IMAGE SOURCE THAT WE WILL USE IN OUT IMG TAG
AdvertisementSchema.virtual('coverImagePath').get(function (){
    if(this.img != null && this.imgType != null){
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')}`;
    }
})



module.exports = mongoose.model('Advertisement', AdvertisementSchema);