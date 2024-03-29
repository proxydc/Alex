const baseURL = "http://localhost:3000/api/v1/database/"
class urllist {
    static getLoginUrl() {
        return baseURL + "account";
    }
    static getAddAccUrl() {
        return baseURL + "account/add";
    }
    static getEditAccUrl(id) {
        return baseURL + "account/" + id;
    }    
    static getDcUrl(id) {
        return baseURL + "dc/" + id;
    }
    static getDcDocUrl(id) {
        return baseURL + "dc/doc/" + id;
    }
    static getDcAdminUrl(id) {
        return baseURL + "dcAdmin/" + id;
    }
    /*static update(id, data, isCompleted) {
        return baseurl.put(`/dc/${id}?completed=${isCompleted}`, data);
    }

    static searchByName(name) {
        return baseurl.get(`/dc?name=${name}`);
    }

    static searchByTag(tag) {
        return baseurl.get(`/dc?tag=${tag}`);
    }*/
}

export default urllist;
