
import Notifier from '../models/notifierModel.js'

// 1️⃣ GET all relevant notifications
const getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id

    const notes = await Notifier.find({
      target: { $in: ['all', 'users'] }
    }).sort({ date: -1 })

    res.json({ success: true, notifications: notes })
  } catch (err) {
    console.error("❌ Fetch notifications:", err.message)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

// 2️⃣ GET unread count
const getUserNotificationCount = async (req, res) => {
  try {
    const userId = req.user.id

    const count = await Notifier.countDocuments({
      target: { $in: ['all', 'users'] },
      readBy: { $ne: userId }
    })

    res.json({ success: true, count })
  } catch (err) {
    console.error("❌ Count error:", err.message)
    res.status(500).json({ success: false })
  }
}

const markNotificationAsRead = async (req, res) => {
  const { notificationId } = req.params
  const userId = req.user.id

  try {
    const updated = await Notifier.updateOne(
      { _id: notificationId, readBy: { $ne: userId } },
      { $addToSet: { readBy: userId } }
    )
    console.log("🛠️ Update result:", updated)
    res.json({ success: true })
  } catch (err) {
    console.error("❌ Mark single read error:", err.message)
    res.status(500).json({ success: false, message: "Server error" })
  }
}


// 3️⃣ MARK all as read
const markAllAsRead = async (req, res) => {
  try {
    const userId = req.user.id

    await Notifier.updateMany(
      {
        target: { $in: ['all', 'users'] },
        readBy: { $ne: userId }
      },
      {
        $addToSet: { readBy: userId }
      }
    )

    res.json({ success: true })
  } catch (err) {
    console.error("❌ Mark as read error:", err.message)
    res.status(500).json({ success: false })
  }
}

export {markAllAsRead, getUserNotificationCount, getUserNotifications, markNotificationAsRead}
