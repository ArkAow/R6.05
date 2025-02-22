'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {

    static get tableName() {

        return 'film';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            titre: Joi.string().required().min(2).example('Babylon'),
            description: Joi.string().required().min(10).example('Il s\'agit d\'un drame historique qui met en vedette Brad Pitt, Margot Robbie et Diego Calva. Il raconte la réussite et le déclin de six personnages principalement dans l\'industrie cinématographique lors de la transition entre le cinéma muet et le sonore à la fin des années 1920.'),
            dateSortie: Joi.date().required().example('2022-12-23'),
            realisateur: Joi.string().required().example('Damien Chazelle'),
            createdAt: Joi.date(),
            updatedAt: Joi.date()
        });
    }

    $beforeInsert(queryContext) {

        this.updatedAt = new Date();
        this.createdAt = this.updatedAt;
    }

    $beforeUpdate(opt, queryContext) {

        this.updatedAt = new Date();
    }
};
