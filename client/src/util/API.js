import axios from "axios";

export default {

    testapi: (data) => {
        console.log("In API.js > testing api call");
        console.log(data);
        return axios.get("/api/test/" + data);
    },

    getUsers: function() {
        console.log("in api.js");
        return axios.get("/api/user/all");
    },

    getUserById: (id) => {
        return axios.get("/api/user/id/" + id);
    },

    getUserByName: (name) => {
        return axios.get("/api/user/name/" + name);
    },

    getRooms: function() {
        return axios.get("/api/room/all");
    }


    // getBook: function(id) {
    //     return axios.get("/api/books/" + id);
    // },

    // deleteBook: function(id) {
    //     return axios.delete("/api/books/" + id);
    // },

    // saveBook: function(bookData) {
    //     return axios.post("/api/books", bookData);
    // }

};
