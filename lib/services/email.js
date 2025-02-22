'use strict';

const { Service } = require('@hapipal/schmervice');
const nodemailer = require('nodemailer');
const {env} = require("@hapi/eslint-config-hapi");

module.exports = class EmailService extends Service {

    constructor(...args) {
        super(...args);
        /*
         * Configuration du service de messagerie avec Nodemailer.
         * On utilise ici Ethereal, un service SMTP de test.
         *
         * - `host` : serveur SMTP utilisé (Ethereal)
         * - `port` : port de connexion (587 pour STARTTLS)
         * - `secure` : false pour désactiver SSL/TLS par défaut (STARTTLS sera utilisé)
         * - `auth` : informations d’authentification pour accéder au serveur SMTP
         */

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

    async sendAccountCreationEmail(toEmail) {
        /*
         * Envoie un email de bienvenue à un nouvel utilisateur.
         *
         * @param {string} toEmail - Adresse email du destinataire.
         *
         * La fonction utilise le transporteur Nodemailer pour envoyer
         * un email avec le sujet "Bienvenue !" et un message simple (destiné aux nouveaux utilisateurs).
         */
        const mailPayload = {
            from: '"Projet R605" <no-reply.r605@etu.unilim.fr>',
            to: toEmail,
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
};
