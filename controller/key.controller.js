const Keys = require("../model/key.model")

async function createUserKey(req, res) {
  const userId = req.userId

  const title = req.body.title
  const safeKey = req.body.safeKey

  const key = new Keys({
    title,
    safeKey,
    creator: userId,
  })

  const sameSafeKey = await Keys.findOne({
    safeKey: req.body.safeKey,
    creator: userId,
  })

  if (!sameSafeKey) {
    const newKey = await key.save()
    res.status(201).json({
      newKey,
      info: {
        dateCreated: new Date().toISOString(),
        status: "Key Created Successfully",
      },
    })
  } else {
    const newKey = await key.save()
    res.status(201).json({
      newKey,
      info: {
        dateCreated: new Date().toISOString(),
        status:
          "Key created, however we found a matching key, it's safer to use different keys for extra safety!",
      },
    })
  }
}

async function getUserKeys(req, res) {
  const id = req.userId

  const keys = await Keys.find({ creator: id })

  if (!keys.length) {
    res
      .status(404)
      .json({ Error: "You do not have any categories, try adding some!" })
  } else {
    res.status(200).json({ Keys: keys })
  }
}

async function deleteUserKey(req, res) {
  const userId = req.userId
  const keyId = req.params.id

  const key = await Keys.findById(keyId)

  if (!key) {
    res.status(404).json({ Error: "Key was not found, cannot delete!" })
    return
  } else if (key.creator.toString() !== userId) {
    res.status(401).json({ Error: "Unauthenticated" })
  }

  Keys.findByIdAndRemove(keyId)
  res.status(200).json({ Message: "Key was deleted" })
}

async function updateUserKey(req, res) {
  // @params
  const _id = req.params.id
  const userId = req.userId

  // @body
  const title = req.body.title
  const safeKey = req.body.safeKey
  const updated_At = new Date()

  const key = await Keys.findById(_id)

  if (!key) {
    return res.status(404).json({
      Error: "Could not update, key was not found.",
    })
  } else if (key.creator.toString() !== userId) {
    return res.status(401).json({
      Error: "Unauthorized",
    })
  } else if (!title || !safeKey) {
    return res.status(400).json({ Error: "Please enter a title and a key!" })
  }

  // @update - after error checking
  key.title = title
  key.safeKey = safeKey
  key.updated_At = updated_At

  key.save()

  res.status(200).json({
    Success: "SafeKey update was successful!.",
    Result: key,
  })
}

module.exports = { createUserKey, getUserKeys, deleteUserKey, updateUserKey }
