// const { db } = require("../db/firebase");

// const scheduleTimers = new Map();

// const updateDevice = async (req, res) => {
//   const { device, time, roomName } = req.body;

//   if (!device) return;

//   try {
//     const roomsRef = await db.ref("/Rooms");
//     const getRooms = await roomsRef.get();
//     if (!getRooms.exists())
//       return res.status(404).json({ message: "No rooms found" });

//     const rooms = Object.values(getRooms.val());
//     console.log(rooms);
//     let dbRoom = null;
//     if (roomName) {
//       rooms.forEach((room) => {
//         if (room.Name.includes(roomName)) {
//           dbRoom = room;
//         }
//       });


//       if (!dbRoom) return res.status(404).json({ message: "No room found" });

//       dbRoom.devices = dbRoom.devices.map((dbDevice) =>
//         dbDevice.Name === device.Name ? device : dbDevice
    
//       );
//     } else {
//       rooms.forEach((room) => {
//         room.devices = room.devices.map((dbDevice) =>
//           dbDevice.Name === device.Name ? device : dbDevice
  

//         );
//       });
//     }

//     if (isNaN(time)) {
//       await roomsRef.set(rooms);
//     } else {
//       const timeDelay = Math.max(time - Date.now(), 0);
//       const timerName = device.Name + (roomName || "");
//       const timer = setTimeout(async () => {
//         await roomsRef.set(rooms);
//       }, timeDelay);

//       if (device.status) {
//         const deviceTimers = scheduleTimers.get(timerName) || [];
//         deviceTimers.push(timer);
//         scheduleTimers.set(timerName, deviceTimers);
//       } else {
//         scheduleTimers.get(timerName).forEach((cacheTimer) => {
//           clearTimeout(cacheTimer);
//         });
//         scheduleTimers.delete(timerName);
//       }


//     }

//     res.status(200).json({ message: "Device status has been changed" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };




// module.exports = {
//   updateDevice
// };


const { db } = require("../db/firebase");

const scheduleTimers = new Map();

const updateDevice = async (req, res) => {
  const { device, time, roomName } = req.body;

  if (!device) return;

  try {
    const roomsRef = await db.ref("/Rooms");
    const getRooms = await roomsRef.get();
    if (!getRooms.exists())
      return res.status(404).json({ message: "No rooms found" });

    const rooms = Object.values(getRooms.val());
    console.log(rooms);
    let dbRoom = null;
    if (roomName) {
      rooms.forEach((room) => {
        if (room.Name.includes(roomName)) {
          dbRoom = room;
        }
      });

      if (!dbRoom) return res.status(404).json({ message: "No room found" });

      dbRoom.devices = dbRoom.devices.map((dbDevice) =>
        dbDevice.Name === device.Name ? { ...device, nameImage: dbDevice.nameImage } : dbDevice
      );
    } else {
      rooms.forEach((room) => {
        room.devices = room.devices.map((dbDevice) =>
          dbDevice.Name === device.Name ? { ...device, nameImage: dbDevice.nameImage } : dbDevice
        );
      });
    }

    if (isNaN(time)) {
      await roomsRef.set(rooms);
    } else {
      const timeDelay = Math.max(time - Date.now(), 0);
      const timerName = device.Name + (roomName || "");
      const timer = setTimeout(async () => {
        await roomsRef.set(rooms);
      }, timeDelay);

      if (device.status) {
        const deviceTimers = scheduleTimers.get(timerName) || [];
        deviceTimers.push(timer);
        scheduleTimers.set(timerName, deviceTimers);
      } else {
        scheduleTimers.get(timerName).forEach((cacheTimer) => {
          clearTimeout(cacheTimer);
        });
        scheduleTimers.delete(timerName);
      }
    }

    res.status(200).json({ message: "Device status has been changed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  updateDevice
};