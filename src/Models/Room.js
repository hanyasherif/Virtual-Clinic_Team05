const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    partner1Id: {
      type: String,
      required: true,
    },
    partner2Id: {
      type: String,
      required: true,
    }

      }
      ,
  { timestamps: true }
);

const Room = mongoose.model("Room", RoomSchema);
module.exports =Room;