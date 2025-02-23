'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');
const {env} = require("@hapi/eslint-config-hapi");

module.exports = class EmailService extends Service {

    constructor(...args) {
    /*
     * Configuration du service de messagerie avec Nodemailer.
     * On utilise ici Ethereal, un service SMTP de test.
     *
     * - `host` : serveur SMTP utilisé (Ethereal)
     * - `port` : port de connexion (587 pour STARTTLS)
     * - `secure` : false pour désactiver SSL/TLS par défaut (STARTTLS sera utilisé)
     * - `auth` : informations d’authentification pour accéder au serveur SMTP
     */
        super(...args);

        this.transporter = nodemailer.createTransport({
            host: env.EMAIL_HOST,
            port: env.EMAIL_PORT,
            secure: false,
            auth: {
                user: env.EMAIL_USER,
                pass: env.EMAIL_PASS
            }
        });
    }

    async sendAccountCreationEmail(userEmail) {
    /*
     * Envoie un email de bienvenue à un nouvel utilisateur.
     *
     * @param {string} userEmail - Adresse email du destinataire.
     *
     * La fonction utilise le transporteur Nodemailer pour envoyer
     * un email avec le sujet "Bienvenue !" et un message simple (destiné aux nouveaux utilisateurs).
     */
        const mailPayload = {
            from: 'Projet R605 <no-reply.r605@etu.unilim.fr>',
            to: userEmail,
            subject: 'Bienvenue !',
            text: 'Votre compte a été créé avec succès.'
        };
        try {
            const info = await this.transporter.sendMail(mailPayload);
            console.log("Message envoyé: %s", info.messageId);
        } catch (err) {
            console.error('Erreur lors de l’envoi du mail :', err);
        }
    }

    async sendFilmAdditionEmail(userEmail, film) {
    /*
     * Envoie un email a un utilisateur pour lui dire qu'un film a été ajouté.
     *
     * @param {string} userEmail - Adresse email du destinataire.
     * @param {film} film - Film concerné.
     *
     * La fonction utilise le transporteur Nodemailer pour envoyer un email.
     */
        const mailPayload = {
            from: 'Projet R605 <no-reply.r605@etu.unilim.fr>',
            to: userEmail,
            subject: 'Nouveau film disponible!',
            text: `Venez le voir, il a l\'air bien. C\'est ${film.title}!`
        };
        try {
            const info = await this.transporter.sendMail(mailPayload);
            console.log("Message envoyé: %s", info.messageId);
        } catch (err) {
            console.error('Erreur lors de l’envoi du mail :', err);
        }
    }

    async sendFavoriteFilmGotUpdatedEmail(userEmail, film) {
    /*
     * Envoie un email a un utilisateur pour lui dire qu'un film de sa liste des favoris a été modifié.
     *
     * @param {string} userEmail - Adresse email du destinataire.
     * @param {film} film - Film concerné.
     *
     * La fonction utilise le transporteur Nodemailer pour envoyer un email.
     */
        const mailPayload = {
            from: 'Projet R605 <no-reply.r605@etu.unilim.fr>',
            to: userEmail,
            subject: 'Un film de votre liste des favoris a été mis à jour!',
            text: `Le film \'${film.title}\' a été mis à jour`
        };
        try {
            const info = await this.transporter.sendMail(mailPayload);
            console.log("Message envoyé: %s", info.messageId);
        } catch (err) {
            console.error('Erreur lors de l’envoi du mail :', err);
        }
    }
};
