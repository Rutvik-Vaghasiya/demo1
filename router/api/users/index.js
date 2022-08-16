const router = require('express').Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const  userlist = require('./userlist')
const  home = require('../home')


router.get('/userlist',userlist.getuserlist);
router.post('/addaccm',userlist.addaccesmodulelist);
router.post('/rmacc',userlist.rmaccessmodulelist);

//- Add a functionality to check wheather or not particular user has access to particular module
/* {
    userid = 0,
    roleid = 0

    output
     true / false
}
     
*/
router.post('/check',userlist.getcheckusermoduleaccess);
// Add a functionality to update many users with same data. Ex. update all user lastname to "module"
/* userid=[{
    user_id :0

},{
    user_id:0
}],
lastname:'module
 output 
  true/false
*/
   
router.post('/samedataset',userlist.setsamedatauser);

// - Add a functionality to update many users with different data. Ex. change one users's firstName,another's access modules and email in same db call.

/*  
    {
        user:[
            {
                user_id:0,
                firsname:'srting',
            },
            {
                user_id:0,
                access:'sring',
                emailid:'abc@gmail.com'
            }
        ]
    }

    OUTPUT: 
    if succes then true otherwise any err then false
*/
router.post('/differantdataset',userlist.setdifferentdatauser);


// fined search 'a'

router.get('/search',userlist.getsearchusers)

module.exports = router