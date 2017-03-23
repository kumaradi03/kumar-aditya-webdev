/**
 * Created by aditya on 3/21/17.
 */
module.exports = function () {
    var mongoose = require('mongoose');

    var widgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref:'pageModel'},
        type: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT','TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        index: Number,
        formatted: Boolean,
        dateCreated: {type: Date, default:Date.now()}
    }, {collection: 'assignment5.widget'});
    return widgetSchema;
};