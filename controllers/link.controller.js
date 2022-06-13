import { Link } from '../models/Link.js'
import { nanoid } from 'nanoid'

export const getLinks = async (req, res) => {
  try {
    const links = await Link.find({ uid: req.uid })
    return res.status(200).json({ links })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const getLink = async (req, res) => {
  try {
    const { nanoLink } = req.params
    const link = await Link.findOne({ nanoLink })

    if (!link) return res.status(404).json({ error: 'Link not found' })

    return res.status(200).json({ longLink: link.longLink })
  } catch (error) {
    console.log(error)
    if (error.kind === 'ObjectId')
      return res.status(403).json({ error: 'Link not found' })
    return res.status(500).json({ error: 'Internal server error' })
  }
}

// export const getLinkv1 = async (req, res) => {
//   try {
//     const { id } = req.params
//     const link = await Link.findById(id)

//     if (!link) return res.status(404).json({ error: 'Link not found' })

//     if (!link.uid.equals(req.uid))
//       return res
//         .status(401)
//         .json({ error: 'you do not have permission to view these links' })

//     return res.status(200).json({ link })
//   } catch (error) {
//     console.log(error)
//     if (error.kind === 'ObjectId')
//       return res.status(403).json({ error: 'Link not found' })
//     return res.status(500).json({ error: 'Internal server error' })
//   }
// }

export const createLink = async (req, res) => {
  try {
    let { longLink } = req.body

    if (!longLink.startsWith('https://')) {
      longLink = `https://${longLink}`
    }
    console.log(longLink)

    const link = new Link({ uid: req.uid, longLink, nanoLink: nanoid(7) })
    const newLink = await link.save()

    return res.status(201).json({ newLink, message: 'Link created' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const removeLink = async (req, res) => {
  try {
    const { id } = req.params
    const link = await Link.findById(id)

    if (!link) return res.status(404).json({ error: 'Link not found' })

    if (!link.uid.equals(req.uid))
      return res
        .status(401)
        .json({ error: 'you do not have permission to view these links' })

    await link.remove()

    return res.status(200).json({ link })
  } catch (error) {
    console.log(error)
    if (error.kind === 'ObjectId')
      return res.status(403).json({ error: 'Link not found' })
    return res.status(500).json({ error: 'Internal server error' })
  }
}

export const updateLink = async (req, res) => {
  try {
    const { id } = req.params
    const link = await Link.findById(id)

    let { longLink } = req.body

    if (!link) return res.status(404).json({ error: 'Link not found' })

    if (!link.uid.equals(req.uid))
      return res
        .status(401)
        .json({ error: 'you do not have permission to view these links' })

    if (!longLink.startsWith('https://')) {
      longLink = `https://${longLink}`
    }

    // Atualization of the link
    link.longLink = longLink
    console.log(link)

    const newUpdateLink = await link.save()

    return res.status(200).json({ message: 'Link updated', newUpdateLink })
  } catch (error) {
    console.log(error)
    if (error.kind === 'ObjectId') {
      return res.status(403).json({ error: 'Format id is invalid' })
    }
    return res.status(500).json({ error: 'Internal server error' })
  }
}
