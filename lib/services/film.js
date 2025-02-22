'use strict';

const { Service } = require('@hapipal/schmervice');
const Boom = require('@hapi/boom');
const Jwt = require('@hapi/jwt');


module.exports = class FilmService extends Service {

    async create(film){
        const { Film } = this.server.models();
        return Film.query().insertAndFetch(film);
    }

    findAll(){

        const { Film } = this.server.models();

        return Film.query();
    }

    delete(id){

        const { Film } = this.server.models();

        return Film.query().deleteById(id);
    }

    update(id, fim){

        const { Film } = this.server.models();

        return Film.query().findById(id).patch(film);
    }
}
