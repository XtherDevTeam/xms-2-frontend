import axios from "axios"

function makeResult(ok, data) {
  return { "ok": ok, "data": data }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function getPlayTimeStr(time) {
  var now_minutes = Math.trunc(Math.trunc(time) / 60)
  var now_seconds = Math.trunc(Math.trunc(time) % 60)
  return `${now_minutes}:${now_seconds < 10 ? '0' : ''}${now_seconds}`
}

function dirname(pathStr) {
  if (pathStr === "/") { return "" }
  if (pathStr.endsWith('/')) { pathStr = pathStr.substring(0, pathStr.length - 1) }
  let paths = pathStr.split("/")
  console.log(paths)
  if (paths.length == 2) {
    return '/'
  } else {
    let final = '/'
    paths.map((i, idx) => { if (idx !== 0 && idx !== paths.length - 1) { final += i + '/' } })
    return final.substring(0, final.length - 1)
  }
}

function basename(pathStr) {
  let paths = pathStr.split("/")
  return paths[paths.length - 1]
}

function checkIfLoggedIn() {
  return axios.get("/api/xms/v1/user/status")
}

function info() {
  return axios.get("/api/xms/v1/info")
}

function signOut(path) {
  return axios.post("/api/xms/v1/signout",)
}

function driveDir(path) {
  return axios.post("/api/xms/v1/drive/dir", { "path": path },)
}

function driveDelete(path) {
  return axios.post("/api/xms/v1/drive/delete", { "path": path },)
}

function driveRename(path, newName) {
  return axios.post("/api/xms/v1/drive/rename", { "path": path, "newName": newName },)
}

function driveMove(path, newPath) {
  return axios.post("/api/xms/v1/drive/move", { "path": path, "newPath": newPath },)
}

function driveCopy(path, newPath) {
  return axios.post("/api/xms/v1/drive/copy", { "path": path, "newPath": newPath },)
}

function driveCreateDir(path, name) {
  return axios.post("/api/xms/v1/drive/createdir", { "path": path, "name": name },)
}

function driveUpload(path, data) {
  return axios.post(`/api/xms/v1/drive/upload?path=${encodeURIComponent(path)}`, data)
}

function userAvatarUpdate(data) {
  return axios.post(`/api/xms/v1/user/avatar/update`, data)
}

function userHeadImgUpdate(data) {
  return axios.post(`/api/xms/v1/user/headimg/update`, data)
}

function getDownloadPath(path) {
  return `/api/xms/v1/drive/file?path=` + encodeURIComponent(path)
}

function getPlaylistArtworkPath(pid) {
  return `/api/xms/v1/music/playlist/${pid}/artwork`
}

function getSongArtworkPath(sid) {
  return `/api/xms/v1/music/song/${sid}/artwork`
}

function musicPlaylistCreate(name, description) {
  return axios.post(`/api/xms/v1/music/playlist/create`, {
    name: name,
    description: description
  })
}

function musicPlaylistDelete(id) {
  return axios.post(`/api/xms/v1/music/playlist/delete`, {
    id: id
  })
}

function musicPlaylistSongsDelete(playlistId, sid) {
  return axios.post(`/api/xms/v1/music/playlist/${playlistId}/songs/delete`, {
    songId: sid
  })
}

function userShareLinks(uid) {
  return axios.get(`/api/xms/v1/user/${uid}/sharelinks`)
}

function userPasswordUpdate(oldPassword, newPassword) {
  return axios.post(`/api/xms/v1/user/password/update`, {
    oldPassword: oldPassword,
    newPassword: newPassword
  })
}

function shareLinkCreate(path) {
  return axios.post(`/api/xms/v1/sharelink/create`, {path: path})
}

function shareLinkDelete(linkId) {
  return axios.post(`/api/xms/v1/sharelink/${linkId}/delete`)
}

function shareLinkInfo(linkId) {
  return axios.get(`/api/xms/v1/sharelink/${linkId}/info`)
}

function userUsernameUpdate(newUsername) {
  return axios.post(`/api/xms/v1/user/username/update`, {newUsername: newUsername})
}

function userSloganUpdate(newSlogan) {
  return axios.post(`/api/xms/v1/user/slogan/update`, {newSlogan: newSlogan})
}

function submitLogin(username, password) {
  return new Promise((resolve, reject) => {
    if (username.length > 64 || password.length > 128) {
      reject(makeResult(false, "username or password out of length limitations"))
    } else if (username.length === 0 || password.length === 0) {
      reject(makeResult(false, "username or password is empty"))
    } else {
      resolve()
    }
  }).then(
    () => {
      return axios.post("/api/xms/v1/signin", { "username": username, "password": password })
    }
  )
}

function submitSignup(username, password, slogan, inviteCode) {
  return new Promise((resolve, reject) => {
    if (username.length > 64 || password.length > 128 || slogan.length > 64) {
      reject(makeResult(false, "username, password or slogan out of length limitations"))
    } else if (username.length === 0 || password.length === 0) {
      reject(makeResult(false, "username or password is empty"))
    }
    resolve()
  }).then(() => {
    if (slogan.length === 0) {
      slogan = "Fireworks are for now, but friends are forever!"
    }
    return axios.post("/api/xms/v1/signup", { "username": username, "password": password, "slogan": slogan, "inviteCode": inviteCode })
  })
}

function userInfo(uid) {
  return axios.get(`/api/xms/v1/user/${uid}/info`)
}

function userPlaylists() {
  return axios.get(`/api/xms/v1/user/playlists`)
}

function userTasks() {
  return axios.get(`/api/xms/v1/user/tasks`)
}

function getShareLinkPath(location, linkId) {
  return `${location.protocol}//${location.host}/sharelink/${linkId}`
}

function musicPlaylistSongsInsert(playlistId, path) {
  return axios.post(`/api/xms/v1/music/playlist/${playlistId}/songs/insert`, {songPath: path})
}

function musicPlaylistSongs(playlistId) {
  return axios.get(`/api/xms/v1/music/playlist/${playlistId}/songs`)
}

function musicPlaylistInfo(playlistId) {
  return axios.get(`/api/xms/v1/music/playlist/${playlistId}/info`)
}

function musicPlaylistSongsSwap(playlistId, src, dest) {
  return axios.post(`/api/xms/v1/music/playlist/${playlistId}/songs/swap/${src}/${dest}`)
}

function getMusicPlaylistSongsFileSrc(playlistId, songId) {
  return `/api/xms/v1/music/playlist/${playlistId}/songs/${songId}/file`
}

function musicPlaylistEdit(playlistId, name, description) {
  return axios.post(`/api/xms/v1/music/playlist/${playlistId}/edit`, {
    name: name,
    description: description
  })
}

function getShareLinkFilePath(linkId) {
  return `/api/xms/v1/sharelink/${linkId}/file`
}

function getShareLinkDirFilePath(linkId, path) {
  return `/api/xms/v1/sharelink/${linkId}/dir/file?path=${encodeURIComponent(path)}`
}

function shareLinkDir(linkId, path) {
  return axios.post(`/api/xms/v1/sharelink/${linkId}/dir`, {path: path})
}

function taskCreate(name, plugin, handler, args) {
  return axios.post(`/api/xms/v1/task/create`, {
    name: name,
    plugin: plugin,
    handler: handler,
    args: args
  })
}

function taskInfo(taskId) {
  return axios.get(`/api/xms/v1/task/${taskId}/info`)
}

function taskDelete(taskId) {
  return axios.post(`/api/xms/v1/task/${taskId}/delete`)
}

function infoPlugins() {
  return axios.get('/api/xms/v1/info/plugins')
}

function config() {
  return axios.get('/api/xms/v1/config')
}

function configUpdate(data) {
  return axios.post('/api/xms/v1/config/update', data)
}

function userManageList() {
  return axios.get('/api/xms/v1/user/manage/list')
}

function userManageDelete(id) {
  return axios.post('/api/xms/v1/user/manage/delete', {id: id})
}

function userManageUpdateLevel(id, level) {
  return axios.post('/api/xms/v1/user/manage/updateLevel', {id: id, level: level})
}

function userManageCreate(name, password, slogan, level) {
  return axios.post('/api/xms/v1/user/manage/create', {name: name, password: password, slogan: slogan, level: level})
}

function increasePlaylistPlayCount (playlistId) {
  return axios.post(`/api/xms/v1/music/playlist/${playlistId}/increasePlayCount`)
}

function increaseSongPlayCount (songId) {
  return axios.post(`/api/xms/v1/music/song/${songId}/increasePlayCount`)
}

export {
  submitLogin, submitSignup, checkIfLoggedIn, userInfo, driveDir, driveDelete,
  signOut, getDownloadPath, driveRename, driveMove, driveCreateDir, driveUpload,
  dirname, userShareLinks, userAvatarUpdate, userHeadImgUpdate, userSloganUpdate,
  userUsernameUpdate, shareLinkCreate, userPasswordUpdate, basename, getShareLinkPath,
  shareLinkDelete, driveCopy, getSongArtworkPath, getPlaylistArtworkPath, userPlaylists,
  musicPlaylistCreate, musicPlaylistDelete, musicPlaylistSongsInsert, musicPlaylistSongs,
  musicPlaylistInfo, musicPlaylistSongsSwap, musicPlaylistSongsDelete, getRndInteger,
  getMusicPlaylistSongsFileSrc, getPlayTimeStr, musicPlaylistEdit, shareLinkInfo,
  getShareLinkFilePath, getShareLinkDirFilePath, shareLinkDir, userTasks, infoPlugins,
  taskCreate, taskInfo, taskDelete, config, configUpdate, info, userManageDelete,
  userManageUpdateLevel, userManageList, userManageCreate, increasePlaylistPlayCount,
  increaseSongPlayCount
}