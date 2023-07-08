import axios from "axios"

function makeResult(ok, data) {
  return { "ok": ok, "data": data }
}

function checkIfLoggedIn() {
  return axios.get("/api/xms/v1/user/status")
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

function getDownloadPath(path) {
  return `/api/xms/v1/drive/file?path=` + encodeURIComponent(path)
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

function submitSignup(username, password, slogan) {
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
    return axios.post("/api/xms/v1/signup", { "username": username, "password": password, "slogan": slogan })
  })
}

function userInfo(uid) {
  return axios.get(`/api/xms/v1/user/${uid}/info`);
}

export {
  submitLogin, submitSignup, checkIfLoggedIn, userInfo, driveDir, driveDelete,
  signOut, getDownloadPath, driveRename, driveMove
}