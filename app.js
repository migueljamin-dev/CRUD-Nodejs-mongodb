const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const app = express();

app.use(express.urlencoded({extended:true}));

const mongodb = `mongodb+srv://miguel_12:pass123@cluster0.vx8ma.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
app.set('view engine','ejs');
mongoose.set('useFindAndModify', false);
mongoose.connect(mongodb,{ useNewUrlParser: true,
    useUnifiedTopology: true } )
    .then(()=>{
        console.log('connected')
        app.listen(3000)
    })
    .catch(err => console.log(err));

// // this is for creating an items or data into mongoDB
// app.get('/create-items',(req,res)=>{
//     const item = new Item({
//         name:'Tablet',
//         price:500
//     });
//     item.save().then(result => res.send(result)).catch(err =>{
//         console.log(err);
//     })
// })

// // this is to get all items in the database using find()
// app.get('/get-items',(req,res) => { 
//     Item.find().then(result => res.send(result)).catch(err => console.log(err));
// });

// // this is to get item with id by using findById('id');
// app.get('/get-item',(req,res) => { 
//     Item.findById('60f30cf450881905bd0ceae9').then(result => res.send(result)).catch(err => console.log(err));
// });

app.get('/',(req,res) =>{
    res.redirect('/get-items');
});

// this is to get all items in the database using find()
app.get('/get-items',(req,res) => { 
    Item.find().then(result => {
        res.render('index',{items:result})
    }).catch(err => console.log(err));
});

app.get('/add-item',(req,res) =>{
    res.render('add-item')
});

app.post('/items',(req,res) =>{
    console.log(req.body);
    const item = Item(req.body);
    item.save().then(() => {
        res.redirect('/get-items');
    }).catch(err => console.log(err));

});

app.get('/item:id',(req,res) => {
    console.log(req.params);
    const id = req.params.id;
    Item.findById(id).then(result => {
        res.render('item-details',{item:result})
    })
});

// to delete the item
app.delete('/item/:id',(req,res) => {
    const id = req.params.id;
    Item.findByIdAndDelete(id).then(result =>{
        // pass the data with {redirect:'/'} object to item-details.ejs
        res.json({redirect:'/'});
    })
});

app.put('/item/:id',(req,res) => {
    const id = req.params.id;
    Item.findOneAndUpdate(id,req.body).then(result =>{
        res.json({msg:'Update Successfully'})
    })
})

app.use((req,res) =>{
    res.render('404')
});



