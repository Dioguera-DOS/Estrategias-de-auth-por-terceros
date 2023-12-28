const { Router } = require('express');
const usersModel = require('../dao/models/users.model');
const router = Router();
const crypto = require('crypto');
const passport = require('passport');



router.get('/github',passport.authenticate('github',{}), (req, res)=> {

})

router.get('/callbackGithub',passport.authenticate('github',{failureRedirect:"/api/sessions/errorGithub"}), (req, res)=> {

})

router.get('/errorGithub',passport.authenticate('github',{failureRedirect:"/api/sessions/errorGithub"}), (req, res)=> {

})
router.post('/login', async (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.redirect('/login?error=Complete todos los datos')
    }

    password = crypto.createHmac("sha256", "coderCoder123").update(password).digest("hex")

    let usuarios = await usersModel.findOne({ email, password })

    if (!usuarios) {
        return res.redirect(`/login?error=credenciales invalidas!!!`)    }

    
    req.session.usuario = {nombre:usuarios.name, email:usuarios.email}
    res.redirect('/perfil')

})

router.post('/register', async (req, res) => {
    let { name, email, password } = req.body

    if (!name || !email || !password) {
        return res.redirect('/register?error=Complete todos los datos')
    }

    let usuario = await usersModel.findOne({ email})

    console.log(usuario)

    if (usuario) {
        return res.redirect(`/register?error=Existen usuarios con email${email} en base de datos!!`)
    }
    password = crypto.createHmac("sha256", "coderCoder123").update(password).digest("hex")

    let users
    try {
        users = await usersModel.create({ name, email, password })
        res.redirect(`/login?message=Usuario ${email} registro correctamente`)

    } catch (error) {
        res.redirect('/registro?error=Error inesperado. Reintente en unos minutos!!')
    }
})

router.get('/logout', (req,res)=>{
    req.session.destroy(error =>{
        if(error){
            res.redirect('/login?error=fallo en el logout!!!')
        }
    })

    res.redirect('/login')
})


module.exports = router

