var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
      username: {
        type: String,
        unique: true,
        required: true,
        trim: true
      },
      password: {
        type: String,
        required: true,
      },
      component: {
        type: Number,
        required: true

      }
});
mongoose.model('User', userSchema);