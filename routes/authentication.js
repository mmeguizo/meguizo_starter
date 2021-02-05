const User = require('../models/user')


module.exports = (router) => {



  router.post('/register', (req, res) => {

    if (!req.body.email) {
      res.json({ success: false, message: 'You must provide an email' })
    } else {

      if (!req.body.username) {
        res.json({ success: false, message: 'You must provide an username' })
      } else {
        if (!req.body.password) {
          res.json({ success: false, message: 'You must provide an password' })

        } else {
          let user = new User({
            email: req.body.email.toLowerCase(),
            username: req.body.username.toLowerCase(),
            password: req.body.password
          })

          user.save((err, data) => {
            if (err) {
              if (err.code === 11000) {

                res.json({ success: false, message: 'User name or Email already exists ', err: err.message })
              } else {

                if (err.errors) {
                  //for specific error email,username and password
                  if (err.errors.email) {
                    res.json({ success: false, message: err.errors.email.message })
                  } else {
                    if (err.errors.username) {
                      res.json({ success: false, message: err.errors.username.message })
                    } else {
                      if (err.errors.password) {
                        res.json({ success: false, message: err.errors.password.message })
                      } else {
                        res.json({ success: false, message: err })
                      }
                    }
                  }

                } else {
                  res.json({ success: false, message: 'Could not save user Error : ' })
                }
              }
            } else {
              res.json({ success: true, message: 'Account Registered successfully', data: { email: data.email, username: data.username } })
            }
          })

        }
      }
    }
    // res.send('POST in authetication')
  });



  router.get('/checkEmail/:email', (req, res) => {

    if (!req.params.email) {
      res.json({ success: false, message: 'Email not provided ' })
    } else {
      User.findOne({ email: req.params.email }, (err, email) => {
        if (err) {
          res.json({ success: false, message: err })

        } else {
          if (email) {
            res.json({ success: false, message: 'Email already taken' })
          } else {
            res.json({ success: true, message: 'Email available' })
          }
        }
      })
    }
  })


  router.get('/checkUsername/:username', (req, res) => {

    if (!req.params.username) {
      res.json({ success: false, message: 'Email not provided ' })
    } else {
      User.findOne({ username: req.params.username }, (err, username) => {
        if (err) {
          res.json({ success: false, message: err })

        } else {
          if (username) {
            res.json({ success: false, message: 'Username already taken' })
          } else {
            res.json({ success: true, message: 'Username available' })
          }
        }
      })
    }
  })



  router.put('/register', (req, res) => {
    res.send('PUT in authetication')
  });


  router.get('/register', (req, res) => {
    res.send('GET in authetication')
  });

  router.post('/', (req, res) => {
    res.send('No route post in authetication')
  });




  return router
}