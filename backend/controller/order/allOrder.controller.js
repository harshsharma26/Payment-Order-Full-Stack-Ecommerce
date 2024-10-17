
const orderModel = require('../../models/orderProductModel')
const userModel = require('../../models/userModel')

const allOrderController = async(req,res) => {
    const userId = req.userId

    const user = await userModel.findById(userId)

    if(user.role !== 'ADMIN'){
        return res.status(500).json({
            message: "not access"
        })
    }
    const AllOrder = await orderModel.find().sort({ createAt : -1 })

    return res.status(200).json({
        data:AllOrder,
        success:true
    })
}
module.exports = allOrderController