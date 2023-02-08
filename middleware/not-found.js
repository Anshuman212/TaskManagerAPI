const notFound = (req,res)=>{
    res.status(404).send('Invalid Route try again')
}
module.exports=notFound