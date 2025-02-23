'use strict';

const Joi = require('joi')

module.exports = [
    {
        method: 'post',
        path: '/film',
        options: {
            auth: { scope: ['admin'] },
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    title: Joi.string().required().min(2).example('Babylon').description('Title of the film'),
                    description: Joi.string().required().min(10).example('Ce drame historique raconte la réussite et le déclin de six personnages principalement dans l\'industrie cinématographique à la fin des années 1920.').description('Description of the film'),
                    releaseDate: Joi.date().required().example('2022-12-23').description('Release date of the film'),
                    director: Joi.string().required().example('Damien Chazelle').description('Director of the film')
                })
            }

        },
        handler: async (request, h) => {

            const { filmService } = request.services();

            return await filmService.create(request.payload);
        }
    },
    {
        method: 'get',
        path: '/films',
        options: {
            tags:['api']
        },
        handler: async (request, h) => {

            const { filmService } = request.services();

            return await filmService.findAll();
        }
    },
    {
        method: 'delete',
        path: '/film/{id}',
        options: {
            tags:['api'],
            auth : { scope : ['admin'] },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                })
            }
        },
        handler: async (request, h) => {

            const { filmService } = request.services();

            return await filmService.delete(request.params.id);
        }
    },
    {
        method: 'patch',
        path: '/film/{id}',
        options: {
            tags:['api'],
            auth : { scope : ['admin'] },
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().required().min(1)
                }),
                payload: Joi.object({
                    title: Joi.string().required().min(2).example('Babylon').description('Title of the film'),
                    description: Joi.string().required().min(10).example('Ce drame historique raconte la réussite et le déclin de six personnages principalement dans l\'industrie cinématographique à la fin des années 1920.').description('Description of the film'),
                    releaseDate: Joi.date().required().example('2022-12-23').description('Release date of the film'),
                    director: Joi.string().required().example('Damien Chazelle').description('Director of the film')
                })
            }
        },
        handler: async (request, h) => {

            const { filmService } = request.services();

            return await filmService.update(request.params.id, request.payload);
        }
    },
    {
        method: 'post',
        path: '/films/download',
        options: {
            auth: { scope: ['admin'] },
            tags: ['api'],
        },
        handler: async (request, h) => {

            const { filmService } = request.services();

            return await filmService.exportFilmToCSV(request.auth.credentials);
        }
    },
];
