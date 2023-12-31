import axios from 'axios'
import moment from 'moment'

const isExternal = url => url && (url.indexOf(':') > -1 || url.indexOf('//') > -1 || url.indexOf('www.') > -1)
const isBlocked = (state, id) => state.blocked.includes(id) || state.blockedBy.includes(id)

const getDate = item => {
  if (!item) return new Date()
  switch (item.type) {
    case 'visitor':
      return item.visit_date
    case 'visited':
      return item.visit_date
    case 'follower':
      return item.match_date
    case 'following':
      return item.match_date
    default:
      return item
  }
}
const getId = tab => {
  switch (tab) {
    case 'notif':
      return 'id_from'
    case 'convos':
      return 'user_id'
    default:
      return 'id'
  }
}
const getLocationFromIp = async f => {
  try {
    const url = 'https://ipinfo.io?token=3443e12245bdcf'
    const res = await axios.get(url)
    if (!res.error) {
      const splitted = res.data.loc.split(',')
      f({ lat: Number(splitted[0]), lng: Number(splitted[1]) })
    }
  } catch (err) {
    console.log('Got error here -->', err)
  }
}

const syncLocation = async location => {
  try {
    const token = localStorage.getItem('token')
    const url = `${process.env.VUE_APP_API_URL}/api/users/location`
    const headers = { 'x-auth-token': token }
    await axios.post(url, location, { headers })
  } catch (err) {
    console.log('Got error here -->', err)
  }
}

export default {
  getDate,
  isBlocked,
  syncLocation,
  getLocationFromIp,
  // eslint-disable-next-line
  getFullPath: (file) => isExternal(file) ? file : `${process.env.VUE_APP_API_URL}/uploads/${file ? file : 'default.png'}`,
  // consoleLog: ('utility.js getFullPath => ', getFullPath),
  formatTime (date) {
    const when = moment(getDate(date))
    const now = moment()
    let fmt = 'M/DD/YY, h:mm A'
    if (now.diff(when, 'weeks', true) < 1) {
      fmt = 'ddd h:mm A'
    } else if (now.diff(when, 'years', true) < 1) {
      fmt = 'MMMM D, YYYY, h:mm A'
    }
    return when.format(fmt)
  },
  sync: async type => {
    try {
      const token = localStorage.getItem('token')
      const url = `${process.env.VUE_APP_API_URL}/api/${type}`
      const headers = { 'x-auth-token': token }
      const res = await axios.get(url, { headers })
      return res.data.msg ? [] : res.data
    } catch (err) {
      console.log('Got error here -->', err)
    }
  },
  syncNotif: async () => {
    try {
      const token = localStorage.getItem('token')
      const url = `${process.env.VUE_APP_API_URL}/api/notif/all`
      const headers = { 'x-auth-token': token }
      const result = await axios.get(url, { headers })
      return result.data.msg ? [] : result.data
    } catch (err) {
      console.log('Got error here -->', err)
    }
  },
  calculateDistance: (from, to, mile) => {
    if (Math.abs(from.lat - to.lat) <= 0.005 && Math.abs(from.lng - to.lng) <= 0.005) {
      return 0
    }
    const theta = from.lng - to.lng
    const radtheta = Math.PI * theta / 180
    from.rad = Math.PI * from.lat / 180
    to.rad = Math.PI * to.lat / 180
    let dist = Math.sin(from.rad) * Math.sin(to.rad) + Math.cos(from.rad) * Math.cos(to.rad) * Math.cos(radtheta)
    dist = dist > 1 ? 1 : dist
    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    return !mile ? dist * 1.609344 : dist
  },
  updateLocation: () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => syncLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }), () => getLocationFromIp(res => syncLocation({
        lat: Number(res.lat),
        lng: Number(res.lng)
      })))
    } else {
      getLocationFromIp(res => syncLocation({
        lat: Number(res.lat),
        lng: Number(res.lng)
      }))
    }
  },
  getHistoryAction (type) {
    switch (type) {
      case 'visited':
        return 'You visited'
      case 'visitor':
        return 'Visited your profile'
      case 'follower':
        return 'Liked you'
      case 'following':
        return 'You liked'
    }
  },
  getNotifMsg (notif) {
    switch (notif.type) {
      case 'visit':
        return ' checked your profile'
      case 'like':
        return ' liked you'
      case 'like_back':
        return ' liked you back'
      case 'unlike':
        return ' unliked you'
    }
  },
  fromNow (date) {
    return moment.utc(date).fromNow()
  },
  getNotifIcon (type) {
    switch (type) {
      case 'visit':
        return 'mdi-eye'
      case 'like':
        return 'mdi-heart'
      case 'like_back':
        return 'mdi-heart'
      case 'unlike':
        return 'mdi-heart-outline'
    }
  },
  filterBlocked: (state, type) => {
    return state[type].filter(cur => !isBlocked(state, cur[getId(type)]))
  },
  showAlert (color, text, comp) {
    comp.alert.value = {
      state: true,
      color,
      text
    }
  },
  passMatch: (p1, p2) => !p1.length || p2 === p1 ? '' : 'Passwords must match'
}
