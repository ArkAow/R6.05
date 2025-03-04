'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favorite extends Model {

    static get tableName() {

        return 'favorite';
    }

    static get joiSchema() {

        return Joi.object({
            id: Joi.number().integer().greater(0),
            userId: Joi.number().integer().required(),
            filmId: Joi.number().integer().required(),
            createdAt: Joi.date(),
        });
    }

    $beforeInsert(queryContext) {

        this.createdAt = this.updatedAt;
    }
};