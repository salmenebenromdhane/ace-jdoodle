var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var codeSchema = new Schema(
  {
    subject: { type: String, required: true },
    intputOutput:[ { type: Object, required: true }],
    defaultSignature: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Code', codeSchema);
