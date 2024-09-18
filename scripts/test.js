//clase activity plantilla
class Activity {
    constructor(id, title, description, imgUrl) {
            this.id = id,
            this.title = title,
            this.description = description,
            this.imgUrl = imgUrl
    }
}

// clase repository : plantilla para guardar 'activity' y mas metodos
class Repository {
    constructor() {
        this.activities = [];
        this.contadorId = 0;
    }
    getAllActivities() {
        return this.activities
    }
    createActivity(title, description, imgUrl) {
        let nuevaActivity = new Activity(this.contadorId, title, description, imgUrl);
        this.activities.push(nuevaActivity);
        this.contadorId++;
    }
    deleteActivity(id) {
        let indiceId = this.activities.findIndex(array => array.id === id);
        if (indiceId !== -1) { this.activities.splice(indiceId, 1) }
    }
}

module.exports = { Activity, Repository };