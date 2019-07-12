import axios from "axios";

export default {

    getUsers: () => {
        return axios.get("/api/user/all");
    },

    getUserById: (id) => {
        return axios.get("/api/user/id/" + id);
    },

    getUserBySession: (id) => {
        return axios.get("/api/user?session=" + id);
    },

    getUserByName: (name) => {
        return axios.get("/api/user/name/" + name);
    },

    getRooms: () => {
        return axios.get("/api/room/all");
    },

    getRoomById: (id) => {
        return axios.get("/api/room/id/" + id);
    },

    getRoomByName: (name) => {
        return axios.get("/api/room/name/" + name);
    },

    getRoomByUser: (id) => {
        return axios.get("/api/room/user/" + id);
    },

    getRoomByUsers: (id1, id2) => {
        return axios.get("/api/room/users?id1=" + id1 + "&id2=" + id2);
    },

    getAllMessages: () => {
        return axios.get("/api/message/all");
    },

    getMessagesByUserId: (id) => {
        return axios.get("/api/message/uid/" + id);
    },

    getMessagesByRoomId: (id) => {
        return axios.get("/api/message/rid/" + id);
    },

    // getBook: function(id) {
    //     return axios.get("/api/books/" + id);
    // },

    // deleteBook: function(id) {
    //     return axios.delete("/api/books/" + id);
    // },

    // saveBook: function(bookData) {
    //     return axios.post("/api/books", bookData);
    // }

    updateLocationUser: (id, lat, lon) => {
        return axios.put("/api/location/user?id=" + id + "&lat=" + lat + "&lon=" + lon);
    },

    updateRequestUser: (id1, id2) => {
        return axios.put("/api/request/users?id1=" + id1 + "&id2=" + id2);
    },

    updateCancelUser: (id1, id2) => {
        return axios.put("/api/cancel/users?id1=" + id1 + "&id2=" + id2);
    },

    updateActiveUser: (id1, id2) => {
        return axios.put("/api/active/users?id1=" + id1 + "&id2=" + id2);
    }

};
