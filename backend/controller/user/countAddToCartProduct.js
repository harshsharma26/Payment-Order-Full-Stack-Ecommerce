const addToCartModel = require("../../models/cartProduct")

const countAddToCartProduct = async(req,res)=>{
    try {
        const userId = req.userId
        const count = await addToCartModel.countDocuments({
            userId : userId
        })
        res.json({
            data: {
                count:count
            },
            message:"Ok",
            error:false,
            success:true
        })
    } catch (err) {
        res.json({
            message:err.message || err,
            error:false,
            success:false
        })
    }
}
module.exports = countAddToCartProduct