//const local = require('passport-local');
const github = require('passport-github2')
const passport = require('passport');
const usersModel = require('../dao/models/users.model');

const github = require('passport-github2');


const initPassport = () => {
    passport.use('github', new github.Strategy(
        {
            clienteID: 'Iv1.4d66f66fd893361c',
            clienteSecret: '0f15ed1a1d6b615f5df3d2b7b05a6625ab7e61d9',
            callbackURl: 'http://localhost:8080/api/sessions/callbackGithub',


        },
        async (accessToken, refreToken, profile, done) => {
            try {
                console.log('profile')






            } catch (error) {
                return done(error)

            }
        }
    ))

    //serializador / desarializador
    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id)
    })


    // fin initPassport
    passport.deserializeUser(async (id, done) => {
        let usuario = await usersModel.findById(id)
        return done(null, usuario)
    })

    
}

module.exports = initPassport