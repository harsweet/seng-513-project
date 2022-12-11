import { randomUUID } from "crypto";
import mongoose from "mongoose";
import { userInfo } from "os";


const chatRoomSchema = new mongoose.Schema(
  {
    guid: {
        type: String,
        default: () => randomUUID().replace(/\-/g, ""),
        unique: true
    },
    userInfo: Object,
    },
    {
      timestamps: true,
      collection: "chatRooms"
    }
  );

// The statics.
chatRoomSchema.statics.createChatRoom = async function (userInfo) {
  try {
    const chatRoom = await this.create({ userInfo });
    return chatRoom
  } catch (error) {
    throw error;
  }
};

chatRoomSchema.statics.getHistoryRoomsByUserGuid = async function (userGuid) {
  try {
    // only want to filter stuff which satisfies: userGuid in Object.keys(userInfo) 
    // currently fetching all rooms from database and then filtering on javascript on server
    const allRooms = await this.find({});
    const filteredRooms = allRooms.filter((e) => {
      return userGuid in e.userInfo;
    });
    
    return filteredRooms;

  } catch (error) {
    throw error;
  }
}

export default mongoose.model("ChatRoom", chatRoomSchema);